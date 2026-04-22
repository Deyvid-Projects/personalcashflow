import { NextResponse } from "next/server"
import { google } from "googleapis"
import { GoogleAuth } from "google-auth-library"

export const dynamic = "force-dynamic"

function getAuth() {
  const keyBase64 = process.env.GOOGLE_SA_KEY_BASE64
  if (!keyBase64) throw new Error("GOOGLE_SA_KEY_BASE64 missing")
  const credentials = JSON.parse(Buffer.from(keyBase64, "base64").toString())
  return new GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  })
}

function parseValor(raw: unknown): number {
  if (typeof raw === "number") return raw
  if (typeof raw !== "string") return 0
  const cleaned = raw.replace(/[R$\s.]/g, "").replace(",", ".")
  const n = Number(cleaned)
  return isFinite(n) ? n : 0
}

function parseData(raw: unknown): Date | null {
  if (typeof raw !== "string") return null
  const ddmmyyyy = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (ddmmyyyy) {
    const [, d, m, y] = ddmmyyyy
    return new Date(Number(y), Number(m) - 1, Number(d))
  }
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (iso) {
    const [, y, m, d] = iso
    return new Date(Number(y), Number(m) - 1, Number(d))
  }
  return null
}

export async function GET() {
  try {
    const auth = getAuth()
    const sheets = google.sheets({ version: "v4", auth })
    const sheetId = process.env.SHEET_ID!

    const [transRes, projRes] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: "Transações!A2:H",
      }),
      sheets.spreadsheets.values
        .get({ spreadsheetId: sheetId, range: "Projeções!A2:H" })
        .catch(() => null),
    ])

    const transRows = transRes.data.values ?? []
    const projRows = projRes?.data.values ?? []

    type Tx = {
      data: Date
      descricao: string
      categoria: string
      valor: number
      banco: string
    }

    const transacoes: Tx[] = transRows
      .map((r) => ({
        data: parseData(r[0]),
        descricao: (r[2] as string) ?? "",
        categoria: (r[3] as string) ?? "Sem categoria",
        valor: parseValor(r[4]),
        banco: (r[5] as string) ?? "",
      }))
      .filter((t): t is Tx => t.data !== null)

    const now = new Date()
    const mesAtual = now.getMonth()
    const anoAtual = now.getFullYear()

    const doMesAtual = transacoes.filter(
      (t) => t.data.getMonth() === mesAtual && t.data.getFullYear() === anoAtual,
    )

    const receitasMes = doMesAtual
      .filter((t) => t.valor > 0)
      .reduce((s, t) => s + t.valor, 0)
    const gastosMes = Math.abs(
      doMesAtual.filter((t) => t.valor < 0).reduce((s, t) => s + t.valor, 0),
    )
    const saldoMes = receitasMes - gastosMes

    // fluxoMensal — últimos 6 meses (usa mesLabel, NÃO mes)
    const fluxoMensal: Array<{
      mesLabel: string
      receitas: number
      gastos: number
    }> = []
    for (let i = 5; i >= 0; i--) {
      const dt = new Date(anoAtual, mesAtual - i, 1)
      const m = dt.getMonth()
      const y = dt.getFullYear()
      const doMes = transacoes.filter(
        (t) => t.data.getMonth() === m && t.data.getFullYear() === y,
      )
      fluxoMensal.push({
        mesLabel: dt
          .toLocaleDateString("pt-BR", { month: "short" })
          .replace(".", ""),
        receitas: doMes.filter((t) => t.valor > 0).reduce((s, t) => s + t.valor, 0),
        gastos: Math.abs(
          doMes.filter((t) => t.valor < 0).reduce((s, t) => s + t.valor, 0),
        ),
      })
    }

    // transacoesPorCategoria — inclui pct (% do total de gastos do mês)
    const catMap = new Map<string, number>()
    for (const t of doMesAtual.filter((t) => t.valor < 0)) {
      catMap.set(t.categoria, (catMap.get(t.categoria) ?? 0) + Math.abs(t.valor))
    }
    const totalCat = Array.from(catMap.values()).reduce((s, v) => s + v, 0)
    const transacoesPorCategoria = Array.from(catMap.entries())
      .map(([categoria, valor]) => ({
        categoria,
        valor,
        pct: totalCat > 0 ? (valor / totalCat) * 100 : 0,
      }))
      .sort((a, b) => b.valor - a.valor)

    const ultimasTransacoes = [...transacoes]
      .sort((a, b) => b.data.getTime() - a.data.getTime())
      .slice(0, 15)
      .map((t) => ({
        data: t.data.toISOString().slice(0, 10),
        descricao: t.descricao,
        categoria: t.categoria,
        banco: t.banco,
        valor: t.valor,
      }))

    // proxProjecoes — inclui categoria + tipo (baseado no sign)
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    const projecoesFuturas = projRows
      .map((r) => ({
        data: parseData(r[0]),
        descricao: (r[2] as string) ?? "",
        categoria: (r[3] as string) ?? "Sem categoria",
        valor: parseValor(r[4]),
      }))
      .filter(
        (p): p is {
          data: Date
          descricao: string
          categoria: string
          valor: number
        } => p.data !== null && p.data >= hoje,
      )
      .sort((a, b) => a.data.getTime() - b.data.getTime())

    const projetadoMes = projecoesFuturas
      .filter(
        (p) => p.data.getMonth() === mesAtual && p.data.getFullYear() === anoAtual,
      )
      .reduce((s, p) => s + Math.abs(p.valor), 0)

    const proxProjecoes = projecoesFuturas.slice(0, 15).map((p) => ({
      data: p.data.toISOString().slice(0, 10),
      descricao: p.descricao,
      categoria: p.categoria,
      tipo: p.valor >= 0 ? "Receita" : "Despesa",
      valor: p.valor,
    }))

    const mesAno = now.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    })

    // ⚠️ Envelope { data: ... } é o que o hook espera
    return NextResponse.json({
      data: {
        resumo: { mesAno, receitasMes, gastosMes, saldoMes, projetadoMes },
        fluxoMensal,
        transacoesPorCategoria,
        ultimasTransacoes,
        proxProjecoes,
        atualizadoEm: new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error("/api/dashboard error:", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    )
  }
}

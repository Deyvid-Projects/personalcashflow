import { NextResponse } from "next/server"
import { parseData } from "@/lib/utils/parse-date"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // TODO: agregar dados do Sheets (resumo, fluxoMensal, etc.)
    void parseData // placeholder pra evitar "unused import" enquanto monta
    return NextResponse.json({
      data: {
        resumo: { receitas: 0, gastosReais: 0, saldo: 0, aVencer: 0 },
        fluxoMensal: [],
        transacoesPorCategoria: [],
        ultimasTransacoes: [],
        proxProjecoes: [],
        saldoProjetado: [],
        atualizadoEm: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: { code: "DASHBOARD_FAILED", message: String(error) } },
      { status: 500 },
    )
  }
}
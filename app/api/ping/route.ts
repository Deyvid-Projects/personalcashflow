import { NextResponse } from "next/server"
import { readSheet } from "@/lib/google/sheets"
import { ABAS } from "@/lib/constants"

export async function GET() {
  try {
    const rows = await readSheet(ABAS.TRANSACOES)
    return NextResponse.json({
      ok: true,
      totalLinhas: rows.length,
      primeiraLinha: rows[0],
    })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 },
    )
  }
}

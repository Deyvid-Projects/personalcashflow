"use client"

import { useQuery } from "@tanstack/react-query"

export type DashboardData = {
  resumo: {
    mesAno: string
    receitasMes: number
    gastosMes: number
    saldoMes: number
    projetadoMes: number
  }
  fluxoMensal: Array<{
    mesLabel: string
    receitas: number
    gastos: number
  }>
  transacoesPorCategoria: Array<{
    categoria: string
    valor: number
    pct: number
  }>
  ultimasTransacoes: Array<{
    data: string
    descricao: string
    categoria: string
    banco?: string
    valor: number
  }>
  proxProjecoes: Array<{
    data: string
    descricao: string
    categoria: string
    tipo: string
    valor: number
  }>
  atualizadoEm: string
}

async function fetchDashboard(): Promise<DashboardData> {
  const res = await fetch("/api/dashboard", { cache: "no-store" })
  if (!res.ok) throw new Error("Falha ao carregar dashboard")
  const json = await res.json()
  return json.data as DashboardData
}

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    refetchInterval: 5 * 60_000, // 5 min
    staleTime: 60_000,
  })
}
"use client"

import { useDashboard } from "@/hooks/use-dashboard"
import { Loader } from "@/components/loader"
import { Topbar } from "@/components/topbar"
import { KpiCard } from "@/components/kpi-card"
import { SectionLabel } from "@/components/section-label"
import { FluxoMensalChart } from "@/components/charts/fluxo-mensal"
import { CategoriaDonut } from "@/components/charts/categoria-donut"
import { RankingCategorias } from "@/components/ranking-categorias"
import { TransacoesTable } from "@/components/tables/transacoes-table"
import { ProjecoesTable } from "@/components/tables/projecoes-table"

export default function DashboardPage() {
  const { data, isLoading, isFetching, refetch, dataUpdatedAt } = useDashboard()

  const lastUpdate = dataUpdatedAt
    ? `Atualizado às ${new Date(dataUpdatedAt).toLocaleTimeString("pt-BR")}`
    : "—"

  if (isLoading || !data) {
    return <Loader show />
  }

  const { resumo, fluxoMensal, transacoesPorCategoria, ultimasTransacoes, proxProjecoes } = data

  return (
    <>
      <Topbar
        lastUpdate={lastUpdate}
        onRefresh={() => refetch()}
        isLoading={isFetching}
      />

      <main className="max-w-[1380px] mx-auto px-7 pt-7 pb-[60px]">
        <header className="flex items-center justify-between mb-[22px]">
          <div>
            <h1 className="text-[22px] font-bold tracking-tight capitalize">
              {resumo.mesAno}
            </h1>
            <p className="text-[13px] text-muted mt-0.5">
              Visão consolidada · Real + Projetado
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard
            variant="receita"
            label="Receitas"
            value={resumo.receitasMes}
            hint="Entradas confirmadas"
            icon="💚"
          />
          <KpiCard
            variant="gasto"
            label="Gastos Reais"
            value={resumo.gastosMes}
            hint="Transações efetivadas"
            icon="💸"
          />
          <KpiCard
            variant="saldo"
            label="Saldo do Mês"
            value={resumo.saldoMes}
            hint={resumo.saldoMes >= 0 ? "✅ Positivo" : "⚠️ Negativo"}
            icon="📊"
          />
          <KpiCard
            variant="futuro"
            label="A Vencer"
            value={resumo.projetadoMes}
            hint="Projeções pendentes"
            icon="📅"
          />
        </section>

        <SectionLabel>📈 Análise de Fluxo</SectionLabel>
        <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 mb-6">
          <div className="bg-card border border-border rounded-[14px] p-[22px]">
            <h3 className="text-sm font-semibold mb-[18px] flex items-center gap-2">
              📆 Receitas vs Gastos — últimos 6 meses
            </h3>
            <FluxoMensalChart data={fluxoMensal} />
          </div>
          <div className="bg-card border border-border rounded-[14px] p-[22px]">
            <h3 className="text-sm font-semibold mb-[18px] flex items-center gap-2">
              🍕 Distribuição por Categoria
            </h3>
            <CategoriaDonut data={transacoesPorCategoria} />
          </div>
        </section>

        <SectionLabel>🏷️ Categorias</SectionLabel>
        <section className="bg-card border border-border rounded-[14px] p-[22px] mb-6">
          <h3 className="text-sm font-semibold mb-[18px]">
            Ranking de gastos do mês atual
          </h3>
          <RankingCategorias data={transacoesPorCategoria} />
        </section>

        <SectionLabel>📋 Movimentações</SectionLabel>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-[14px] p-[22px]">
            <h3 className="text-sm font-semibold mb-[18px]">
              🕐 Últimas Transações
            </h3>
            <TransacoesTable data={ultimasTransacoes} />
          </div>
          <div className="bg-card border border-border rounded-[14px] p-[22px]">
            <h3 className="text-sm font-semibold mb-[18px]">
              📅 Próximas Projeções
            </h3>
            <ProjecoesTable data={proxProjecoes} />
          </div>
        </section>
      </main>
    </>
  )
}

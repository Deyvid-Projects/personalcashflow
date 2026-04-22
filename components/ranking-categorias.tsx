import { formatBRL } from "@/lib/format"

type Row = { categoria: string; valor: number }

export function RankingCategorias({ data }: { data: Row[] }) {
  if (!data.length) {
    return (
      <div className="text-center text-muted py-9 text-[13px]">
        Sem dados no mês
      </div>
    )
  }

  const max = data[0].valor
  const top = data.slice(0, 10)

  return (
    <div className="flex flex-col gap-3">
      {top.map((c) => (
        <div key={c.categoria} className="flex items-center gap-3">
          <div
            className="w-40 text-[13px] truncate"
            title={c.categoria}
          >
            {c.categoria}
          </div>
          <div className="flex-1 h-1.5 bg-border rounded overflow-hidden">
            <div
              className="h-full rounded bg-gradient-to-r from-accent to-teal"
              style={{ width: `${((c.valor / max) * 100).toFixed(1)}%` }}
            />
          </div>
          <div className="text-[13px] font-bold whitespace-nowrap">
            {formatBRL(c.valor)}
          </div>
        </div>
      ))}
    </div>
  )
}

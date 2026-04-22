import { formatBRL } from "@/lib/format"

type Row = {
  data: string
  descricao: string
  categoria: string
  banco?: string
  valor: number
}

export function TransacoesTable({ data }: { data: Row[] }) {
  return (
    <div className="max-h-[320px] overflow-y-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {["Data", "Descrição", "Categoria"].map((h) => (
              <th
                key={h}
                className="text-left px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted border-b border-border sticky top-0 bg-card"
              >
                {h}
              </th>
            ))}
            <th className="text-right px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted border-b border-border sticky top-0 bg-card">
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-muted py-9 text-[13px]">
                Sem transações
              </td>
            </tr>
          ) : (
            data.map((t, i) => (
              <tr key={i} className="hover:bg-white/[.03] transition-colors">
                <td className="px-2.5 py-[11px] border-b border-border text-muted whitespace-nowrap text-xs">
                  {t.data}
                </td>
                <td className="px-2.5 py-[11px] border-b border-border">
                  <div className="font-medium">{t.descricao}</div>
                  <div className="text-[11px] text-muted">{t.banco ?? ""}</div>
                </td>
                <td className="px-2.5 py-[11px] border-b border-border text-xs text-muted">
                  {t.categoria ?? ""}
                </td>
                <td
                  className={`px-2.5 py-[11px] border-b border-border text-right font-bold ${
                    t.valor < 0 ? "text-teal" : "text-red"
                  }`}
                >
                  {formatBRL(Math.abs(t.valor))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

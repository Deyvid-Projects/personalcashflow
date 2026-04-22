import { formatBRL, pillClass, PILL_STYLES } from "@/lib/format"

type Row = {
  data: string
  descricao: string
  categoria: string
  tipo: string
  valor: number
}

export function ProjecoesTable({ data }: { data: Row[] }) {
  return (
    <div className="max-h-[320px] overflow-y-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {["Data", "Descrição", "Tipo"].map((h) => (
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
                Nenhuma projeção pendente
              </td>
            </tr>
          ) : (
            data.map((p, i) => {
              const variant = pillClass(p.tipo)
              return (
                <tr key={i} className="hover:bg-white/[.03] transition-colors">
                  <td className="px-2.5 py-[11px] border-b border-border text-muted whitespace-nowrap text-xs">
                    {p.data}
                  </td>
                  <td className="px-2.5 py-[11px] border-b border-border">
                    <div className="font-medium">{p.descricao}</div>
                    <div className="text-[11px] text-muted">{p.categoria}</div>
                  </td>
                  <td className="px-2.5 py-[11px] border-b border-border">
                    <span
                      className={`inline-block px-2.5 py-[3px] rounded-full text-[11px] font-semibold ${PILL_STYLES[variant]}`}
                    >
                      {p.tipo || "—"}
                    </span>
                  </td>
                  <td className="px-2.5 py-[11px] border-b border-border text-right text-red font-bold">
                    {formatBRL(p.valor)}
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

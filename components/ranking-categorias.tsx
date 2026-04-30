import { formatBRL } from "@/lib/format"

type Row = {
    categoria: string
    valor: number
}

export function RankingCategorias({ data }: { data: Row[] }) {
    if (!data.length) {
        return <div className="text-muted text-[13px] py-4 text-center">Sem dados no mês</div>
    }

    const max = data[0].valor
    const top = data.slice(0, 10)

    return (
        <div className="space-y-3">
            {top.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                    <div className="w-40 text-[13px] truncate" title={c.categoria}>
                        {c.categoria}
                    </div>
                    <div className="flex-1 h-2 rounded bg-muted/20 overflow-hidden">
                        <div
                            className="h-full rounded bg-gradient-to-r from-accent to-teal"
                            style={{ width: `${((c.valor / max) * 100).toFixed(1)}%` }}
                        />
                    </div>
                    <div className="w-20 text-right text-[13px]">
                        {formatBRL(c.valor)}
                    </div>
                </div>
            ))}
        </div>
    )
}
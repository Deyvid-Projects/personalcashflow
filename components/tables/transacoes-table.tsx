import { formatBRL } from "@/lib/format"

type Row = {
	data: string
	descricao: string
	categoria: string
	banco?: string
	valor: number
}

function ValuePill({ value }: { value: number }) {
	const isEntrada = value < 0 // regra atual do seu dashboard: negativo = receita
	const cls = isEntrada ? "pill pill-green" : "pill pill-red"
	const label = formatBRL(Math.abs(value))

	return (
		<span className={cls} style= minWidth: 92, justifyContent: "center" >
			{label}
		</span>
	)
}

export function TransacoesTable({ data }: { data: Row[] }) {
	return (
		<div className="max-h-[340px] overflow-y-auto">
			<table className="w-full border-collapse text-[13px]">
				<thead>
					<tr>
						{["Data", "Descrição", "Categoria"].map((h) => (
							<th
								key={h}
								className="text-left px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted border-b border-border sticky top-0 bg-card"
							>
								{h}
							</th>
						))}
						<th className="text-right px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted border-b border-border sticky top-0 bg-card">
							Valor
						</th>
					</tr>
				</thead>

				<tbody>
					{data.length === 0 ? (
						<tr>
							<td colSpan={4} className="text-center text-muted py-10 text-[13px]">
								Sem transações
							</td>
						</tr>
					) : (
						data.map((t, i) => (
							<tr
								key={i}
								className="transition-colors hover:bg-white/[.03]"
							>
								{/* Data */}
								<td className="px-3 py-3 border-b border-border text-muted whitespace-nowrap text-xs">
									{t.data}
								</td>

								{/* Descrição + banco */}
								<td className="px-3 py-3 border-b border-border">
									<div className="font-semibold tracking-tight">
										{t.descricao}
									</div>
									{t.banco ? (
										<div className="mt-0.5 text-[11px] text-muted">
											{t.banco}
										</div>
									) : null}
								</td>

								{/* Categoria */}
								<td className="px-3 py-3 border-b border-border text-xs text-muted">
									{t.categoria ?? ""}
								</td>

								{/* Valor */}
								<td className="px-3 py-3 border-b border-border text-right">
									<div className="flex justify-end">
										<ValuePill value={t.valor} />
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	)
}

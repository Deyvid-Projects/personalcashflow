import { formatBRL } from "@/lib/format"

type Variant = "receita" | "gasto" | "saldo" | "futuro"

const VARIANT_STYLES: Record<
	Variant,
	{
		valueClass: string
		accentClass: string
		pillClass: string
	}
> = {
	receita: {
		valueClass: "text-teal",
		accentClass: "bg-teal",
		pillClass: "pill pill-green",
	},
	gasto: {
		valueClass: "text-red",
		accentClass: "bg-red",
		pillClass: "pill pill-red",
	},
	saldo: {
		valueClass: "text-accent",
		accentClass: "bg-accent",
		pillClass: "pill pill-purple",
	},
	futuro: {
		valueClass: "text-yellow",
		accentClass: "bg-yellow",
		pillClass: "pill pill-yellow",
	},
}

type Props = {
	variant: Variant
	label: string
	value: number
	hint: string
	icon: string
}

export function KpiCard({ variant, label, value, hint, icon }: Props) {
	const v = VARIANT_STYLES[variant]

	return (
		<div className="card card-hover relative overflow-hidden p-5">
			{/* Accent rail (bem sutil, sem “gritar”) */}
			<div className={`absolute left-0 top-0 bottom-0 w-[4px] ${v.accentClass}`} />

			<div className="flex items-start justify-between gap-4">
				<div>
					<div className="text-[11px] font-semibold uppercase tracking-[1px] text-muted">
						{label}
					</div>

					<div
						className={`mt-2 text-[28px] font-extrabold tracking-tight leading-none ${v.valueClass}`}
					>
						{formatBRL(value)}
					</div>

					<div className="mt-2 text-[13px] text-muted">{hint}</div>
				</div>

				{/* Ícone como badge/pill (BudgetFlow-like) */}
				<div className={v.pillClass}>{icon}</div>
			</div>
		</div>
	)
}

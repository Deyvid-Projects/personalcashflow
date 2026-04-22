import { formatBRL } from "@/lib/format"

type Variant = "receita" | "gasto" | "saldo" | "futuro"

const VARIANT_STYLES: Record<Variant, { val: string; bar: string }> = {
  receita: { val: "text-teal",   bar: "bg-teal"   },
  gasto:   { val: "text-red",    bar: "bg-red"    },
  saldo:   { val: "text-accent", bar: "bg-accent" },
  futuro:  { val: "text-yellow", bar: "bg-yellow" },
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
    <div className="relative overflow-hidden bg-card border border-border rounded-card p-[22px_20px] transition-transform hover:-translate-y-[3px] hover:shadow-card">
      <div className="text-[11px] font-semibold uppercase tracking-[1px] text-muted mb-2.5">
        {label}
      </div>
      <div className={`text-[28px] font-extrabold tracking-tight leading-none ${v.val}`}>
        {formatBRL(value)}
      </div>
      <div className="text-xs text-muted mt-2">{hint}</div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl opacity-10 pointer-events-none">
        {icon}
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${v.bar}`} />
    </div>
  )
}
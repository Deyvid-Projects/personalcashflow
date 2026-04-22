export const formatBRL = (value: number | null | undefined): string =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value ?? 0)

export type PillVariant = "purple" | "teal" | "red" | "yellow"

export function pillClass(tipo?: string | null): PillVariant {
  if (!tipo) return "purple"
  const t = tipo.toLowerCase()
  if (t.includes("parcela")) return "purple"
  if (t.includes("recorrente")) return "teal"
  if (t.includes("pix") || t.includes("boleto") || t.includes("transfer"))
    return "yellow"
  return "red"
}

export const PILL_STYLES: Record<PillVariant, string> = {
  purple: "bg-accent/15 text-accent",
  teal:   "bg-teal/15 text-teal",
  red:    "bg-red/15 text-red",
  yellow: "bg-yellow/15 text-yellow",
}
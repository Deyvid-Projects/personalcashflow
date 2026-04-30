export function parseData(raw: unknown): Date | null {
  if (typeof raw !== "string") return null

  const ddmmyyyy = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (ddmmyyyy) {
    const [, d, m, y] = ddmmyyyy
    return new Date(Number(y), Number(m) - 1, Number(d))
  }

  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (iso) {
    const [, y, m, d] = iso
    return new Date(Number(y), Number(m) - 1, Number(d))
  }

  return null
}
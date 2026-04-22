type Props = { children: React.ReactNode }

export function SectionLabel({ children }: Props) {
  return (
    <div className="text-[13px] font-bold uppercase tracking-wider text-muted mb-3.5 flex items-center gap-2">
      <span>{children}</span>
      <span className="flex-1 h-px bg-border" />
    </div>
  )
}

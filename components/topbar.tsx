"use client"

type Props = {
  lastUpdate: string
  onRefresh: () => void
  isLoading: boolean
}

export function Topbar({ lastUpdate, onRefresh, isLoading }: Props) {
  return (
    <nav className="sticky top-0 z-[100] bg-surface border-b border-border flex items-center justify-between px-7 h-[60px]">
      <div className="flex items-center gap-2.5 text-base font-bold tracking-tight">
        <span className="text-[22px]">💰</span>
        Dashboard Financeiro
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <div className="w-[7px] h-[7px] rounded-full bg-teal animate-pulse-dot" />
          <span>{lastUpdate}</span>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent hover:bg-[#6a5fe0] text-white text-[13px] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "⏳ Carregando..." : "🔄 Atualizar"}
        </button>
      </div>
    </nav>
  )
}
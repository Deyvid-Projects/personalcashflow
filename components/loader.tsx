export function Loader({ show = true }: { show?: boolean }) {
  return (
    <div
      className={`fixed inset-0 bg-bg flex flex-col items-center justify-center gap-5 z-[9999] transition-opacity duration-[400ms] ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-11 h-11 rounded-full border-[3px] border-border border-t-accent animate-spin-slow" />
      <div className="text-muted text-[13px] tracking-wider">
        Conectando ao Google Sheets...
      </div>
    </div>
  )
}
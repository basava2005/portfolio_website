export default function Footer() {
  return (
    <footer
      className="relative z-10 px-6 sm:px-10 py-10 border-t border-white/10"
      data-testid="footer-root"
    >
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
          © 2026 Basavaraj H A
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
          Designed <span className="text-[#7cffd4]">&</span> Built by Basavaraj
        </div>
      </div>
    </footer>
  );
}

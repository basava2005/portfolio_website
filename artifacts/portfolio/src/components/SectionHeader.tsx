import Reveal from "./Reveal";

interface SectionHeaderProps {
  index: string;
  kicker: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ index, kicker, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-14 sm:mb-20 flex flex-col gap-3">
      <Reveal>
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
          <span className="text-[#7cffd4]">{index}</span>
          <span className="h-px flex-1 max-w-[120px] bg-white/10" />
          <span>{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-5xl sm:text-7xl text-white leading-none">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className="text-white/50 max-w-2xl text-base sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

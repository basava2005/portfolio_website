import Reveal from "./Reveal";
import { Github, Linkedin, Phone, Mail, ArrowUpRight } from "lucide-react";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/basavaraj-h-a",
    icon: Linkedin,
    handle: "/in/basavaraj-h-a",
  },
  {
    label: "GitHub",
    href: "https://github.com/basavarajha05",
    icon: Github,
    handle: "/basavarajha05",
  },
  {
    label: "Phone",
    href: "tel:+919353198281",
    icon: Phone,
    handle: "+91 93531 98281",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 sm:px-10 py-32 sm:py-48"
      data-testid="section-contact"
    >
      <div className="mx-auto max-w-5xl flex flex-col items-center text-center">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#7cffd4] mb-6">
            06 / Contact
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="font-display text-4xl sm:text-6xl text-white/80 leading-[1.05]">
            Have an idea, a role, or a wild project?
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-white/55 text-lg leading-relaxed">
            I'm available for full-time roles, internships, and freelance
            collaborations. The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <a
            href="mailto:basavarajha05@gmail.com"
            className="group mt-12 inline-flex items-center gap-3 sm:gap-5 font-display text-[10vw] sm:text-7xl lg:text-8xl text-gradient-brand hover:opacity-90 transition-opacity break-all sm:break-normal"
            data-testid="link-email"
          >
            <Mail className="h-10 w-10 sm:h-14 sm:w-14 text-[#7cffd4] flex-shrink-0" />
            basavarajha05@gmail.com
            <ArrowUpRight
              size={36}
              className="hidden sm:block text-[#7cffd4]/70 group-hover:text-[#7cffd4] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all flex-shrink-0"
            />
          </a>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-16 flex flex-wrap justify-center gap-3 sm:gap-4">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.02] px-5 py-3 hover:border-[#7cffd4]/50 hover:bg-[#7cffd4]/[0.05] transition-all"
                  data-testid={`link-social-${s.label.toLowerCase()}`}
                >
                  <Icon size={16} className="text-white/70 group-hover:text-[#7cffd4] transition-colors" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70 group-hover:text-white">
                    {s.handle}
                  </span>
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-20 font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">
            Yattinahalli · Hirekerur · Haveri · Karnataka · India
          </div>
        </Reveal>
      </div>
    </section>
  );
}

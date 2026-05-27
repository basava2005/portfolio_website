import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ExternalLink, Award } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Cert {
  id: number;
  name: string;
  issuer: string;
  description?: string | null;
  year?: string | null;
  fileUrl?: string | null;
  fileType?: string | null;
}

const staticCerts: Cert[] = [];

/* Decorative corner SVG */
function Corner({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="28" height="28" viewBox="0 0 28 28" fill="none"
      className={`text-current opacity-40 ${flip ? "rotate-180" : ""}`}
    >
      <path d="M2 2 L2 12 M2 2 L12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <path d="M6 6 L6 10 M6 6 L10 6" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  );
}

/* Seal / stamp */
function Seal({ year }: { year?: string | null }) {
  return (
    <div className="relative flex-shrink-0 w-16 h-16">
      <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full text-orange" fill="none">
        <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1" />
        <circle cx="32" cy="32" r="18" fill="currentColor" fillOpacity="0.12" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Award size={14} className="text-orange mb-0.5" />
        <span className="font-mono text-[7px] text-orange leading-none">{year ?? "—"}</span>
      </div>
    </div>
  );
}

function CertCard({ cert, index, onClick }: { cert: Cert; index: number; onClick: () => void }) {
  const hasFile = !!cert.fileUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={hasFile ? onClick : undefined}
      className={`relative group border-2 border-ink bg-cream overflow-hidden shadow-brutal ${hasFile ? "cursor-pointer" : ""}`}
      style={{ boxShadow: "4px 4px 0 #1a1a1a" }}
      data-testid={`cert-${index}`}
    >
      {/* Certificate-style top band */}
      <div className="bg-ink px-4 py-1.5 flex items-center justify-between">
        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-orange">
          Certificate of Completion
        </span>
        <span className="font-mono text-[8px] text-cream/50 tracking-[0.3em]">
          No.{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 relative">
        {/* Decorative double-rule border inset */}
        <div className="absolute inset-3 border border-ink/10 pointer-events-none" />
        <div className="absolute inset-[7px] border border-ink/5 pointer-events-none" />

        {/* Corners */}
        <div className="absolute top-3 left-3"><Corner /></div>
        <div className="absolute top-3 right-3 rotate-90"><Corner /></div>
        <div className="absolute bottom-3 left-3 -rotate-90"><Corner /></div>
        <div className="absolute bottom-3 right-3"><Corner flip /></div>

        {/* Content */}
        <div className="relative flex items-start gap-4">
          <div className="flex-1 min-w-0">
            {/* Ornamental divider */}
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-ink/20" />
              <span className="font-mono text-[8px] text-ink/30 uppercase tracking-[0.4em]">✦ awarded to ✦</span>
              <div className="h-px flex-1 bg-ink/20" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl uppercase leading-tight text-ink group-hover:text-ink transition-colors mb-3">
              {cert.name}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-ink/15" />
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="font-mono text-[8px] uppercase tracking-[0.35em] text-ink/40 mb-0.5">
                  Issued by
                </div>
                <div className="font-serif italic text-base text-ink/80">{cert.issuer}</div>
              </div>

              {hasFile && (
                <div className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.3em] text-orange group-hover:text-ink transition-colors border border-orange group-hover:border-ink px-2 py-1">
                  {cert.fileType === "application/pdf" ? <FileText size={10} /> : <ExternalLink size={10} />}
                  View
                </div>
              )}
            </div>
          </div>

          {/* Seal */}
          <div className="flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
            <Seal year={cert.year} />
          </div>
        </div>

        {/* Bottom ornamental strip */}
        <div className="mt-4 flex items-center gap-1.5">
          <div className="h-px flex-1 bg-orange/30" />
          <span className="text-orange text-[8px]">✦</span>
          <div className="h-px w-4 bg-orange/30" />
          <span className="text-orange text-[8px]">✦</span>
          <div className="h-px flex-1 bg-orange/30" />
        </div>
      </div>

      {/* Hover overlay shimmer */}
      <motion.div
        className="absolute inset-0 bg-orange pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.03 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

export default function Certifications() {
  const [certs, setCerts] = useState<Cert[]>(staticCerts);
  const [activeCert, setActiveCert] = useState<Cert | null>(null);

  useEffect(() => {
    fetch("/api/certificates")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d) && d.length > 0) setCerts(d);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="certifications"
      className="relative bg-cream lg:pl-16 xl:pl-20 py-24 sm:py-32"
      data-testid="certifications-root"
    >
      <div className="px-4 sm:px-8 lg:px-12">
        <SectionHeader
          number="05"
          kicker="Credentials"
          title={"Certifications"}
          subtitle="Receipts, in case you wanted to see them."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {certs.map((c, i) => (
            <CertCard
              key={c.id}
              cert={c}
              index={i}
              onClick={() => setActiveCert(c)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-ink/90 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
            onClick={() => setActiveCert(null)}
            data-testid="cert-preview-modal"
          >
            <motion.div
              initial={{ scale: 0.88, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-cream max-w-3xl w-full max-h-[90vh] overflow-auto border-2 border-ink"
              style={{ boxShadow: "6px 6px 0 #ff5c00" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="bg-ink text-cream px-5 py-3 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-0.5">
                    {activeCert.issuer} · {activeCert.year}
                  </div>
                  <div className="font-display text-xl uppercase">{activeCert.name}</div>
                </div>
                <button
                  onClick={() => setActiveCert(null)}
                  className="text-cream hover:text-orange transition-colors p-1"
                  data-testid="cert-preview-close"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="p-6">
                {activeCert.fileType?.startsWith("image/") && (
                  <img src={activeCert.fileUrl!} alt={activeCert.name} className="w-full border border-ink" />
                )}
                {activeCert.fileType === "application/pdf" && (
                  <iframe src={activeCert.fileUrl!} className="w-full h-[60vh] border border-ink" title={activeCert.name} />
                )}
                {activeCert.description && (
                  <p className="mt-4 font-serif text-lg text-ink/80 leading-relaxed">{activeCert.description}</p>
                )}
                {activeCert.fileUrl && (
                  <a
                    href={activeCert.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-orange hover:underline"
                  >
                    <ExternalLink size={12} /> Open in new tab
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

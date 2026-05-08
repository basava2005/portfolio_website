import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Image, ExternalLink } from "lucide-react";
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

const staticCerts: Cert[] = [
  { id: -1, name: "Full Stack Web Development", issuer: "Online Bootcamp", year: "2024" },
  { id: -2, name: "Python for Data Science", issuer: "IBM / Coursera", year: "2023" },
  { id: -3, name: "AI & Machine Learning Foundations", issuer: "Google", year: "2024" },
  { id: -4, name: "AUTOSAR Fundamentals", issuer: "Industry Training", year: "2025" },
];

function getFileIcon(fileType?: string | null) {
  if (!fileType) return null;
  if (fileType.startsWith("image/")) return <Image size={14} />;
  if (fileType === "application/pdf") return <FileText size={14} />;
  return <ExternalLink size={14} />;
}

export default function Certifications() {
  const [certs, setCerts] = useState<Cert[]>(staticCerts);
  const [preview, setPreview] = useState<Cert | null>(null);

  useEffect(() => {
    fetch("/api/certificates")
      .then((r) => r.json())
      .then((data: Cert[]) => {
        if (Array.isArray(data) && data.length > 0) setCerts(data);
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

        {/* Card grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-l border-ink">
          {certs.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`border-r border-b border-ink group hover:bg-ink hover:text-cream transition-colors ${
                c.fileUrl ? "cursor-pointer" : ""
              }`}
              onClick={() => c.fileUrl && setPreview(c)}
              data-testid={`cert-${i}`}
            >
              {/* Preview thumbnail if image */}
              {c.fileUrl && c.fileType?.startsWith("image/") && (
                <div className="aspect-[16/7] overflow-hidden border-b border-ink border-ink/15">
                  <img
                    src={c.fileUrl}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* PDF tile */}
              {c.fileUrl && c.fileType === "application/pdf" && (
                <div className="h-28 bg-ink/5 group-hover:bg-cream/10 border-b border-ink/15 flex items-center justify-center gap-3">
                  <FileText size={32} className="text-orange" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 group-hover:text-cream/60">
                    PDF Certificate
                  </span>
                </div>
              )}

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-2">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {c.fileUrl && (
                        <span className="flex items-center gap-1 text-ink/50 group-hover:text-cream/50">
                          {getFileIcon(c.fileType)}
                          <span>View</span>
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl uppercase leading-tight mb-1">
                      {c.name}
                    </h3>
                    <div className="font-sans text-sm text-ink/60 group-hover:text-cream/60">
                      {c.issuer}
                      {c.year && (
                        <span className="ml-2 font-mono text-[10px]">· {c.year}</span>
                      )}
                    </div>
                    {c.description && (
                      <p className="mt-2 font-sans text-sm text-ink/70 group-hover:text-cream/70 leading-relaxed">
                        {c.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / preview modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-ink/90 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setPreview(null)}
            data-testid="cert-preview-modal"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-cream max-w-3xl w-full max-h-[90vh] overflow-auto border border-ink shadow-brutal-orange"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-ink text-cream px-5 py-3 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange">
                    {preview.issuer} · {preview.year}
                  </div>
                  <div className="font-display text-xl uppercase">{preview.name}</div>
                </div>
                <button
                  onClick={() => setPreview(null)}
                  className="text-cream hover:text-orange transition-colors"
                  data-testid="cert-preview-close"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="p-6">
                {preview.fileType?.startsWith("image/") && (
                  <img
                    src={preview.fileUrl!}
                    alt={preview.name}
                    className="w-full border border-ink"
                  />
                )}
                {preview.fileType === "application/pdf" && (
                  <iframe
                    src={preview.fileUrl!}
                    className="w-full h-[60vh] border border-ink"
                    title={preview.name}
                  />
                )}
                {preview.description && (
                  <p className="mt-4 font-serif text-lg text-ink/80 leading-relaxed">
                    {preview.description}
                  </p>
                )}
                {preview.fileUrl && (
                  <a
                    href={preview.fileUrl}
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

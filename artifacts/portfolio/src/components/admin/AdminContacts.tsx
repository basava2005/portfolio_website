import { useEffect, useState } from "react";
import { Mail, Check, ChevronDown, ChevronUp } from "lucide-react";

interface Contact {
  id: number;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  read: boolean | null;
  createdAt: string | null;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contacts", { credentials: "include" });
      setContacts(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: number) => {
    await fetch(`/api/admin/contacts/${id}/read`, { method: "PATCH", credentials: "include" });
    setContacts((cs) => cs.map((c) => c.id === id ? { ...c, read: true } : c));
  };

  const unread = contacts.filter((c) => !c.read).length;

  return (
    <div data-testid="admin-contacts">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-1">
            Admin / Inbox
          </div>
          <h2 className="font-display text-4xl uppercase">
            Messages
            {unread > 0 && (
              <span className="ml-3 bg-orange text-ink font-mono text-sm px-2 py-0.5">{unread} new</span>
            )}
          </h2>
        </div>
        <button
          onClick={load}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 hover:text-ink transition-colors"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 py-12 text-center">
          Loading…
        </div>
      ) : contacts.length === 0 ? (
        <div className="border border-dashed border-ink/30 py-16 text-center">
          <Mail size={32} className="mx-auto text-ink/30 mb-3" />
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
            No messages yet.
          </div>
        </div>
      ) : (
        <div className="border border-ink divide-y divide-ink/15">
          {contacts.map((c) => (
            <div key={c.id} className={`${!c.read ? "bg-orange/8" : ""}`} data-testid={`contact-row-${c.id}`}>
              <button
                onClick={() => {
                  setExpanded(expanded === c.id ? null : c.id);
                  if (!c.read) markRead(c.id);
                }}
                className="w-full grid grid-cols-12 px-4 py-4 items-center text-left hover:bg-cream/50 transition-colors"
              >
                <div className="col-span-1">
                  {!c.read ? (
                    <span className="h-2 w-2 bg-orange rounded-full block" />
                  ) : (
                    <Check size={14} className="text-ink/30" />
                  )}
                </div>
                <div className="col-span-4 sm:col-span-3">
                  <div className="font-display text-lg uppercase truncate">{c.name}</div>
                  <div className="font-mono text-[10px] text-ink/50 truncate">{c.email}</div>
                </div>
                <div className="col-span-5 sm:col-span-6 font-sans text-sm text-ink/70 truncate hidden sm:block">
                  {c.subject || c.message.slice(0, 60)}
                </div>
                <div className="col-span-6 sm:col-span-2 flex items-center justify-end gap-2">
                  <span className="font-mono text-[9px] text-ink/40">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}
                  </span>
                  {expanded === c.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>

              {expanded === c.id && (
                <div className="px-4 sm:px-8 pb-6 border-t border-ink/10 bg-cream/30">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 font-mono text-[10px] uppercase tracking-[0.3em]">
                    <div>
                      <span className="text-ink/50 block mb-1">From</span>
                      <a href={`mailto:${c.email}`} className="text-orange hover:underline">{c.email}</a>
                    </div>
                    <div>
                      <span className="text-ink/50 block mb-1">Subject</span>
                      <span>{c.subject || "—"}</span>
                    </div>
                    <div>
                      <span className="text-ink/50 block mb-1">Received</span>
                      <span>{c.createdAt ? new Date(c.createdAt).toLocaleString() : "—"}</span>
                    </div>
                  </div>
                  <div className="font-serif text-lg leading-relaxed text-ink/85 border-l-4 border-orange pl-4 py-2 bg-cream/50">
                    {c.message}
                  </div>
                  <div className="mt-4">
                    <a
                      href={`mailto:${c.email}?subject=Re: ${encodeURIComponent(c.subject || "Your message")}`}
                      className="inline-flex items-center gap-2 bg-ink text-cream px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-orange hover:text-ink transition-colors"
                    >
                      <Mail size={12} /> Reply via Email
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

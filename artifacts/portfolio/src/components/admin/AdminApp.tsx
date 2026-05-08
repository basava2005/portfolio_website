import { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminCertificates from "./AdminCertificates";
import AdminContacts from "./AdminContacts";
import { LogOut, Award, Mail, ExternalLink } from "lucide-react";

type Tab = "contacts" | "certificates";

export default function AdminApp() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("contacts");

  useEffect(() => {
    fetch("/api/admin/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setAuthed(d.authed))
      .catch(() => setAuthed(false));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setAuthed(false);
  };

  if (authed === null) {
    return (
      <div className="min-h-screen bg-ink text-cream flex items-center justify-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange">Loading…</div>
      </div>
    );
  }

  if (!authed) {
    return <AdminLogin onLogin={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-cream text-ink font-sans" data-testid="admin-root">
      {/* Admin topbar */}
      <div className="fixed top-0 inset-x-0 z-50 bg-ink text-cream border-b border-ink">
        <div className="px-4 sm:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-display text-xl uppercase">
              B<span className="text-orange">·</span>A Admin
            </span>
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.3em] text-cream/50">
              / Dashboard
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60 hover:text-orange transition-colors"
            >
              <ExternalLink size={11} /> View Portfolio
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60 hover:text-orange transition-colors"
              data-testid="button-admin-logout"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="pt-12 flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-48 sm:w-56 flex-shrink-0 border-r border-ink bg-cream fixed left-0 top-12 bottom-0 overflow-y-auto">
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setTab("contacts")}
              className={`w-full flex items-center gap-3 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-left transition-colors ${
                tab === "contacts"
                  ? "bg-ink text-cream"
                  : "text-ink/60 hover:text-ink hover:bg-ink/5"
              }`}
              data-testid="tab-contacts"
            >
              <Mail size={14} /> Inbox
            </button>
            <button
              onClick={() => setTab("certificates")}
              className={`w-full flex items-center gap-3 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-left transition-colors ${
                tab === "certificates"
                  ? "bg-ink text-cream"
                  : "text-ink/60 hover:text-ink hover:bg-ink/5"
              }`}
              data-testid="tab-certificates"
            >
              <Award size={14} /> Certificates
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 ml-48 sm:ml-56 p-6 sm:p-10">
          {tab === "contacts" && <AdminContacts />}
          {tab === "certificates" && <AdminCertificates />}
        </main>
      </div>
    </div>
  );
}

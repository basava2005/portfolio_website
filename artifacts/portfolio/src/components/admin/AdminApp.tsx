import { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminCertificates from "./AdminCertificates";
import AdminContacts from "./AdminContacts";
import AdminHero from "./AdminHero";
import AdminAbout from "./AdminAbout";
import AdminExperience from "./AdminExperience";
import AdminProjects from "./AdminProjects";
import AdminAchievements from "./AdminAchievements";
import { LogOut, Mail, Award, User, Info, Briefcase, FolderOpen, Trophy, ExternalLink } from "lucide-react";

type Tab = "contacts" | "hero" | "about" | "experience" | "projects" | "achievements" | "certificates";

const tabs: { id: Tab; label: string; icon: any }[] = [
  { id: "contacts",     label: "Inbox",        icon: Mail },
  { id: "hero",         label: "Hero",          icon: User },
  { id: "about",        label: "About",         icon: Info },
  { id: "experience",   label: "Experience",    icon: Briefcase },
  { id: "projects",     label: "Projects",      icon: FolderOpen },
  { id: "achievements", label: "Achievements",  icon: Trophy },
  { id: "certificates", label: "Certificates",  icon: Award },
];

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

  const activeTab = tabs.find((t) => t.id === tab)!;

  return (
    <div className="min-h-screen bg-cream text-ink font-sans" data-testid="admin-root">
      {/* Topbar */}
      <div className="fixed top-0 inset-x-0 z-50 bg-ink text-cream border-b border-ink h-12 flex items-center px-4 sm:px-6 justify-between">
        <div className="flex items-center gap-4">
          <span className="font-display text-xl uppercase">
            B<span className="text-orange">·</span>A
            <span className="text-cream/50 text-base ml-2">Admin</span>
          </span>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.3em] text-orange">
            / {activeTab.label}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" rel="noreferrer"
            className="hidden sm:flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60 hover:text-orange transition-colors">
            <ExternalLink size={11} /> Portfolio
          </a>
          <button onClick={handleLogout}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60 hover:text-orange transition-colors"
            data-testid="button-admin-logout">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>

      <div className="pt-12 flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-44 sm:w-52 flex-shrink-0 border-r border-ink bg-cream fixed left-0 top-12 bottom-0 overflow-y-auto">
          <div className="px-3 pt-4 pb-2">
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/40 px-2 pb-2">Content</div>
          </div>
          <nav className="px-3 space-y-0.5">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-left transition-colors rounded-none ${
                    tab === t.id ? "bg-ink text-cream" : "text-ink/60 hover:text-ink hover:bg-ink/5"
                  }`}
                  data-testid={`tab-${t.id}`}>
                  <Icon size={13} />
                  {t.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 px-5">
            <div className="border-t border-ink/15 pt-4 font-mono text-[9px] uppercase tracking-[0.3em] text-ink/40 leading-relaxed">
              Portfolio CMS<br />
              B·A Admin Panel<br />
              2026
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 ml-44 sm:ml-52 p-6 sm:p-10 max-w-5xl">
          {tab === "contacts"     && <AdminContacts />}
          {tab === "hero"         && <AdminHero />}
          {tab === "about"        && <AdminAbout />}
          {tab === "experience"   && <AdminExperience />}
          {tab === "projects"     && <AdminProjects />}
          {tab === "achievements" && <AdminAchievements />}
          {tab === "certificates" && <AdminCertificates />}
        </main>
      </div>
    </div>
  );
}

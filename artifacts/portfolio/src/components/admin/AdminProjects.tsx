import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

interface Project {
  id: number;
  title: string;
  type?: string | null;
  blurb?: string | null;
  tags: string[];
  accent?: string | null;
  link?: string | null;
  sortOrder?: number | null;
}

const emptyForm = { title: "", type: "", blurb: "", tags: "", accent: "orange", link: "", sortOrder: 0 };

export default function AdminProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/projects", { credentials: "include" });
      setItems(await r.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditId(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (p: Project) => {
    setEditId(p.id);
    setForm({ title: p.title, type: p.type ?? "", blurb: p.blurb ?? "", tags: p.tags.join(", "), accent: p.accent ?? "orange", link: p.link ?? "", sortOrder: p.sortOrder ?? 0 });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) };
      const url = editId != null ? `/api/admin/projects/${editId}` : "/api/admin/projects";
      const method = editId != null ? "PATCH" : "POST";
      const r = await fetch(url, { method, credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (r.ok) { setShowForm(false); load(); }
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE", credentials: "include" });
    load();
  };

  const accentColors: Record<string, string> = { orange: "bg-orange", navy: "bg-navy", amber: "bg-amber" };

  return (
    <div data-testid="admin-projects">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-1">Admin / Projects</div>
          <h2 className="font-display text-4xl uppercase">Projects</h2>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-orange text-ink px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] hover:bg-orange/90 transition-colors">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 py-12 text-center">Loading…</div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-ink/30 py-16 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">No projects yet.</div>
        </div>
      ) : (
        <div className="border border-ink">
          <div className="bg-ink text-cream grid grid-cols-12 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em]">
            <div className="col-span-1">Color</div>
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-3">Tags</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          {items.map((p) => (
            <div key={p.id} className="grid grid-cols-12 px-4 py-4 border-t border-ink/15 items-center hover:bg-cream/50 transition-colors" data-testid={`project-row-${p.id}`}>
              <div className="col-span-1">
                <span className={`inline-block h-3 w-3 ${accentColors[p.accent ?? "orange"] ?? "bg-orange"}`} />
              </div>
              <div className="col-span-4">
                <div className="font-display text-lg uppercase">{p.title}</div>
                {p.blurb && <div className="font-sans text-xs text-ink/60 line-clamp-1 mt-0.5">{p.blurb}</div>}
              </div>
              <div className="col-span-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">{p.type}</div>
              <div className="col-span-3 flex flex-wrap gap-1">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="font-mono text-[9px] border border-ink/30 px-1 py-0.5 uppercase">{t}</span>
                ))}
                {p.tags.length > 3 && <span className="font-mono text-[9px] text-ink/40">+{p.tags.length - 3}</span>}
              </div>
              <div className="col-span-2 flex items-center justify-end gap-2">
                <button onClick={() => openEdit(p)} className="p-2 hover:text-orange transition-colors"><Edit2 size={15} /></button>
                <button onClick={() => handleDelete(p.id)} className="p-2 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-ink/80 flex items-center justify-center p-4">
          <div className="bg-cream text-ink w-full max-w-xl border border-ink shadow-brutal-orange max-h-[90vh] overflow-y-auto">
            <div className="bg-ink text-cream px-5 py-3 flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange">{editId != null ? "Edit" : "New"} Project</div>
              <button onClick={() => setShowForm(false)}><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {([
                { label: "Project Title *", key: "title", placeholder: "AI Resume Analyzer" },
                { label: "Type", key: "type", placeholder: "Feature / Side Project / Industry" },
                { label: "Tags (comma separated)", key: "tags", placeholder: "React, FastAPI, OpenAI" },
                { label: "Link / URL", key: "link", placeholder: "https://github.com/…" },
              ] as const).map((f) => (
                <label key={f.key} className="block">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-1">{f.label}</span>
                  <input type="text" value={(form as any)[f.key]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full border-b border-ink bg-transparent outline-none font-display text-xl uppercase py-1 placeholder:text-ink/25"
                    data-testid={`input-project-${f.key}`} />
                </label>
              ))}
              <label className="block">
                <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-1">Description</span>
                <textarea rows={3} value={form.blurb}
                  onChange={(e) => setForm((p) => ({ ...p, blurb: e.target.value }))}
                  placeholder="Short description of the project…"
                  className="w-full border border-ink bg-transparent outline-none font-serif text-base p-2 resize-none"
                  data-testid="input-project-blurb" />
              </label>
              <label className="block">
                <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-2">Accent Color</span>
                <div className="flex gap-3">
                  {["orange","navy","amber"].map((c) => (
                    <button key={c} type="button"
                      onClick={() => setForm((p) => ({ ...p, accent: c }))}
                      className={`flex items-center gap-2 px-3 py-2 border font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${form.accent === c ? "border-ink bg-ink text-cream" : "border-ink/30 hover:border-ink"}`}>
                      <span className={`h-3 w-3 ${accentColors[c]}`} /> {c}
                    </button>
                  ))}
                </div>
              </label>
              <label className="block">
                <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-1">Display Order</span>
                <input type="number" value={form.sortOrder}
                  onChange={(e) => setForm((p) => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))}
                  className="w-24 border-b border-ink bg-transparent outline-none font-display text-xl py-1" />
              </label>
            </div>
            <div className="px-6 pb-6 flex items-center justify-between">
              <button onClick={() => setShowForm(false)} className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 hover:text-ink transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title}
                className="flex items-center gap-2 bg-ink text-cream px-5 py-3 font-mono text-xs uppercase tracking-[0.3em] hover:bg-orange hover:text-ink transition-colors disabled:opacity-50"
                data-testid="button-save-project">
                <Check size={16} /> {saving ? "Saving…" : editId != null ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

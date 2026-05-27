import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, X, Check } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  tag?: string | null;
  blurb?: string | null;
  icon?: string | null;
  sortOrder?: number | null;
}

const emptyForm = { title: "", tag: "", blurb: "", icon: "trophy", sortOrder: 0 };

export default function AdminAchievements() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/achievements", { credentials: "include" });
      const data = await r.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load achievements:", err);
      setItems([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditId(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (a: Achievement) => {
    setEditId(a.id);
    setForm({ title: a.title, tag: a.tag ?? "", blurb: a.blurb ?? "", icon: a.icon ?? "trophy", sortOrder: a.sortOrder ?? 0 });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editId != null ? `/api/admin/achievements/${editId}` : "/api/admin/achievements";
      const method = editId != null ? "PATCH" : "POST";
      const r = await fetch(url, { method, credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (r.ok) { setShowForm(false); load(); }
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this achievement?")) return;
    await fetch(`/api/admin/achievements/${id}`, { method: "DELETE", credentials: "include" });
    load();
  };

  const iconOptions = ["trophy","globe","star","award","zap","heart"];

  return (
    <div data-testid="admin-achievements">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-1">Admin / Achievements</div>
          <h2 className="font-display text-4xl uppercase">Achievements</h2>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-orange text-ink px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] hover:bg-orange/90 transition-colors">
          <Plus size={16} /> Add Achievement
        </button>
      </div>

      {loading ? (
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 py-12 text-center">Loading…</div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-ink/30 py-16 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">No achievements yet.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((a) => (
            <div key={a.id} className="border border-ink" data-testid={`achievement-row-${a.id}`}>
              <div className="bg-ink text-cream px-4 py-3 flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em]">
                  {a.tag} · {a.icon}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(a)} className="text-cream hover:text-orange transition-colors p-1"><Edit2 size={14} /></button>
                  <button onClick={() => handleDelete(a.id)} className="text-cream hover:text-red-400 transition-colors p-1"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-2xl uppercase mb-2">{a.title}</h3>
                {a.blurb && <p className="font-sans text-sm text-ink/70 leading-relaxed">{a.blurb}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-ink/80 flex items-center justify-center p-4">
          <div className="bg-cream text-ink w-full max-w-lg border border-ink shadow-brutal-orange max-h-[90vh] overflow-y-auto">
            <div className="bg-ink text-cream px-5 py-3 flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange">{editId != null ? "Edit" : "New"} Achievement</div>
              <button onClick={() => setShowForm(false)}><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {([
                { label: "Title *", key: "title", placeholder: "Hackathon Winner" },
                { label: "Tag / Category", key: "tag", placeholder: "Trophy / Award / Community" },
              ] as const).map((f) => (
                <label key={f.key} className="block">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-1">{f.label}</span>
                  <input type="text" value={(form as any)[f.key]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full border-b border-ink bg-transparent outline-none font-display text-2xl uppercase py-1 placeholder:text-ink/25"
                    data-testid={`input-ach-${f.key}`} />
                </label>
              ))}
              <label className="block">
                <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-1">Description</span>
                <textarea rows={3} value={form.blurb}
                  onChange={(e) => setForm((p) => ({ ...p, blurb: e.target.value }))}
                  placeholder="Describe this achievement…"
                  className="w-full border border-ink bg-transparent outline-none font-serif text-base p-2 resize-none"
                  data-testid="input-ach-blurb" />
              </label>
              <label className="block">
                <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-2">Icon</span>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map((ic) => (
                    <button key={ic} type="button"
                      onClick={() => setForm((p) => ({ ...p, icon: ic }))}
                      className={`px-3 py-2 border font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${form.icon === ic ? "border-ink bg-ink text-cream" : "border-ink/30 hover:border-ink"}`}>
                      {ic}
                    </button>
                  ))}
                </div>
              </label>
            </div>
            <div className="px-6 pb-6 flex items-center justify-between">
              <button onClick={() => setShowForm(false)} className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 hover:text-ink transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title}
                className="flex items-center gap-2 bg-ink text-cream px-5 py-3 font-mono text-xs uppercase tracking-[0.3em] hover:bg-orange hover:text-ink transition-colors disabled:opacity-50"
                data-testid="button-save-ach">
                <Check size={16} /> {saving ? "Saving…" : editId != null ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

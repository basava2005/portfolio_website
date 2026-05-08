import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, X, Check, GripVertical } from "lucide-react";

interface Experience {
  id: number;
  role: string;
  company: string;
  companyNote?: string | null;
  period: string;
  location?: string | null;
  type?: string | null;
  bullets: string[];
  sortOrder?: number | null;
}

const emptyForm = { role: "", company: "", companyNote: "", period: "", location: "", type: "", bullets: [""], sortOrder: 0 };

export default function AdminExperience() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/experiences", { credentials: "include" });
      setItems(await r.json());
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditId(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (e: Experience) => {
    setEditId(e.id);
    setForm({ role: e.role, company: e.company, companyNote: e.companyNote ?? "", period: e.period, location: e.location ?? "", type: e.type ?? "", bullets: e.bullets.length ? e.bullets : [""], sortOrder: e.sortOrder ?? 0 });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = { ...form, bullets: form.bullets.filter((b) => b.trim()) };
      const url = editId != null ? `/api/admin/experiences/${editId}` : "/api/admin/experiences";
      const method = editId != null ? "PATCH" : "POST";
      const r = await fetch(url, { method, credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (r.ok) { setShowForm(false); load(); }
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this experience?")) return;
    await fetch(`/api/admin/experiences/${id}`, { method: "DELETE", credentials: "include" });
    load();
  };

  const updateBullet = (i: number, val: string) => setForm((p) => ({ ...p, bullets: p.bullets.map((b, idx) => idx === i ? val : b) }));
  const addBullet = () => setForm((p) => ({ ...p, bullets: [...p.bullets, ""] }));
  const removeBullet = (i: number) => setForm((p) => ({ ...p, bullets: p.bullets.filter((_, idx) => idx !== i) }));

  return (
    <div data-testid="admin-experience">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-1">Admin / Experience</div>
          <h2 className="font-display text-4xl uppercase">Experience</h2>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-orange text-ink px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] hover:bg-orange/90 transition-colors">
          <Plus size={16} /> Add Role
        </button>
      </div>

      {loading ? (
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 py-12 text-center">Loading…</div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-ink/30 py-16 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">No experience entries yet.</div>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((e) => (
            <div key={e.id} className="border border-ink bg-cream" data-testid={`exp-row-${e.id}`}>
              <div className="bg-ink text-cream px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange">{e.type} · {e.period}</div>
                  <div className="font-display text-2xl uppercase">{e.role}</div>
                  <div className="font-display text-lg text-orange">{e.company}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(e)} className="p-2 text-cream hover:text-orange transition-colors"><Edit2 size={15} /></button>
                  <button onClick={() => handleDelete(e.id)} className="p-2 text-cream hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
                </div>
              </div>
              {e.bullets.length > 0 && (
                <ul className="divide-y divide-ink/10">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 px-4 py-3">
                      <span className="font-mono text-[10px] text-orange mt-1">0{i+1}</span>
                      <span className="text-sm text-ink/80">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-ink/80 flex items-center justify-center p-4">
          <div className="bg-cream text-ink w-full max-w-2xl border border-ink shadow-brutal-orange max-h-[90vh] overflow-y-auto">
            <div className="bg-ink text-cream px-5 py-3 flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange">{editId != null ? "Edit" : "New"} Experience</div>
              <button onClick={() => setShowForm(false)}><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {([
                  { label: "Role / Position *", key: "role", placeholder: "Software Engineering Intern" },
                  { label: "Company *", key: "company", placeholder: "Luxoft" },
                  { label: "Company Note", key: "companyNote", placeholder: "A DXC Technology Co." },
                  { label: "Period *", key: "period", placeholder: "2024 — Now" },
                  { label: "Location", key: "location", placeholder: "Remote · India" },
                  { label: "Type", key: "type", placeholder: "Internship" },
                ] as const).map((f) => (
                  <label key={f.key} className="block">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-1">{f.label}</span>
                    <input type="text" value={(form as any)[f.key]}
                      onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full border-b border-ink bg-transparent outline-none font-display text-xl uppercase py-1 placeholder:text-ink/25"
                      data-testid={`input-exp-${f.key}`} />
                  </label>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">Bullet Points</span>
                  <button onClick={addBullet} className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-orange hover:text-ink transition-colors"><Plus size={12} /> Add</button>
                </div>
                <div className="space-y-2">
                  {form.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-orange w-5">0{i+1}</span>
                      <input type="text" value={b} onChange={(e) => updateBullet(i, e.target.value)}
                        placeholder="Describe what you did…"
                        className="flex-1 border-b border-ink/30 bg-transparent outline-none font-sans text-sm py-1 placeholder:text-ink/25 focus:border-ink"
                        data-testid={`input-exp-bullet-${i}`} />
                      <button onClick={() => removeBullet(i)} className="text-ink/30 hover:text-red-500"><X size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 flex items-center justify-between">
              <button onClick={() => setShowForm(false)} className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 hover:text-ink transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.role || !form.company || !form.period}
                className="flex items-center gap-2 bg-ink text-cream px-5 py-3 font-mono text-xs uppercase tracking-[0.3em] hover:bg-orange hover:text-ink transition-colors disabled:opacity-50"
                data-testid="button-save-exp">
                <Check size={16} /> {saving ? "Saving…" : editId != null ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Save, RefreshCw, Plus, X } from "lucide-react";

interface AboutSettings {
  bio1: string;
  bio2: string;
  bio3: string;
  skills: string[];
  facts: Array<{ k: string; v: string }>;
}

const defaults: AboutSettings = {
  bio1: "",
  bio2: "",
  bio3: "",
  skills: [],
  facts: [],
};

export default function AdminAbout() {
  const [form, setForm] = useState<AboutSettings>(defaults);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => { if (d.about) setForm({ ...defaults, ...d.about }); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/settings/about", {
        method: "PUT", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: form }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally { setSaving(false); }
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setForm((p) => ({ ...p, skills: [...p.skills, newSkill.trim()] }));
    setNewSkill("");
  };

  const removeSkill = (i: number) =>
    setForm((p) => ({ ...p, skills: p.skills.filter((_, idx) => idx !== i) }));

  const updateFact = (i: number, key: "k" | "v", val: string) =>
    setForm((p) => ({ ...p, facts: p.facts.map((f, idx) => idx === i ? { ...f, [key]: val } : f) }));

  const addFact = () => setForm((p) => ({ ...p, facts: [...p.facts, { k: "", v: "" }] }));
  const removeFact = (i: number) => setForm((p) => ({ ...p, facts: p.facts.filter((_, idx) => idx !== i) }));

  return (
    <div data-testid="admin-about">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-1">Admin / About</div>
          <h2 className="font-display text-4xl uppercase">About Section</h2>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-ink text-cream px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] hover:bg-orange hover:text-ink transition-colors disabled:opacity-50"
          data-testid="button-save-about">
          {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Bio paragraphs */}
        <div className="border border-ink">
          <div className="bg-ink text-cream px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em]">Bio Paragraphs</div>
          {(["bio1","bio2","bio3"] as const).map((key, i) => (
            <label key={key} className="grid grid-cols-12 border-t border-ink/15 items-start">
              <span className="col-span-1 px-3 py-3 font-mono text-[10px] text-ink/50 bg-ink/5 border-r border-ink h-full flex items-start pt-3">P{i+1}</span>
              <textarea className="col-span-11 px-4 py-3 bg-transparent outline-none font-serif text-base leading-relaxed resize-none"
                rows={3} value={form[key]}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                data-testid={`input-about-${key}`} />
            </label>
          ))}
        </div>

        {/* Fact sheet */}
        <div className="border border-ink">
          <div className="bg-ink text-cream px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] flex justify-between items-center">
            <span>Fact Sheet</span>
            <button onClick={addFact} className="flex items-center gap-1 text-orange hover:text-cream transition-colors"><Plus size={12} /> Add Row</button>
          </div>
          {form.facts.map((f, i) => (
            <div key={i} className="grid grid-cols-12 border-t border-ink/15 items-center">
              <input className="col-span-4 px-3 py-3 bg-transparent outline-none font-mono text-[10px] uppercase tracking-[0.3em] border-r border-ink/15 placeholder:text-ink/25"
                value={f.k} onChange={(e) => updateFact(i, "k", e.target.value)} placeholder="Label" />
              <input className="col-span-7 px-3 py-3 bg-transparent outline-none font-display text-lg uppercase placeholder:text-ink/25"
                value={f.v} onChange={(e) => updateFact(i, "v", e.target.value)} placeholder="Value" />
              <button onClick={() => removeFact(i)} className="col-span-1 flex justify-center text-ink/30 hover:text-red-500 transition-colors p-3"><X size={14} /></button>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="border border-ink">
          <div className="bg-ink text-cream px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em]">Toolbox / Skills</div>
          <div className="p-4 flex flex-wrap gap-2">
            {form.skills.map((s, i) => (
              <span key={i} className="flex items-center gap-1 border border-ink px-2 py-1 font-display text-sm uppercase">
                {s}
                <button onClick={() => removeSkill(i)} className="text-ink/40 hover:text-red-500 ml-1"><X size={11} /></button>
              </span>
            ))}
          </div>
          <div className="border-t border-ink/15 flex items-center">
            <input
              className="flex-1 px-4 py-3 bg-transparent outline-none font-display text-lg uppercase placeholder:text-ink/25"
              value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
              placeholder="Add skill… (press Enter)"
              data-testid="input-about-newskill" />
            <button onClick={addSkill} className="px-4 py-3 border-l border-ink/15 text-ink/50 hover:text-orange transition-colors"><Plus size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

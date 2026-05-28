import { useEffect, useRef, useState } from "react";
import { Save, RefreshCw, Upload, X, Camera } from "lucide-react";

interface HeroSettings {
  name: string;
  tagline: string;
  bio: string;
  available: boolean;
  availableText: string;
  location: string;
  linkedin?: string;
  github?: string;
  stat1Label: string; stat1Value: string;
  stat2Label: string; stat2Value: string;
  stat3Label: string; stat3Value: string;
}

const defaults: HeroSettings = {
  name: "",
  tagline: "",
  bio: "",
  available: false,
  availableText: "",
  location: "",
  linkedin: "",
  github: "",
  stat1Label: "", stat1Value: "",
  stat2Label: "", stat2Value: "",
  stat3Label: "", stat3Value: "",
};

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export default function AdminHero() {
  const [form, setForm] = useState<HeroSettings>(defaults);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const photoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/settings", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.hero) setForm({ ...defaults, ...d.hero });
        if (d.profile_photo && typeof d.profile_photo === "string") setPhotoUrl(d.profile_photo);
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/settings/hero", {
        method: "PUT", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: form }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally { setSaving(false); }
  };

  const handlePhotoUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) { setUploadMsg("Only image files are supported."); return; }
    setUploading(true);
    setUploadMsg("Processing…");
    try {
      const base64 = await fileToBase64(file);
      setUploadMsg("Saving…");
      await fetch("/api/admin/settings/profile_photo", {
        method: "PUT", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: base64 }),
      });
      setPhotoUrl(base64);
      setUploadMsg("Photo saved!");
      setTimeout(() => setUploadMsg(""), 2500);
    } catch (err) {
      setUploadMsg("Save failed. Try again.");
    } finally { setUploading(false); }
  };

  const removePhoto = async () => {
    await fetch("/api/admin/settings/profile_photo", {
      method: "PUT", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: null }),
    });
    setPhotoUrl(null);
  };

  const set = (k: keyof HeroSettings, v: any) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div data-testid="admin-hero">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-1">Admin / Hero</div>
          <h2 className="font-display text-4xl uppercase">Hero Section</h2>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-ink text-cream px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] hover:bg-orange hover:text-ink transition-colors disabled:opacity-50"
          data-testid="button-save-hero">
          {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Profile Photo */}
      <div className="border border-ink mb-6">
        <div className="bg-ink text-cream px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
          <Camera size={12} /> Profile Photo
        </div>
        <div className="p-4 flex items-center gap-6">
          {/* Preview */}
          <div className="relative flex-shrink-0">
            {photoUrl ? (
              <div className="relative">
                <img src={photoUrl} alt="Profile" className="h-24 w-24 object-cover border-2 border-ink" style={{ borderRadius: 0 }} />
                <button
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Remove photo"
                >
                  <X size={11} />
                </button>
              </div>
            ) : (
              <div className="h-24 w-24 border-2 border-dashed border-ink/30 flex items-center justify-center text-ink/30">
                <Camera size={28} />
              </div>
            )}
          </div>

          {/* Upload controls */}
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-3">
              Shown in the sidebar. Click it on the portfolio to expand fullscreen.
            </p>
            <input
              ref={photoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(f); e.target.value = ""; }}
            />
            <button
              onClick={() => photoRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 border border-ink px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-ink hover:text-cream transition-colors disabled:opacity-50"
              data-testid="button-upload-photo"
            >
              <Upload size={13} />
              {uploading ? "Uploading…" : photoUrl ? "Replace Photo" : "Upload Photo"}
            </button>
            {uploadMsg && (
              <div className={`mt-2 font-mono text-[10px] uppercase tracking-[0.3em] ${uploadMsg.includes("failed") ? "text-red-500" : "text-orange"}`}>
                {uploadMsg}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero text fields */}
      <div className="space-y-0 border border-ink">
        {([
          { label: "Full Name", key: "name", placeholder: "Basavaraj H A" },
          { label: "Tagline / Role", key: "tagline", placeholder: "Full Stack Developer & AI Enthusiast" },
          { label: "Location", key: "location", placeholder: "Karnataka, India" },
          { label: "Status Badge Text", key: "availableText", placeholder: "Available for Opportunities · Intern @ Luxoft" },
        ] as const).map((f) => (
          <label key={f.key} className="grid grid-cols-12 border-b border-ink items-center">
            <span className="col-span-3 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 bg-ink/5 border-r border-ink h-full flex items-center">{f.label}</span>
            <input
              className="col-span-9 px-4 py-3 bg-transparent outline-none font-display text-xl uppercase placeholder:text-ink/25"
              value={(form as any)[f.key]}
              onChange={(e) => set(f.key as keyof HeroSettings, e.target.value)}
              placeholder={f.placeholder}
              data-testid={`input-hero-${f.key}`}
            />
          </label>
        ))}

        <label className="grid grid-cols-12 border-b border-ink items-start">
          <span className="col-span-3 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 bg-ink/5 border-r border-ink">Bio Text</span>
          <textarea
            className="col-span-9 px-4 py-3 bg-transparent outline-none font-serif text-base leading-relaxed resize-none placeholder:text-ink/25"
            rows={4} value={form.bio}
            onChange={(e) => set("bio", e.target.value)}
            placeholder="Your intro paragraph…"
            data-testid="input-hero-bio"
          />
        </label>

        <label className="grid grid-cols-12 border-b border-ink items-center">
          <span className="col-span-3 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 bg-ink/5 border-r border-ink">Available</span>
          <div className="col-span-9 px-4 py-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => set("available", !form.available)}
              className={`relative h-6 w-12 rounded-none transition-colors ${form.available ? "bg-orange" : "bg-ink/20"}`}
              data-testid="toggle-hero-available"
            >
              <span className={`absolute top-1 h-4 w-4 bg-ink transition-all ${form.available ? "left-7" : "left-1"}`} />
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
              {form.available ? "Showing as available" : "Hidden"}
            </span>
          </div>
        </label>

        <div className="grid grid-cols-12 border-b border-ink">
          <label className="col-span-6 border-r border-ink flex flex-col">
            <span className="px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 bg-ink/5 border-b border-ink">LinkedIn URL</span>
            <input
              className="px-4 py-3 bg-transparent outline-none font-display text-lg uppercase placeholder:text-ink/25"
              value={form.linkedin}
              onChange={(e) => set("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/…"
            />
          </label>
          <label className="col-span-6 flex flex-col">
            <span className="px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 bg-ink/5 border-b border-ink">GitHub URL</span>
            <input
              className="px-4 py-3 bg-transparent outline-none font-display text-lg uppercase placeholder:text-ink/25"
              value={form.github}
              onChange={(e) => set("github", e.target.value)}
              placeholder="https://github.com/…"
            />
          </label>
        </div>

        <div className="col-span-12 px-4 py-2 bg-ink/5 border-b border-ink">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange">Stats / Counters</div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-ink border-b border-ink">
          {(["1","2","3"] as const).map((n) => (
            <div key={n} className="p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-2">Stat {n}</div>
              <input className="w-full bg-transparent outline-none font-display text-3xl uppercase mb-1 placeholder:text-ink/20"
                value={(form as any)[`stat${n}Value`]} onChange={(e) => set(`stat${n}Value` as any, e.target.value)}
                placeholder="10+" data-testid={`input-hero-stat${n}value`} />
              <input className="w-full bg-transparent outline-none font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 placeholder:text-ink/20"
                value={(form as any)[`stat${n}Label`]} onChange={(e) => set(`stat${n}Label` as any, e.target.value)}
                placeholder="Label" data-testid={`input-hero-stat${n}label`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

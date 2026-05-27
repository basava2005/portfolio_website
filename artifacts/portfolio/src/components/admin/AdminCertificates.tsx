import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, Edit2, X, Check, Upload, FileText, Image } from "lucide-react";

interface Cert {
  id: number;
  name: string;
  issuer: string;
  description?: string | null;
  year?: string | null;
  fileUrl?: string | null;
  fileType?: string | null;
}

const emptyForm = { name: "", issuer: "", description: "", year: "", fileUrl: "", fileType: "" };

async function requestUploadUrl(): Promise<{ uploadURL: string; objectPath: string }> {
  const res = await fetch("/api/admin/storage/request-url", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to get upload URL");
  return res.json();
}

async function uploadToGcs(file: File, uploadURL: string): Promise<void> {
  const res = await fetch(uploadURL, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!res.ok) throw new Error("Upload failed");
}

export default function AdminCertificates() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/certificates", { credentials: "include" });
      const data = await res.json();
      setCerts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load certificates:", err);
      setCerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleFile = async (file: File) => {
    setUploading(true);
    setUploadProgress("Getting upload URL…");
    try {
      const { uploadURL, objectPath } = await requestUploadUrl();
      setUploadProgress("Uploading file…");
      await uploadToGcs(file, uploadURL);
      const fileUrl = `/api/storage/objects${objectPath}`;
      setForm((f) => ({ ...f, fileUrl, fileType: file.type }));
      setUploadProgress("Uploaded!");
      setTimeout(() => setUploadProgress(""), 2000);
    } catch (err) {
      setUploadProgress("Upload failed");
      setTimeout(() => setUploadProgress(""), 3000);
    } finally {
      setUploading(false);
    }
  };

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (c: Cert) => {
    setEditId(c.id);
    setForm({
      name: c.name,
      issuer: c.issuer,
      description: c.description ?? "",
      year: c.year ?? "",
      fileUrl: c.fileUrl ?? "",
      fileType: c.fileType ?? "",
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = {
        name: form.name,
        issuer: form.issuer,
        description: form.description || undefined,
        year: form.year || undefined,
        fileUrl: form.fileUrl || undefined,
        fileType: form.fileType || undefined,
      };
      const url = editId != null
        ? `/api/admin/certificates/${editId}`
        : "/api/admin/certificates";
      const method = editId != null ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setShowForm(false);
        load();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this certificate?")) return;
    await fetch(`/api/admin/certificates/${id}`, { method: "DELETE", credentials: "include" });
    load();
  };

  return (
    <div data-testid="admin-certificates">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange mb-1">
            Admin / Certificates
          </div>
          <h2 className="font-display text-4xl uppercase">Certifications</h2>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-orange text-ink px-4 py-3 font-mono text-xs uppercase tracking-[0.3em] hover:bg-orange/90 transition-colors"
          data-testid="button-add-cert"
        >
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      {loading ? (
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 py-12 text-center">
          Loading…
        </div>
      ) : certs.length === 0 ? (
        <div className="border border-dashed border-ink/30 py-16 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
            No certificates yet. Add your first one.
          </div>
        </div>
      ) : (
        <div className="border border-ink">
          <div className="bg-ink text-cream grid grid-cols-12 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em]">
            <div className="col-span-1">File</div>
            <div className="col-span-5">Name</div>
            <div className="col-span-3">Issuer</div>
            <div className="col-span-1">Year</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          {certs.map((c) => (
            <div key={c.id} className="grid grid-cols-12 px-4 py-4 border-t border-ink/15 items-center hover:bg-cream/50 transition-colors" data-testid={`cert-row-${c.id}`}>
              <div className="col-span-1">
                {c.fileUrl && c.fileType?.startsWith("image/") && (
                  <img src={c.fileUrl} alt="" className="h-10 w-14 object-cover border border-ink/20" />
                )}
                {c.fileUrl && c.fileType === "application/pdf" && (
                  <FileText size={24} className="text-orange" />
                )}
                {c.fileUrl && c.fileType?.includes("svg") && (
                  <Image size={24} className="text-orange" />
                )}
              </div>
              <div className="col-span-5">
                <div className="font-display text-lg uppercase">{c.name}</div>
                {c.description && (
                  <div className="font-sans text-xs text-ink/60 mt-0.5 line-clamp-1">{c.description}</div>
                )}
              </div>
              <div className="col-span-3 font-sans text-sm text-ink/70">{c.issuer}</div>
              <div className="col-span-1 font-mono text-xs">{c.year ?? "—"}</div>
              <div className="col-span-2 flex items-center justify-end gap-2">
                <button onClick={() => openEdit(c)} className="p-2 hover:text-orange transition-colors" data-testid={`button-edit-cert-${c.id}`}>
                  <Edit2 size={15} />
                </button>
                <button onClick={() => handleDelete(c.id)} className="p-2 hover:text-red-500 transition-colors" data-testid={`button-delete-cert-${c.id}`}>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-ink/80 flex items-center justify-center p-4">
          <div className="bg-cream text-ink w-full max-w-lg border border-ink shadow-brutal-orange max-h-[90vh] overflow-y-auto">
            <div className="bg-ink text-cream px-5 py-3 flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-orange">
                {editId != null ? "Edit Certificate" : "New Certificate"}
              </div>
              <button onClick={() => setShowForm(false)}><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Certificate Name *", key: "name", placeholder: "e.g. Full Stack Web Development" },
                { label: "Issuer *", key: "issuer", placeholder: "e.g. Coursera / Google" },
                { label: "Year", key: "year", placeholder: "2024" },
              ].map((f) => (
                <label key={f.key} className="block">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-1">{f.label}</span>
                  <input
                    type="text"
                    value={(form as any)[f.key]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full border-b border-ink bg-transparent outline-none font-display text-2xl uppercase py-1 placeholder:text-ink/25"
                    data-testid={`input-cert-${f.key}`}
                  />
                </label>
              ))}
              <label className="block">
                <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-1">Description</span>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Short description of what this certificate covers…"
                  className="w-full border border-ink bg-transparent outline-none font-sans text-base p-2 resize-none"
                  data-testid="input-cert-description"
                />
              </label>

              {/* File upload */}
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 mb-2">
                  Certificate File (JPEG · PNG · SVG · PDF)
                </span>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.svg,.pdf,image/jpeg,image/png,image/svg+xml,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                  data-testid="input-cert-file"
                />
                {form.fileUrl ? (
                  <div className="border border-ink p-3 flex items-center justify-between bg-ink/5">
                    <div className="flex items-center gap-2">
                      {form.fileType?.startsWith("image/") ? <Image size={18} className="text-orange" /> : <FileText size={18} className="text-orange" />}
                      <span className="font-mono text-[10px] truncate max-w-[180px]">File uploaded</span>
                    </div>
                    <button onClick={() => setForm((p) => ({ ...p, fileUrl: "", fileType: "" }))} className="text-ink/50 hover:text-red-500">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="w-full border border-dashed border-ink flex items-center justify-center gap-3 py-5 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 hover:border-orange hover:text-orange transition-colors disabled:opacity-50"
                    data-testid="button-upload-file"
                  >
                    <Upload size={18} />
                    {uploading ? uploadProgress || "Uploading…" : "Click to upload file"}
                  </button>
                )}
                {uploadProgress && !uploading && (
                  <p className="mt-1 font-mono text-[10px] text-orange">{uploadProgress}</p>
                )}
              </div>
            </div>

            <div className="px-6 pb-6 flex items-center justify-between">
              <button
                onClick={() => setShowForm(false)}
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 hover:text-ink transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.issuer}
                className="flex items-center gap-2 bg-ink text-cream px-5 py-3 font-mono text-xs uppercase tracking-[0.3em] hover:bg-orange hover:text-ink transition-colors disabled:opacity-50"
                data-testid="button-save-cert"
              >
                <Check size={16} />
                {saving ? "Saving…" : editId != null ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

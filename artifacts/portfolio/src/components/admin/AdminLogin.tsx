import { useState } from "react";
import { Lock, ArrowUpRight } from "lucide-react";

interface Props {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onLogin();
      } else {
        setError("Wrong password");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink text-cream flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange mb-3">
          Admin / Login
        </div>
        <h1 className="font-display text-6xl uppercase mb-12">Access</h1>

        <form onSubmit={handleSubmit} className="border border-cream/20 bg-ink shadow-brutal-orange">
          <div className="bg-cream/5 px-5 py-3 border-b border-cream/15 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em]">
            <Lock size={12} className="text-orange" /> Secure Login
          </div>
          <div className="p-5">
            <label className="block mb-6">
              <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60 mb-2">
                Admin Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-cream/30 focus:border-orange outline-none font-display text-2xl py-2 uppercase transition-colors"
                data-testid="input-admin-password"
                autoFocus
              />
            </label>
            {error && (
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-400 mb-4">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-between bg-orange text-ink px-5 py-4 font-mono text-xs uppercase tracking-[0.3em] hover:bg-orange/90 transition-colors disabled:opacity-60"
              data-testid="button-admin-login"
            >
              <span>{loading ? "Checking…" : "Enter"}</span>
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        </form>

        <a
          href="/"
          className="mt-6 block text-center font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40 hover:text-cream transition-colors"
        >
          ← Back to portfolio
        </a>
      </div>
    </div>
  );
}

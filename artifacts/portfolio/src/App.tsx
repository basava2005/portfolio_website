import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StatusSticker from "@/components/StatusSticker";
import Marquee from "@/components/Marquee";
import Cursor from "@/components/Cursor";
import AdminApp from "@/components/admin/AdminApp";

const isAdmin = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");
const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

function Portfolio() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="relative min-h-screen bg-cream text-ink font-sans" data-testid="app-root">
      {!isTouchDevice && <Cursor />}
      <Loader onFinish={() => setLoading(false)} />
      {!loading && (
        <>
          <Topbar />
          <Sidebar />
          <main className="relative">
            <Hero />
            <Marquee />
            <About />
            <Experience />
            <Projects />
            <Achievements />
            <Certifications />
            <Contact />
          </main>
          <Footer />
          <StatusSticker />
        </>
      )}
    </div>
  );
}

export default function App() {
  if (isAdmin) return <AdminApp />;
  return <Portfolio />;
}

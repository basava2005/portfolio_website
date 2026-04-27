import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";
import AvailabilityBadge from "@/components/AvailabilityBadge";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.classList.add("hide-native-cursor");
    document.body.classList.add("grain");
    return () => {
      document.body.classList.remove("hide-native-cursor");
      document.body.classList.remove("grain");
    };
  }, []);

  return (
    <div className="relative min-h-screen text-foreground" data-testid="app-root">
      <Loader onFinish={() => setLoading(false)} />
      {!loading && <ParticlesBackground />}
      <Cursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <AvailabilityBadge />
    </div>
  );
}

export default App;

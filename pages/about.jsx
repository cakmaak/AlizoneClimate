import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";

export default function AboutPage() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.paused) {
      const p = v.play();
      if (p?.catch) p.catch(() => {});
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 🔝 HERO VIDEO */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/Alizone_iklimlendirme.mp4" type="video/mp4" />
        </video>

        {/* overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10">
          <Navbar variant="hero" />
        </div>

        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <div className="text-white max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-200">
              
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold">
             
            </h1>
            <p className="text-slate-200">
              
            </p>
          </div>
        </div>
      </section>

      {/* 📄 İÇERİK */}
      <main className="container py-16 space-y-16">
        <section className="grid gap-10 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-800">
              Alizone İklimlendirme
            </h2>
            <p className="text-slate-600">
              Enerji verimli çözümler, hızlı montaj ve yaygın servis ağımızla
              konforu garanti ediyoruz.
            </p>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-2 bg-white rounded-full shadow">
                Ücretsiz keşif
              </span>
              <span className="px-3 py-2 bg-white rounded-full shadow">
                Garanti & bakım
              </span>
              <span className="px-3 py-2 bg-white rounded-full shadow">
                Profesyonel montaj
              </span>
            </div>
          </div>

          {/* 📷 FOTOĞRAF (KALDIRMADIK) */}
          <div className="rounded-3xl overflow-hidden shadow-soft">
        
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

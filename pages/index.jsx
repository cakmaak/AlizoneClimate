import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.paused) {
      const attempt = v.play();
      if (attempt?.catch) attempt.catch(() => {});
    }
  }, []);

  const activityAreas = [
    {
      title: "Klimalar",
      image:
        "https://res.cloudinary.com/diyibvvua/image/upload/v1766052267/A_cozy_indoor_scene_featuring_children_playing_in_a_living_room._The_focus_is_on_a_modern_split_air_conditioner_prominently_mounted_on_the_wall._The_room_is_bright_with_natural_light_and_the_children_are_engaged_i_omgds1.jpg",
      href: "/products",
    },
    {
      title: "Mobil Klimalar",
      image:
        "https://res.cloudinary.com/diyibvvua/image/upload/v1766047423/A_portable_air_conditioner_in_a_modern_living_room_showing_the_appliance_working_quietly_and_efficiently._The_room_is_bright_and_airy_with_green_plants_in_the_background._s3a3zl.jpg",
      href: "/mobile-products",
    },
    {
      title: "Multi Split Klima",
      image:
        "https://res.cloudinary.com/diyibvvua/image/upload/v1766047574/A_modern_multi_split_air_conditioning_system_installed_in_a_bright_open_plan_living_area._The_indoor_units_are_mounted_on_the_walls_showcasing_a_sleek_design_with_sunlight_streaming_through_large_windows_and_decor_m0zyww.jpg",
      href: "/products",
    },
    {
      title: "Isı Pompası",
      image:
        "https://res.cloudinary.com/diyibvvua/image/upload/v1766052360/%C4%B1s%C4%B1pompasiiii_dve5gm.jpg",
      href: "/products",
    },
  ];

  return (
    <>
      {/* ✅ SEO HEAD */}
      <Head>
        <title>Ankara Klima Satışı | Alizone Klima - Satış & Montaj</title>
        <meta
          name="description"
          content="Alizone Klima Ankara'da klima satışı, montaj ve ücretsiz keşif hizmeti sunar. Split, mobil, multi klima ve ısı pompası çözümleri."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.alizoneklima.com/" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <main className="space-y-16">
          {/* HERO */}
          <section className="relative isolate min-h-screen w-full overflow-hidden bg-slate-900">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/Homepagevideo.mp4" type="video/mp4" />
            </video>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/40" />

            <div className="absolute top-0 left-0 right-0 z-20">
              <Navbar variant="hero" />
            </div>

            <div className="relative z-10 flex h-full items-center justify-center px-6 py-24">
              <div className="text-center text-white space-y-5 max-w-4xl">
                <p className="text-sm uppercase tracking-[0.28em] text-emerald-200/90">
                  Alizone
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow">
                  Ankara Klima Satış Noktası ve Profesyonel Montaj Hizmeti
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-slate-100/90 max-w-2xl mx-auto">
                  Alizone Klima olarak <strong>Ankara klima satışı</strong>{" "}
                  alanında konut ve iş yerleri için güvenilir çözümler sunuyoruz.
                  Ücretsiz keşif, profesyonel montaj ve satış sonrası destekle
                  yanınızdayız.
                </p>

                <div className="flex items-center justify-center gap-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-emerald-500/30 hover:brightness-110 transition"
                  >
                    Ürünleri İncele
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* HİZMETLER */}
          <section className="container py-16">
            <div className="text-center space-y-3 mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">
                Faaliyet Alanlarımız
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                Hizmetlerimiz
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                İklimlendirme alanında geniş hizmet yelpazemizle yanınızdayız.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {activityAreas.map((area) => (
                <Link
                  key={area.title}
                  href={area.href}
                  className="group relative rounded-2xl bg-gray-50 shadow-soft hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-200"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={area.image}
                      alt={`Ankara ${area.title} satışı ve montaj hizmeti`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110 opacity-95 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800/50 via-slate-800/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg">
                        {area.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* REFERANSLAR */}
          <section className="container py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.2em] text-primary">
                  Referanslarımız
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                  Güvenilir Hizmet, Memnun Müşteriler
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Yıllardır sektörde edindiğimiz tecrübe ve müşteri memnuniyeti
                  odaklı hizmet anlayışımızla yüzlerce projede başarıyla hizmet
                  verdik.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Enerji verimli sistemler, zamanında teslimat ve kaliteli
                  işçilik prensibiyle çalışıyoruz.
                </p>
              </div>

              <div className="relative group cursor-pointer">
                <div className="relative h-64 md:h-80 overflow-hidden rounded-2xl shadow-soft transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl bg-slate-100">
                  <img
                    src="https://res.cloudinary.com/diyibvvua/image/upload/v1765709315/referans_flfxhq.webp"
                    alt="Ankara klima montaj referans projeleri"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

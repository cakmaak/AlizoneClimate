import Link from "next/link";

export default function Footer() {
  const keywords = [
    { text: "Klima Satın Al", href: "/products" },
    { text: "Klima Fiyatları", href: "/products" },
    { text: "Klima Modelleri", href: "/products" },
    { text: "Split Klima", href: "/products" },
    { text: "Inverter Klima", href: "/products" },
    { text: "Multi Split Klima", href: "/products?type=multi-split" },
    { text: "Ankara Klima Satışı", href: "/products" },
    { text: "Ankara Klima Satın al", href: "/contact" },
    { text: "Sincan Klima Satın al", href: "/contact" },
    { text: "Sincan Klima Satışı", href: "/contact" },
    { text: "Bosch Klima Modelleri", href: "/products" },
    { text: "Bosch Klima Satın Al", href: "/products" },
    { text: "Sakura Klima Modelleri", href: "/products" },
    { text: "Klima Montajı", href: "/contact" },
    { text: "Klima Bakımı", href: "/contact" },
    { text: "Klima Tamiri", href: "/contact" },
    { text: "Klima Gaz Dolumu", href: "/contact" },
    { text: "Klima Montajı", href: "/contact" },
    { text: "Klima Bakımı", href: "/contact" },
    { text: "Klima Tamiri", href: "/contact" },
    { text: "Ticari Klima", href: "/products?type=ticari" },




  ];

  return (
    <footer id="contact" className="bg-slate-900 text-slate-200 mt-16">
      <div className="container py-12 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">Alizone İklimlendirme</h3>
          <p className="text-sm text-slate-400 mt-3">
            Profesyonel klima satış, montaj ve bakım hizmetleri. Konforlu ve verimli iklimlendirme çözümleri için bize ulaşın.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">İletişim</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Telefon: <a className="text-white font-semibold" href="tel:+905542309563">0 (554) 230 95 63</a></li>
            <li>Email: <a className="text-white font-semibold" href="mailto:alizoneteknoloji@hotmail.com">alizoneteknoloji@hotmail.com</a></li>
            <li>Adres: Ahi evran mahallesi 225 cadde F blok no:61 Sincan/Ankara</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Sosyal</h4>
          <div className="mt-3 flex gap-3">
            {["facebook", "instagram", "linkedin"].map((platform) => (
              <a
                key={platform}
                href="https://www.instagram.com/alizoneklima"
                aria-label={platform}
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                {platform[0].toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">

        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-1 text-xs text-slate-500 mb-2 px-4">
            {keywords.map((keyword, index) => (
              <Link
                key={index}
                href={keyword.href}
                className="underline hover:text-slate-300 transition-colors text-left"
              >
                {keyword.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center text-xs text-slate-400">
        <p className="mt-2">
    <a
      href="https://www.google.com/maps/place/Alizone+%C4%B0klimlendirme/@39.9666147,32.5596828,17z/data=!3m1!4b1!4m6!3m5!1s0x14d33b552a1e520b:0x4be019ec2776dacd!8m2!3d39.9666147!4d32.5622577!16s%2Fg%2F11mslqwtrp?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
      target="_blank"
      rel="noopener noreferrer"
      className="text-emerald-600 hover:underline font-medium"
    >
      Ankara Klima Satış noktası | Google Maps

    </a>
  </p>
  <p className="text-xs text-slate-500 mt-3">
Ankara ve Sincan bölgesinde klima satışı, montajı ve teknik servis
hizmetleri sunan Alizone İklimlendirme.
</p>
          © {new Date().getFullYear()} Alizone İklimlendirme. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}


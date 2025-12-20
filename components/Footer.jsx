import Link from "next/link";

export default function Footer() {
  const keywords = [
    { text: "klima satın al", href: "/products" },
    { text: "klima", href: "/products" },
    { text: "klima montaj", href: "/products" },
    { text: "klima bakım", href: "/contact" },
    { text: "klima keşif", href: "/contact" },
    { text: "klima servis", href: "/contact" },
    { text: "split klima", href: "/products" },
    { text: "inverter klima", href: "/products" },
    { text: "klima fiyat", href: "/products" },
    { text: "klima montajı", href: "/products" },
    { text: "klima servisi", href: "/contact" },
    { text: "alizone klima", href: "/products" },
    { text: "klima satış", href: "/products" },
    { text: "klima al", href: "/products" },
    { text: "klima cihazı", href: "/products" },
    { text: "klima sistemi", href: "/products" },
    { text: "klima markaları", href: "/products" },
    { text: "klima modelleri", href: "/products" },
    { text: "klima kurulum", href: "/products" },
    { text: "klima onarım", href: "/contact" },
    { text: "klima temizlik", href: "/contact" },
    { text: "klima filtre", href: "/products" },
    { text: "klima gaz dolumu", href: "/contact" },
    { text: "klima kombi", href: "/products" },
    { text: "klima yedek parça", href: "/products" },
    { text: "iklimlendirme", href: "/products" },
    { text: "soğutma sistemleri", href: "/products" },
    { text: "ısıtma soğutma", href: "/products" },
    { text: "klima fiyatları", href: "/products" },
    { text: "klima kampanya", href: "/products" },
    { text: "klima indirim", href: "/products" },
    { text: "klima garantili", href: "/products" },
    { text: "profesyonel klima", href: "/products" },
    { text: "klima uzmanı", href: "/contact" },
    { text: "klima teknik servis", href: "/contact" },
    { text: "ankara klima", href: "/products" },
  { text: "ankara klima satış", href: "/products" },
  { text: "ankara klima fiyatları", href: "/products" },
  { text: "ankara klima servisi", href: "/contact" },
  { text: "ankara klima montaj", href: "/contact" },
  { text: "ankara klima bakım", href: "/contact" },

  { text: "sincan klima", href: "/products" },
  { text: "sincan klima satış", href: "/products" },
  { text: "sincan klima fiyatları", href: "/products" },
  { text: "sincan klima servisi", href: "/contact" },
  { text: "sincan klima montaj", href: "/contact" },
  { text: "sincan klima bakım", href: "/contact" },
  { text: "sincan klima keşif", href: "/contact" },

  { text: "ankara sincan klima", href: "/products" },
  { text: "ankara sincan klima servisi", href: "/contact" },
  { text: "ankara sincan klima montaj", href: "/contact" },
  { text: "ankara sincan klima satış", href: "/products" },

  { text: "sincan split klima", href: "/products" },
  { text: "sincan inverter klima", href: "/products" },
  { text: "sincan salon tipi klima", href: "/products" },
  { text: "sincan kaset tipi klima", href: "/products" },

  { text: "ankara split klima", href: "/products" },
  { text: "ankara inverter klima", href: "/products" },

  { text: "sincan klima teknik servis", href: "/contact" },
  { text: "sincan klima tamiri", href: "/contact" },
  { text: "sincan klima onarım", href: "/contact" },
  { text: "sincan klima gaz dolumu", href: "/contact" },

  { text: "ankara klima teknik servis", href: "/contact" },
  { text: "ankara klima tamiri", href: "/contact" },

  { text: "yakınımdaki klima servisi sincan", href: "/contact" },
  { text: "sincan klima ustası", href: "/contact" },
  { text: "ankara sincan klima ustası", href: "/contact" },

  { text: "alizone klima ankara", href: "/products" },
  { text: "alizone klima sincan", href: "/products" },
  { text: "multi split klima", href: "/products" }
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
                href="#"
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
          © {new Date().getFullYear()} Alizone İklimlendirme. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}


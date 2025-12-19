import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container py-16 space-y-16">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">İletişim</p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Bize Ulaşın</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Sorularınız, randevu talepleriniz veya destek ihtiyacınız için bizimle iletişime geçebilirsiniz.
          </p>
        </div>

        <section className="bg-white rounded-3xl shadow-soft p-10 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Destek</p>
            <h4 className="text-2xl font-bold text-slate-800">Montaj & Servis Randevusu</h4>
            <p className="text-slate-600">
              Aynı gün ücretsiz keşif, hızlı teslimat ve satış sonrası bakım için ekibimizle iletişime geçin.
            </p>
            <div className="space-y-4 mt-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Telefon</p>
                <a href="tel:+903462111111" className="text-lg font-semibold text-slate-800 hover:text-primary transition-colors">
                  0 (554) 230 95 63
                </a>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">E-posta</p>
                <a href="mailto:yusuf612844@gmail.com" className="text-lg font-semibold text-slate-800 hover:text-primary transition-colors">
                  alizoneklima@gmail.com
                </a>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Adres</p>
                <p className="text-lg font-semibold text-slate-800">Sincan/Ankara, Türkiye</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="tel:+903462111111"
              className="rounded-xl bg-primary text-white font-semibold py-3 text-center shadow-soft hover:brightness-105 transition"
            >
              Hemen Ara
            </a>
            <a
              href="mailto:yusuf612844@gmail.com"
              className="rounded-xl border border-primary text-primary font-semibold py-3 text-center hover:bg-primary/5 transition"
            >
              Mail Gönder
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


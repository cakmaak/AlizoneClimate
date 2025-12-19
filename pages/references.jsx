import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function References() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container py-16">
        <div className="text-center space-y-3 mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Referanslarımız</p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Sizden Gelenler</h1>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Müşterilerimizden aldığımız geri bildirimler ve referanslar, hizmet kalitemizin en önemli göstergesi. 
            Binlerce memnun müşterimizle birlikte büyüyor, her projede daha iyisini hedefliyoruz.
          </p>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Aşağıda müşterilerimizin bizimle yaşadıkları deneyimleri ve projelerimizden örnekleri görebilirsiniz.
          </p>
        </div>

        <section className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Müşteri Görüşleri</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6 py-4">
                <p className="text-slate-700 italic mb-3">
                  "Alizone İklimlendirme ile çalıştığım için çok memnunum. Profesyonel ekip, zamanında teslimat ve 
                  kaliteli işçilik. Klima montajından sonraki servis desteği de mükemmel. Kesinlikle tavsiye ederim."
                </p>
                <p className="text-sm text-slate-600 font-semibold">- Ahmet Y., Ankara</p>
              </div>
              
              <div className="border-l-4 border-primary pl-6 py-4">
                <p className="text-slate-700 italic mb-3">
                  "Ofisimize yaptırdığımız klima sisteminden çok memnunuz. Enerji tasarrufu sağladık ve konforlu bir 
                  çalışma ortamı oluşturduk. Alizone ekibine teşekkürler."
                </p>
                <p className="text-sm text-slate-600 font-semibold">- Ayşe K., Sincan</p>
              </div>

              <div className="border-l-4 border-primary pl-6 py-4">
                <p className="text-slate-700 italic mb-3">
                  "Ücretsiz keşif hizmeti sunmaları çok hoşuma gitti. Uygun fiyat ve kaliteli hizmet. Klima bakım 
                  hizmetlerini de düzenli olarak kullanıyorum. Herkese tavsiye ediyorum."
                </p>
                <p className="text-sm text-slate-600 font-semibold">- Mehmet D., Ankara</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Projelerimizden Görüntüler</h2>
            <div className="relative rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
              <video
                className="w-full h-auto max-h-[70vh]"
                controls
                autoPlay
                muted
                loop
              >
                <source src="/1%20(online-video-cutter.com).mp4" type="video/mp4" />
                Tarayıcınız video oynatmayı desteklemiyor.
              </video>
            </div>
            <p className="text-sm text-slate-500 text-center mt-4">
              Projelerimizden ve müşteri memnuniyetinden kareler
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


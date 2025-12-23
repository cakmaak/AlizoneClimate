import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
//import localProducts from "../ClimatePanelJson/products.json";

const DATA_URL = "https://raw.githubusercontent.com/cakmaak/ClimateProductsJson/main/products.json";

async function loadProducts() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`Remote fetch failed with status ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch (error) {
    console.error("Remote product fetch failed, using local data instead", error);
  }
  return localProducts;
}

const mobileSlides = [
  {
    title: "Taşınabilir Konfor",
    subtitle: "Kurulum gerektirmeyen, her mekana uygun mobil klima çözümleri. Pratik ve verimli iklimlendirme.",
    image: "https://res.cloudinary.com/diyibvvua/image/upload/v1765621328/mobilklima_nteifk.webp"
  },
  {
    title: "Kolay Kullanım",
    subtitle: "Tak çalıştır özelliği ile anında soğutma. Hızlı kurulum, pratik kullanım ve yüksek performans.",
    image: "https://res.cloudinary.com/diyibvvua/image/upload/v1765621328/mob6_dtynwi.webp"
  },
  {
    title: "Her Yerde Konfor",
    subtitle: "Ev, ofis, yazlık veya herhangi bir mekan. Mobil klima ile istediğiniz yerde serinleyin.",
    image: "https://res.cloudinary.com/diyibvvua/image/upload/v1765621328/mob4_tylc42.webp"
  }
];

export default function MobileProductsPage({ products }) {
  const preparedProducts = useMemo(() => {
    const isMobileType = (value) => {
      if (!value || typeof value !== "string") return false;
      return value.toLowerCase().replace(/\s+/g, " ").trim().includes("mobil");
    };

    return products
      .filter((product) => {
        const rawType = product.type || product.category || product.product_type;
        return isMobileType(rawType);
      })
      .map((product) => ({
        ...product,
        image: (product.images && product.images[0]) || product.image || "https://via.placeholder.com/600x400?text=Klima"
      }));
  }, [products]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="space-y-16">
        <div className="container pt-10">
          <section className="bg-white">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{ 
                delay: 4500, 
                disableOnInteraction: false
              }}
              loop
              pagination={{ clickable: true }}
              navigation
              className="h-[60vh] md:h-[80vh] rounded-3xl overflow-hidden shadow-soft bg-slate-100"
            >
              {mobileSlides.map((slide, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative h-full w-full flex items-center justify-center">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-auto object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 container pb-8 md:pb-12 text-white pointer-events-none">
                      <div className="max-w-2xl space-y-4">
                        <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Mobil Klima</p>
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">{slide.title}</h1>
                        <p className="text-base md:text-lg text-sky-100">{slide.subtitle}</p>
                        <a
                          href="#products"
                          className="inline-flex w-fit px-6 py-3 rounded-full bg-white text-slate-900 font-semibold shadow-lg hover:scale-[1.02] transition pointer-events-auto"
                        >
                          Ürünleri İncele
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </div>

        <ProductGrid 
          products={preparedProducts} 
          title="Mobil Klima Modelleri"
          description="Taşınabilir, kurulum gerektirmeyen mobil klima çözümleri. Her mekana uygun pratik iklimlendirme seçenekleri."
        />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const products = await loadProducts();

  return {
    props: { products }
    // ❌ revalidate SİLİNDİ
  };
}

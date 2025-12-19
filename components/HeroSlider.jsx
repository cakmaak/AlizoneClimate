import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const slides = [
  {
    title: "Profesyonel Klima Satış & Montaj Hizmetleri",
    subtitle: "Enerji verimli çözümler, uzman keşif ve garantili montaj.",
    image: "https://res.cloudinary.com/diyibvvua/image/upload/v1765461785/A_stylish_and_contemporary_living_room_featuring_a_dark_color_scheme._The_air_conditioning_unit_should_be_prominently_displayed_on_the_wall._The_room_includes_elegant_furniture_with_rich_colors_such_as_deep_navy_o_vwdl22.jpg"
  },
  {
    title: "Konforun Yeni Adresi",
    subtitle: "Tüm marka ve modellerde rekabetçi fiyatlar ve hızlı teslimat.",
    image: "https://res.cloudinary.com/diyibvvua/image/upload/v1765461888/A_modern_showroom_showcasing_a_prominent_air_conditioning_unit_on_display._The_room_should_have_a_sleek_industrial_design_with_high_ceilings_and_large_windows_allowing_natural_light._Various_models_of_air_conditio_sqnapu.jpg"
  },
  {
    title: "İklimlendirmede Uzman Kadro",
    subtitle: "Ücretsiz keşif, servis ve bakım randevuları için hemen arayın.",
    image: "https://res.cloudinary.com/diyibvvua/image/upload/v1765461570/A_sleek_and_modern_bedroom_featuring_a_clearly_visible_air_conditioning_unit_on_the_wall._The_room_has_a_minimalist_design_with_soft_lighting_a_comfortable_bed_adorned_with_decorative_pillows_and_a_few_stylish_pla_chromc.jpg"
  }
];

export default function HeroSlider() {
  return (
    <section id="home" className="bg-white">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        navigation
        className="h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-soft"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="relative h-full w-full flex items-center"
              style={{
                backgroundImage: `linear-gradient(120deg, rgba(15,23,42,0.55), rgba(15,23,42,0.25)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="container text-white">
                <div className="max-w-2xl space-y-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Alizone İklimlendirme</p>
                  <h1 className="text-3xl md:text-5xl font-bold leading-tight">{slide.title}</h1>
                  <p className="text-base md:text-lg text-sky-100">{slide.subtitle}</p>
                  <a
                    href="#products"
                    className="inline-flex w-fit px-6 py-3 rounded-full bg-white text-slate-900 font-semibold shadow-lg hover:scale-[1.02] transition"
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
  );
}


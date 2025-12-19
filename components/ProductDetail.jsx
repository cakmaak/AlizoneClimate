import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function ProductDetail({ product, onClose }) {
  if (!product) return null;

  const [otherFeaturesOpen, setOtherFeaturesOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  // Görseller
  const gallery = useMemo(() => {
    const imgs = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
    if (imgs.length === 0 && product.image) imgs.push(product.image);
    if (imgs.length === 0) imgs.push("https://via.placeholder.com/900x600?text=Klima+Gorseli");
    return imgs;
  }, [product]);

  // Normalize değerler
  const normalizedValues = useMemo(() => ({
    btusCooling: product.btus_cooling ?? product.capacity?.cooling_btu ?? null,
    btusHeating: product.btus_heating ?? product.capacity?.heating_btu ?? null,
    energyRating: product.energy_rating ?? product.energy?.cooling_class ?? product.energy?.heating_class ?? null,
    noiseIndoor: product.noise_indoor_db ?? product.other_features?.noise_levels_db?.indoor_cooling ?? product.other_features?.noise_levels_db?.indoor_heating ?? null,
    noiseOutdoor: product.noise_outdoor_db ?? product.other_features?.noise_levels_db?.outdoor_cooling ?? product.other_features?.noise_levels_db?.outdoor_heating ?? null,
    recommendedRoom: product.recommended_room_m2 ?? product.other_features?.recommended_room_m2 ?? null,
    refrigerant: product.refrigerant?.type || product.refrigerant || product.other_features?.refrigerant || product.refrigerant_type || "—",
    warranty: product.warranty ?? (product.warranty_months ? `${product.warranty_months} Ay Garanti` : product.other_features?.warranty) ?? "—"
  }), [product]);

  // Öne çıkan bilgiler
  const infoHighlights = useMemo(() => {
    const items = [
      { label: "Enerji", value: normalizedValues.energyRating },
      { label: "Soğutma", value: normalizedValues.btusCooling ? `${normalizedValues.btusCooling} BTU` : null },
      { label: "Isıtma", value: normalizedValues.btusHeating ? `${normalizedValues.btusHeating} BTU` : null },
      { label: "Alan", value: normalizedValues.recommendedRoom ? `${normalizedValues.recommendedRoom} m²` : null },
      { label: "Ses (İç)", value: normalizedValues.noiseIndoor ? `${normalizedValues.noiseIndoor} dB` : null },
      { label: "Garanti", value: normalizedValues.warranty !== "—" ? normalizedValues.warranty : null }
    ];
    return items.filter((item) => item.value);
  }, [normalizedValues]);

  const priceText = product.price ? `${Number(product.price).toLocaleString("tr-TR")} ₺` : "";

  // Marka logoları
  const brandName = (product.brand || "").toLowerCase();
  const isBosch = brandName.includes("bosch");
  const isSakura = brandName.includes("sacura") || brandName.includes("sakura");
  const boschLogo = "https://res.cloudinary.com/diyibvvua/image/upload/v1765877243/boschlogo_qnv9f0.png";
  const sakuraLogo = "https://res.cloudinary.com/diyibvvua/image/upload/v1765887110/sakuralogo_r2r0cg.jpg";
  const brandLogo = isBosch ? boschLogo : isSakura ? sakuraLogo : null;

  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-6 md:p-8 max-w-5xl mx-auto relative">
      {onClose && (
        <button
          className="absolute right-4 top-4 z-10 text-slate-500 hover:text-slate-700 bg-white rounded-full p-2 shadow-md"
          onClick={onClose}
          aria-label="Kapat"
        >
          ✕
        </button>
      )}

      <div className="space-y-8 md:space-y-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start">
          {/* Galeri */}
          <div className="relative w-full rounded-2xl bg-slate-50 overflow-hidden">
            {brandLogo && (
              <div className="absolute left-3 top-3 z-10">
                <div className="rounded-xl bg-white/95 backdrop-blur px-3 py-2 shadow-md border border-slate-100">
                  <img src={brandLogo} alt="Marka Logosu" className="h-8 w-auto object-contain" loading="lazy" />
                </div>
              </div>
            )}
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true, dynamicBullets: true }}
              className="h-full"
            >
              {gallery.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative group w-full aspect-[4/3] flex items-center justify-center p-4 cursor-zoom-in" onClick={() => setLightboxSrc(src)}>
                    <img src={src} alt={`${product.name} görsel ${idx + 1}`} className="h-full w-auto max-w-full object-contain drop-shadow-lg transition-transform group-hover:scale-105" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Ürün Detayları */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-100 p-5 bg-white/90 backdrop-blur space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">{product.brand}</p>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug">{product.name}</h1>
                </div>
                <span className="px-4 py-2 text-sm font-semibold bg-primary/10 text-primary rounded-full self-start sm:self-auto">{priceText}</span>
              </div>

              {/* Taksit */}
              <div className="bg-emerald-50 text-emerald-700 text-xs font-medium py-2 px-3 rounded-lg border border-emerald-100">
                💳 Kredi kartına <span className="font-semibold">9 aya varan</span> taksit fırsatları
              </div>

              {/* Öne çıkan bilgiler */}
              {infoHighlights.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {infoHighlights.map((item) => (
                    <div key={item.label} className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">{item.label}</p>
                      <p className="text-sm font-semibold text-slate-800 mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightboxSrc(null)}>
          <div className="relative max-w-5xl w-full">
            <button className="absolute -top-10 right-0 text-white text-2xl font-bold" onClick={() => setLightboxSrc(null)}>✕</button>
            <img src={lightboxSrc} alt="Ürün görseli" className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10" />
          </div>
        </div>
      )}
    </div>
  );
}

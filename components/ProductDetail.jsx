import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function ProductDetail({ product, onClose }) {
  if (!product) return null;
  const gallery = (product.images && product.images.length > 0 ? product.images : []).filter(Boolean);
  if (gallery.length === 0 && product.image) gallery.push(product.image);
  if (gallery.length === 0) gallery.push("https://via.placeholder.com/900x600?text=Klima+Gorseli");

  const [otherFeaturesOpen, setOtherFeaturesOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const normalizedValues = {
    btusCooling: product.btus_cooling ?? product.capacity?.cooling_btu ?? null,
    btusHeating: product.btus_heating ?? product.capacity?.heating_btu ?? null,
    energyRating: product.energy_rating ?? product.energy?.cooling_class ?? product.energy?.heating_class ?? null,
    noiseIndoor:
      product.noise_indoor_db ??
      product.other_features?.noise_levels_db?.indoor_cooling ??
      product.other_features?.noise_levels_db?.indoor_heating ??
      null,
    noiseOutdoor:
      product.noise_outdoor_db ??
      product.other_features?.noise_levels_db?.outdoor_cooling ??
      product.other_features?.noise_levels_db?.outdoor_heating ??
      null,
    recommendedRoom: product.recommended_room_m2 ?? product.other_features?.recommended_room_m2 ?? null,
    refrigerant:
      product.refrigerant?.type ||
      product.refrigerant ||
      product.other_features?.refrigerant ||
      product.refrigerant_type ||
      "—",
    warranty:
      product.warranty ??
      (product.warranty_months ? `${product.warranty_months} Ay Garanti` : product.other_features?.warranty) ??
      "—"
  };

  const specRows = [
    { label: "Marka / Model", value: `${product.brand} ${product.model || ""}`.trim() },
    { label: "BTU (Soğutma)", value: normalizedValues.btusCooling ? `${normalizedValues.btusCooling} BTU` : "—" },
    { label: "BTU (Isıtma)", value: normalizedValues.btusHeating ? `${normalizedValues.btusHeating} BTU` : "—" },
    { label: "Enerji Sınıfı", value: normalizedValues.energyRating || "—" },
    { label: "Tip", value: product.type },
    { label: "Renk", value: product.color },
    { label: "Ses Seviyesi (İç)", value: normalizedValues.noiseIndoor ? `${normalizedValues.noiseIndoor} dB` : "—" },
    { label: "Ses Seviyesi (Dış)", value: normalizedValues.noiseOutdoor ? `${normalizedValues.noiseOutdoor} dB` : "—" },
    { label: "Önerilen Alan", value: normalizedValues.recommendedRoom ? `${normalizedValues.recommendedRoom} m²` : "—" },
    { label: "Refrigerant", value: normalizedValues.refrigerant },
    { label: "Garanti", value: normalizedValues.warranty }
  ];

  const highlightFeatures = Array.isArray(product.highlight_features) ? product.highlight_features : [];
  const otherFeatures = product.other_features || null;

  const infoHighlights = [
    { label: "Enerji", value: normalizedValues.energyRating },
    { label: "Soğutma", value: normalizedValues.btusCooling ? `${normalizedValues.btusCooling} BTU` : null },
    { label: "Isıtma", value: normalizedValues.btusHeating ? `${normalizedValues.btusHeating} BTU` : null },
    { label: "Alan", value: normalizedValues.recommendedRoom ? `${normalizedValues.recommendedRoom} m²` : null },
    { label: "Ses (İç)", value: normalizedValues.noiseIndoor ? `${normalizedValues.noiseIndoor} dB` : null },
    { label: "Garanti", value: normalizedValues.warranty !== "—" ? normalizedValues.warranty : null }
  ].filter((item) => item.value);

  const priceText = product.price ? `${product.price.toLocaleString("tr-TR")} ₺` : "";
  const brandName = (product.brand || "").toLowerCase();
  const isBosch = brandName.includes("bosch");
  const isSakura = brandName.includes("sacura") || brandName.includes("sakura");
  const boschLogo = "https://res.cloudinary.com/diyibvvua/image/upload/v1765877243/boschlogo_qnv9f0.png";
  const sakuraLogo = "https://res.cloudinary.com/diyibvvua/image/upload/v1765887110/sakuralogo_r2r0cg.jpg";
  const brandLogo = isBosch ? boschLogo : isSakura ? sakuraLogo : null;

  return (
    <div className="bg-white rounded-2xl shadow-soft p-4 sm:p-6 md:p-8 max-w-5xl mx-auto relative">
      {onClose && (
        <button
          className="absolute right-4 top-4 z-10 text-slate-500 hover:text-slate-700 bg-white rounded-full p-2 shadow-lg"
          aria-label="Kapat"
          onClick={onClose}
        >
          ✕
        </button>
      )}

      <div className="space-y-8 md:space-y-10">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="relative w-full">
            <div className="rounded-2xl bg-slate-50 shadow-soft overflow-hidden">
              {brandLogo && (
                <div className="absolute left-3 top-3 z-10">
                  <div className="rounded-xl bg-white/95 backdrop-blur px-3 py-2 shadow-md border border-slate-100">
                    <img src={brandLogo} alt="Marka Logosu" className="h-8 w-auto object-contain" loading="lazy" />
                  </div>
                </div>
              )}
              {gallery.length > 0 ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true, dynamicBullets: true }}
                  className="h-full"
                >
                  {gallery.map((src, idx) => (
                    <SwiperSlide key={idx}>
                      <div
                        className="relative group w-full aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/4] flex items-center justify-center bg-gradient-to-b from-white to-transparent p-4 sm:p-6 cursor-zoom-in"
                        onClick={() => setLightboxSrc(src)}
                      >
                        <img
                          src={src}
                          alt={`${product.name} görsel ${idx + 1}`}
                          className="h-full w-auto max-w-full object-contain drop-shadow-lg transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div
                  className="relative group w-full aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/4] flex items-center justify-center bg-gradient-to-b from-white to-transparent p-4 sm:p-6 cursor-zoom-in"
                  onClick={() => setLightboxSrc(gallery[0])}
                >
                  <img
                    src={gallery[0]}
                    alt={product.name}
                    className="h-full w-auto max-w-full object-contain drop-shadow-lg transition duration-300 group-hover:scale-105"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-100 p-5 sm:p-6 bg-white/90 backdrop-blur space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">{product.brand}</p>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug">{product.name}</h1>
                </div>
                <span className="px-4 py-2 text-sm font-semibold bg-primary/10 text-primary rounded-full self-start sm:self-auto">
                  {priceText}
                </span>
              </div>
              {/* TAKSİT BİLGİSİ */}
<div className="bg-emerald-50 text-emerald-700 text-xs font-medium py-2 px-3 rounded-lg border border-emerald-100">
  💳 Kredi kartına <span className="font-semibold">9 aya varan</span> taksit fırsatları
</div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {product.description || (product.system_type ?
                  `${product.system_type} modeli, yüksek verimlilik, sessiz çalışma ve uzun ömürlü performans için tasarlandı. Ücretsiz keşif ve montaj desteğiyle teslim ediyoruz.` :
                  'Yüksek verimlilik, sessiz çalışma ve uzun ömürlü performans için tasarlandı. Ücretsiz keşif ve montaj desteğiyle teslim ediyoruz.'
                )}
              </p>

              {infoHighlights.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {infoHighlights.map((item) => (
                    <div key={item.label} className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                      <p className="text-[11px] uppercase tracking-wide text-slate-500">{item.label}</p>
                      <p className="text-sm font-semibold text-slate-800 mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:info@alizone.com"
                  className="flex-1 text-center rounded-lg bg-primary text-white font-semibold py-3 shadow-soft hover:brightness-105 transition"
                >
                  Teklif Al
                </a>
                <a
                  href="tel:+903462111111"
                  className="flex-1 text-center rounded-lg border border-slate-200 text-slate-800 font-semibold py-3 hover:bg-slate-50 transition"
                >
                  Hemen Ara
                </a>
              </div>
            </div>

            {/* Ek görsel alanı – iki sütunu kaplar, yan yana iki görsel */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-100 shadow-soft bg-gradient-to-br from-white via-slate-50 to-white">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-6 p-6">
                <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-96 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src="https://res.cloudinary.com/diyibvvua/image/upload/v1765809182/cardphoto_3_cpkmbz.webp"
                    alt="Klima görseli 1"
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                  />
                </div>
                <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-96 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src="https://res.cloudinary.com/diyibvvua/image/upload/v1765808967/card_photo_jjx4j9.webp"
                    alt="Klima görseli 2"
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Öne Çıkan Özellikler */}
        {highlightFeatures.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">Öne Çıkanlar</h3>
            <ul className="space-y-2">
              {highlightFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-slate-700 bg-slate-50 rounded-lg p-3 border border-slate-100"
                >
                  <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Özellikler Listesi */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">Özellikler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.inverter && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">Inverter Teknolojisi</span>
              </div>
            )}
            {product.remote_control && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">Uzaktan Kumanda</span>
              </div>
            )}
            {product.heating_function && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">Isıtma Fonksiyonu</span>
              </div>
            )}
            {product.dehumidify && (
              <div className="flex items-center gap-2 p-3 bg-cyan-50 rounded-lg">
                <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">Nem Giderici</span>
              </div>
            )}
          </div>
        </div>

        {/* Teknik Özellikler */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">Teknik Özellikler</h3>
          <div className="overflow-hidden rounded-xl border border-slate-100">
            <table className="w-full text-sm">
              <tbody>
                {specRows.map((row) => (
                  <tr key={row.label} className="odd:bg-slate-50/40">
                    <td className="px-4 py-3 font-semibold text-slate-700 w-1/2">{row.label}</td>
                    <td className="px-4 py-3 text-slate-600">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Diğer Özellikler */}
        {otherFeatures && (
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
              onClick={() => setOtherFeaturesOpen((prev) => !prev)}
            >
              <span>Diğer Özellikler</span>
              <svg
                className={`w-5 h-5 transition-transform ${otherFeaturesOpen ? "rotate-180 text-primary" : "text-slate-400"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {otherFeaturesOpen && (
              <div className="px-4 pb-4 space-y-4 text-sm text-slate-700">
                {Object.entries(otherFeatures).map(([sectionKey, value]) => (
                  <div key={sectionKey} className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-slate-500">{formatLabel(sectionKey)}</p>
                    <div className="rounded-lg bg-slate-50 p-3 space-y-1">{renderFeatureValue(value)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              className="absolute -top-10 right-0 text-white text-2xl font-bold"
              aria-label="Kapat"
              onClick={() => setLightboxSrc(null)}
            >
              ✕
            </button>
            <div className="w-full flex items-center justify-center">
              <img
                src={lightboxSrc}
                alt="Ürün görseli büyütülmüş"
                className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatLabel(key) {
  if (!key) return "";
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function renderFeatureValue(value) {
  if (value === null || value === undefined) {
    return <p className="text-slate-600">—</p>;
  }

  if (Array.isArray(value)) {
    return value.map((item, idx) => (
      <p key={idx} className="text-slate-700">
        • {item}
      </p>
    ));
  }

  if (typeof value === "object") {
    return Object.entries(value).map(([subKey, subValue]) => (
      <div key={subKey} className="flex flex-col gap-1 text-slate-700">
        <span className="text-xs font-semibold text-slate-500">{formatLabel(subKey)}</span>
        <div className="pl-2">{renderFeatureValue(subValue)}</div>
      </div>
    ));
  }

  return <p className="text-slate-700">{String(value)}</p>;
}


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState, useRef, useMemo } from "react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const swiperRef = useRef(null);

  // Marka kontrolü ve logolar
  const brandName = (product?.brand || "").toLowerCase();
  const isBosch = brandName.includes("bosch");
  const isSakura = brandName.includes("sakura") || brandName.includes("sacura");

  const boschLogo = "https://res.cloudinary.com/diyibvvua/image/upload/v1765877243/boschlogo_qnv9f0.png";
  const sakuraLogo = "https://res.cloudinary.com/diyibvvua/image/upload/v1765887110/sakuralogo_r2r0cg.jpg";
  const brandLogo = isBosch ? boschLogo : isSakura ? sakuraLogo : null;

  // Görseller
  const images = useMemo(() => {
    const list = Array.isArray(product?.images) ? product.images.filter(Boolean) : [];
    return list.length ? Array.from(new Set(list)) : product?.image ? [product.image] : [];
  }, [product]);

  const hasMultipleImages = images.length > 1;
  const image = images[0] || "https://via.placeholder.com/600x400?text=Klima";

  // Fiyat
  const priceValue = product?.total_price ?? product?.price ?? null;
  const priceText = priceValue ? Number(priceValue).toLocaleString("tr-TR") + " ₺" : "";

  // Slider kontrol
  const handleImageClick = (e) => {
    if (hasMultipleImages && swiperRef.current) {
      e.stopPropagation();
      const currentIndex = swiperRef.current.activeIndex;
      swiperRef.current.slideTo((currentIndex + 1) % images.length);
    }
  };
  const goPrev = (e) => { e.stopPropagation(); if (swiperRef.current && hasMultipleImages) swiperRef.current.slidePrev(); };
  const goNext = (e) => { e.stopPropagation(); if (swiperRef.current && hasMultipleImages) swiperRef.current.slideNext(); };

  return (
    <div
      className="group h-full flex flex-col rounded-xl bg-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:border-emerald-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ürün Görseli */}
      <div
        className="relative h-48 sm:h-52 md:h-56 lg:h-60 bg-gray-100 flex items-center justify-center p-2 sm:p-3 md:p-4 overflow-hidden"
        onClick={handleImageClick}
      >
        {brandLogo && (
          <div className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3">
            <div className="rounded-lg bg-white/90 backdrop-blur px-2 py-1 shadow-md border">
              <img src={brandLogo} alt="Marka Logosu" className="h-5 w-auto object-contain" loading="lazy" />
            </div>
          </div>
        )}

        {hasMultipleImages ? (
          <Swiper
            modules={[Navigation, Pagination]}
            loop
            pagination={{ clickable: true, dynamicBullets: true }}
            allowTouchMove
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="h-full w-full"
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex items-center justify-center h-full p-2">
                  <img
                    src={img}
                    alt={`${product?.name || "Ürün"} görsel ${idx + 1}`}
                    className="h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex items-center justify-center h-full w-full p-2">
            <img
              src={image}
              alt={product?.name || "Ürün"}
              className="h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {hasMultipleImages && (
          <>
            <button
              onClick={goPrev}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 shadow-md"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 shadow-md"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Taksit Bilgisi */}
      <div className="bg-emerald-50 text-emerald-700 text-xs font-medium py-2 text-center border-t border-emerald-100">
        💳 Kredi kartına <span className="font-semibold">9 aya varan</span> taksit fırsatları
      </div>

      {/* Ürün Bilgileri */}
      <div className="p-5 space-y-4">
        <h3 className="text-base font-medium text-slate-800 line-clamp-2">
          {product?.system_type || product?.name || "Ürün İsmi Yok"}
        </h3>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {product?.btus_cooling && (
              <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">
                {product.btus_cooling} BTU
              </span>
            )}
            {product?.energy_rating && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {product.energy_rating}
              </span>
            )}
          </div>

          {priceText && (
            <span className="text-sm font-semibold text-emerald-600">{priceText}</span>
          )}
        </div>

        <div className="flex gap-3 pt-3">
          <Link
            href={`/product/${product?.id}`}
            className="flex-1 text-center rounded-lg border-2 border-emerald-500 text-emerald-700 py-2 text-sm font-semibold hover:bg-emerald-50"
          >
            Detaylı İncele
          </Link>

          <a
            href="tel:+903462111111"
            className="flex-1 text-center rounded-lg bg-emerald-600 text-white py-2 text-sm font-semibold hover:brightness-105"
          >
            Hemen Al
          </a>
        </div>
      </div>
    </div>
  );
}

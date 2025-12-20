import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState, useRef, useMemo } from "react";
import Link from "next/link";

export default function ProductCard({ product }) {
    const [isHovered, setIsHovered] = useState(false);
    const swiperRef = useRef(null);
    const brandName = (product.brand || "").toLowerCase();
    const isBosch = brandName.includes("bosch");
    const isSakura = brandName.includes("sacura") || brandName.includes("sakura");
    const boschLogo = "https://res.cloudinary.com/diyibvvua/image/upload/v1765877243/boschlogo_qnv9f0.png";
    const sakuraLogo = "https://res.cloudinary.com/diyibvvua/image/upload/v1765887110/sakuralogo_r2r0cg.jpg";
    const brandLogo = isBosch ? boschLogo : isSakura ? sakuraLogo : null;

    const images = useMemo(() => {
        const list = (product.images && product.images.length > 0 ? product.images : []).filter(Boolean);
        return Array.from(new Set(list.length ? list : [product.image].filter(Boolean)));
    }, [product]);

    const hasMultipleImages = images.length > 1;
    const image = images[0] || "https://via.placeholder.com/600x400?text=Klima";
    const priceText = (product.total_price || product.price)
        ? `${(product.total_price || product.price).toLocaleString("tr-TR")} ₺`
        : "";

    const handleImageClick = (e) => {
        if (hasMultipleImages && swiperRef.current) {
            e.stopPropagation();
            const currentIndex = swiperRef.current.activeIndex;
            const nextIndex = (currentIndex + 1) % images.length;
            swiperRef.current.slideTo(nextIndex);
        }
    };

    const goPrev = (e) => {
        e.stopPropagation();
        if (swiperRef.current && hasMultipleImages) {
            swiperRef.current.slidePrev();
        }
    };

    const goNext = (e) => {
        e.stopPropagation();
        if (swiperRef.current && hasMultipleImages) {
            swiperRef.current.slideNext();
        }
    };

    return (
        <div
            className="group h-full flex flex-col rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="relative h-48 sm:h-52 md:h-56 lg:h-60 bg-white flex items-center justify-center p-2 sm:p-3 md:p-4 overflow-hidden"
                onClick={handleImageClick}
            >
                {brandLogo && (
                    <div className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3">
                        <div className="rounded-lg sm:rounded-xl bg-white/90 backdrop-blur px-1.5 py-1 sm:px-2.5 sm:py-1.5 shadow-md border border-slate-100">
                            <img
                                src={brandLogo}
                                alt="Marka Logosu"
                                className="h-4 sm:h-5 md:h-6 w-auto object-contain"
                                loading="lazy"
                            />
                        </div>
                    </div>
                )}

                {hasMultipleImages ? (
                    <Swiper
                        modules={[Navigation, Pagination]}
                        loop={hasMultipleImages}
                        navigation={false}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        allowTouchMove={hasMultipleImages}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        className="h-full w-full"
                    >
                        {images.map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="flex items-center justify-center h-full p-2">
                                    <img
                                        src={img}
                                        alt={`${product.name} görsel ${idx + 1}`}
                                        className="h-full w-auto max-w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
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
                            alt={product.name}
                            className="h-full w-auto max-w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                )}

                {hasMultipleImages && (
                    <>
                        <button
                            aria-label="Önceki fotoğraf"
                            onClick={goPrev}
                            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 md:h-8 md:w-8 rounded-full bg-white/80 backdrop-blur text-slate-700 shadow-md hover:bg-white transition-all items-center justify-center text-sm md:text-base"
                        >
                            ‹
                        </button>
                        <button
                            aria-label="Sonraki fotoğraf"
                            onClick={goNext}
                            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 md:h-8 md:w-8 rounded-full bg-white/80 backdrop-blur text-slate-700 shadow-md hover:bg-white transition-all items-center justify-center text-sm md:text-base"
                        >
                            ›
                        </button>
                    </>
                )}

                {priceText && (
                    <div className="absolute top-2 right-2 bg-white/95 text-emerald-700 text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm">
                        {priceText}
                    </div>
                )}
            </div>

            <div className="p-5 space-y-4">
                <div className="space-y-2">
                    <h3 className="text-base font-medium text-slate-800 line-clamp-2 min-h-[2.5rem]">
                        {product.system_type || product.name || "Ürün İsmi Yok"}
                    </h3>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {product.btus_cooling && (
                                <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                                    {product.btus_cooling} BTU
                                </span>
                            )}
                            {product.energy_rating && (
                                <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                    {product.energy_rating} Enerji Sınıfı
                                </span>
                            )}
                        </div>
                        {priceText && (
                            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                {priceText}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                        {product.type && (
                            <div className="flex items-center space-x-1">
                                <span className="text-slate-500">Tip:</span>
                                <span className="font-medium">{product.type}</span>
                            </div>
                        )}

                        {product.noise_indoor_db && (
                            <div className="flex items-center space-x-1">
                                <span className="text-slate-500">Ses Seviyesi:</span>
                                <span className="font-medium">{product.noise_indoor_db} dB</span>
                            </div>
                        )}

                        {product.recommended_room_m2 && (
                            <div className="flex items-center space-x-1">
                                <span className="text-slate-500">Oda Büyüklüğü:</span>
                                <span className="font-medium">{product.recommended_room_m2} m²</span>
                            </div>
                        )}

                        {product.warranty && (
                            <div className="flex items-center space-x-1">
                                <span className="text-slate-500">Garanti:</span>
                                <span className="font-medium">{product.warranty}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {product.inverter && (
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-medium rounded-full border border-emerald-100">
                                Inverter
                            </span>
                        )}
                        {product.remote_control && (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-medium rounded-full border border-blue-100">
                                Kumanda
                            </span>
                        )}
                        {product.heating_function && (
                            <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[11px] font-medium rounded-full border border-red-100">
                                Isıtma
                            </span>
                        )}
                        {product.dehumidify && (
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[11px] font-medium rounded-full border border-purple-100">
                                Nem Giderici
                            </span>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Link
                            href={`/product/${product.id}`}
                            className="flex-1 text-center rounded-lg border-2 border-emerald-500 bg-white text-emerald-700 py-2.5 text-sm font-semibold hover:bg-emerald-50 transition-all duration-200 hover:shadow-md"
                        >
                            Detaylı İncele
                        </Link>
                        <a
                            href="tel:+905542309563"
                            className="flex-1 text-center rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2.5 text-sm font-semibold hover:shadow-lg hover:shadow-emerald-100 transition-all duration-200 hover:brightness-105"
                        >
                            Hemen Al
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

import ProductCard from "./ProductCard";

export default function ProductGrid({
  products = [],
  title = "Öne Çıkan Klima Modelleri",
  description = "Enerji verimli, sessiz ve yüksek performanslı split klima seçenekleri. Hemen inceleyin ve montaj planınızı yapalım."
}) {
  if (!Array.isArray(products)) products = [];

  return (
    <section id="products" className="w-full px-2 sm:px-4 py-8 md:py-12">
      {/* Başlık ve açıklama */}
      <div className="text-center space-y-3 mb-8 px-2">
        <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-primary">Ürünler</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">{title}</h2>
        {description && (
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* Ürün Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0">
        {products.map((product, index) => (
          <div key={product?.id ?? index} className="h-full">
            <ProductCard product={product || {}} />
          </div>
        ))}
      </div>
    </section>
  );
}

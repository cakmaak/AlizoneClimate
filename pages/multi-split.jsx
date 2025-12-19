import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const DATA_URL = "https://raw.githubusercontent.com/cakmaak/ClimateProductsJson/main/products.json";

async function loadProducts() {
    try {
      const res = await fetch("https://raw.githubusercontent.com/cakmaak/ClimateProductsJson/main/products.json");
      if (!res.ok) throw new Error(`Remote fetch failed with status ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) return data; // array varsa dön
    } catch (error) {
      console.error("Remote product fetch failed", error);
    }
    return []; // localProducts yerine boş array
  }

function normalizeProduct(product) {
  const normalized = {
    ...product,
    btus_cooling: product?.btus_cooling ?? product?.capacity?.cooling_btu ?? null,
    btus_heating: product?.btus_heating ?? product?.capacity?.heating_btu ?? null,
    energy_rating: product?.energy_rating ?? product?.energy?.cooling_class ?? product?.energyRating ?? null,
    warranty: product?.warranty ?? (product?.warranty_months ? `${product.warranty_months} Ay Garanti` : null),
    images: product?.images ?? (product?.image ? [product.image] : []),
    price: product?.total_price ?? product?.price ?? null,
  };

  return {
    ...normalized,
    image: (normalized.images && normalized.images[0]) || "https://via.placeholder.com/600x400?text=Klima",
  };
}

export default function MultiSplitPage({ products }) {
  const multiSplitProducts = useMemo(() => {
    return products
      .map(normalizeProduct)
      .filter((p) => p.type?.toLowerCase().includes("multi")) // type alanına göre filtre
      .sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  }, [products]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1">
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold text-white mb-10 drop-shadow-lg">Multi Split Klima Modelleri</h1>
              <div className="space-y-16">
                <section className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <h2 className="text-2xl font-semibold text-teal-800 mb-6">Tüm Multi Split Ürünleri</h2>
                  <p className="text-gray-600 mb-6">
                    Birden fazla iç üniteyi tek bir dış üniteye bağlayan, farklı mekanlarda farklı sıcaklık ayarları yapabilmenizi sağlayan çözümler.
                  </p>
                  <ProductGrid products={multiSplitProducts} />
                </section>
              </div>
            </div>
          </div>
        </main>
        <div className="bg-teal-900/90 backdrop-blur-sm">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const products = await loadProducts();
  return {
    props: { products },
    revalidate: 3600, // Revalidate every hour
  };
}

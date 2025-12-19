import { useMemo, useState, useEffect } from "react";
import { useRouter } from 'next/router';
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
    btus_cooling: product?.btus_cooling ?? product?.capacity?.cooling_btu ?? product?.btusCooling ?? null,
    btus_heating: product?.btus_heating ?? product?.capacity?.heating_btu ?? product?.btusHeating ?? null,
    energy_rating:
      product?.energy_rating ??
      product?.energy?.cooling_class ??
      product?.energy?.heating_class ??
      product?.energyRating ??
      null,
    warranty:
      product?.warranty ??
      (product?.warranty_months ? `${product.warranty_months} Ay Garanti` : product?.warrantyText),
    images: product?.images ?? (product?.image ? [product.image] : [])
  };

  return {
    ...normalized,
    image: (normalized.images && normalized.images[0]) || normalized.image || "https://via.placeholder.com/600x400?text=Klima"
  };
}

export default function ProductsPage({ products }) {
  const router = useRouter();
  const [segment, setSegment] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const { type } = router.query;
    
    if (type === 'split' || type === 'multi-split' || type === 'mobile') {
      setSegment('split');
    } else if (type === 'commercial' || type === 'ticari') {
      setSegment('commercial');
    } else {
      setSegment('split');
    }
  }, [router.query]);

  const preparedProducts = useMemo(() => {
    return products
      .map((product) => normalizeProduct(product))
      .filter((product) => {
        const coolingBtu = product?.btus_cooling ?? product?.capacity?.cooling_btu ?? null;
        return coolingBtu ? coolingBtu >= 0 : true;
      });
  }, [products]);

  const splitIds = [38, 39, 40, 41, 52, 53, 54, 55];

  const filteredProducts = useMemo(() => {
    if (!isClient) return [];
    
    const { type } = router.query;
    
    if (type === 'mobile') {
      return preparedProducts.filter(p => 
        p.type?.toLowerCase().includes('mobil')
      );
    } else if (type === 'multi-split') {
      // Show only products with IDs 60-66 for multi-split
      return preparedProducts.filter(p => {
        const id = parseInt(p.id);
        return id >= 60 && id <= 66;
      });
    } else if (type === 'ticari' || type === 'commercial') {
      return preparedProducts.filter(p => {
        const id = parseInt(p.id);
        return !splitIds.includes(id) && 
               !p.type?.toLowerCase().includes('mobil') &&
               (id < 60 || id > 66); // Exclude multi-split products
      });
    }
    
    // Default: split view
    return preparedProducts.filter(p => {
      const id = parseInt(p.id);
      return splitIds.includes(id) && 
             !p.type?.toLowerCase().includes('mobil') &&
             (id < 60 || id > 66); // Exclude multi-split products
    });
  }, [preparedProducts, router.query, isClient, splitIds]);

  if (!isClient) {
    return null;
  }

  const getTitle = () => {
    const { type } = router.query;
    if (type === 'mobile') return "Mobil Klima Modelleri";
    if (type === 'multi-split') return "Multi Split Klima Modelleri";
    if (type === 'ticari' || type === 'commercial') return "Ticari Klima Modelleri";
    return "Split Klima Modelleri";
  };

  const getDescription = () => {
    const { type } = router.query;
    if (type === 'mobile') return "Taşınabilir ve pratik mobil klima çözümleri.";
    if (type === 'multi-split') return "Birden fazla iç üniteye bağlanabilen verimli çözümler.";
    if (type === 'ticari' || type === 'commercial') return "İş yerleri, dükkanlar ve geniş hacimler için ticari klima çözümleri.";
    return "Ev ve ofisler için yüksek verimli split klima modellerini inceleyin.";
  };

  const isActive = (btnType) => {
    const { type } = router.query;
    if (!type && btnType === 'split') return true;
    return type === btnType;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1">
        <Navbar />
        <main className="flex-1 bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-800 mb-10">Ürünlerimiz</h1>
              <div className="flex space-x-4 mb-8 flex-wrap gap-2">
                <button
                  onClick={() => router.push('/products?type=split', undefined, { shallow: true })}
                  className={`px-4 py-2 rounded-lg ${
                    isActive('split') || (!router.query.type && segment === 'split')
                      ? 'bg-teal-100 text-teal-800 font-medium'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Split Klimalar
                </button>
                <button
                  onClick={() => router.push('/products?type=multi-split', undefined, { shallow: true })}
                  className={`px-4 py-2 rounded-lg ${
                    isActive('multi-split')
                      ? 'bg-teal-100 text-teal-800 font-medium'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Multi Split Klimalar
                </button>
                <button
                  onClick={() => router.push('/products?type=mobile', undefined, { shallow: true })}
                  className={`px-4 py-2 rounded-lg ${
                    isActive('mobile')
                      ? 'bg-teal-100 text-teal-800 font-medium'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Mobil Klimalar
                </button>
                <button
                  onClick={() => router.push('/products?type=ticari', undefined, { shallow: true })}
                  className={`px-4 py-2 rounded-lg ${
                    isActive('ticari') || isActive('commercial')
                      ? 'bg-teal-100 text-teal-800 font-medium'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Ticari Klimalar
                </button>
              </div>

              <div className="space-y-16">
                <section className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-semibold text-teal-800 mb-6">{getTitle()}</h2>
                  <p className="text-gray-600 mb-6">{getDescription()}</p>
                  <ProductGrid products={filteredProducts} />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="bg-white border-t border-gray-200">
        <Footer />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const products = await loadProducts();
  return {
    props: { products },
    revalidate: 60 * 60 // refresh hourly
  };
}
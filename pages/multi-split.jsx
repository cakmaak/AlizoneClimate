import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
//import localProducts from "../ClimatePanelJson/products.json";

const DATA_URL = "https://raw.githubusercontent.com/cakmaak/ClimateProductsJson/main/products.json";

async function loadProducts() {
    try {
        const res = await fetch(DATA_URL);
        if (!res.ok) throw new Error(`Remote fetch failed with status ${res.status}`);
        const text = await res.text();
        try {
            const data = JSON.parse(text);
            if (Array.isArray(data) && data.length > 0) {
                return data;
            }
        } catch (parseError) {
            console.error("Failed to parse remote JSON, using local data instead", parseError);
        }
    } catch (error) {
        console.error("Remote product fetch failed, using local data instead", error);
    }
    return localProducts;
}

function normalizeProduct(product) {
    // Use total_price if available, otherwise fall back to price
    const price = product?.total_price ?? product?.price;

    const normalized = {
        ...product,
        price, // This will be either total_price or price
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

export default function MultiSplitPage({ products }) {
    const multiSplitProducts = useMemo(() => {
        return products
            .map((product) => {
                // First normalize the product to ensure we have all fields
                const normalized = normalizeProduct(product);

                // Handle price conversion
                if (normalized.price) {
                    if (typeof normalized.price === 'string') {
                        // Handle string prices (remove dots, replace comma with dot)
                        normalized.price = parseFloat(normalized.price.replace(/\./g, '').replace(',', '.'));
                    } else if (normalized.total_price) {
                        // If total_price exists, use that instead
                        normalized.price = typeof normalized.total_price === 'string'
                            ? parseFloat(normalized.total_price.replace(/\./g, '').replace(',', '.'))
                            : Number(normalized.total_price);
                    }
                } else if (normalized.total_price) {
                    // If no price but has total_price, use that
                    normalized.price = typeof normalized.total_price === 'string'
                        ? parseFloat(normalized.total_price.replace(/\./g, '').replace(',', '.'))
                        : Number(normalized.total_price);
                }

                return normalized;
            })
            .filter((product) => {
                // Filter products where ID or name contains 'multi' (case insensitive)
                const id = (product.id?.toString() || '').toLowerCase();
                const name = (product.name || '').toLowerCase();
                return id.includes('multi') || name.includes('multi');
            })
            .sort((a, b) => (a.price || 0) - (b.price || 0)); // Sort by price
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
                                    <p className="text-gray-600 mb-6">Birden fazla iç üniteyi tek bir dış üniteye bağlayan, farklı mekanlarda farklı sıcaklık ayarları yapabilmenizi sağlayan çözümler.</p>
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
      props: { products }
      // ❌ revalidate SİLİNDİ
    };
  }

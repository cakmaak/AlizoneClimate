import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import localProducts from "@/ClimatePanelJson/products.json";
import { useRouter } from "next/router";

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
    console.error("Remote product fetch failed, falling back to local data", error);
  }
  return localProducts;
}

export default function ProductPage({ product }) {
  const router = useRouter();
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">Ürün bulunamadı</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container py-16 space-y-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline"
        >
          <span className="text-lg leading-none">←</span>
          <span>Önceki sayfaya dön</span>
        </button>
        <ProductDetail product={product} />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  // Pre-generate detail pages for all products so category-specific types (e.g. "Salon Tipi Klima")
  // are not skipped. We keep ISR fallback for any late additions.
  const products = await loadProducts();
  const paths =
    Array.isArray(products) && products.length > 0
      ? products.map((product) => ({
        params: { id: String(product.id).toLowerCase() }
      }))
      : [];

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const products = await loadProducts();
  const product = products.find((item) =>
    String(item.id).toLowerCase() === String(params.id).toLowerCase()
  );

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
    revalidate: 60 * 60
  };
}


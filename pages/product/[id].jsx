import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";


import { useRouter } from "next/router";

const DATA_URL = "https://raw.githubusercontent.com/cakmaak/ClimateProductsJson/main/products.json";

async function loadProducts() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`Remote fetch failed: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to fetch products", err);
    return []; // boş array dön, localProducts artık yok
  }
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
  const products = await loadProducts();
  const paths = products.map(p => ({
    params: { id: String(p.id) }
  }));

  return {
    paths,
    fallback: "blocking"
  };
}



export async function getStaticProps({ params }) {
  const products = await loadProducts();
  const product = products.find(p => String(p.id) === params.id);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
    revalidate: 3600,
  };
}



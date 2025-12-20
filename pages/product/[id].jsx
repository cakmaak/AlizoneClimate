import dynamic from 'next/dynamic';
import { useRouter } from "next/router";

const ProductDetail = dynamic(
  () => import('@/components/ProductDetail'),
  { ssr: false }
);

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
    console.error("Remote product fetch failed, falling back to empty array", error);
  }
  return [];
}

export default function ProductPage({ product }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Yükleniyor...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">Ürün bulunamadı</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
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
    </div>
  );
}

export async function getStaticPaths() {
  // Sadece birkaç sayfa oluştur, geri kalanı için fallback: 'blocking' kullan
  const paths = [
    { params: { id: '101' } },
    { params: { id: '102' } },
    { params: { id: '103' } }
  ];

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  try {
    const products = await loadProducts();
    
    if (!Array.isArray(products) || products.length === 0) {
      return { notFound: true };
    }
    
    const product = products.find(
      (item) => String(item.id).toLowerCase() === String(params.id).toLowerCase()
    );

    if (!product) {
      return { notFound: true };
    }

    return {
      props: { 
        product: JSON.parse(JSON.stringify(product)) // Serialize to handle dates, etc.
      },
      revalidate: 60 * 60 // 1 saat
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}
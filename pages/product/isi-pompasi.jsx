import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProductGrid from '../../components/ProductGrid';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function IsiPompasiPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/cakmaak/ClimateProductsJson/main/products.json');
        const data = await response.json();
        // Filter products with IDs 101-107
        const filteredProducts = data.filter(product => {
          const productId = parseInt(product.id);
          return productId >= 101 && productId <= 107;
        });
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>Isı Pompası Modelleri - Firma Adı</title>
        <meta name="description" content="Yüksek verimli ısı pompası modellerimizi inceleyin. En uygun fiyatlar ve uygun ödeme seçenekleriyle." />
      </Head>
      
      <Navbar />
      
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Isı Pompası Modelleri</h1>
            <p className="text-gray-600 mb-8">
              Enerji verimliliği yüksek, çevre dostu ısı pompası çözümlerimizle tanışın. 
              Konforlu yaşam alanları için en uygun modeller burada.
            </p>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <div className="space-y-12">
                <section className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-2xl font-semibold text-teal-800 mb-6">Isı Pompası Modelleri</h2>
                  {products.length > 0 ? (
                    <ProductGrid products={products} />
                  ) : (
                    <p className="text-gray-600">Ürün bulunamadı.</p>
                  )}
                </section>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
import ProductDetail from "@/components/ProductDetail";

const PRODUCTS_URL =
  "https://raw.githubusercontent.com/cakmaak/ClimateProductsJson/refs/heads/main/products.json";

/**
 * TÜM ürünler için static path üret
 */
export async function getStaticPaths() {
  const res = await fetch(PRODUCTS_URL);
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { id: String(product.id) }
  }));

  return {
    paths,
    fallback: false // ⚠️ static export için ZORUNLU
  };
}

/**
 * SADECE ilgili ürünü gönder
 */
export async function getStaticProps({ params }) {
  const res = await fetch(PRODUCTS_URL);
  const products = await res.json();

  const product = products.find(
    (p) => String(p.id) === String(params.id)
  );

  if (!product) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      product
    }
  };
}


/**
 * Page
 */
export default function ProductPage({ product }) {
  return <ProductDetail product={product} />;
}

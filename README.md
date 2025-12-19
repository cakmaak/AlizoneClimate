# Alizone İklimlendirme

Modern, responsive klima satış ve montaj landing sitesi. Next.js + Tailwind CSS ile hazırlanmıştır; ürünler tek kaynaktan uzaktaki JSON dosyasından çekilir.

## Teknolojiler
- Next.js 14 (React 18, ISR)
- Tailwind CSS
- Swiper.js (hero & galeri slider)

## Başlangıç
```bash
npm install
npm run dev
# http://localhost:3000
```

## Deploy
- Vercel üzerinde standart Next.js adımlarıyla `npm run build`.
- ISR etkin: ürün JSON'ı her saat yeniden çekilir.

## Veri Kaynağı
`https://raw.githubusercontent.com/cakmaak/ClimateProductsJson/main/products.json`

## Yapı
- `pages/index.jsx` – hero, ürün grid, detay modalı.
- `pages/product/[id].jsx` – ürün detay sayfası.
- `components/*` – Navbar, HeroSlider, ProductCard, ProductGrid, ProductDetail, Footer.
- `styles/globals.css` – Tailwind ve temel stiller.

## Notlar
- Ürün görseli için JSON’daki `images` dizisi kullanılır; yoksa `image` alanı, o da yoksa placeholder.
- Fiyat alanı JSON'da bulunmadığından kartlarda “Fiyat için iletişime geçin” etiketi gösterilir.
- Erişilebilirlik için alt etiketleri, odak stilleri ve semantik yapılar eklendi.


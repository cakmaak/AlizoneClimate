import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="tr">
            <Head>
                {/* Favicon */}
                <link
                    rel="icon"
                    href="https://res.cloudinary.com/diyibvvua/image/upload/v1767103182/A_reimagined_logo_for_AliZone_Air_Conditioners_._The_logo_features_the_word_AliZone_in_bold_modern_typography_using_contrasting_colors._There_are_dynamic_wavy_elements_resembling_airflow_represented_in_vibrant_sha_jaumkt.jpg"
                    type="image/jpeg"
                    sizes="32x32"
                />

                {/* Temel SEO */}
                <meta name="description" content="AliZone Air Conditioners - Modern ve kaliteli klima çözümleri ile yaşam alanınızı konforlu hale getirin." />
                <meta name="keywords" content="AliZone, klima, inverter, salon tipi, enerji tasarrufu, modern tasarım" />
                <meta name="author" content="AliZone" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph / Sosyal Medya */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="AliZone Air Conditioners" />
                <meta property="og:description" content="AliZone - Modern ve kaliteli klima çözümleri ile yaşam alanınızı konforlu hale getirin." />
                <meta property="og:image" content="https://res.cloudinary.com/diyibvvua/image/upload/v1767103182/A_reimagined_logo_for_AliZone_Air_Conditioners_._The_logo_features_the_word_AliZone_in_bold_modern_typography_using_contrasting_colors._There_are_dynamic_wavy_elements_resembling_airflow_represented_in_vibrant_sha_jaumkt.jpg" />
                <meta property="og:url" content="https://www.siten.com" />
                <meta property="og:site_name" content="AliZone" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="AliZone Air Conditioners" />
                <meta name="twitter:description" content="AliZone - Modern ve kaliteli klima çözümleri ile yaşam alanınızı konforlu hale getirin." />
                <meta name="twitter:image" content="https://res.cloudinary.com/diyibvvua/image/upload/v1767103182/A_reimagined_logo_for_AliZone_Air_Conditioners_._The_logo_features_the_word_AliZone_in_bold_modern_typography_using_contrasting_colors._There_are_dynamic_wavy_elements_resembling_airflow_represented_in_vibrant_sha_jaumkt.jpg" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

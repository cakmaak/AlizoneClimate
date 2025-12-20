import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="tr">
            <Head>
                <link
                    rel="icon"
                    href="https://res.cloudinary.com/diyibvvua/image/upload/v1766234695/favicon_chjfc8.jpg"
                    type="image/jpg"
                    sizes="32x32"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

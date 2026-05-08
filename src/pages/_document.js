import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <script
        src="//cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js"
        defer
      ></script>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

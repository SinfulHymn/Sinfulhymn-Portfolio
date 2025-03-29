import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          {/* <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" /> */}
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
          <link rel="stylesheet" href="https://use.typekit.net/qrl3hlf.css"></link>
        </Head>
        <body
          className="
          back-light
          back-dark
          dark:bg-dark 
          bg-[#f7f7f7] 
          text-black  
          antialiased
          dark:bg-[#11091e]
          dark:text-white
        "
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

// @media (prefers-color-scheme: light) {
//   .back-light {
//     background-color: #f1f1ef;
//     opacity: 1;
//     background-image: radial-gradient(#3b2875 0.75px, transparent 0.75px),
//       radial-gradient(#3b2875 0.75px, #f1f1ef 0.75px);
//     background-size: 30px 30px;
//     background-position: 0 0, 15px 15px;
//   }
// }

// @media (prefers-color-scheme: dark) {
//   .back-dark {
//     background-color: #21252e;
//     opacity: 1;
//     background-image: radial-gradient(#d722b3 0.75px, transparent 0.75px),
//       radial-gradient(#d722b3 0.75px, #21252e 0.75px);
//     background-size: 30px 50px;
//     background-position: 0 0, 15px 15px;
//   }
// }

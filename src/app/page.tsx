import Script from 'next/script'
import '../pushpush.js'

export default function Home() {
  return (
    <div>
      <div className="container">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-T8G2TNGRSK"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-T8G2TNGRSK');
          `}
        </Script>
      </div>

      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-gray-800 font-bold text-xl"><a href="https://briefings.dev">Briefings.dev</a></h1>
          <nav className="text-gray-600 text-sm">
            <a href="https://briefings.dev" className="py-2 px-4 hover:opacity-0 transition-opacity duration-500 sm:inline-block hidden">Home</a>
            <a href="https://github.com/chokychou/news-app-project-web" className="py-2 px-4 hover:opacity-0 transition-opacity duration-500 sm:inline-block hidden" >About</a>
            <a href="https://github.com/chokychou" className="py-2 px-4">Contact</a>
          </nav>
        </div>
        <main id="main" className="bg-gray-100 mx-auto mt-4 py-8 h-screen" >
          <Script
            src="script.js"
            strategy="lazyOnload"
          />
        </main>
      </header>
    </div>
  )
}

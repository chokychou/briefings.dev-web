import Script from 'next/script'
import '../pushpush.js'

export default function Home() {
  return (
    <div>
      <div className="container">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-S2DHEHCCVL"></Script>
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-S2DHEHCCVL');
          `}
        </Script>
      </div>

      <header className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-gray-800 font-bold text-xl"><a href="https://briefings.dev">Briefings.dev</a></h1>
          <nav className="text-gray-600 text-sm">
            <a href="https://briefings.dev" className="py-2 px-4 hover:opacity-0 transition-opacity duration-500 sm:inline-block hidden">Home</a>
            <a href="https://briefings.dev" className="py-2 px-4 hover:opacity-0 transition-opacity duration-500 sm:inline-block hidden" >About</a>
            <a href="https://briefings.dev" className="py-2 px-4">Contact</a>
          </nav>
        </div>
        <main id="main" className="bg-gray-100 mx-auto mt-4 py-8" >
          <Script
            id="query_server"
            strategy="lazyOnload"
          > 
          {
            `
            // const serving_path = 'localhost:$port/api';
            const serving_path = "http://127.0.0.1:5000/";

            // value enum in each row of serving.json
            const serving_columns = {
              url : 0,
              title : 1,
              summary : 3,
            };

            // Timeout function
            //     https://stackoverflow.com/a/57888548/13091479
            const fetchTimeout = (url, ms, {signal, ...options} = {}) => {
              options = options || {
                method: "OPTIONS",
                mode: "origin",
                referrerpolicy: 'no-referrer',
                headers: {
                  "Content-Type": "application/json",
                },
              };
              const controller = new AbortController();
              const promise = fetch(url, { signal: controller.signal, ...options });
              if (signal) signal.addEventListener("abort", () => controller.abort());
              const timeout = setTimeout(() => controller.abort(), ms);
              return promise.finally(() => clearTimeout(timeout));
            };

            // This function display data read from serving.json to html
            function display_serving() {
                fetchTimeout(serving_path, 1000)
                  .then(response => response.json())
                  .then(data => {
                    if (!data) {
                      console.log("No data");
                      return;
                    }

                    // for each value in data dictionary, print it to html
                    for (var key in data) {
                        // add a div to the html
                        document.getElementById("main").appendChild(format_column(key, data[key]));
                    }
                  })
                  .catch(error => console.error(error));
              }

            // This function format the data to be displayed to the serving page
            function format_column(key, values) {
              // Create a new inner div
              const containerDiv = document.createElement("section");
              containerDiv.id = "Article: " + String(parseInt(key) + 1);
              containerDiv.className = "py-8";

              // Create a header div
              const headerA = document.createElement("a");
              headerA.href = values[serving_columns.url];
              headerA.textContent= values[serving_columns.title];
              const headerDiv = document.createElement("h2");
              headerDiv.className = "text-gray-800 text-xl font-bold mb-2";
              headerDiv.appendChild(headerA);

              // Create a body div
              const bodyDiv = document.createElement("div");
              bodyDiv.textContent = values[serving_columns.summary];
              bodyDiv.className = "text-gray-600 leading-relaxed";

              // Add the innermost div to the inner div
              containerDiv.appendChild(headerDiv);
              containerDiv.appendChild(bodyDiv);


              
              return containerDiv;
            }

            display_serving();
            `
          }
          </Script>
        </main>
      </header>
    </div>
  )
}

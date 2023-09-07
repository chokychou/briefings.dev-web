'use client';
import Script from 'next/script'
import React from "react";

export default function Main() {
  const navigation_translation = 'translate-x-0';

  function mainReset() {
    document.getElementById("nav-div")?.classList.remove(navigation_translation);
  }
  
  return (
    <main id="main" className="bg-gray-100 p-10 overflow-hidden" onClick={ mainReset }>
      <Script
        id="query_server"
        strategy="lazyOnload"
      >
        {
          `
            const serving_path = "/backend";

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
              headerDiv.className = "ont-bold tracking-tight text-slate-800 text-xl mb-2 font-bold";
              headerDiv.appendChild(headerA);

              // Create a body div
              const bodyDiv = document.createElement("div");
              bodyDiv.textContent = values[serving_columns.summary];
              bodyDiv.className = "text-slate-600";

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
  )
}
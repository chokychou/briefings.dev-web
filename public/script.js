// const serving_path = 'localhost:$port/api';
const serving_path = "serving.json";

// value enum in each row of serving.json
const serving_columns = {
  url : 0,
  title : 1,
  summary : 3,
};

// This function display data read from serving.json to html
function display_serving() {
    fetch(serving_path)
      .then(response => response.json())
      .then(data => {
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
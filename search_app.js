const inputElement = document.querySelector("[data-search-input]");
const resultElement = document.querySelector("#app");

inputElement.addEventListener("keyup", (event) => {
  const value = event.target.value;
  resultElement.innerHTML = "";

  fetch(`https://itunes.apple.com/search?term=${value}&entity=song`)
    .then((response) => {
      const loader = document.querySelector("p");
      loader.innerText = "Loading data";
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        const results = data.results[i];
        const li = document.createElement("li");
        const ul = document.createElement("ul");
        resultElement.appendChild(ul);
        ul.appendChild(li);
        li.innerText = `${results.artistName}: ${results.trackName}`;
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Error!");
    });
});

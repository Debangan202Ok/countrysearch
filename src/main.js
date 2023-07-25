import "./main.css";
const mContainer = document.getElementById("mainContainer");
const searchInput = document.getElementById("searchInput");
//render countries in html
function renderCountries(countries) {
  const countriesHTML = `
  <container
  class="flex m-4 flex-row md:flex-col w-[80vw] md:w-fit  items-center p-2 rounded-md bg-slate-50 shadow-md"
>
  <div
    id="imgSec"
    class="flex border-2 w-[250px] h-fit overflow-hidden rounded-md object-cover"
  >
    <img
      src="${countries.flags.png}"
      alt="image"
      class="object-cover"
    />
  </div>
  <div id="textSec" class="flex flex-col overflow-hidden px-2">
    <h1 class="font-bold text-xl">${countries.name.common}</h1>
    <b>Region: ${countries.region}</b>
    <b>Capital: ${countries.captial}</b>
  </div>
</container>
    `;
  mContainer.insertAdjacentHTML("beforeend", countriesHTML);
}
let stData;
// fetch data from api
function getData() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      stData = [...data];
      data.map((country) => {
        renderCountries(country);
      });
    })
    .catch((err) => console.log(err));
}
getData();

searchInput.addEventListener("input", (e) => {
  const val = e.target.value;
  const filteredData = stData.filter((country) => {
    return country.name.common.toLowerCase().includes(val.toLowerCase());
  });
  mContainer.innerHTML = "";
  filteredData.map((country) => {
    renderCountries(country);
  });
});

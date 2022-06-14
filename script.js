"use strict";

const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

const input = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

fetch(endpoint)
  .then((response) => {
    if (!response) {
      throw new Error("Could'nt get the data");
    }
    return response.json();
  })
  .then((data) => data.forEach((city) => cities.push(city)));

const findMatches = function (wordToMatch, cities) {
  return cities.filter((c) => {
    const regex = new RegExp(wordToMatch, "gi");
    return c.city.match(regex) || c.state.match(regex);
  });
};
const numberWithCommas = function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const displayMatches = function () {
  suggestions.innerHTML = "";
  const resultArr = findMatches(this.value, cities);
  const html = resultArr
    .map((c) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = c.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = c.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `<li>
    <span class="name">${cityName},${stateName}</span>
    <span class="population">Pop: ${numberWithCommas(c.population)}</span>
    </li>`;
    })
    .join("");
  suggestions.innerHTML = html;
};

input.addEventListener("keyup", displayMatches);

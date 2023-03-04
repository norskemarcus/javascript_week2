document.getElementById("svg2").onclick = getDetails;

const URL = "https://countries.plaul.dk/api/countries/";

// Color to target is made with help from Peter Lind

let lastTarget;

function getDetails(evt) {
  const target = evt.target;

  target.style.fill = "green";

  // if not undefined
  if (lastTarget) {
    lastTarget.style.fill = "#dcdcdc";
  }
  lastTarget = target;

  const id = target.id;

  fetch(URL + id)
    .then((response) => response.json())
    .then((countryInfo) => {
      document.getElementById("flag").src = countryInfo.flag;
      document.querySelector("#name").innerText = countryInfo.name.common;
      document.querySelector("#un-member").innerText = countryInfo.unMember;

      let currency = Object.keys(countryInfo.currencies)[0];

      document.querySelector("#currencies").innerText = `${currency}, 
      name: ${countryInfo.currencies[currency].name}, symbol: ${countryInfo.currencies[currency].symbol}`;

      document.querySelector("#capital").innerText = countryInfo.capital;
      document.querySelector("#borders").innerText = countryInfo.borders;
      countryInfo.borders.join(", ");
    });
}

// Go back button
document.getElementById("btn-back").onclick = goBack;

function goBack() {
  window.location.href = "index.html";
}

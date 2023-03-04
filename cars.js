const URL = "http://localhost:8080/api/cars";

// Find a single car
document.querySelector("#btn-find").onclick = getCarById;

function getCarById() {
  const id = encode(document.querySelector("#text-for-id").value);
  //document.getElementById("p-error").innerText = "";

  //document.getElementById("table-body-car").innerHTML = tableRows;

  if (!id) {
    return Promise.reject("Car with id " + id + " not found");
  }

  document.getElementById("p-error").innerText = "";

  fetch(URL + "/" + id)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject("Car with id " + id + " not found");
      }
      return res.json();
    })
    .then((data) => {
      document.getElementById("p-id").innerText = data.id;
      document.getElementById("p-brand").innerText = data.brand;
      document.getElementById("p-model").innerText = data.model;
      document.getElementById("p-price").innerText = data.pricePrDay;
    })
    .catch((error) => (document.getElementById("p-error").innerText = error));
}

/* --------------------------------------------------------------------------------------------------------------*/
// Eventlistener to push the button Get all and show all cars
document.getElementById("btn-get-all").onclick = getAllCars;

function getAllCars() {
  /*  */
  fetch(URL)
    .then((response) => response.json()) // eller .text etc.
    .then((cars) => makeTable(cars));
}

function makeTable(cars) {
  const tableRows = cars
    .map(
      (car) => `
  <tr>
  <td>${car.id}</td>
  <td>${car.brand}</td>
  <td>${car.model}</td>
  <td>${car.pricePrDay}</td>
  </tr>`
    )
    .join(""); // Laver den om til en enkelt streng

  document.getElementById("table-body-cars").innerHTML = tableRows;
}

/* -------------------------------------------------------------------------------------- */
// Add a car
document.querySelector("#submit-new-car").onclick = addCar;

function addCar() {
  const brand = document.querySelector("#input-brand").value;
  const model = document.querySelector("#input-model").value;
  const price = document.querySelector("#input-price").value;

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      brand: brand,
      model: model,
      pricePrDay: price,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then(() => {
      document.querySelector("#input-brand").value = "";
      document.querySelector("#input-model").value = "";
      document.querySelector("#input-price").value = "";
      getAllCars();
    })
    .catch((error) => console.log(error));
}

// Adde dette når ting virker
/* async function handleHttpErrors(res) {
  if (!res.ok) {
    const errorResponse = await res.json();
    const error = new Error(errorResponse.message);
    error.apiError = errorResponse;
    throw error;
  }
  return res.json();
}
 */

/* -------------------------------------------------------------------------------------------------*/
// Edit a car

// First find the car with that id (GET) --> but the result should be abled to change. How?
// http://localhost:8080/api/cars/ + id

// Find a single car
document.querySelector("#btn-find-car-to-edit").onclick = getCarByIdToEdit;

function getCarByIdToEdit() {
  //TODO: adde encode when it works!
  const id = document.querySelector("#text-for-id2").value;
  document.getElementById("p-error").innerText = "";

  fetch(URL + "/" + id)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject("Car with id: " + id + " not found");
      }
      return res.json();
    })
    .then((data) => {
      document.querySelector("#text-for-id2").value = data.id;
      document.getElementById("p-brand-edit").value = data.brand;
      document.getElementById("p-model-edit").value = data.model;
      document.getElementById("p-price-edit").value = data.pricePrDay;
    })
    .catch(
      (error) => (document.getElementById("error-edit-car").innerText = error)
    );
}

// Edit the car that is found:
document.querySelector("#btn-edit-car").onclick = editCar;

function editCar() {
  const idNotEdit = document.querySelector("#text-for-id2").value;
  const brandEdit = document.querySelector("#p-brand-edit").value;
  const modelEdit = document.querySelector("#p-model-edit").value;
  const priceEdit = document.querySelector("#p-price-edit").value;

  fetch(URL + "/" + idNotEdit, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: idNotEdit,
      brand: brandEdit,
      model: modelEdit,
      pricePrDay: priceEdit,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      document.querySelector("#text-for-id2").value = "";
      document.querySelector("#p-brand-edit").value = "";
      document.querySelector("#p-model-edit").value = "";
      document.querySelector("#p-price-edit").value = "";

      /* document.querySelector("#edited-car").innerText =
        "The car with id " + idNotEdit + " is edited"; */
    })
    .catch(
      (error) => (document.getElementById("error-edit-car").innerText = error)
    );
}

//Utility function you can use to escape "untrusted" data inputs
//Ref: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
function encode(str) {
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/"/g, "&quot;");
  str = str.replace(/'/g, "&#039;");
  return str;
}

// Go back button
document.getElementById("btn-back").onclick = goBack;

function goBack() {
  window.location.href = "index.html";
}

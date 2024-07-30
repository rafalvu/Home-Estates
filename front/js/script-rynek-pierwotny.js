/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

// Select all textareas on the page
var textareas = document.querySelectorAll("textarea");

// Attach the autoResize function to the input event
for (let textarea of textareas) {
  textarea.addEventListener("input", function () {
    autoResize(this);
  });

  // Call the function initially to resize on page load
  autoResize(textarea);
}
const apiUrl = "https://app.esticrm.pl/apiClient/offer/list";
const companyId = "8160";
const token = "4e921a377b";
const skip = 0;
const take = 9;
const status = "3,99";
const updateDate = "2022-07-09 12:00:00";

const url = `${apiUrl}?company=${companyId}&token=${token}&skip=${skip}&take=${take}&status=${status}&updateDate=${updateDate}`;

fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    // Dodajemy te nagłówki, aby symulować zachowanie przeglądarki
    Accept: "application/json, text/plain, */*",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
  mode: "cors",
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    // console.log("Success:", data);
    // console.log(data.data[0]);
    for (let i = 0; i < 9; i++) {
      const aptPicture = data.data[i].pictures[0];
      const aptStreetName = data.data[i].locationStreetName;
      const aptPrice = data.data[i].price;
      const aptPricePermeter = data.data[i].pricePermeter;
      const aptAreaTotal = data.data[i].areaTotal;
      const aptRoomNumber = data.data[i].apartmentRoomNumber;

      const aptElement = document.querySelector(`.apt${i}`);
      if (aptElement) {
        aptElement.src = aptPicture;
        aptElement.style.height = "20em";
        aptElement.style.width = "30em";
      }

      const aptTitle = document.querySelector(`.apt${i}-title`);
      if (aptTitle) {
        aptTitle.textContent = "Lokalizacja: " + aptStreetName;
        aptTitle.style.margin = "5px 0 0 0";
      }

      const aptPrice2 = document.querySelector(`.apt${i}-price`);
      if (aptPrice2) {
        aptPrice2.textContent = "Cena: " + Math.round(aptPrice) + " PLN";
        aptPrice2.style.margin = "5px 0 0 0";
      }

      const aptPricePermeter2 = document.querySelector(
        `.apt${i}-price-permeter`
      );
      if (aptPricePermeter2) {
        aptPricePermeter2.textContent =
          "Cena: " + Math.round(aptPricePermeter) + " PLN";
        aptPricePermeter2.style.margin = "5px 0 0 0";
      }

      const aptAreaTotal2 = document.querySelector(`.apt${i}-area-total`);
      if (aptAreaTotal2) {
        aptAreaTotal2.textContent = "Metraż: " + aptAreaTotal + " m²";
        aptAreaTotal2.style.margin = "5px 0 0 0";
      }

      const aptRoomNumber2 = document.querySelector(`.apt${i}-room-number`);
      if (aptRoomNumber2) {
        aptRoomNumber2.textContent = "Ilość pokoi: " + aptRoomNumber;
        aptRoomNumber2.style.margin = "5px 0 0 0";
      }
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

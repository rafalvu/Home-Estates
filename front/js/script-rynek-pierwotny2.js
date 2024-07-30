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

  
  const apiUrl = "https://homeestates.pl/api/proxy";

async function fetchData() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    processApartments(data.data);
  } catch (error) {
    console.error("Error:", error);
  }
}

function processApartments(apartments) {
  apartments.slice(0, 9).forEach((apt, i) => {
    const aptPicture = apt.pictures[0];
    const aptStreetName = apt.locationStreetName;
    const aptPrice = apt.price;
    const aptPricePermeter = apt.pricePermeter;
    const aptAreaTotal = apt.areaTotal;
    const aptRoomNumber = apt.apartmentRoomNumber;

    updateElement(`.apt${i}`, {
      src: aptPicture,
      style: { height: "20em", width: "30em" },
    });

    updateElement(`.apt${i}-title`, {
      textContent: `Lokalizacja: ${aptStreetName}`,
      style: { margin: "5px 0 0 0" },
    });

    updateElement(`.apt${i}-price`, {
      textContent: `Cena: ${Math.round(aptPrice)} PLN`,
      style: { margin: "5px 0 0 0" },
    });

    updateElement(`.apt${i}-price-permeter`, {
      textContent: `Cena: ${Math.round(aptPricePermeter)} PLN`,
      style: { margin: "5px 0 0 0" },
    });

    updateElement(`.apt${i}-area-total`, {
      textContent: `Metraż: ${aptAreaTotal} m²`,
      style: { margin: "5px 0 0 0" },
    });

    updateElement(`.apt${i}-room-number`, {
      textContent: `Ilość pokoi: ${aptRoomNumber}`,
      style: { margin: "5px 0 0 0" },
    });
  });
}

function updateElement(selector, { src, textContent, style }) {
  const element = document.querySelector(selector);
  if (element) {
    if (src) element.src = src;
    if (textContent) element.textContent = textContent;
    if (style) Object.assign(element.style, style);
  }
}

// Wywołanie funkcji fetchData po załadowaniu DOM
document.addEventListener('DOMContentLoaded', fetchData);
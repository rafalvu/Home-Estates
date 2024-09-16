const swiper = new Swiper(".swiper", {
  // Optional parameters
  speed: 500,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
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

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const phoneIcon = document.querySelector(".fa-phone");
  const envelopeIcon = document.querySelector(".fa-envelope");

  // Funkcja zmieniająca kolory ikon w zależności od sekcji
  function changeIconColor() {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        // Przykładowa logika: zmiana koloru w zależności od ID sekcji
        switch (section.id) {
          case "landing":
            phoneIcon.style.color = "#f3f3f3";
            envelopeIcon.style.color = "#f3f3f3";
            break;
          case "o-nas":
            phoneIcon.style.color = "#131314";
            envelopeIcon.style.color = "#131314";
            break;
          case "najnowsze-oferty":
            phoneIcon.style.color = "#f3f3f3";
            envelopeIcon.style.color = "#f3f3f3";
            break;
          case "sprzedaj-z-nami":
            phoneIcon.style.color = "#f3f3f3";
            envelopeIcon.style.color = "#f3f3f3";
            break;
          case "team":
            phoneIcon.style.color = "#f3f3f3";
            envelopeIcon.style.color = "#f3f3f3";
            break;
          default:
            phoneIcon.style.color = "#f3f3f3";
            envelopeIcon.style.color = "#f3f3f3";
        }
      }
    });
  }

  // Nasłuchiwanie na zdarzenia scroll i resize
  window.addEventListener("scroll", changeIconColor);
  window.addEventListener("resize", changeIconColor);

  // Pierwsze wywołanie funkcji na wypadek, gdyby sekcja była już widoczna
  changeIconColor();
});

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
  // mode: 'no-cors',
  headers: {
    "Content-Type": "application/json",
    // Dodajemy te nagłówki, aby symulować zachowanie przeglądarki
    AccessControlAllowOrigin: "https://app.esticrm.pl/apiClient/offer/list",
    Accept: "application/json, text/plain, /",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    // console.log("Success:", data);
    // console.log(data.data[2]);
    for (let i = 0; i < 3; i++) {
      const aptPicture = data.data[i].pictures[0];
      const aptStreetName = data.data[i].locationStreetName;

      const aptElement = document.querySelector(`.apt${i}`);
      if (aptElement) {
        aptElement.src = aptPicture;
      }

      const aptTitle = document.querySelector(`.apt${i}-title`);
      if (aptTitle) {
        aptTitle.textContent = aptStreetName;
      }
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

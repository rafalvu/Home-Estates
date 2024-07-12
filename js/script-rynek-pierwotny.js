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
    console.log(data.data[0]);
    for (let i = 0; i < 9; i++) {
      const aptPicture = data.data[i].pictures[0];
      const aptStreetName = data.data[i].locationStreetName;
      
      const aptElement = document.querySelector(`.apt${i}`);
      if (aptElement) {
        aptElement.src = aptPicture;
        aptElement.style.height = "20em";
        aptElement.style.width = "30em";
      }
    
      const aptTitle = document.querySelector( `.apt${i}-title`);
      if (aptTitle) {
        aptTitle.textContent = "Lokalizacja: " + aptStreetName;
      }
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });


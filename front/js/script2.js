/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
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

document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "/api/apiClient/offer/list";
  const companyId = "8160";
  const token = "4e921a377b";
  const skip = 0;
  const take = 9;
  const apiStatus = "3,99";
  const updateDate = "2022-07-09 12:00:00";

  const url = `${apiUrl}?company=${companyId}&token=${token}&skip=${skip}&take=${take}&status=${apiStatus}&updateDate=${updateDate}`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
      console.log("Success:", data);

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
});

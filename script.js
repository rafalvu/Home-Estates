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
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  
  // Select all textareas on the page
  var textareas = document.querySelectorAll('textarea');
  
  // Attach the autoResize function to the input event
  for (let textarea of textareas) {
    textarea.addEventListener('input', function() {
      autoResize(this);
    });
  
    // Call the function initially to resize on page load
    autoResize(textarea);
  }
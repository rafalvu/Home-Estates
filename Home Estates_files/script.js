document.querySelector('.logo').addEventListener('click', function(e) {
    e.target.classList.add('logo-clicked');
  
    setTimeout(function() {
      e.target.classList.remove('logo-clicked');
    }, 300); // remove the class after the animation duration
  });
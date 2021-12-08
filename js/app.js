// Function for burger menu

const navSlider = function() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-unique');

  burger.addEventListener('click', function() {

    nav.classList.toggle('nav-active');
    burger.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  });
}

navSlider();
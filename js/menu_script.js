document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.querySelector(".burger_menu");
  const menu = document.querySelector(".menu");

  burgerMenu.addEventListener("click", function () {
    menu.classList.toggle("active");
    burgerMenu.classList.toggle("cat_mode");
  });
});

/********* Lavet med chatGPT *********/

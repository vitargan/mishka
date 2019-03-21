var link = document.querySelector(".page-header__togle");
var nav = document.querySelector(".main-nav");
var toggleClose = document.querySelector(".page-header__close");
var toggleOpen = document.querySelector(".page-header__open");
var navOpen = document.querySelector(".main-nav__open");
var pageHeader = document.querySelector(".page-header");

  toggleOpen.classList.add("page-header__open");
  nav.classList.add("main-nav__open");
  pageHeader.classList.remove("page-header__height");


link.addEventListener("click", function (evt) {
  evt.preventDefault();
  toggleOpen.classList.toggle("page-header__open");
  toggleOpen.classList.remove("page-header__close");
});

 link.addEventListener("click", function (evt) {
  evt.preventDefault();
  toggleClose.classList.toggle("page-header__open");
});

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  nav.classList.toggle("main-nav__open");
});

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  pageHeader.classList.toggle("page-header__height");
});





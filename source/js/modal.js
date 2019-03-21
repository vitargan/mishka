(function() {
  "use strict";

 // for modal
  var modal = document.querySelector(".select-size");
  var modalOpen = document.querySelectorAll(".js-modal-open");
  var modalClose = document.querySelectorAll(".js-modal-close");

  if (modal && modalOpen) {
    handleModal();
  }

  function handleModal() {
    for (var i = 0; i < modalOpen.length; i++) {
      modalOpen[i].addEventListener("click", function(e) {
        e.preventDefault();
        modal.classList.remove("modal--closed");
      });
    }

    for (var i = 0; i < modalClose.length; i++) {
      modalClose[i].addEventListener("click", function(e) {
        e.preventDefault();
        modal.classList.add("modal--closed");
      });
    }
  }

})();

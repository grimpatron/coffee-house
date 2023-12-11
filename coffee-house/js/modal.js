var modal = document.getElementById("modalWrapper");      // Get the modal
var span = document.querySelector(".modal-close");        // Get the <span> element that closes the modal
var btn = document.querySelector(".menu__tab--active");   // Get the button that opens the modal

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




// function createCard(category) {
//   const prodName = document.querySelector('#product-name');
//   const prodText = document.querySelector('#product-text');
//   const prodAdd1 = document.querySelector('#product-additives-1');
//   const prodAdd2 = document.querySelector('#product-additives-2');
//   const prodAdd3 = document.querySelector('#product-additives-3');
//   const prodSize1 = document.querySelector('#product-size-1');
//   const prodSize2 = document.querySelector('#product-size-2');
//   const prodSize3 = document.querySelector('#product-size-3');
//   const prodPrice = document.querySelector('#product-price');
// }

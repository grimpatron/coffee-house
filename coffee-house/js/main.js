(function () {
  var toggle = document.querySelector('.header__burger-button');
  
  toggle.addEventListener('click', function(e) {
    this.classList.toggle('opened');
  });
})();
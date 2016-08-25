$( document ).ready(function() {
  
  $('.hamburger').click(function(e) {
        $('.main-nav').toggleClass('active');
        e.preventDefault();
    });

});


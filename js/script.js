$( document ).ready(function() {
  
  var sectionsArray = []; //we create an empty array to hold our section names as well as their scroll-top values
  var navHeight = $(".nav").height(); // get the height of the nav
  var windowHeight = $(window).height(); //get the height of the window
  $('.header, .section').css('min-height',windowHeight); //set each of our section's height to the height of the window.
  var headerHeight = $(".header").height(); //get the header height

  //here we loop through each section of our site and capture it's name and top-scroll value
  // and put it inside our sectionsArray variable that we made at the top of the page. 
  //each section is saved as an object with 2 properties: top and name
  $(".section").each(function() {
      var element = $(this),
          topValue = element.position().top - (navHeight * 2), //this gets the scroll-top value of this section
          sectionName = element.attr("data-section"); //this gets the name of the section that we have put inside a custom data-attribute called data-section
      sectionsArray.push({top:topValue, name: sectionName}); //here we create our section object and push it to our array
  });

  //when learn-more is clicked take us to the about section
  $("a.learn-more").on("click", function() {
    goToTargetSection("about");
  });
  
  //when a nav item is clicked -- navigate to that section
  $('body').on('click','.nav li', function(){
    var element = $(this),
        section = element.attr("id");
    goToTargetSection(section);  
  });

  //this is a scroll event. everything inside this function runs everytime the page is scrolled 
  $(window).bind("scroll", function() {
    var scrollTop = $(window).scrollTop(); //get the current top-scroll value
    //if the value of the current scroll-top is higher than the height of our first section, make the nav stick to the top of the page 
    if (scrollTop > headerHeight) {
      $(".nav").addClass("fixed");
    }
    else {
      //if it is not, keep the nav where it is 
      $(".nav").removeClass("fixed");
    }
    //here we loop through our sectionsArray that we created and check to see if our currecnt scroll-top value is whithin any of our section
    //if we find the match, we add the active class to the nav item representing that section
    for (var i = 0; i < sectionsArray.length; i++) {
      if (scrollTop >= (sectionsArray[i].top)) {
        $(".nav li").removeClass("active");
        $("#" + sectionsArray[i].name).addClass("active");
      }else{
        if (scrollTop < sectionsArray[0].top ){
          $(".nav li").removeClass("active");
        }
      }
    };
  });

  //the job of this function is to get the section name and scroll the page to that section.
  // it does this by looping through the sectionsArray that we created and finding the name of the section that we pass
  //when it finds the section, it looks through the top-scroll value and scroll the page to that number 
  function goToTargetSection(section){
    for (var i = 0; i < sectionsArray.length; i++) {
      if(sectionsArray[i].name == section){
        $("body").animate({scrollTop: sectionsArray[i].top}, 1000);
      }
    }
  }

});


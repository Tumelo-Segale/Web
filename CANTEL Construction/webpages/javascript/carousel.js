//create variable to indicate the current index of the slide
let slideIndex = 0;

//query selector all will collect all classes with the .carouselimage in an array
const slides = document.querySelectorAll(".carouselSlide");

//function to
function showNextSlide() {
  // on run the active img is already displaying
  // this will now remove the active in the classlist of the array
  slides[slideIndex].classList.remove("active");

  //this increments the index
  // the modulus side helps it loop back to the begining no
  //e.g if 1 = (1+1) % 3 = 2%3 == 2
  //(2+1) % 3 = 3%3 == 0 loops back to original o
  slideIndex = (slideIndex + 1) % slides.length;

  //now add the active keyword as secondary class name to the next slide index in the array
  slides[slideIndex].classList.add("active");
}

// automates function at certain duration
setInterval(showNextSlide, 4000);

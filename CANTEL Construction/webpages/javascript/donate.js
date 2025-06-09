//collect   element nameddonatebtn
// add event listener click to run the function(e) for event
document.querySelector(".donateBtn").addEventListener("click", function (e) {
  //stop the default action of the anchor or the selected element
  e.preventDefault(); // Prevent default anchor behavior

  // find the div by the id selector and set display style to flex
  document.getElementById("donationModal").style.display = "flex";
});

// add a click event listener to the entire window screen not the element
// so that when click outside this div will disappear
window.addEventListener("click", function (e) {
  // find the div i want to make disappear
  const modal = document.getElementById("donationModal");

  //e.target is the place clicked and if it is the same as the modal
  // if the target is within display window where modal is then close
  if (e.target === modal) {
    //make it disappear
    modal.style.display = "none";
  }
});

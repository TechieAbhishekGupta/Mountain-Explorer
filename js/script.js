/**
 * Student Information
 * Name: Abhishek Gupta
 * Student ID: 21810094
 */

//====================== Loader Starts ====================================
// // Checking if the current page is the landing page
// if (
//   window.location.pathname.endsWith("pages/index.html") ||
//   window.location.pathname.endsWith("pages/")
// ) {
//   // Showing the loader when the page is loading
//   window.onload = function () {
//     document.getElementById("loader").style.display = "flex";
//   };

//   // Hiding the loader after a delay to simulate loading time
//   setTimeout(function () {
//     document.getElementById("loader").style.display = "none";
//   }, 1000); // 1000ms = 1 seconds
// }
// Function to show the loader
function showLoader() {
  document.getElementById("loader").style.display = "flex";
}

// Function to hide the loader
function hideLoader() {
  setTimeout(function () {
    document.getElementById("loader").style.display = "none";
  }, 500); // Delay of 1000ms = 1 second
}

// Showing the loader when the page starts loading
showLoader();

// Hiding the loader when all content is fully loaded
window.onload = function () {
  hideLoader();
};
//====================== Loader Ends ====================================

// ===================== Go To Top Btn Starts =================================
// Getting the button element
var goToTopBtn = document.getElementById("goToTopBtn");

// When the user scrolls down 20px from the top of the document, showing the button
window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTopBtn.style.display = "block";
  } else {
    goToTopBtn.style.display = "none";
  }
};

// When the user clicks on the button, scrolling to the top of the document
goToTopBtn.addEventListener("click", function () {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
});
// ===================== Go To Top Btn Ends =================================

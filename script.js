const scrollButton = document.querySelector("#scrollButton");
const main = document.querySelector("#main");
const navLink = document.querySelector('.nav-link');

scrollButton.addEventListener("click", () => {
  // 64 (magic number) is the height of the navbar. 
  // If possible, get this value dynamically 
  const mainTop = main.getBoundingClientRect().top - 64;
  
  window.scrollTo({
    top: mainTop,
    behavior: "smooth",
  });
});

function toggleMenu() {
  const menuIcon = document.querySelector("#menu-icon");

  navLink.classList.toggle("active");
  menuIcon.classList.toggle("active"); // Toggle the active class on the menu icon
}

// This will allow to close the menu when a link is clicked
// for smaller screens. Otherwise, the menu will remain open
// after a link is clicked.
navLink.addEventListener('click', toggleMenu);

const scrollButton = document.querySelector("#scrollButton");
const main = document.querySelector("#main");
const navLink = document.querySelector('.nav-link');
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link a');
const header = document.querySelector('#header');
const hero = document.querySelector('#hero');


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

function changeLinkState() {
  let activeSectionIndex = -1
  for (let i = 0; i < sections.length; i++) {
    const currentPosition = hero.clientHeight + window.scrollY - 50;
    const isCurrentSectionInView =
      currentPosition >= sections[i].offsetTop &&
      currentPosition < sections[i].offsetTop + sections[i].clientHeight;
    if (isCurrentSectionInView) {
      activeSectionIndex = i;
      break;
    }
  }
  highlightActiveSection(activeSectionIndex);
}

// This will allow to close the menu when a link is clicked
// for smaller screens. Otherwise, the menu will remain open
// after a link is clicked.
navLink.addEventListener('click', toggleMenu);

// Add Active Class Based on Scroll Position
window.addEventListener('scroll', changeLinkState);

// Listen for click events on links with href starting with '#'
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
      // Prevent the default anchor behavior
      e.preventDefault();

      // Get the target section ID from the href attribute of the clicked link
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
          // Scroll to the target section with smooth behavior and specific alignment
          targetSection.scrollIntoView({
              behavior: 'smooth', // Smooth scroll
              block: 'end', // Vertical alignment: 'start', 'center', 'end', or 'nearest'
              inline: 'nearest', // Horizontal alignment: 'start', 'center', 'end', or 'nearest',
          });
          
          // Update the URL in the address bar without reloading the page
          history.pushState(null, "", targetId);
      }
  });
});

// Highlight the active section in the navbar
function highlightActiveSection(activeSectionIndex) {
  navLinks.forEach((link) => link.classList.remove('active-link'));
  if (activeSectionIndex >= 0) {
    navLinks[activeSectionIndex].classList.add('active-link');
  }
}


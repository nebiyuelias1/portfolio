const scrollButton = document.querySelector("#scrollButton");
const main = document.querySelector("#main");

scrollButton.addEventListener("click", () => {
  // 64 (magic number) is the height of the navbar. 
  // If possible, get this value dynamically 
  const mainTop = main.getBoundingClientRect().top - 64;
  
  window.scrollTo({
    top: mainTop,
    behavior: "smooth",
  });
});

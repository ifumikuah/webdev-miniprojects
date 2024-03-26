// Mobile Hamburger Menu

const hamburgerOpen = document.getElementById("mobile__nav-btn");
const offcanvasClose = document.getElementById("mobile__offcanvas-close");
const offcanvas = document.getElementById("mobile__nav-offcanvas");

const toggleOffcanvas = () => {
  offcanvas.classList.toggle("offcanvas-show");
};

hamburgerOpen.addEventListener("click", () => toggleOffcanvas());
offcanvasClose.addEventListener("click", () => toggleOffcanvas());

// Toggle Toc

const tocContainer = document.getElementById("toc-container");
const tocToggler = document.getElementById("toggle-toc");
const tocHeight = tocContainer.clientHeight

tocToggler.addEventListener("click", (e) => {
  tocContainer.classList.toggle("toc-container--hidden");
  if (tocContainer.classList.contains("toc-container--hidden")) {
    e.target.innerText = "Show Table of Content"
  } else {
    e.target.innerText = "Hide Table of Content"
  }
})

// Theme Switch

const theme = document.getElementById("theme-switcher")
const themeIcon = document.getElementById("theme-icon")
const brandImg = document.getElementById("brand-img")

theme.addEventListener("click", () => {
  const currTheme = document.body.getAttribute("data-theme")
  const setTheme = currTheme === "light" ? "dark" : "light"
  document.body.setAttribute("data-theme", setTheme);

  if (currTheme === "light") {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    brandImg.src = "assets/world-svgrepo-com-dark.svg";
  }
  if (currTheme === "dark") {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    brandImg.src = "assets/world-svgrepo-com-light.svg";
  }
})
const closebtn = document.querySelector(".navbar--mobile__closebtn");
const openbtn = document.querySelector(".navbar--mobile__openbtn");
const offcanvas = document.querySelector(".navbar__offcanvas");


openbtn.addEventListener("click", (e) => {
  e.preventDefault();
  offcanvas.classList.add("active")
})

closebtn.addEventListener("click", (e) => {
  e.preventDefault();
  offcanvas.classList.remove("active")
})

const langbtn = document.getElementById("lang-btn")
const langContext = document.getElementById("lang-context")

langbtn.addEventListener("click", (e) => {
  e.preventDefault()
  langContext.classList.toggle("context__active")
})
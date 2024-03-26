const hero = document.getElementById("hero-img");

hero.src =
  window.innerWidth <= 475
    ? "assets/images/illustration-sign-up-mobile.svg"
    : "assets/images/illustration-sign-up-desktop.svg";


const emailForm = document.getElementById("email-form");
const emailInput = document.getElementById("email-input");
const formSubmit = document.getElementById("form-submit");

const validateInput = (e) => {
  e.preventDefault()
  const checkInput = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(emailInput.value);
  const isValid = checkInput ? "true" : "false";
  emailForm.setAttribute("data-valid", isValid)

  if (emailForm.getAttribute("data-valid") === "true") {
    window.location.replace(
      `${window.location.origin}${window.location.pathname}/success.html?mail=${emailInput.value}`
    );  
  }
}

formSubmit.addEventListener("click", (e) => validateInput(e));

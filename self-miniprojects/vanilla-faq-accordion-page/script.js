const questionWrapper = document.querySelectorAll(".js-question");

questionWrapper.forEach(el => {
  el.parentElement.addEventListener("click", () => {
    const answer = el.nextElementSibling;
    el.classList.toggle("expanded")

    if (el.classList.contains("expanded")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = 0
    }
  })
})
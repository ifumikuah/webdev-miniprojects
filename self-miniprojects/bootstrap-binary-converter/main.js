// Import our custom CSS
import "./scss/styles.scss";

// Import all of Bootstrap's JS
import {} from "bootstrap";

const toggleTheme = document.getElementById("cstToggleTheme");
const rootDocument = document.documentElement;

const changeTheme = () => {
  const currentTheme = rootDocument.getAttribute("data-bs-theme");
  const theme = currentTheme === "light" ? "dark" : "light";

  rootDocument.setAttribute("data-bs-theme", theme);
};

toggleTheme.addEventListener("click", () => changeTheme());

const asciiTextarea = document.getElementById("formTextareaUTF");
const binaryTextarea = document.getElementById("formTextareaBinary");

const TextToBinary = (dec) => {
  dec = dec === " " ? " ".charCodeAt() : dec.charCodeAt();

  let array = [];

  while (dec !== 0) {
    array[array.length] = dec % 2;
    dec = Math.floor(dec / 2);
  }

  array.reverse();
  return array.join("").padStart(8, "0");
};

const BinaryToText = (bin) => {
  return String.fromCharCode(parseInt(bin, 2));
};

const watchBinary = (e) => {
  asciiTextarea.value = e.target.value
    .split(" ")
    .map((bin) => BinaryToText(bin))
    .join("");
};

const watchAscii = (e) => {
  binaryTextarea.value = e.target.value
    .split("")
    .map((char) => TextToBinary(char))
    .join(" ");
};

asciiTextarea.addEventListener("keyup", (e) => watchAscii(e));
asciiTextarea.addEventListener("change", (e) => watchAscii(e));
binaryTextarea.addEventListener("keyup", (e) => watchBinary(e));
binaryTextarea.addEventListener("change", (e) => watchBinary(e));

const clipboardText = document.getElementById("clipboardText");
const clipboardBinary = document.getElementById("clipboardBinary");

const copyText = (element) => {
  element.select();
  element.setSelectionRange(0, 9999);

  navigator.clipboard.writeText(element.value);
};

clipboardText.addEventListener("click", () => copyText(asciiTextarea));
clipboardBinary.addEventListener("click", () => copyText(binaryTextarea));

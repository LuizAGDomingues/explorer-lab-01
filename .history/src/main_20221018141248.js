import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path").setAttribute("fill", "green");
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path").setAttribute("fill", "blue");

const colors = {
  'visa': [],
  'mastercard': [],
  'default': []
}
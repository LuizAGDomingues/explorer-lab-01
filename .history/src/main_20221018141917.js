import "./css/index.css"

function setCardType(type){
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
  }

  const ccBgColor01 = document
    .querySelector(".cc-bg svg > g g:nth-child(1) path")
    .setAttribute("fill", colors[type][0])
  const ccBgColor02 = document
    .querySelector(".cc-bg svg > g g:nth-child(2) path")
    .setAttribute("fill", colors[type][1])
  const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")
}

setCardType('mastercard')

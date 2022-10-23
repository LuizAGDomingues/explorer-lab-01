import IMask from "imask"
import "./css/index.css"

function setCardType(type) {
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
  const ccLogo = document
    .querySelector(".cc-logo span:nth-child(2) img")
    .setAttribute("src", `cc-${type}.svg`)
}
globalThis.setCardType = setCardType

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)


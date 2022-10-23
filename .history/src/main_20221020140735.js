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

// Adição das mascarás no formulário

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5[1-5]\d{0,2}|^22[2-9]\d{0,1}|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    console.log(foundMask.cardtype)
    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const cardName = document.querySelector("#card-holder")
const cardNamePattern = {
  mask: /^\D+$/,
}
const cardNameMasked = IMask(cardName, cardNamePattern)

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

// Atualização dos dados na imagem de cartão

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText =
    cardHolder.value.length === 0 ? "EXEMPLO DE NOME" : cardHolder.value
})

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText =
    cardNumberMasked.value.length === 0
      ? "1234 5678 9012 3456"
      : cardNumberMasked.value
})

expirationDateMasked.on("accept", () => {
  const ccExpiration = document.querySelector(".cc-extra .value")
  ccExpiration.innerText = expirationDateMasked.value.length === 0 ? "02/32" : expirationDateMasked.value
})

securityCodeMasked.on("accept", () => {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText =
    securityCodeMasked.value.length === 0 ? "123" : securityCodeMasked.value
})

// Adição do cartão finalizando o formulário

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("Cartão adicionado com sucesso!")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

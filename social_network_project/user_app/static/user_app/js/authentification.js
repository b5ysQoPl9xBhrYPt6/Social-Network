const authDivElement         = document.querySelector("#regLogDiv")

const regElement             = document.querySelector("#regTitle")
const logElement             = document.querySelector("#logTitle")

const mailInputElement       = document.querySelector("#mailInput")
const passwordElement        = document.querySelector("#passwordInput")
const confirmPasswordElement = document.querySelector("#confirmPasswordInput")

const regFormElement         = document.querySelector("#regForm")
const logFormElement         = document.querySelector("#logForm")

const welcomeTextElement     = document.querySelector("#welcomeText")


function goto(page) {
    if (page == "reg") {
        regElement.style.color = "#070A1C"
        regElement.style.textDecoration = "underline"
        logElement.style.color = "#81818D"
        logElement.style.textDecoration = "none"

        welcomeTextElement.textContent = "Приєднуйся до World IT"
        
        regFormElement.removeAttribute("style")
        logFormElement.setAttribute("style", "display: none;")
    } else {
        regElement.style.color = "#81818D"
        regElement.style.textDecoration = "none"
        logElement.style.color = "#070A1C"
        logElement.style.textDecoration = "underline"

        welcomeTextElement.textContent = "Раді тебе знову бачити!"

        regFormElement.setAttribute("style", "display: none;")
        logFormElement.removeAttribute("style")
    }
}


regElement.addEventListener("click", () => {
    goto("reg")
    console.log("REG")
})

logElement.addEventListener("click", () => {
    goto("log")
    console.log("LOG")
})

goto("reg")
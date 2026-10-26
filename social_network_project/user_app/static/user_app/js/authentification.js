console.log("asdasdasd")

const authDivElement         = document.querySelector("#regLogDiv")

const regElement             = document.querySelector("#regTitle")
const logElement             = document.querySelector("#logTitle")

const mailInputElement       = document.querySelector("#mailInput")
const passwordElement        = document.querySelector("#passwordInput")
const confirmPasswordElement = document.querySelector("#confirmPasswordInput")

const regFormElement         = document.querySelector("#regForm")
const logFormElement         = document.querySelector("#logForm")


function goto(page) {
    if (page == "reg") {
        regElement.classList.add("selected")
        logElement.classList.remove("selected")

        // regFormElement.removeAttribute("hidden")
        // logFormElement.setAttribute("hidden", "")

        regFormElement.setAttribute("style", "display: none;")
        logFormElement.removeAttribute("style")
    } else {
        regElement.classList.remove("selected")
        logElement.classList.add("selected")
        
        // regFormElement.setAttribute("hidden", "")
        // logFormElement.removeAttribute("hidden")

        regFormElement.removeAttribute("style")
        logFormElement.setAttribute("style", "display: none;")
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
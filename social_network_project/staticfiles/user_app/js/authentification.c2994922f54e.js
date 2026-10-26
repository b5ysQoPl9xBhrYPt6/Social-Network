console.log("asdasd")

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

        regFormElement.setAttribute("hidden", false)
        logFormElement.setAttribute("hidden", true)
    } else {
        regElement.classList.remove("selected")
        logElement.classList.add("selected")

        regFormElement.setAttribute("hidden", true)
        logFormElement.setAttribute("hidden", false)
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
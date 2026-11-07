const authDivElement                      = document.querySelector("#regLogDiv")

const regElement                          = document.querySelector("#regTitle")
const logElement                          = document.querySelector("#logTitle")

const mailInputElement                    = document.querySelector("#mailInput")
const passwordElement                     = document.querySelector("#passwordInputText")
const confirmPasswordElement              = document.querySelector("#confirmPasswordInputText")
const authPasswordElement                 = document.querySelector("#authPasswordInputText")

const regFormElement                      = document.querySelector("#regForm")
const logFormElement                      = document.querySelector("#logForm")
const verifyFormElement                   = document.querySelector("#confirmForm")

const verifyFormBlockElement              = document.querySelector("#verifyCodeBlock")

const welcomeTextElement                  = document.querySelector("#welcomeText")

const showPasswordTextElement             = document.querySelector("#showPasswordText")
const showConfirmPasswordTextElement      = document.querySelector("#showConfirmPasswordText")
const showAuthPasswordTextElement         = document.querySelector("#showAuthPasswordText")


let isSending = false
function sendFormAction(form, execute) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        if (isSending == false) {
            isSending = true
            const response = await fetch(form.action, {
                method: "POST",
                headers: {
                    "X-CSRFToken": form.querySelector("input[name='csrfmiddlewaretoken']").value
                },
                body: new FormData(form)
            })
            const data = await response.json()
            execute(data)
            isSending = false
        }
    })
}

sendFormAction(regFormElement, (data) => {
    if (data.success) {
        console.log(data)
        verifyFormBlockElement.removeAttribute("style")
    } else {
        console.log(data.errors)
        alert("Произошла ошибка")
    }
})

sendFormAction(verifyFormElement, (data) => {
    if (data.success) {
        verifyFormElement.setAttribute("style", "display: none;")
        goto("log")
    } else {
        console.log(data.errors)
        alert("Произошла ошибка")
    }
})

sendFormAction(logFormElement, (data) => {
    if (data.success) {
        console.log(data)
    } else {
        console.log(data.errors)
        alert("Произошла ошибка")
    }
})


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

/**
 * @param {Element} inputElement
 */
function changeVisibility(inputElement) {
    inputElement.toggleAttribute("value")
    if (inputElement.hasAttribute("value")) {
        inputElement.setAttribute("type", "text")
    } else {
        inputElement.setAttribute("type", "password")
    }
}


regElement.addEventListener("click", () => {
    goto("reg")
})

logElement.addEventListener("click", () => {
    goto("log")
})

// showPasswordTextElement.addEventListener("click", () => {
//     changeVisibility(passwordElement)
// })

// showAuthPasswordTextElement.addEventListener("click", () => {
//     changeVisibility(authPasswordElement)
// })

// showConfirmPasswordTextElement.addEventListener("click", () => {
//     changeVisibility(confirmPasswordElement)
// })

goto("reg")

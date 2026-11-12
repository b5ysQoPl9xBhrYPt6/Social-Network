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

const code1 = document.querySelector("#code_1")
const code2 = document.querySelector("#code_2")
const code3 = document.querySelector("#code_3")
const code4 = document.querySelector("#code_4")
const code5 = document.querySelector("#code_5")
const code6 = document.querySelector("#code_6")

const regErrorMessagesElement             = document.querySelector("#regErrorMessages")
const logErrorMessagesElement             = document.querySelector("#logErrorMessages")
const verifyErrorMessagesElement          = document.querySelector("#verifyErrorMessages")


// ============= FORMS FETCH REQUESTS =============

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
        
        for (const keyName in data.errors) {
            for (const error of data.errors[keyName]) {
                const listElement = document.createElement("li")
                listElement.textContent = error
                regErrorMessagesElement.appendChild(listElement)
            }
        }
        regErrorMessagesElement.removeAttribute("style")
    }
})

sendFormAction(verifyFormElement, (data) => {
    if (data.success) {
        verifyFormElement.setAttribute("style", "display: none;")
        goto("log")
    } else {
        console.log(data.errors)
        
        for (const keyName in data.errors) {
            for (const error of data.errors[keyName]) {
                const listElement = document.createElement("li")
                listElement.textContent = error
                verifyErrorMessagesElement.appendChild(listElement)
            }
        }
        verifyErrorMessagesElement.removeAttribute("style")
    }
})

sendFormAction(logFormElement, (data) => {
    if (data.success) {
        console.log(data)
    } else {
        console.log(data.errors)
        
        
        for (const keyName in data.errors) {
            for (const error of data.errors[keyName]) {
                const listElement = document.createElement("li")
                listElement.textContent = error
                logErrorMessagesElement.appendChild(listElement)
            }
        }
        logErrorMessagesElement.removeAttribute("style")
    }
})


// ============= REG / LOG NAVIGATION =============

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
})

logElement.addEventListener("click", () => {
    goto("log")
})

goto("reg")


// ========== PASSWORD FIELDS VISIBILITY ==========

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

showPasswordTextElement.addEventListener("click", () => {
    changeVisibility(passwordElement)
})

showAuthPasswordTextElement.addEventListener("click", () => {
    changeVisibility(authPasswordElement)
})

showConfirmPasswordTextElement.addEventListener("click", () => {
    changeVisibility(confirmPasswordElement)
})


// ========= VERIFY FORM AUTO FIELD SELECT =========

code1.addEventListener("input", (event) => {
    if (event.data) {
        code2.focus()
    }
})

code2.addEventListener("input", (event) => {
    if (event.data) {
        code3.focus()
    }
})

code3.addEventListener("input", (event) => {
    if (event.data) {
        code4.focus()
    }
})

code4.addEventListener("input", (event) => {
    if (event.data) {
        code5.focus()
    }
})

code5.addEventListener("input", (event) => {
    if (event.data) {
        code6.focus()
    }
})

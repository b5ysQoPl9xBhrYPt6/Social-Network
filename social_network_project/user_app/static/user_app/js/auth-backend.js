const regFormElement         = document.querySelector("#regForm")
const logFormElement         = document.querySelector("#logForm")

const verifyFormElement      = document.querySelector("#verifyCodeBlock")

function sendFormAction(form, execute) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const response = await fetch(form.action, {
            method: "POST",
            headers: {
                "X-CSRFToken": form.querySelector("input[name='csrfmiddlewaretoken']").value
            },
            body: new FormData(form)
        })
        const data = await response.json()
        execute(data)
    })
}

sendFormAction(regFormElement, (data) => {
    if (data.success) {
        console.log(data)
        verifyFormElement.removeAttribute("style")
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
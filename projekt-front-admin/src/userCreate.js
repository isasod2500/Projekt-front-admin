document.addEventListener("DOMContentLoaded", async () => {
    console.log(`DOM Loaded`)

    document.getElementById("firstname").addEventListener("input", previewUser)
    document.getElementById("surname").addEventListener("input", previewUser)
    document.getElementById("role").addEventListener("change", previewUser)

    document.getElementById("createUser").addEventListener("click", createUser)

    const token = localStorage.getItem("token")
    let db = await fetch(`http://127.0.0.1:3000/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    //Om något är fel med token, gå tillbaka till index.
    if (!db.ok) {
        window.location = `index.html`
    }
})

function previewUser() {

    //Visar live användarinformation
    const firstname = document.getElementById("firstname").value
    const surname = document.getElementById("surname").value
    let first = firstname.slice(0, 3).toLowerCase().replace(/[åä]/g, "a").replace(/[ö]/g, "o")
    let sur = surname.slice(0, 3).toLowerCase().replace(/[åä]/g, "a").replace(/[ö]/g, "o")

    const roleSelect = document.getElementById("role")
    const role = roleSelect.value
    const userPreview = document.getElementById("userPreview")

    const usernamePreview = document.getElementById("usernamePreview")
    const emailPreview = document.getElementById("emailPreview")
    const rolePreview = document.getElementById("rolePreview")
    usernamePreview.textContent = `Användarnamn: ${first}${sur}1234`
    emailPreview.textContent = `E-post: ${first}${sur}1234@E4Haket.se`
    if (role == "admin") {
        rolePreview.textContent = `Roll: Administratör`
    } else if (role == "user") {
        rolePreview.textContent = `Roll: Användare`
    } else {
        rolePreview.textContent = ""
    }


}

async function createUser(event) {
    event.preventDefault()
    const errors = []
    const errorList = document.getElementById("errorList")
    errorList.innerHTML = "";
    errorList.style.backgroundColor = "";


    try {

        const firstname = document.getElementById("firstname").value
        const surname = document.getElementById("surname").value
        const password = document.getElementById("password").value
        const confirmPassword = document.getElementById("confirmPassword").value
        const role = document.getElementById("role").value

        if (!firstname) {
            errors.push(`Förnamn måste fyllas i`)
        }
        if (!surname) {
            errors.push(`Efternamn måste fyllas i`)
        }
        if (!password || !confirmPassword) {
            errors.push(`Bägge lösenordsfälten måste fyllas i`)
        } else if (password !== confirmPassword) {
            errors.push(`Lösenorden stämmer inte överens`)
        }

        if (!role) {
            errors.push(`Roll måste anges`)
        }

        if (errors.length > 0) {
            errors.forEach(error => {
                errorList.style.backgroundColor = "#ffffffcc"
                let errorLine = document.createElement("li")
                errorLine.innerHTML = error
                errorList.appendChild(errorLine)
            })
            return;
        }
        const formData = {
            firstname: firstname,
            surname: surname,
            password: password,
            admin: role,
        }

        let response = await fetch("http://127.0.0.1:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        let result = await response.json()


        if (!response.ok) {
            result.errors.forEach(error => {
                errorList.style.backgroundColor = "#ffffffcc"
                let errorLine = document.createElement("li")
                errorLine.innerHTML = error
                errorList.appendChild(errorLine)
            })
            return;
        }

        document.getElementById("success").innerHTML = `Konto skapat!`
    } catch (err) {
        console.log(err)
    }
}
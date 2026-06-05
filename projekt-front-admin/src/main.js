document.addEventListener("DOMContentLoaded", () => {
    console.log(`Dom loaded`)

    document.getElementById("loginBtn").addEventListener("click", signIn)
})

//Funktion för att logga in.
async function signIn(event) {
    event.preventDefault()

    const errors = [];

    let errorList = document.getElementById("errorList")
    errors.length = 0
    errorList.innerHTML = "";
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    if (!username || !password) {
        errors.push(`Användarnamn och lösenord måste fyllas i`)
    }

    if (errors.length > 0) {
        errors.forEach(error => {
            let errorLine = document.createElement("li")
            errorLine.innerHTML = error
            errorList.appendChild(errorLine)
            return;
        })
    }

    let formData = {
        username: username,
        password: password,
    }

    try {
        let response = await fetch(`https://projekt-backend-s1gd.onrender.com/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            const errorData = await response.json();

            console.log(errorData);

            errorData.errors.forEach(error => {
                let errorLine = document.createElement("li");
                errorLine.textContent = error;
                errorList.appendChild(errorLine);
            });

            return;
        }

        const result = await response.json()

        localStorage.setItem("token", result.token)

        const token = localStorage.getItem("token")
        const protResult = await fetch("https://projekt-backend-s1gd.onrender.com/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const protData = protResult.json()

        if (!protResult.ok) {
            throw new Error(`Inloggning misslyckades`)
        }

        window.location.href = "./intranet.html"
    } catch (err) {
        console.error(err)
    }


}
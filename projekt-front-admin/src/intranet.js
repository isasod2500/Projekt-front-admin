document.addEventListener("DOMContentLoaded", () => {
    console.log(`DOM Loaded`)
    fetchEmployee()
})

async function fetchEmployee() {
    try {
        const token = localStorage.getItem("token")
        if (!token) {
            console.log(`Åtkomst nekad`)
            return;
        }


        const response = await fetch(`http://127.0.0.1:3000/intranet`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log(data)

        const payload = JSON.parse(atob(token.split(".")[1]));

        document.getElementById("welcomeHeader").innerHTML = `Välkommen ${data.firstname} ${data.surname}`

        const adminLink = document.getElementById("optionArticleAdmin")

        /*if (data.admin === false) {
            console.log(data.admin)
            adminLink.style.display = "none"
        }
            */
    } catch (err) {
        console.log(err)
    }
}

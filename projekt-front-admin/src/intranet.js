document.addEventListener("DOMContentLoaded", async () => {

    await fetchEmployee()
})

async function fetchEmployee() {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location = "index.html";
            return;
        }
        
        const response = await fetch("https://projekt-backend-s1gd.onrender.com/intranet", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        //Om något är fel med token, gå tillbaka till index.
        if (!response.ok) {
            window.location = `index.html`
        }

        const data = await response.json();


        const payload = JSON.parse(atob(token.split(".")[1]));

        document.getElementById("welcomeHeader").innerHTML = `Välkommen ${data.firstname} ${data.surname}`

        const adminLink = document.getElementById("optionArticleAdmin")

        if (data.admin === false) {
            adminLink.style.display = "none"
        }
            
    } catch (err) {
        console.log(err)
    }
}

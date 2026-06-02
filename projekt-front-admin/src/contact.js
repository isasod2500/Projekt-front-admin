document.addEventListener("DOMContentLoaded", () => {
    getAuthorised()
    fetchContact()
})


async function getAuthorised() {
    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:3000/", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    )
    const data = await response.json()

    console.log(data)
}


async function fetchContact() {

    try {
        const token = localStorage.getItem("token")
        let db = await fetch("http://127.0.0.1:3000/contact", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let result = await db.json()

        console.log(result)
        console.log(typeof result)
        console.log(Array.isArray(result));

        let contactMain = document.getElementById("contactMain")
        result.forEach(contact => {

            let contactWrapper = document.createElement("div")
            contactWrapper.setAttribute("class", "contactWrapper")

            let contactName = document.createElement("h3")
            contactName.setAttribute("class", "contactName")

            let contactEmail = document.createElement("h4")
            contactEmail.setAttribute("class", "contactEmail")

            let contactMsg = document.createElement("p")
            contactMsg.setAttribute("class", "contactMsg")

            let deleteBtn = document.createElement("button")
            deleteBtn.setAttribute("class", "deleteBtn")
            deleteBtn.textContent = `Radera meddelande`
            deleteBtn.setAttribute("data-id", contact._id)

            contactName.innerHTML = `Kundnamn: ${contact.firstname} ${contact.surname}`
            contactWrapper.appendChild(contactName)

            contactEmail.innerHTML = `E-post: ${contact.email}`
            contactWrapper.appendChild(contactEmail)

            contactMsg.innerHTML = `Meddelande: ${contact.message}`
            contactWrapper.appendChild(contactMsg)


            contactWrapper.appendChild(deleteBtn)

            contactMain.appendChild(contactWrapper)

        })
    } catch (err) {
        console.log(err)
    }
}
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
    document.getElementById("contactMain").innerHTML = "";
    try {
        const token = localStorage.getItem("token")
        let db = await fetch("http://127.0.0.1:3000/contact", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let result = await db.json()

        //Om något är fel med token, gå tillbaka till index.
        if (!db.ok) {
            window.location = `index.html`
        }

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
            deleteBtn.addEventListener("click", () => {
                deleteContact(contact._id)
            })
            deleteBtn.setAttribute("class", "deleteBtn")
            deleteBtn.style.backgroundColor = "lightred"
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

async function deleteContact(id) {
    console.log(id)

    let db = await fetch(`http://127.0.0.1:3000/delete/contact/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const response = await db.json()
   
    await fetchContact()
}
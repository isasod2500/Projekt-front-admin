document.addEventListener("DOMContentLoaded", async () => {
    console.log(`DOM Loaded`)
    fetchEmployees()
})

//Hämta in anställda
async function fetchEmployees() {

    document.getElementById("userList").innerHTML = ""
    try {

        const token = localStorage.getItem("token");

        const response = await fetch("https://projekt-backend-s1gd.onrender.com/admin", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        //Om något är fel med token, gå tillbaka till index.
        if (!response.ok) {
            window.location = `index.html`
        }

        const result = await response.json()
        const payload = JSON.parse(atob(token.split(".")[1]));
        const resultArray = result.result

        const adminMain = document.getElementById("adminMain")

        resultArray.forEach(employee => {
            const employeeWrapper = document.createElement("div")
            employeeWrapper.setAttribute("class", "employeeWrapper")

            const employeeName = document.createElement("h2")
            employeeName.setAttribute("class", "employeeName")

            const employeeUser = document.createElement("p")
            employeeUser.setAttribute("class", "employeeUser")

            const employeeEmail = document.createElement("p")
            employeeEmail.setAttribute("class", "employeeEmail")

            const employeeRole = document.createElement("p")
            employeeRole.setAttribute("class", "employeeRole")

            const employeeCreated = document.createElement("p")
            employeeCreated.setAttribute("class", "employeeCreated")

            let deleteBtn = document.createElement("button")
            deleteBtn.addEventListener("click", () => {
                deleteEmployee(employee._id)
            })
            deleteBtn.setAttribute("class", "deleteBtn")
            deleteBtn.style.backgroundColor = "lightred"
            deleteBtn.textContent = `Radera konto`
            deleteBtn.setAttribute("data-id", employee._id)

            employeeName.innerHTML = `${employee.surname} ${employee.firstname}`

            employeeUser.innerHTML = `Anv.namn: ${employee.username}`

            employeeEmail.innerHTML = `E-post: ${employee.email}`
            if (employee.admin == true) {
                employeeRole.innerHTML = `Roll: Administratör`
            } else {
                employeeRole.innerHTML = `Roll: Användare`
            }

            let created = new Date(employee.created)

            employeeCreated.innerHTML = `Skapad: ${created.toLocaleDateString("sv-SE")}`;

            employeeWrapper.appendChild(employeeName)
            employeeWrapper.appendChild(employeeUser)
            employeeWrapper.appendChild(employeeEmail)
            employeeWrapper.appendChild(employeeRole)
            employeeWrapper.appendChild(employeeCreated)
            employeeWrapper.appendChild(deleteBtn)

            userList.appendChild(employeeWrapper)
        })

    } catch (err) {
        console.log(err)
    }
}

//Ta bort anställd från databas.
async function deleteEmployee(id) {


    let db = await fetch(`https://projekt-backend-s1gd.onrender.com/delete/employee/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const response = await db.json()
   
    await fetchEmployees()
}
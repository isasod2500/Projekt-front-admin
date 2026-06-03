document.addEventListener("DOMContentLoaded", async () => {
    console.log(`DOM Loaded`)
    fetchEmployees()
})

async function fetchEmployees() {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch("http://127.0.0.1:3000/admin", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        //Om något är fel med token, gå tillbaka till index.
        if (!response.ok) {
            window.location = `index.html`
        }

        console.log(token)
        const result = await response.json()
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log(payload)
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

            adminMain.appendChild(employeeWrapper)
        })

    } catch (err) {
        console.log(err)
    }
}

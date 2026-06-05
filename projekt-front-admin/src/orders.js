document.addEventListener("DOMContentLoaded", async () => {
    console.log(`DOM LOADED`)
    await getAuthorised()
    await fetchOrders()
})

async function getAuthorised() {
    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:3000/orders", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    //Om något är fel med token, gå tillbaka till index.
    if (!response.ok) {
        window.location = `index.html`
    }

    const data = await response.json()

    if (!token) {
        console.log(`Åtkomst nekad`)
        return;
    }
}
//Hämtar in beställningar
async function fetchOrders() {
    //Sorterar upp dem efter status
    let received = document.getElementById("received")
    let pending = document.getElementById("pending")
    let done = document.getElementById("done")
    let pickedup = document.getElementById("pickedup")

    //Rensa lista vid varje fetch.
    received.innerHTML = "";
    pending.innerHTML = "";
    done.innerHTML = "";
    pickedup.innerHTML = "";

    try {
        //Fetch som samtidigt verifierar åtkomst. Vid misslyckad autentisering skickas användaren tillbaka till login.
        const token = localStorage.getItem("token");
        let db = await fetch(`http://127.0.0.1:3000/orders`, {
            headers: {
                Authorization: `Beared ${token}`
            }
        })

        //Om något är fel med token, gå tillbaka till index.
        if (!db.ok) {
            window.location = `index.html`
        }
        let result = await db.json()

        for (const order of result) {
            //Skapa div där beställningarna ska in. Anger IDt från databasen på button och diven
            let dishDiv = document.createElement("div")
            dishDiv.setAttribute("class", "dishDiv")
            dishDiv.setAttribute("data-id", order._id)

            let dishes = document.createElement("div")
            dishes.setAttribute("class", "dishes")

            let orderId = document.createElement("h3")
            let contact = document.createElement("div")
            let cstmrName = document.createElement("h4")
            let cstmrPhone = document.createElement("p")
            let cstmrEmail = document.createElement("p")
            let status = document.createElement("h3")
            let totalPrice = document.createElement("h3")
            let pickupTime = document.createElement("h3")

            orderId.innerHTML = `Beställning: ${order._id}`
            dishDiv.appendChild(orderId)

            order.dishes.forEach(item => {
                let dish = document.createElement("p")
                dish.setAttribute("class", "orderDish")
                dish.innerHTML = `${item.dishname} x${item.quantity} ${item.price}kr`
                dishes.appendChild(dish)
            })
            dishDiv.appendChild(dishes)

            totalPrice.innerHTML = `Summa: ${order.totalPrice}kr`
            dishDiv.appendChild(totalPrice)

            //Message är inte obligatoriskt. Om det finns, appenda.
            if (order.message) {
                let msg = document.createElement("p")
                msg.setAttribute("class", "orderMsg")
                msg.innerHTML = `Meddelande: ${order.message}`
                dishDiv.appendChild(msg)
            }

            cstmrName.innerHTML = `Kundnamn: ${order.name}`
            cstmrPhone.innerHTML = `Telefon: ${order.phone}`
            cstmrEmail.innerHTML = `E-post:${order.email}`


            contact.appendChild(cstmrName)
            contact.appendChild(cstmrPhone)
            contact.appendChild(cstmrEmail)
            contact.setAttribute("class", "orderContact")
            dishDiv.appendChild(contact)

            pickupTime.innerHTML = `Upphämtning: ${order.pickup}`
            dishDiv.appendChild(pickupTime)

            status.innerHTML = `Status: ${order.status}`
            status.setAttribute("class", "orderStatus")
            dishDiv.appendChild(status)

            /*If-satser för att placera beställningarna beroende på stat
            Knappar skapas och fylls med order-id, samt funktion för att flytta beställningar till nästa steg*/
            if (order.status === "received") {
                received.appendChild(dishDiv)
                status.innerHTML = `Mottagen`
                dishDiv.style.backgroundColor = `lightgrey`

                let button = document.createElement("button")
                button.setAttribute("class", "markPending")
                button.textContent = `Markera som Tillagas`
                button.style.backgroundColor = "orange"
                button.setAttribute("data-id", order._id)
                button.addEventListener("click", orderPending)

                dishDiv.appendChild(button)

            }

            if (order.status === "pending") {
                pending.appendChild(dishDiv)
                status.innerHTML = `Tillagas`
                dishDiv.style.backgroundColor = "orange"

                let button = document.createElement("button")
                button.setAttribute("class", "markDone")
                button.textContent = `Markera som klar`
                button.style.backgroundColor = "lightgreen"
                button.setAttribute("data-id", order._id)
                button.addEventListener("click", orderDone)


                dishDiv.appendChild(button)

            }

            if (order.status === "done") {
                done.appendChild(dishDiv)
                status.innerHTML = `Färdig`
                dishDiv.style.backgroundColor = "lightgreen"

                let button = document.createElement("button")
                button.setAttribute("class", "markPickedup")
                button.textContent = `Markera som upphämtad`
                button.style.backgroundColor = "pink"
                button.setAttribute("data-id", order._id)
                button.addEventListener("click", orderPickedup)

                dishDiv.appendChild(button)
            }

            if (order.status === "picked-up") {
                const timePassed = checkTime(order)
                if (timePassed === false) {
                    pickedup.appendChild(dishDiv)
                    status.innerHTML = `Upphämtad`
                    dishDiv.style.backgroundColor = "green"
                    dishDiv.style.color = "#edeeee"
                }
               
            }

        }
    } catch (err) {
        console.log(err)
    }
}

//Funktioner för att köra PUT till databasen och uppdatera status. Fetchorders körs direkt efter.
async function orderPending(event) {
    event.preventDefault()
    let pendingBtn = event.target

    let dishId = pendingBtn.dataset.id

    try {
        let result = await fetch(`https://projekt-backend-s1gd.onrender.com/orders/${dishId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })

    } catch (err) {
        console.log(err)
    }

    fetchOrders()
}


async function orderDone(event) {
    let doneBtn = event.target

    let dishId = doneBtn.dataset.id

    try {
        let result = await fetch(`https://projekt-backend-s1gd.onrender.com/orders/${dishId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })

    } catch (err) {
        console.log(err)
    }

    fetchOrders()
}

async function orderPickedup(event) {
    let pickedupBtn = event.target

    let dishId = pickedupBtn.dataset.id

    try {
        let result = await fetch(`https://projekt-backend-s1gd.onrender.com/orders/${dishId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        })

    } catch (err) {
        console.log(err)
    }

    fetchOrders()
}

//Funktion för att räkna tid mellan hämttid och nuvarande tid.
//Om statusen är picked-up och det har gått mer än 30 minuter sen hämttiden ska inte beställningen visas längre
function checkTime(order) {

    const now = new Date();

    let orderTime = order.pickup

    const [hours, minutes] = orderTime.split(":").map(Number);

    const pickupTime = new Date();
    pickupTime.setHours(hours, minutes, 0, 0)

    const timeDiff = now - pickupTime
    const deadline = 30 * 60 * 1000;
    let timePassed;

    if (timeDiff >= deadline) {
        timePassed = true
    } else {
        timePassed = false
    }
    return timePassed
}

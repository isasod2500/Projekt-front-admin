document.addEventListener("DOMContentLoaded", () => {
    console.log(`DOM LOADED`)
    fetchOrders()
})

async function fetchOrders() {
    let received = document.getElementById("received")
    let pending = document.getElementById("pending")
    let done = document.getElementById("done")
    let pickedup = document.getElementById("pickedup")

    /*
    received.innerHTML = "";
    pending.innerHTML = "";
    done.innerHTML = "";
    pickedup.innerHTML = "";
    */
    try {
        let db = await fetch(`http://127.0.0.1:3000/order`)
        let result = await db.json()

        console.log(result)



        result.forEach(order => {
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

            status.innerHTML = `Status: ${order.status}`
            status.setAttribute("class", "orderStatus")
            dishDiv.appendChild(status)

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
                pickedup.appendChild(dishDiv)
                status.innerHTML = `Upphämtad`
                dishDiv.style.backgroundColor = "green"
                dishDiv.style.color = "#edeeee"
            }



        })
    } catch (err) {
        console.log(err)
    }
}

async function orderPending(event) {
    event.preventDefault()
    let pendingBtn = event.target

    let dishId = pendingBtn.dataset.id

    try {
        let result = await fetch(`http://127.0.0.1:3000/order/${dishId}`, {
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
    console.log(dishId)

        try {
        let result = await fetch(`http://127.0.0.1:3000/order/${dishId}`, {
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
    console.log(dishId)

        try {
        let result = await fetch(`http://127.0.0.1:3000/order/${dishId}`, {
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

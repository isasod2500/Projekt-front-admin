window.addEventListener("load", async () => {

    await fetchOrder()
    let sendUpdate = document.getElementById("sendUpdate")
    sendUpdate.addEventListener("click", updateQuery)

})


async function fetchOrder() {

    let params = new URLSearchParams(document.location.search)
    let id = params.get("id");

    try {
        const token = localStorage.getItem("token")
        let db = await fetch(`http://127.0.0.1:3000/add/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        //Om något är fel med token, gå tillbaka till index.
        if (!db.ok) {
            window.location = `index.html`
        }

        const result = await db.json()
        console.log(result)


        let dishnameInput = document.getElementById("dishname")
        dishnameInput.value = result.dishname

        let ingredientsInput = document.getElementById("ingredients")
        ingredientsInput.value = result.ingredients

        let allergensInput = document.getElementById("allergens")
        allergensInput.value = result.allergens

        let priceInput = document.getElementById("price")
        priceInput.value = result.price

    } catch (err) {
        console.log(err)
    }
}


async function updateQuery(event) {
    event.preventDefault()
    console.log("Uppdaterar")
    let params = new URLSearchParams(document.location.search)
    let id = params.get("id")

    const errors = []
    errors.length = 0

    const errorList = document.getElementById("errorList")
    errorList.innerHTML = ""



    let dishname = document.getElementById("dishname").value
    let ingredients = document.getElementById("ingredients").value
    let allergens = document.getElementById("allergens").value
    let diet = document.getElementById("diet").value
    let price = document.getElementById("price").value
    let weekday = document.getElementById("weekday").value


    let formData = {
        dishname,
        ingredients,
        allergens,
        diet,
        price,
        weekday
    }

    try {
        let db = await fetch(`http://127.0.0.1:3000/add/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        let result = await db.json();

        if (!db.ok) {

            result.errors.forEach(error => {
                let errorLine = document.createElement("li")
                errorLine.innerHTML = error
                errorList.appendChild(errorLine)
            })
            return;
        }

        window.location = `./add.html`
    } catch (err) {
        console.log(err)
    }
}
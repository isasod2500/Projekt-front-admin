
document.addEventListener("DOMContentLoaded", async () => {
    console.log(`DOM loaded`)
    await fetchMenu()

    document.getElementById("createDish").addEventListener("click", gotoAdd)
})

function gotoAdd() {
    window.location.href = `./dishAdd.html`
}

async function fetchMenu() {

    document.getElementById("monday").innerHTML = "";
    document.getElementById("tuesday").innerHTML = "";
    document.getElementById("wednesday").innerHTML = "";
    document.getElementById("thursday").innerHTML = "";
    document.getElementById("friday").innerHTML = "";
    document.getElementById("saturday").innerHTML = "";
    document.getElementById("sunday").innerHTML = "";
    try {
        const token = localStorage.getItem("token");
        let db = await fetch("http://127.0.0.1:3000/add", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        //Om något är fel med token, gå tillbaka till index.
        if (!db.ok) {
            window.location = `index.html`
        }
        let result = await db.json()

        let dishIndex = document.getElementById("dishIndex")
        let mondayDiv = document.getElementById("monday")
        let tuesdayDiv = document.getElementById("tuesday")
        let wednesdayDiv = document.getElementById("wednesday")
        let thursdayDiv = document.getElementById("thursday")
        let fridayDiv = document.getElementById("friday")
        let saturdayDiv = document.getElementById("saturday")
        let sundayDiv = document.getElementById("sunday")


        console.log(result)
        result.forEach(dish => {
            let dishWeekday = dish.weekday
            let dishesDiv = document.createElement("div")
            dishesDiv.setAttribute("class", "dishesDiv")
            let dishWrapper = document.createElement("div")
            dishWrapper.setAttribute("class", "dishWrapper")
            let adminDishDiv = document.createElement("div")
            adminDishDiv.setAttribute("class", "adminDishDiv")
            let changeBtn = document.createElement("button")
            changeBtn.addEventListener("click", () => {
                changePage(dish._id)
            })
            changeBtn.setAttribute("class", "changeBtn")
            changeBtn.style.backgroundColor = "orange"
            changeBtn.textContent = `Redigera rätt`
            changeBtn.setAttribute("data-id", dish._id)

            let deleteBtn = document.createElement("button")
            deleteBtn.addEventListener("click", () => {
                deleteDish(dish._id)
            })
            deleteBtn.setAttribute("class", "deleteBtn")
            deleteBtn.style.backgroundColor = "lightred"
            deleteBtn.textContent = `Radera rätt`
            deleteBtn.setAttribute("data-id", dish._id)

            let dishHeader = document.createElement("h3")
            let dishIngrdnts = document.createElement("p")
            let dishAlrgns = document.createElement("p")
            let dishDiet = document.createElement("p")
            let dishPrice = document.createElement("p")



            dishHeader.innerHTML = dish.dishname
            dishIngrdnts.innerHTML = `Ingredienser: ${dish.ingredients}`
            dishAlrgns.innerHTML = `Allergener: ${dish.allergens}`
            dishDiet.innerHTML = dish.diet
            dishPrice.innerHTML = `Pris: ${dish.price}kr`



            adminDishDiv.appendChild(dishHeader)
            if (dish.image) {
                let dishImage = document.createElement("div")
                dishImage.setAttribute("class", "dishImage")
                dishImage.innerHTML += `<img src="${dish.image}">`
                adminDishDiv.appendChild(dishImage)
            }
            adminDishDiv.appendChild(dishIngrdnts)
            adminDishDiv.appendChild(dishAlrgns)
            adminDishDiv.appendChild(dishDiet)
            adminDishDiv.appendChild(dishPrice)
            adminDishDiv.appendChild(changeBtn)
            adminDishDiv.appendChild(deleteBtn)


            if (dishWeekday == 1) {

                mondayDiv.appendChild(dishWrapper)

                dishWrapper.appendChild(adminDishDiv)
            } else if (dishWeekday == 2) {

                tuesdayDiv.appendChild(dishWrapper)

                dishWrapper.appendChild(adminDishDiv)
            } else if (dishWeekday == 3) {

                wednesdayDiv.appendChild(dishWrapper)

                dishWrapper.appendChild(adminDishDiv)
            } else if (dishWeekday == 4) {

                thursdayDiv.appendChild(dishWrapper)

                dishWrapper.appendChild(adminDishDiv)
            } else if (dishWeekday == 5) {

                fridayDiv.appendChild(dishWrapper)

                dishWrapper.appendChild(adminDishDiv)
            } else if (dishWeekday == 6) {

                saturdayDiv.appendChild(dishWrapper)

                dishWrapper.appendChild(adminDishDiv)
            } else if (dishWeekday == 0) {

                sundayDiv.appendChild(dishWrapper)

                dishWrapper.appendChild(adminDishDiv)
            }

        })
    } catch (err) {
        console.log(err)
    }
}

async function changePage(id) {
    window.location = `./dishEdit.html?id=${id}`
}

async function deleteDish(id) {
    console.log(id)

    let db = await fetch(`http://127.0.0.1:3000/delete/dish/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const response = await db.json()
   
    await fetchMenu()
}
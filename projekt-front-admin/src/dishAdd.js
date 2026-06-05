document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("createDish").addEventListener("click", createDish)
})

async function createDish(event) {
    event.preventDefault()

    const errors = []
    errors.length = 0

    const errorList = document.getElementById("errorList")
    errorList.innerHTML = ""



    let dishname = document.getElementById("dishname").value
    let ingredients = document.getElementById("ingredients").value
    let allergens = document.getElementById("allergens").value
    let diet = document.getElementById("diet").value
    let image = document.getElementById("image").files[0];
    let price = document.getElementById("price").value
    let weekday = document.getElementById("weekday").value


    const formData = new FormData();

    formData.append("dishname", dishname);
    formData.append("ingredients", ingredients);
    formData.append("allergens", allergens);
    formData.append("diet", diet);
    formData.append("price", price);
    formData.append("weekday", weekday);

    if (image) {
        formData.append("image", image);
    }

    try {
        let db = await fetch("http://127.0.0.1:3000/add", {
            method: "POST",
            body: formData
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

        window.location = `./dishIndex.html`
    } catch (err) {
        console.log(err)
    }
}

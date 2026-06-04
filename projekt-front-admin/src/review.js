document.addEventListener("DOMContentLoaded", async () => {

    await fetchReviews()
})

async function fetchReviews() {

    reviewMain.innerHTML = "";
    try {
        const token = localStorage.getItem("token")

        let db = await fetch("http://127.0.0.1:3000/review", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!db.ok) {
            window.location = `index.html`
        }
        let result = await db.json()

        console.log(result)

        let reviewMain = document.getElementById("reviewMain")
        result.forEach(review => {
            let reviewWrapper = document.createElement("div")
            reviewWrapper.setAttribute("class", "reviewWrapper")

            let reviewName = document.createElement("h2")
            reviewName.setAttribute("class", "reviewName")
            reviewName.innerHTML = review.name

            let reviewEmail = document.createElement("h4")
            reviewEmail.setAttribute("class", "reviewEmail")
            reviewEmail.innerHTML = review.email

            let reviewMsg = document.createElement("p")
            reviewMsg.setAttribute("class", "reviewMsg")
            reviewMsg.innerHTML = `Meddelande: ${review.message}`

            let reviewRating = document.createElement("h4")
            reviewRating.setAttribute("class", "reviewRating")
            reviewRating.innerHTML = `Betyg: ${review.rating}`

            let reviewSent = document.createElement("h4")
            reviewSent.setAttribute("class", "reviewSent")
            reviewSent.innerHTML = `Inskickat: ${review.created}`

            let reviewAnswer = document.createElement("p")
            reviewAnswer.setAttribute("class", "reviewAnswer")

            if (review.answer === true) {
                reviewAnswer.innerHTML = `Kontakt tillåten: Ja`
            } else {
                reviewAnswer.innerHTML = `Kontakt tillåten: Nej`
            }

            let reviewDivider = document.createElement("div")
            reviewDivider.setAttribute("class", "reviewDivider")


            let deleteBtn = document.createElement("button")
            deleteBtn.addEventListener("click", () => {
                deleteReview(review._id)
            })
            deleteBtn.setAttribute("class", "deleteBtn")
            deleteBtn.style.backgroundColor = "lightred"
            deleteBtn.textContent = `Radera recension`
            deleteBtn.setAttribute("data-id", review._id)


            reviewWrapper.appendChild(reviewName)
            reviewWrapper.appendChild(reviewEmail)
            reviewWrapper.appendChild(reviewMsg)
            reviewWrapper.appendChild(reviewRating)
            reviewWrapper.appendChild(reviewSent)
            reviewWrapper.appendChild(reviewAnswer)
            reviewWrapper.appendChild(deleteBtn)

            reviewMain.appendChild(reviewWrapper)
            reviewMain.appendChild(reviewDivider)
        })
    } catch (err) {
        console.log(err)
    }
}

async function deleteReview(id) {
    console.log(id)
    try {
        let db = await fetch(`http://127.0.0.1:3000/delete/review/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const response = await db.json()

        await fetchReviews()
    } catch (err) {
        console.log(err)
    }
}   

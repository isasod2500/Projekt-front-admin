document.addEventListener("DOMContentLoaded", async () => {
  
    await fetchReviews()
})

async function fetchReviews() {

    try {
        const token = localStorage.getItem("token")

        let db = await fetch("http://127.0.0.1:3000/review", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

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


            reviewWrapper.appendChild(reviewName)
            reviewWrapper.appendChild(reviewEmail)
            reviewWrapper.appendChild(reviewMsg)
            reviewWrapper.appendChild(reviewRating)
            reviewWrapper.appendChild(reviewSent)
            reviewWrapper.appendChild(reviewAnswer)


            reviewMain.appendChild(reviewWrapper)
            reviewMain.appendChild(reviewDivider)
        })
    } catch (err) {
        console.log(err)
    }
}
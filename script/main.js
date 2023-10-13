const cardWrapper = document.querySelector(".card-wrapper")

axios.get("http://localhost:3000/api/posts")
.then(response => {
    const cardDivFragment = document.createDocumentFragment()
    response.data.data.forEach(card => {
        // console.log(card._id);
        const cardDiv = document.createElement("div")
        cardDiv.className = "card-div"
        cardDiv.innerHTML = `
        <a href="../pages/single-element.html?articleId=${card._id}">
        <img src="${card.image}"/>
        <h3 title="${card.title}">${card.title.split("").length > 10 ? card.title.slice(0, 25) : card.title}</h3>
        <p>${card.description.split("").length > 10 ? card.description.slice(0, 110) : card.description}</p>
        <div>
        <img src="../images/author-image.svg"/>
        <strong>Ibrokhim Jalalov<span>Author</span</strong>
        </div>
        </a>
        
        `
        cardDivFragment.appendChild(cardDiv)
    })
    cardWrapper.appendChild(cardDivFragment)
})
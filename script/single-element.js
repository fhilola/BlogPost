const singleElementContainer = document.querySelector(".single-element-container")
const singleElementTitle = document.querySelector(".title > h2")
const singleElementCategory = document.querySelector(".title > strong")
const singleElementImage = document.querySelector(".single-element__image-wrapper > img")
const singleElementDescription = document.querySelector(".single-element-container  p")
const elementId = new URLSearchParams(location.search).get("articleId")
console.log(elementId);

axios.get(`http://localhost:3000/api/posts/${elementId}`)
.then(response =>{
    console.log(response.data);
    singleElementTitle.innerHTML = response.data.title
    singleElementImage.src = `${response.data.image}`
    singleElementDescription.innerHTML = response.data.description
})
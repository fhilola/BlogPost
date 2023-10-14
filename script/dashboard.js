const currentPage = new URLSearchParams(location.search).get("page")
const $sidebarMenuItems = document.querySelectorAll(".sidebar__menu a")
const mainContents = document.querySelectorAll("main > div")
// let userId = JSON.parse(atob(localStorage.getItem("user_token").split(".")[1])).id
const $allContent = document.getElementById("all-content")
const $modelDeleteWrapper = document.querySelector(".modal-delete-wrapper")
const $modelDelete = document.querySelector(".modal-delete")
const $modalDeleteClose = document.getElementById("modal-delete-close")
const $modalDeleteBtn = document.querySelector(".model-delete-btn")
const $caetogrySelector = document.getElementById("categories")
const $createPostForm = document.getElementById("create-post-form")
const postTitle = document.getElementById("title")
const postImage = document.getElementById("image")
const postDescription = document.getElementById("description")
const token = localStorage.getItem("access_token")
// console.log(token);

$sidebarMenuItems.forEach(sidebarLink =>{
    if(sidebarLink.href.includes(currentPage)){
        sidebarLink.setAttribute("aria-current", "page")
    }
})
mainContents.forEach(content =>{
    if(content.dataset.contentName.includes(currentPage)){
        content.style.display = "flex"
    }
})
axios.get("http://localhost:3000/api/categories")
.then(response => {
    $caetogrySelector.innerHTML = "<option value='select'>Select post category</option>"
    response.data.data.forEach((category) => {
        var option = document.createElement("option")
        option.setAttribute("data-category-id", `${category._id}`)
        option.value = category._id
        option.classList = "optionjon"
        option.textContent = category.title
        $caetogrySelector.appendChild(option)
    })
})

$createPostForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}` );
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "title": `${postTitle.value.trim()}`,
  "image": `${postImage.value.trim()}`,
  "description": `${postDescription.value.trim()}`,
  "category": "6526f77176a2fd43a5834131"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/api/posts", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
})
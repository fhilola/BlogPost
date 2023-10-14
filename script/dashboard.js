const currentPage = new URLSearchParams(location.search).get("page")
const $sidebarMenuItems = document.querySelectorAll(".sidebar__menu a")
const mainContents = document.querySelectorAll("main > div")
// let userId = JSON.parse(atob(localStorage.getItem("user_token").split(".")[1])).id
const $managePosts = document.getElementById("manage-posts")
const $modelDeleteWrapper = document.querySelector(".modal-delete-wrapper")
const $modelDelete = document.querySelector(".modal-delete")
const $modalDeleteClose = document.getElementById("modal-delete-close")
const $modalDeleteBtn = document.querySelector(".model-delete-btn")
const $caetogrySelector = document.getElementById("categories")
const $createPostForm = document.getElementById("create-post-form")
const postTitle = document.getElementById("title")
const postImage = document.getElementById("image")
const postDescription = document.getElementById("description")
const signOut = document.getElementById("sign-out")
const pEl = document.getElementById("check-deleting")
const token = localStorage.getItem("access_token")
console.log(pEl);
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
  .then(result => {
    console.log(result);
  })
  .catch(error => console.log('error', error));
})


axios.get("http://localhost:3000/api/posts")
.then(data => {
    renderNewPosts(data)
})
function renderNewPosts(result){
    // console.log(result);
    const managePostFragment =document.createDocumentFragment()
    $managePosts.innerHTML = ""
        result.data.data.map(result =>{
        // console.log(result);
        const $managePosts = document.createElement("div")
        $managePosts.className = "manage-post-card-item"
        $managePosts.innerHTML = `
        <img src="${result.image}" alt="${result.description}""/>
        <h3>${result.title.split(" ").length > 10 ? result.title.slice(0, 30) : result.title}</h3>
        <p>${result.description.split("").length > 10 ? result.description.slice(0, 80) : result.description}</p>
        <div class="card__button-wrapper">
        <button id="card__edit">Edit</button>
        <button id="card__delete" data-article-id="${result._id}">Delete</button>
        </div>
        `
        managePostFragment.appendChild($managePosts)
})
$managePosts.appendChild(managePostFragment)
}
$managePosts.addEventListener("click", (e)=>{
    if(e.target.closest("#card__delete")){
       $modelDeleteWrapper.classList.add("modal-delete-wrapper-active")
       $modelDelete.classList.add("modal-delete-active")
    //    console.log(e.target.dataset.articleId)
       $modalDeleteBtn.setAttribute("data-article-id", e.target.dataset.articleId)
    }
})
$modalDeleteBtn.addEventListener("click", (e)=>{
    const deleteItemId = e.target.dataset.articleId
    console.log(deleteItemId);
    axios.delete(`http://localhost:3000/api/posts/${deleteItemId}`, 
    {
        headers: {
            "Authorization" : 'Bearer ' + token
        }
    })
    .then(result => {
        console.log(result);
        if(result.status === 204){
            $modelDeleteWrapper.classList.remove("modal-delete-wrapper-active")
            $modelDelete.classList.remove("modal-delete-active")
        }else{
            pEl.textContent = "You can delete only your article"
        }
    })
})
$modalDeleteClose.addEventListener("click", ()=>{
    $modelDeleteWrapper.classList.remove("modal-delete-wrapper-active")
    $modelDelete.classList.remove("modal-delete-active")
})
signOut.addEventListener("click", ()=>{
    location.replace(location.origin + '/index.html')
})

const editPostFormWrapper = document.querySelector(".edit-form-wrapper")
const editPostForm = document.getElementById("edit-form")
const editPostTitle = document.getElementById("post-title")
const editPostSelect = document.getElementById("select")
const editPostImage = document.getElementById("post-image")
const editPostDescription = document.getElementById("post-description")

$managePosts.addEventListener("click", (e)=>{
    if(e.target.closest("#card__edit")){
        editPostFormWrapper.classList.add("edit-form-wrapper-active")
        editPostForm.classList.add("edit-form-active")
    }
})
const currentPage = new URLSearchParams(location.search).get("page")
const $sidebarMenuItems = document.querySelectorAll(".sidebar__menu a")
const mainContents = document.querySelectorAll("main > div")
// let userId = JSON.parse(atob(localStorage.getItem("user_token").split(".")[1])).id
const $allContent = document.getElementById("all-content")
const $modelDeleteWrapper = document.querySelector(".modal-delete-wrapper")
const $modelDelete = document.querySelector(".modal-delete")
const $modalDeleteClose = document.getElementById("modal-delete-close")
const $modalDeleteBtn = document.querySelector(".model-delete-btn")
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
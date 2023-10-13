const signupForm = document.getElementById("signup-form")
const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const visibilityBtn = document.getElementById("visibility-btn")

visibilityBtn.addEventListener("click", (e)=> {
    e.preventDefault()
        if(e.target.closest("#visibility-btn").previousElementSibling.type === "password"){
            e.target.closest("#visibility-btn").previousElementSibling.type = "text"
            e.target.closest("#visibility-btn").firstElementChild.classList = "fa-solid fa-eye-slash"
        }
        else{
           e.target.closest("#visibility-btn").previousElementSibling.type = "password"
            e.target.closest("#visibility-btn").firstElementChild.classList = "fa-solid fa-eye" 
        }
})

// var myHeaders = new Headers()
// myHeaders.append("Content-Type", "application/json")
// var raw = JSON.stringify({
//     "firstname" : "Dilshoda",
//     "lastname" : "Aliyeva",
//     "email" : "dilshoda@gmail.com",
//     "password" : "12345678"
// })
// var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
// }
axios.post("http://localhost:3000/api/auth/signup", {
    ""
})
// catch(error => console.log('error', error))
const signupForm = document.getElementById("signup-form")
const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const visibilityBtn = document.getElementById("visibility-btn")
const checkFirstname = document.getElementById("check-firstname")
const checkLastname = document.getElementById("check-lastname")
const checkEmail = document.getElementById("check-email")
const checkPassword = document.getElementById("check-password")
const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_])[A-Za-z\d@$!%*#?&_]{8,}$/
visibilityBtn.addEventListener("click", (e)=> {
    e.preventDefault()
        if(e.target.closest("#visibility-btn").previousElementSibling.type === "password"){
            e.target.closest("#visibility-btn").previousElementSibling.type = "text"
            e.target.closest("#visibility-btn").classList = "fas fa-eye-slash"
        }
        else{
           e.target.closest("#visibility-btn").previousElementSibling.type = "password"
           e.target.closest("#visibility-btn").classList = "fa-solid fa-eye" 
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
firstName.addEventListener("blur", ()=>{
    if(firstName.value.trim().length > 10){
        checkFirstname.textContent = "Firstname should be less than 10 letters"
        checkFirstname.style = "display: block; color: red"
    }else{
        checkFirstname.style = "display: none;"
    }
})
lastName.addEventListener("blur", ()=>{
    if(lastName.value.trim().length > 10){
        checkLastname.textContent = "Lastnsme should be less than 10 letters"
        checkLastname.style = "display: block; color: red"
    }else{
        checkLastname.style = "display: none;"
    }
})
email.addEventListener("blur", (e)=>{
    const emailchecking = EMAIL_REGEX.test(e.target.value)
    if(emailchecking == false){
        checkEmail.textContent = "Email is not valid"
        checkEmail.style = "display: block; color: red"
    }else{
        checkEmail.style = "display: none;"
    }
})
password.addEventListener("input", (e)=>{
    const passwordChecking = PASSWORD_REGEX.test(e.target.value)
    if(passwordChecking == false){
        checkPassword.textContent = "Minimum eight characters, at least one letter, one number and one special character"
        checkPassword.style = "display: block; color: red; width: 300px"
    }else{
        checkPassword.style = "display: none;"
    }
})
signupForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    axios.post("http://localhost:3000/api/auth/signup", {
    "firstname" : `${firstName.value}`,
    "lastname" : `${lastName.value}`,
    "email" : `${email.value}`,
    "password" : `${password.value}`,
    headers: {
        "Content-Type" : "application/json"
    }
})
.then(response => {
    if(response.status === 201){
        console.log("hello");
        localStorage.setItem("access_token", response.data.token)
    }
})
if(localStorage.getItem("access_token")){
    location.replace(location.origin + "/pages/login.html")
}else{
    console.log("token yoq");
}
})
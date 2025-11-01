const form =  document.querySelector(".form")
const eye = document.querySelector("#eye")
const pass = document.querySelector("#password")

let selec = false

eye.addEventListener("click", function(e){
    selec = !selec

    if(selec){
        e.target.classList.remove('fa-eye-slash')
        e.target.classList.add('fa-eye') 
        pass.type = "text"   
    }else{
        e.target.classList.remove('fa-eye')
        e.target.classList.add('fa-eye-slash') 
        pass.type = "password"
    }
})

// form.addEventListener("submit",e =>{

//     const nome =  e.target.user
//     console.log(nome)
//     localStorage.setItem("user",nome.value.trim())
//     if(localStorage.getItem("user")){
//         location.assign("home.html")
//     }
// })

export {eye}
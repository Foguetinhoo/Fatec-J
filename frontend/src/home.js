const user = localStorage.getItem("user") || "lixo"
const navname= document.querySelector(".navbar-brand")

navname.append(user)

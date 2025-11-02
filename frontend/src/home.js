import { TextHighlight } from "./functions/texthighlight.js"
import { pdf } from "./functions/readerpdf.js"

const user = localStorage.getItem("user") || "USer"
const navname = document.querySelector(".navbar-brand")
const readerarea = document.getElementById("reader-area")
const savedText = localStorage.getItem("savedPDFtext") || null 
const savedscrollpos = localStorage.getItem("scrollpos")
const dgb = document.getElementById("debug-button")
const btd = document.getElementById("pdf-input")
const nspos = parseInt(savedscrollpos)
const colors = document.querySelector("#color-pick")

TextHighlight(readerarea,colors)
navname.append(user)
pdf(dgb,savedText,readerarea,btd,nspos)


const readerarea = document.getElementById("reader-area")
const savedText = localStorage.getItem("savedPDFtext")
const savedscrollpos = localStorage.getItem("scrollpos")
const nspos = parseInt(savedscrollpos)

if (savedText) {
    readerarea.innertext = savedText;
    readerarea.scrollTop = nspos;
}

readerarea.addEventListener("blur", function(){
    const textoatual = readerarea.innertext
    localStorage.setItem("savedPDFtext", textoatual);

});

readerarea.addEventListener("scroll", function(){
    const scrollpos = readerarea.scrollTop
    localStorage.setItem("scrollpos", nspos)
})


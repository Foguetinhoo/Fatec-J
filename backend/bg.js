
const readerarea = document.getElementById("reader-area")

readerarea.addEventListener("blur", function(){
    const textoatual = readerarea.innertext
    localStorage.setItem("savedPDFtext", textoatual);
});



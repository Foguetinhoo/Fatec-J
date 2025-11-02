const user = localStorage.getItem("user") || "lixo"
const navname= document.querySelector(".navbar-brand")

const readerarea = document.getElementById("reader-area")
const savedText = localStorage.getItem("savedPDFtext")
const savedscrollpos = localStorage.getItem("scrollpos")
const nspos = parseInt(savedscrollpos)
const dgb  = document.getElementById("debug-button")
const btd = document.getElementById("pdf-input")


navname.append(user)


dgb.addEventListener("click", function(){

    console.log (localStorage.getItem('savedPDFtext'), localStorage.getItem('scrollpos'))
})

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
    localStorage.setItem("scrollpos", scrollpos)
})

btd.addEventListener("change", function(){
   const file = this.files[0] 
   loadpdf(file)
})

// Função Principal do Robô Tradutor de PDF
async function loadpdf(file) {
    // 1. Lendo o arquivo usando o FileReader (Assíncrono)
    const reader = new FileReader();

    // A Promessa lida com a assincronicidade da leitura do arquivo
    const arrayBuffer = await new Promise((resolve, reject) => {
        // Quando a leitura termina, resolve a Promessa com o resultado
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        // Em caso de erro
        reader.onerror = (error) => {
            reject(error);
        };
        
        // Inicia a leitura do arquivo no formato ArrayBuffer (dados binários)
        reader.readAsArrayBuffer(file);
    });

    // Coloca uma mensagem de carregamento na tela
    readerarea.innerText = "Carregando e processando PDF, aguarde...";
    
    // 2. Carregando o PDF e Extraindo o Texto (Assíncrono)
    try {
        // Configura o worker da PDF.js (necessário para processamento em background)
        pdfjsLib.GlobalWorkerOptions.workerSrc = "./pdf.worker.min.mjs";

        // Carrega o documento PDF
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        let fullText = '';
        
        // Itera sobre todas as páginas do PDF
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            
            // Junta os itens de texto com um espaço
            const text = content.items.map(item => item.str).join(' ');
            
            fullText += text + '\n\n'; // Adiciona quebras de linha entre as páginas
        }
        
        // 3. Exibindo o Resultado
        readerarea.innerText = fullText;
        readerarea.scrollTop = 0; // Vai para o topo do novo documento
        

    } catch (error) {
        console.error("Erro ao processar PDF:", error);
        readerarea.innerText = "ERRO: Não foi possível ler o arquivo PDF. Verifique se o formato está correto.";
    }
    
    try {
        localStorage.setItem("savedPDFtext", fullText);
    } catch (e) {
        console.warn("AVISO: O PDF foi carregado, mas o salvamento falhou. Memória do navegador cheia.");
    }
}
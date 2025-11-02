const saveTextHighlight = (text,name="mark") =>{
    if(!localStorage.getItem(name)) localStorage.setItem(name,text)
    
    let  textStorage = localStorage.getItem(name)

    if(text != textStorage){
        localStorage.clear()
        localStorage.setItem(name,text)
    }
}
export {saveTextHighlight}
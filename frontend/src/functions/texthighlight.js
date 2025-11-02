import { saveTextHighlight } from "./storage.js";

const TextHighlight = (readerarea,colors)=>{
console.log(colors.value)
var hltr = new TextHighlighter(readerarea, {
                onBeforeHighlight: function (range) {
                    return window.confirm('Selected text: ' + range + '\nReally highlight?');
                },
                onAfterHighlight: function (range, highlights) {
                    window.alert('Created ' + highlights.length + ' highlight(s): ' + highlights.map(function (h) {
                        return '"' + h.innerText + '"';
                    }).join(', '));
                        // saveTextHighlight()
                },
                onRemoveHighlight: function (hl) {
                    return window.confirm('Do you really want to remove: "' + hl.innerText + '"');
                }
            });


            // removeBtn.addEventListener('click', function () {
            //     hltr.removeHighlights();
            // });

colors.addEventListener("change", e =>{
    hltr.setColor(e.target.value)
    console.log('target =>',e.target)
})
}

export {TextHighlight}

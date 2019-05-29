// Add onClick listeners to all relevant code blocks that copy the command only.
var preBlocks = document.getElementsByTagName("PRE")
// Only allow 1 block to fill the clipboard at a time.
var clipboard = null;
for (let preBlock of preBlocks) {
    let block = preBlock.firstChild
    if (block.nodeName === "CODE") {
        block.addEventListener("click", function(){
            let cmd = getCodeCommand(block)
            
            // Create a temporary textarea to copy from
            var copyArea = document.createElement("textarea")
            copyArea.value = cmd
            copyArea.setAttribute('readonly', '')
            copyArea.style.position = 'absolute'
            copyArea.style.left = '-9999px'
            block.appendChild(copyArea)
            copyArea.select()
            document.execCommand('copy')
            block.removeChild(copyArea)
    
            // Inform users we have copied the text
            if (cmd !== "") {
                // if this is a second clipboard, remove the old one.
                if(clipboard) clipboard.parentNode.removeChild(clipboard)
                var inform = document.createElement("div")
                clipboard = inform;
                inform.setAttribute("class", "clipboard")
                inform.textContent = "Copied command to clipboard"
                block.appendChild(inform)
                setTimeout(function(){ inform.setAttribute("class", "clipboard fade") },100);
        
                // Delete the message after 2 seconds and clean up clipboard
                    setTimeout(function(){if(block && inform.parentElement ===  block){
                        block.removeChild(inform); 
                        clipboard = null
                    }}, 3000)
            }
        })
    }
}

// Warning this will only work with bash/shell!
function getCodeCommand(block) {
    const inner = block.innerText
    const lines = inner.split("\n")
    let cmd = ""
    for (let line of lines) {
        if (line.startsWith("$ ")) {
            line = line.substring(2)
        }
        cmd += line
        if (!line.endsWith(" \\")) {
            return cmd
        }
        cmd += "\n"
    }
    return cmd
}

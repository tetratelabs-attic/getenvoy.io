// Add onClick listeners to all relevant code blocks that copy the command only.
var preBlocks = document.getElementsByTagName("PRE")
for (let preBlock of preBlocks) {
    let block = preBlock.firstChild
    if (block.nodeName === "CODE") {
        block.addEventListener("click", function(){
            let cmd = getCodeCommand(block)
            
            // Create a temporary textarea to copy from
            var copyArea = document.createElement("textarea");
            copyArea.value = cmd;
            copyArea.setAttribute('readonly', '')
            copyArea.style.position = 'absolute';
            copyArea.style.left = '-9999px';
            block.appendChild(copyArea);
            copyArea.select();
            document.execCommand('copy');
            block.removeChild(copyArea)
    
            // Inform users we have copied the text
            if (cmd !== "") {
                var inform = document.createElement("div");
                inform.textContent = "Copied command to clipboard!"
                block.appendChild(inform)
        
                // Delete the message after 2 seconds
                setTimeout(function(){block.removeChild(inform)}, 2000)
            }
        })
    }
}

// Warning this will only work with bash/shell!
function getCodeCommand(block) {
    const inner = block.innerText;
    const lines = inner.split("\n");
    let cmd = "";
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("$ ")) {
            lines[i] = lines[i].substring(2);
        }
        cmd += lines[i];
        if (!lines[i].endsWith(" \\")) {
            return cmd
        } else {
            cmd += "\n";
        }
    }
    return cmd;
}

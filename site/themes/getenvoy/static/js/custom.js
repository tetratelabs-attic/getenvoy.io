$(function() {
    function clipboardMagic(){

        // find all the "code" blocks and bind click event...
        $("pre code").on('click',function(){
            var $this = $(this);

            // set initial state...
            $('pre code .clipboard').remove(); 
            var $inform = null;
            
            // if this is output, not cmds, act on  the previous block...
            if($this.hasClass("language-sh-output")){
                $this = $this.parent().prev().find('code');                
            }
            // if I don't have a $this, I should quit.
            if($this.length < 1) return false;

            // parse to get the right linebreaks and such...
            var cmd = getCodeCommand($this[0]);

            // create the dom input element to do the select/copy then remove...
            var $copyArea = $('<textarea class="to-clipboard hide-me" />').appendTo('body').val(cmd);
            $copyArea[0].select();
            document.execCommand('copy');
            $copyArea.remove();
            $copyArea = null;

            // notify the user of the action and set the GUI state...
            $inform = $('<div class="clipboard">Copied command to clipboard</div>').appendTo($this);
            setTimeout(function(){ $inform.addClass("fade") },100);

            // clean-up...
            setTimeout(function(){ $inform.remove();}, 3000);

        });

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
    };

    clipboardMagic();

});

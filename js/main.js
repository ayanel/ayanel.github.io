var Ayanel = Ayanel || {};
$(function(){
    var $input = $("#prompt-input");
    $input.on('keypress',function(ev) {
        return ev.which != 13;
    });
    $input.on('keydown',function(ev) {
        if (/* !ev.shiftKey || */ev.which != 13) return;
        // feedback
        var el = '<div class="prompt-row prompt-appended"><span class="prompt"></span><span id="prompt-input" contenteditable="true"></span><span>' + ev.currentTarget.innerHTML + '</span></div>';
        $(el).insertBefore($input.parent());
        // special
        if (ev.currentTarget.innerHTML == "clear") {
            $("div.prompt-row.prompt-appended", document).remove();
            $input.html('');
            return;
        }
        var al = ev.currentTarget.innerHTML.match(/^hello\((.+)\);?$/);
        $input.html('');
        if (al && al.length > 1) {
            window.alert("How are you, " + al[1] + "?");
        }
    });
});

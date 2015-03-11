var Ayanel = Ayanel || {
    $input: null
};
$(function(){
    Ayanel.$input = $("#prompt-input");
    Ayanel.$input.on('keydown',function(ev) {
        if (/* !ev.shiftKey || */ev.which != 13) return;
        Ayanel.controller(ev.currentTarget.innerHTML).exec();
    });
});
Ayanel.controller = function(src) {
    Ayanel.appendLine(src);
    Ayanel.wait();
    if (src == "clear")  return new Ayanel.clear();
    var m = src.match(/^([^:]+):(.+)$/);
    if (! m || m.length < 3) return new Ayanel.nothing();
    switch (m[1]) {
    case "hello":
        return new Ayanel.hello(src, m[1], m[2]);
    case "color":
        return new Ayanel.color(src, m[1], m[2]);
    case "rotate":
        return new Ayanel.rotate(src, m[1], m[2]);
    case "size":
        return new Ayanel.size(src, m[1], m[2]);
    default:
        return new Ayanel.nothing();
    }
};
Ayanel.clear = function() {
    Ayanel.clear.prototype.exec = function() {
        $("div.prompt-row.prompt-appended", document).remove();
    };
};
Ayanel.hello = function(src, key, val) {
    this.val = val;
    Ayanel.hello.prototype.exec = function() {
        window.alert("How are you, " + this.val + "?");
    };
};
Ayanel.color = function(src, key, val) {
    this.val = val;
    Ayanel.color.prototype.exec = function() {
        $('body', document).css({color: this.val});
    };
};
Ayanel.rotate = function(src, key, val) {
    this.val = (parseInt(val) == val) ? parseInt(val) : 0;
    Ayanel.rotate.prototype.getCurrentDegree = function() {
        var style = $('body').attr('style');
        if (! style) return 0;
        var m = style.match(/transform: rotate\(([0-9]+)deg\)/);
        if (! m || m.length < 2) return 0;
        return m[1] | 0;
    };
    Ayanel.rotate.prototype.exec = function() {
        var cur = this.getCurrentDegree();
        var deg = this.val;
        $('body').animate({zIndex:1},{
            duration:1000,
            step:function(now){
                var dest = cur + (now * deg);
                $(this).css({
                    transform:'rotate(' + dest + 'deg)'
                });
            },
        });
    };
};
Ayanel.size = function(src, key, val) {
    this.val = val;
    $('body').css({zoom: this.val});
};
Ayanel.nothing = function() {
    Ayanel.nothing.prototype.exec = function() {};
};
Ayanel.appendLine = function(src) {
    var el = '<div class="prompt-row prompt-appended"><span class="prompt"></span><span id="prompt-input" contenteditable="true"></span><span>' + src + '</span></div>';
    $(el).insertBefore(Ayanel.$input.parent());
};
Ayanel.wait = function() {
    Ayanel.$input.html('');
};

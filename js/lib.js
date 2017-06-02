/**
 * Created by erikl on 2017-05-13.
 */
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function msg(msg) {
    var msg_div = document.getElementById("modal_box");
    var msg_element = document.getElementById("modal_box_text");
    msg_div.style.display = "flex";
    msg_element.innerHTML = msg;
}

function close_msg_box() {
    var msg_div = document.getElementById("modal_box");
    msg_div.style.display = "none";
}
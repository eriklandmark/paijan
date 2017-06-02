/**
 * Created by erikl on 2017-05-13.
 */
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function msg(msg) {
    var msg_div = document.getElementById("info_msg");
    var msg_element = document.getElementById("info_msg_text");
    msg_div.style.display = "flex";
    msg_element.innerHTML = msg;
}

function close_msg_box() {
    var msg_div = document.getElementById("info_msg");
    msg_div.style.display = "none";
}
var bildspel_pause = false;
var bildspel_interval = 0;
var open_picture = 1;
var total_pictures = 4;

function on_about_paijan_load() {
    open_picture = 1;
    bildspel_interval = setInterval(function () {
        if(!bildspel_pause) {
            change_picture();
        }
    }, 5000);
}

function on_about_paijan_unload() {
    clearInterval(bildspel_interval);
}

document.addEventListener("animationend", function (event) {
    if (event.target.id === "bild_1" || event.target.id === "bild_2" || event.target.id === "bild_3" || event.target.id === "bild_4") {
        event.target.className = "";
        event.target.style.zIndex = "10";
    }
});

function change_picture() {
    var old_picture = open_picture;
    open_picture++;
    if (open_picture > total_pictures) {
        open_picture = 1;
    }
    var picture = document.getElementById("bild_" + old_picture);
    picture.style.zIndex = "11";
    var new_picture = document.getElementById("bild_" + open_picture);
    new_picture.zIndex = "10";
    new_picture.style.opacity = "1";
    picture.className = "slideshow_fadeout";
    picture.style.opacity = "0";
}
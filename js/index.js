var buffer = "";
var load_content = false;
var name_of_page = "home";
var is_loading = false;

window.addEventListener("load", function () {
    getPageContent("home");
    var loading_screen = document.getElementById("loading_div");
    setTimeout(function () {
        if (buffer !== null || buffer !== "") {
            document.getElementById("loaded_page").innerHTML = buffer;
            loading_screen.className = "fade_out_animation";
            loading_screen.style.opacity = "0";
            load_content = false;
        } else {
            load_content = true;
        }
    }, 500);
});

document.getElementById("loading_div").addEventListener("animationend", function () {
    if(is_loading) {
        if (buffer !== null || buffer !== "") {
            document.getElementById("loaded_page").innerHTML = buffer;
            var loading_screen = document.getElementById("loading_div");
            loading_screen.className = "fade_out_animation";
            loading_screen.style.opacity = "0";
            load_content = false;
        } else {
            load_content = true;
        }
        is_loading = false;
    }
});

function loadPage(page_name, element) {
    getPageContent(page_name);
    name_of_page = page_name;
    var loading_screen = document.getElementById("loading_div");
    loading_screen.style.animationPlayState = "initial";
    loading_screen.className = "fade_in_animation";
    loading_screen.style.opacity = "1";
    is_loading = true;

    var titles = document.getElementsByClassName("nav_title");
    for(var i = 0; i < titles.length; i++) {
        if (titles[i] !== element) {
            titles[i].style.fontWeight = "normal";
        }
    }
    if (element !== null) {
        element.style.fontWeight = "bold";
    }
    document.title = "Paijan - " + page_name;
}

function getPageContent(page_name) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if ( this.status === 200) {
                if(name_of_page === page_name) {
                    if (load_content === true) {
                        document.getElementById("loaded_div").innerHTML = this.responseText;
                        var loading_screen = document.getElementById("loading_div");
                        loading_screen.className = "fade_out_animation";
                        loading_screen.style.opacity = "0";
                        load_content = false;
                    } else {
                        buffer = this.responseText;
                    }
                } else {
                    getPageContent(name_of_page);
                }
            } else {
                console.log("Error loading page: '" + page_name + "'");
            }
        }
    };
    request.open("GET", "sites/" + page_name + ".html", true);
    request.send();
}
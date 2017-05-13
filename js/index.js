var buffer = "";
var load_content = false;
var name_of_page = "";
var is_loading = false;

window.addEventListener("load", function () {
    var url = window.location.href.split("?")[1];
    if(url === "" || url === null || url === undefined) {
        name_of_page = "home";
        getPageContent("home");
        document.getElementById("nav_title_home").style.fontWeight = "bold";
    } else {
        name_of_page = url;
        getPageContent(url);
        var nav_element = document.getElementById("nav_title_" + url);
        if (nav_element !== null) {
            nav_element.style.fontWeight = "bold";
        }
    }
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

window.addEventListener("popstate", function (event) {
    var prev_page = event.state;
    getPageContent(prev_page);
    name_of_page = prev_page;
    var loading_screen = document.getElementById("loading_div");
    loading_screen.style.animationPlayState = "initial";
    loading_screen.className = "fade_in_animation";
    loading_screen.style.opacity = "1";
    is_loading = true;
    var element = document.getElementById("nav_title_" + prev_page);
    var titles = document.getElementsByClassName("nav_title");
    for(var i = 0; i < titles.length; i++) {
        if (titles[i] !== element) {
            titles[i].style.fontWeight = "normal";
        }
    }
    if (element !== null) {
        element.style.fontWeight = "bold";
    }
    document.title = "Paijan - " + prev_page;
});

function loadPage(page_name, element) {
    getPageContent(page_name);
    name_of_page = page_name;
    history.pushState(page_name, page_name, "?" + page_name);
    console.clear();
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

function getPageContent(page_name, error_code) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if ( this.status === 200) {
                if(name_of_page === page_name) {
                    if (load_content === true) {
                        var loading_screen = document.getElementById("loading_div");
                        if (page_name === "error_page" && (error_code !== null || error_code !== undefined)) {
                            document.getElementById("loaded_page").innerHTML = this.responseText.replaceAll("#ec", error_code);
                            loading_screen.className = "fade_out_animation";
                            loading_screen.style.opacity = "0";
                            load_content = false;
                        } else {
                            document.getElementById("loaded_page").innerHTML = this.responseText;
                            loading_screen.className = "fade_out_animation";
                            loading_screen.style.opacity = "0";
                            load_content = false;
                        }
                    } else {
                        if (page_name === "error_page" && (error_code !== null || error_code !== undefined)) {
                            buffer = this.responseText.replaceAll("#ec", error_code);
                        } else {
                            buffer = this.responseText;
                        }
                    }
                } else {
                    getPageContent(name_of_page);
                }
            } else {
                name_of_page = "error_page";
                getPageContent("error_page", this.status);
                console.log("Error loading page: '" + page_name + "'\nError code: " + this.status);
            }
        }
    };
    request.open("GET", "sites/" + page_name + ".html", true);
    request.send();
}
var buffer = "";
var load_content = false;
var name_of_page = "";
var is_loading = false;
var mobile_menu_open = false;

window.addEventListener("load", function () {
    var url = "";
    if(window.location.href.indexOf("?") > 0) {
        url = window.location.href.split("?")[1];
    } else if (window.location.href.indexOf("#") > 0) {
        url = window.location.href.split("#")[1];
    }

    if(url === "" || url === null || url === undefined) {
        name_of_page = "home";
        getPageContent("home");
        document.getElementById("nav_title_home").style.fontWeight = "bold";
        document.getElementById("mobile_nav_title_home").style.fontWeight = "bold";
        document.title = "Paijan - Hem";
    } else {
        name_of_page = url;
        getPageContent(url);
        var nav_element = document.getElementById("nav_title_" + url);
        var m_nav_element = document.getElementById("mobile_nav_title_" + url);
        if (nav_element !== null && m_nav_element !== null) {
            nav_element.style.fontWeight = "bold";
            m_nav_element.style.fontWeight = "bold";
        }
        document.title = "Paijan - " + getRealNames(url);
    }
    var loading_screen = document.getElementById("loading_div");
    setTimeout(function () {
        if (buffer !== null || buffer !== "") {
            document.getElementById("loaded_page").innerHTML = buffer;
            if (Math.max(document.body.scrollHeight, document.body.offsetHeight) > window.innerHeight) {
                document.getElementsByTagName("footer")[0].style.position = "relative";
            } else {
                document.getElementsByTagName("footer")[0].style.position = "absolute";
            }
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
            if (Math.max(document.body.scrollHeight, document.body.offsetHeight) > window.innerHeight) {
                document.getElementsByTagName("footer")[0].style.position = "relative";
            } else {
                document.getElementsByTagName("footer")[0].style.position = "absolute";
            }
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
    var m_element = document.getElementById("mobile_nav_title_" + prev_page);
    var titles = document.getElementsByClassName("nav_title");
    for(var i = 0; i < titles.length; i++) {
        if (titles[i] !== element && titles[i] !== m_element) {
            titles[i].style.fontWeight = "normal";
        }
    }
    if (element !== null && m_element !== null) {
        element.style.fontWeight = "bold";
        m_element.style.fontWeight = "bold";
    }
    document.title = "Paijan - " + getRealNames(prev_page);
});

function loadPage(page_name, element) {
    getPageContent(page_name);
    name_of_page = page_name;
    history.pushState(page_name, page_name, "?" + page_name);
    var loading_screen = document.getElementById("loading_div");
    loading_screen.style.animationPlayState = "initial";
    loading_screen.className = "fade_in_animation";
    loading_screen.style.opacity = "1";
    is_loading = true;

    var m_element = document.getElementById("mobile_nav_title_" + page_name);
    var titles = document.getElementsByClassName("nav_title");
    for(var i = 0; i < titles.length; i++) {
        if (titles[i] !== element && titles[i] !== m_element) {
            titles[i].style.fontWeight = "normal";
        }
    }
    if (element !== null && m_element !== null) {
        element.style.fontWeight = "bold";
        m_element.style.fontWeight = "bold";
    }
    document.title = "Paijan - " + getRealNames(page_name);
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
                            if (Math.max(document.body.scrollHeight, document.body.offsetHeight) > window.innerHeight) {
                                document.getElementsByTagName("footer")[0].style.position = "relative";
                            } else {
                                document.getElementsByTagName("footer")[0].style.position = "absolute";
                            }
                            loading_screen.className = "fade_out_animation";
                            loading_screen.style.opacity = "0";
                            load_content = false;
                        } else {
                            document.getElementById("loaded_page").innerHTML = this.responseText;
                            if (Math.max(document.body.scrollHeight, document.body.offsetHeight) > window.innerHeight) {
                                document.getElementsByTagName("footer")[0].style.position = "relative";
                            } else {
                                document.getElementsByTagName("footer")[0].style.position = "absolute";
                            }
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

function getRealNames(url) {
    switch(url) {
        case "home": return "Hem";
        case "about-paijan": return "Om Paijan";
        case "support": return "Support";
        case "faq": return "Vanliga Frågor";
        case "accessories": return "Tillbehör";
    }
}

function on_menu_click() {
    var top_bar = document.getElementById("top_bar");
    var middle_bar = document.getElementById("middle_bar");
    var bottom_bar = document.getElementById("bottom_bar");
    var mobile_menu = document.getElementById("mobile_menu");
    if (mobile_menu_open) {
        top_bar.className = "top_bar_animate_out";
        top_bar.style.transform = "rotate(0deg)";
        middle_bar.className = "middle_bar_animate_out";
        middle_bar.style.opacity = "1";
        bottom_bar.className = "bottom_bar_animate_out";
        bottom_bar.style.transform = "rotate(0deg)";
        mobile_menu.className = "mobile_menu_animate_out";
        mobile_menu.style.right = "-120vw";
        document.body.style.overflow = "scroll";
        mobile_menu_open = false;
    } else {
        top_bar.className = "top_bar_animate_in";
        top_bar.style.transform = "rotate(-45deg)";
        middle_bar.className = "middle_bar_animate_in";
        middle_bar.style.opacity = "0";
        bottom_bar.className = "bottom_bar_animate_in";
        bottom_bar.style.transform = "rotate(45deg)";
        mobile_menu.className = "mobile_menu_animate_in";
        mobile_menu.style.right = "0";
        document.body.style.overflow = "hidden";
        mobile_menu_open = true;
    }
}

function close_mobile_menu() {
    if(mobile_menu_open) {
        var top_bar = document.getElementById("top_bar");
        var middle_bar = document.getElementById("middle_bar");
        var bottom_bar = document.getElementById("bottom_bar");
        var mobile_menu = document.getElementById("mobile_menu");
        top_bar.className = "top_bar_animate_out";
        top_bar.style.transform = "rotate(0deg)";
        middle_bar.className = "middle_bar_animate_out";
        middle_bar.style.opacity = "1";
        bottom_bar.className = "bottom_bar_animate_out";
        bottom_bar.style.transform = "rotate(0deg)";
        mobile_menu.className = "mobile_menu_animate_out";
        mobile_menu.style.right = "-120vw";
        document.body.style.overflow = "scroll";
        mobile_menu_open = false;
    }
}
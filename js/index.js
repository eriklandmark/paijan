window.addEventListener("load", function () {
    setTimeout(function () {
        loadPage("home", document.getElementById("nav_title_home"));
    }, 500);
});

function loadPage(page_name, element) {
    var titles = document.getElementsByClassName("nav_title");
    for(var i = 0; i < titles.length; i++) {
        if (titles[i] !== element) {
            titles[i].style.fontWeight = "normal";
        }
    }
    if (element !== null) {
        element.style.fontWeight = "bold";
    }
    var request = new XMLHttpRequest();
    document.getElementById("loaded_page").innerHTML = "";
    document.getElementById("loading_gif").style.display = "flex";
    document.getElementsByTagName("footer")[0].style.display = "none";
    document.title = "Paijan - " + page_name;
    setTimeout(function () {
        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if ( this.status === 200) {
                    document.getElementById("loading_gif").style.display = "none";
                    document.getElementById("loaded_page").innerHTML = this.responseText;
                    if(Math.max( document.body.scrollHeight, document.body.offsetHeight) > window.innerHeight) {
                        document.getElementsByTagName("footer")[0].style.position = "relative";
                    } else {
                        document.getElementsByTagName("footer")[0].style.position = "absolute";
                    }
                    document.getElementsByTagName("footer")[0].style.display = "flex";
                    console.log("Loading page: '" + page_name + "'");
                } else {
                    console.log("Error loading page: '" + page_name + "'");
                }
            }
        };
        request.open("GET", "sites/" + page_name + ".html", true);
        request.send();
    }, Math.floor((Math.random()/2.0 * 1000) + 200));
}
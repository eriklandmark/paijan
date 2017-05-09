function loadPage(page_name) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            if ( this.status == 200) {
                onSuccess(this.responseText);
            } else {
                console.log("Error for new ajax call: '" + url + "'");
            }
        }
    };

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.open("GET", "site/home.html", true);
    request.send();
}
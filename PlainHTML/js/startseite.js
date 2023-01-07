let gaestebuch;

window.onload = function () {
    getData();
    schreibeEintraganzahl();
}

function getData() {
    let request = new XMLHttpRequest();
    request.open("GET", '../data/gestbookentry.json', false);
    request.send(null);
    gaestebuch = JSON.parse(request.responseText);
}


function schreibeEintraganzahl() {
    let eintragAnzahl = document.createTextNode(gaestebuch.length);

    document.getElementById("eintraege").appendChild(eintragAnzahl);
}
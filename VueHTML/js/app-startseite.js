let gaestebuch;

window.onload
{
    getData();
}

function getData() {
    let request = new XMLHttpRequest();
    request.open("GET", '../data/gestbookentry.json', false);
    request.send(null);
    gaestebuch = JSON.parse(request.responseText);
}

Vue.createApp({
    data() {
        return {
            eintragAnzahl: gaestebuch.length,
        }
    }
}).mount('.app');
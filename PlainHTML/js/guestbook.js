let gaestebuch;
let gefiltertesGaestebuch;
let gaestebuchSeiten;
let seitenZahl = 5;
let aktuelleSeitenZahl = 1;

window.onload = function () {
    getData();
    loadDatat();
    document.getElementById("suchfeld")
        .addEventListener("input", function () {
            filtereGaestebuch(document.getElementById("suchfeld").value);
        });
}

function getData() {
    let request = new XMLHttpRequest();
    request.open("GET", '../data/gestbookentry.json', false);
    request.send(null);
    gaestebuch = JSON.parse(request.responseText);
}

function loadDatat() {
    filtereGaestebuch("");
}

function filtereGaestebuch(suchParameter) {
    aktuelleSeitenZahl = 1;

    gefiltertesGaestebuch = gaestebuch.filter(eintrag => {
        const vorname = eintrag.name.vorname.toString().toLowerCase();
        const nachname = eintrag.name.nachname.toString().toLowerCase();

        const searchTerm = suchParameter.toLowerCase();

        return vorname.includes(searchTerm) ||
            nachname.includes(searchTerm);
    });

    teileGaestebuch();
}

function teileGaestebuch(){
        let seiten = [];
        let seite = [];
        for (let i = 0; i < gefiltertesGaestebuch.length; i++) {
            if (seite.length < 4)
                seite.push(gefiltertesGaestebuch[i]);
            else {
                seiten.push(seite);
                seite = [];
                seite.push(gefiltertesGaestebuch[i]);
            }
        }
        if (seite !== [])
            seiten.push(seite);
    gaestebuchSeiten = seiten;

    aktuelleSeitenZahl = 1;
    berechneSeitenanzahl();
}

function berechneSeitenanzahl() {
    let maxSeitennummer = 0;
    for (let i = 0; i < gefiltertesGaestebuch.length; i += 4) {
        maxSeitennummer++
    }
    seitenZahl = maxSeitennummer;

    leereGaestebuch();
}

function leereGaestebuch() {
    let gaestebuchWrapper = document.getElementById("gaestebucheintraege");

    if (gaestebuchWrapper != null) {
        //e.firstElementChild can be used.
        let child = gaestebuchWrapper.lastElementChild;
        while (child) {
            gaestebuchWrapper.removeChild(child);
            child = gaestebuchWrapper.lastElementChild;
        }
        let seitenzahlenWrapper = document.getElementById("seitenzahlen");

        //e.firstElementChild can be used.
        child = seitenzahlenWrapper.lastElementChild;
        while (child) {
            seitenzahlenWrapper.removeChild(child);
            child = seitenzahlenWrapper.lastElementChild;
        }
    }
    schreibeGaestebuch();

}


function schreibeGaestebuch() {
    document.getElementById("seitenanzeige")
        .innerText = "Gästebucheinträge - Seite " + aktuelleSeitenZahl;

    for (const eintrag of gaestebuchSeiten[aktuelleSeitenZahl - 1]) {
        let eintragWrapper = document.createElement("div");
        eintragWrapper.classList.add("eintrag");

        let name = document.createElement("h2");
            let TNname = document.createTextNode(
                eintrag.name.vorname + " " + eintrag.name.nachname);
        name.appendChild(TNname);
        eintragWrapper.appendChild(name);

        let hr = document.createElement("hr");
        hr.classList.add("line");
        eintragWrapper.appendChild(hr);



        // Tabelle
        let table1 = document.createElement("table");

        //Geburtstag
        let tr1 = document.createElement("tr");
        let titelGeburtstag = document.createElement("td");
            let TNtitelGeburtstag = document.createTextNode("Geburtstag:");
        titelGeburtstag.appendChild(TNtitelGeburtstag);
        titelGeburtstag.classList.add("tablebold");
        tr1.appendChild(titelGeburtstag);
        let inhaltGeburtstag = document.createElement("td");
            let TNinhaltGeburtstag = document.createTextNode(eintrag.geburtstag);
        inhaltGeburtstag.appendChild(TNinhaltGeburtstag);
        tr1.appendChild(inhaltGeburtstag);
        table1.appendChild(tr1);

        //Kontakt
        let tr2 = document.createElement("tr");
        let titelKontakt = document.createElement("td");
        let TNtitelKontakt = document.createTextNode("Kontakt:");
        titelKontakt.appendChild(TNtitelKontakt);
        titelKontakt.classList.add("tablebold");
        tr2.appendChild(titelKontakt);
        let inhaltKontakt = document.createElement("td");
        let TNinhaltKontakt = document.createTextNode(eintrag.mail);
        inhaltKontakt.appendChild(TNinhaltKontakt);
        tr2.appendChild(inhaltKontakt);
        table1.appendChild(tr2);

        //Wohnort
        let tr3 = document.createElement("tr");
        let titelWohnort = document.createElement("td");
        let TNtitelWohnort = document.createTextNode("PLZ/Wohnort:");
        titelWohnort.appendChild(TNtitelWohnort);
        titelWohnort.classList.add("tablebold");
        tr3.appendChild(titelWohnort);
        let inhaltWohnort = document.createElement("td");
        let TNinhaltWohnort = document.createTextNode(
            eintrag.plz + " " + eintrag.wohnort);
        inhaltWohnort.appendChild(TNinhaltWohnort);
        tr3.appendChild(inhaltWohnort);
        table1.appendChild(tr3);

        //Hobbys
        let tr4 = document.createElement("tr");
        let titelHobbys = document.createElement("td");
            let TNtitelHobbys = document.createTextNode("Hobbys:");
        titelHobbys.appendChild(TNtitelHobbys);
        titelHobbys.classList.add("tablebold");
        tr4.appendChild(titelHobbys);
        let inhaltHobbys = document.createElement("td");
            for (const hobby of eintrag.hobbys) {
                let AinhaltHobbys = document.createElement("a");
                    let TNinhaltHobbys = document.createTextNode(hobby.beschreibung + " ");
                AinhaltHobbys.appendChild(TNinhaltHobbys);
                inhaltHobbys.appendChild(AinhaltHobbys)
            }
        tr4.appendChild(inhaltHobbys);
        table1.appendChild(tr4);

        eintragWrapper.appendChild(table1);
        let table2 = document.createElement("table");

        //Nachricht
        let tr5 = document.createElement("tr");
        let titelNachricht = document.createElement("td");
        let TNtitelNachricht = document.createTextNode("Nachricht:");
        titelNachricht.appendChild(TNtitelNachricht);
        titelNachricht.classList.add("tablebold");
        tr5.appendChild(titelNachricht);
        table2.appendChild(tr5);
        let tr6 = document.createElement("tr");
        let inhaltNachricht = document.createElement("td");
        let TNinhaltNachricht = document.createTextNode(eintrag.nachricht);
        inhaltNachricht.appendChild(TNinhaltNachricht);
        tr6.appendChild(inhaltNachricht);
        table2.appendChild(tr6);

        eintragWrapper.appendChild(table2);
        // Tabelle

        document.getElementById("gaestebucheintraege").appendChild(eintragWrapper);
    }

    // ### Seitenzahlen ###
    for (let i = 1; i <= seitenZahl; i++) {
        let seitenzahl = document.createElement("button");
        let TNseitenzahl = document.createTextNode(i);
        seitenzahl.appendChild(TNseitenzahl);
        seitenzahl.classList.add("button", "nummerButton");
        if (i === aktuelleSeitenZahl)
            seitenzahl.classList.add("aktiverButton");
        seitenzahl.id = "buton" + i;
        seitenzahl.onclick = function (){wechselSeite(i)};
        document.getElementById("seitenzahlen").appendChild(seitenzahl);
    }


    schalteButtonsUm();
}

function schalteButtonsUm() {
    document.getElementById("buttonZurueck").disabled = aktuelleSeitenZahl <= 1;
    document.getElementById("buttonNaechste").disabled = aktuelleSeitenZahl >= seitenZahl;
}


function wechselSeite(seite) {
    switch (seite) {
        case "nächste":
            aktuelleSeitenZahl++;
            break;
        case "zurück":
            aktuelleSeitenZahl--;
            break;
        default:
            aktuelleSeitenZahl = seite;
            break;
    }
    leereGaestebuch();
    document.documentElement.scrollTop = 480;
}
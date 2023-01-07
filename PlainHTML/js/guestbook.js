let gaestebuch;
let gefiltertesGaestebuch;
let gaestebuchSeiten;
let seitenZahl = 5;
let aktuelleSeitenZahl = 1;
let suchparameter;

window.onload
{
    getData();
    gefiltertesGaestebuch = gaestebuch;
    gaestebuchSeiten = teileGaestebuch();
    loadDatat();
}

function getData() {
    let request = new XMLHttpRequest();
    request.open("GET", 'https://api.mockaroo.com/api/a4f9d370?count=50&key=82ef44b0', false);
    request.send(null);
    gaestebuch = JSON.parse(request.responseText);
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
        console.log(seiten);
        return seiten;
}

function loadDatat() {
    schreibeGaestebuch();
}

function schreibeGaestebuch() {
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
                    let TNinhaltHobbys = document.createTextNode(hobby.beschreibung);
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


        document.getElementById("Gaestebucheintraege").appendChild(eintragWrapper);
    }

    // ### Seitenzahlen ###
    for (let i = 1; i <= seitenZahl; i++) {
        let seitenzahl = document.createElement("button");
        let TNseitenzahl = document.createTextNode(i);
        seitenzahl.appendChild(TNseitenzahl);
        seitenzahl.classList.add("button", "nummerButton");
        if (i === 1)
            seitenzahl.classList.add("aktiverButton");
        seitenzahl.id = "buton" + i;
        seitenzahl.onclick = wechselSeite(i);
        document.getElementById("seitenzahlen").appendChild(seitenzahl);
    }
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
    document.documentElement.scrollTop = 480;
}
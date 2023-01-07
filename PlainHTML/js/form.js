let gaestebuch;
let neuerEintrag = {
        "name": {
            "vorname": "",
            "nachname": ""
        },
        "geburtstag": "",
        "mail": "",
        "wohnort": "",
        "plz": null,
        "hobbys": [],
        "nachricht": ""
    };
let confirmed = false;
let unvollstaendig = false;
let falscheDaten = false;

window.onload = function () {
    getData();

    document.getElementById("hobby")
        .addEventListener("keypress", function (event) {
            if (event.key === "Enter")
                addHobby();
        });
}

function getData() {
    let request = new XMLHttpRequest();
    request.open("GET", '../data/gestbookentry.json', false);
    request.send(null);
    gaestebuch = JSON.parse(request.responseText);
}

function addHobby() {
    let hobby = document.getElementById("hobby").value;
    neuerEintrag.hobbys.push({
        "beschreibung": hobby
    });
    let hobbyCount = neuerEintrag.hobbys.length;

    document.getElementById("hobby").value = "";

    let li = document.createElement("li");
    let textNode = document.createTextNode(hobby);
    li.setAttribute("id", "hobby" + hobbyCount)
    li.appendChild(textNode);
    let button = document.createElement("button");
    button.addEventListener("click", function () {
        deleteHobby("hobby" + hobbyCount);
    });
    button.innerText = "x";
    li.appendChild(button);
    document.getElementById("hobbys").appendChild(li);

}

function deleteHobby(hobbyID) {
    let toDeleteHobby = document.getElementById(hobbyID);
    let beschreibung = toDeleteHobby.innerHTML.split("<button>x</button>")[0];

    for (let i = 0; i < neuerEintrag.hobbys.length; i++) {
        if (neuerEintrag.hobbys[i].beschreibung === beschreibung) {
            neuerEintrag.hobbys.splice(i, 1)
        }
    }
    document.getElementById("hobbys").innerHTML = "";

    for (let i = 0; i < neuerEintrag.hobbys.length; i++) {
        let li = document.createElement("li");
        let textNode = document.createTextNode(neuerEintrag.hobbys[i].beschreibung);
        li.setAttribute("id", "hobby" + (i+1))
        li.appendChild(textNode);
        let button = document.createElement("button");
        button.addEventListener("click", function () {
            deleteHobby("hobby" + (i+1));
        });
        button.innerText = "x";
        li.appendChild(button);
        document.getElementById("hobbys").appendChild(li);
    }
}

function confirmForm() {
    holeDaten();
    gaestebuch.push(neuerEintrag);
    if (pruefeInput()) {
        document.getElementById("mitteilungsText").innerText
            = "Dein Gästebucheintrag wurde erfolgreich erstellt!"
        confirmed = true;
        document.getElementById("form")
            .style.display = "none";
        document.getElementById("meldung").classList.remove("fehler");
        document.getElementById("meldung").classList.add("erfolg");
        schreibeGaestebuchEintarg();
    } else {
        document.getElementById("meldung").classList.add("fehler");
        if (unvollstaendig)
            document.getElementById("mitteilungsText").innerText
                = "Eingaben unvollständig! Bitte alle Felder Füllen"
        else if (falscheDaten)
            document.getElementById("mitteilungsText").innerText
                = "Eingaben Fehlerhaft! Bitte alle Felder überprüfen"
    }
    document.getElementById("meldung")
        .style.display = "flex";
}

function holeDaten() {
    neuerEintrag.name.vorname =
        document.getElementById("vorname").value;
    neuerEintrag.name.nachname =
        document.getElementById("nachname").value;
    neuerEintrag.geburtstag =
        document.getElementById("geburtstag").value;
    neuerEintrag.mail =
        document.getElementById("mail").value;
    neuerEintrag.plz =
        document.getElementById("plz").value;
    neuerEintrag.wohnort =
        document.getElementById("wohnort").value;
    neuerEintrag.nachricht =
        document.getElementById("nachricht").value;
}

function schreibeGaestebuchEintarg() {

    let eintragWrapper = document.createElement("section");
    eintragWrapper.classList.add("eintrag");
    eintragWrapper.classList.add("box");

    let name = document.createElement("h2");
    let TNname = document.createTextNode(
        neuerEintrag.name.vorname + " " + neuerEintrag.name.nachname);
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
    let TNinhaltGeburtstag = document.createTextNode(neuerEintrag.geburtstag);
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
    let TNinhaltKontakt = document.createTextNode(neuerEintrag.mail);
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
        neuerEintrag.plz + " " + neuerEintrag.wohnort);
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
    for (const hobby of neuerEintrag.hobbys) {
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
    let TNinhaltNachricht = document.createTextNode(neuerEintrag.nachricht);
    inhaltNachricht.appendChild(TNinhaltNachricht);
    tr6.appendChild(inhaltNachricht);
    table2.appendChild(tr6);

    eintragWrapper.appendChild(table2);
    // Tabelle

    document.getElementById("wrapper").appendChild(eintragWrapper);
}

function pruefeInput(){
    unvollstaendig = false;
    falscheDaten = false;
    let inputVollstaendig = true;

    if (neuerEintrag.name.vorname === "" ||
        neuerEintrag.name.nachname === "" ||
        neuerEintrag.geburtstag === "" ||
        neuerEintrag.mail === "" ||
        neuerEintrag.plz === "" ||
        neuerEintrag.wohnort === "" ||
        neuerEintrag.hobbys.length === 0 ||
        neuerEintrag.nachricht === ""){
        inputVollstaendig = false;
        unvollstaendig = true;
    }


    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(neuerEintrag.mail)){
        inputVollstaendig = false;
        falscheDaten = true;
    }

    if (!/^[0-9]{5}$/.test(neuerEintrag.plz)){
        inputVollstaendig = false;
        falscheDaten = true;
    }

    if (neuerEintrag.geburtstag > "2023-01-01" ||
        neuerEintrag.geburtstag < "1920-01-01"){
        inputVollstaendig = false;
        falscheDaten = true;
    }

    return inputVollstaendig;
}

function schließeMeldung(){
    document.getElementById("meldung")
        .style.display = "none";
}
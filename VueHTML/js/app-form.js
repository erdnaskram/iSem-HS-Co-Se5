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
            gaestebuch: gaestebuch,
            neuerEintrag: {
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
            },
            hobby: "",
            confirmed: false,
            mitteilung: false,
            fehler: false,
            unvollstaendig: false,
            falscheDaten: false,
            erfolg: false,
            meldung:"",
        }
    },
    computed: {},
    methods: {
        addHobby() {
            this.neuerEintrag.hobbys.push({
                "beschreibung": this.hobby
            });
            this.hobby = "";
        },
        deleteHobby(beschreibung) {
            for (let i = 0; i < this.neuerEintrag.hobbys.length; i++) {
                if (this.neuerEintrag.hobbys[i].beschreibung === beschreibung) {
                   this.neuerEintrag.hobbys.splice(i, 1)
                }
            }
        },
        confirmForm() {
            this.gaestebuch.push(this.neuerEintrag);
            if (this.pruefeInput()) {
                this.erfolg = true;
                this.meldung = "Dein Gästebucheintrag wurde erfolgreich erstellt!"
                this.confirmed = true;
            } else {
                this.fehler = true;
                if (this.unvollstaendig)
                    this.meldung = "Eingaben unvollständig! Bitte alle Felder Füllen"
                else if (this.falscheDaten)
                    this.meldung = "Eingaben Fehlerhaft! Bitte alle Felder überprüfen"
            }
            this.mitteilung=true;
        },
        pruefeInput(){
            this.fehler = false;
            this.unvollstaendig = false;
            this.falscheDaten = false;
            this.erfolg = false;
            let inputVollstaendig = true;

            if (this.neuerEintrag.name.vorname === "" ||
                    this.neuerEintrag.name.nachname === "" ||
                    this.neuerEintrag.geburtstag === "" ||
                    this.neuerEintrag.mail === "" ||
                    this.neuerEintrag.plz === "" ||
                    this.neuerEintrag.wohnort === "" ||
                    this.neuerEintrag.hobbys.length === 0 ||
                    this.neuerEintrag.nachricht === ""){
                inputVollstaendig = false;
                this.unvollstaendig = true;
            }


            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.neuerEintrag.mail)){
                inputVollstaendig = false;
                this.falscheDaten = true;
            }

            if (!/^[0-9]{5}$/.test(this.neuerEintrag.plz)){
                inputVollstaendig = false;
                this.falscheDaten = true;
            }


            if (this.neuerEintrag.geburtstag > "2023-01-01" ||
                this.neuerEintrag.geburtstag < "1920-01-01"){
                inputVollstaendig = false;
                this.falscheDaten = true;
            }




            return inputVollstaendig;
        },
        schließeMeldung(){
            this.fehler = false;
            this.erfolg = false;
            this.mitteilung = false;
        }
    }
}).mount('.app');
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
            this.confirmed = true;
        }
    }
}).mount('.app');
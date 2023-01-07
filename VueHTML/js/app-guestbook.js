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
            aktuelleSeitenZahl: 1,
            suchParameter: '',
        }
    },
    computed: {
        gefiltertesGaestebuch() {
            this.aktuelleSeitenZahl = 1;
            return this.gaestebuch.filter(eintrag => {
                const vorname = eintrag.name.vorname.toString().toLowerCase();
                const nachname = eintrag.name.nachname.toString().toLowerCase();

                const searchTerm = this.suchParameter.toLowerCase();

                return vorname.includes(searchTerm) ||
                    nachname.includes(searchTerm);
            });
        },
        gaestebuchSeiten() {
            let seiten = [];
            let seite = [];
            for (let i = 0; i < this.gefiltertesGaestebuch.length; i++) {
                if (seite.length < 4)
                    seite.push(this.gefiltertesGaestebuch[i]);
                else {
                    seiten.push(seite);
                    seite = [];
                    seite.push(this.gefiltertesGaestebuch[i]);
                }
            }
            if (seite !== [])
                seiten.push(seite);
            console.log(seiten);
            this.$forceUpdate();
            return seiten;
        },
        seitenZahlen() {
            let zahlen = [];
            console.log(this.aktuelleSeitenZahl)
            for (let i = 0; i < this.gefiltertesGaestebuch.length; i += 4) {
                if (i / 4 + 1 === this.aktuelleSeitenZahl)
                    zahlen.push({ "zahl": i / 4 + 1, "istAktiv": true});
                else
                    zahlen.push({ "zahl": i / 4 + 1, "istAktiv": false});
            }
            console.log(zahlen)
            return zahlen;
        },
        aktuelleSeite() {
            return this.gaestebuchSeiten[this.aktuelleSeitenZahl - 1];
        },
        ersteSeite() {
            return this.aktuelleSeitenZahl === 1;
        },
        letzteSeite() {
            return this.aktuelleSeitenZahl === this.gaestebuchSeiten.length;
        }
    },
    methods: {
        wechselSeite(seite) {
            switch (seite) {
                case "nächste":
                    this.aktuelleSeitenZahl++;
                    break;
                case "zurück":
                    this.aktuelleSeitenZahl--;
                    break;
                default:
                    this.aktuelleSeitenZahl = seite;
                    break;
            }
            document.documentElement.scrollTop = 480;
        }
    }
}).mount('.app');
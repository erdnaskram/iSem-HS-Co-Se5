import gaestebuch from 'https://api.mockaroo.com/api/a4f9d370?count=5&key=82ef44b0' assert { type: 'json' };

Vue.createApp( {
    data() {
        return {
            gaestebuch: gaestebuch
        }
    },
    methods: {

    }
}).mount('.app');
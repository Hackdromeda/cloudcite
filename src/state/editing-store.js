import { observable, action, computed, decorate } from 'mobx';

class Store {
    constructor() {
        this.citationData = {"id":"citation-0","type":"website","URL":"cloudcite.net","contributors":[{"given":"Naval","middle":"","family":"Patel","type":"Author"}],"source":null,"archive":null,"archive_location":null,"call-number":null,"container-title":"CloudCite","dimensions":null,"edition":null,"ISBN":null,"medium":null,"number-of-volumes":null,"number-of-pages":null,"volume":null,"title":"CloudCite · The Best Free Automatic Bibliography Generator · MLA, APA, Chicago, Harvard Citation Styles","title-short":null,"genre":null,"publisher":null,"publisher-place":null,"issued":{"month":8,"day":10,"year":2018},"accessed":{"month":9,"day":19,"year":2018},"abstract":"CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago."};
    }

    get editing() {
        return this.citationData;
    }

    set editing(value) {
        this.citationData = value;
    }
}

decorate(Store, {
    editing: computed
});

const EditingStore = new Store();
export default EditingStore;
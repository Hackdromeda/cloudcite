import * as store from './store';
export default class FilmCitation {
    contributors: any[]
    title: string
    publisher: string
    issued: any
    abstract: string
    publisherPlace: string

    constructor(contributors: any[], title: string, publisher: string, publisherPlace: string, issued: any, abstract: string) {
        this.contributors = contributors
        this.title = title
        this.publisher = publisher
        this.publisherPlace = publisherPlace
        this.issued = issued
        this.abstract = abstract
    }

    removeContributor(index: number) {
        this.contributors = this.contributors.filter(element => element !== this.contributors[index]);
    }
    clearContributor(index: number) {
        this.contributors[index] = Object.assign(this.contributors[index], {first: null, middle: null, last: null, type: "Director"})
    }
    toCSL() {
        var cslMonth = this.issued.month + 1
        var accessedDate = new Date()
        //@ts-ignore
        var id: string = 'Film/' + (store.default.getters.getCitations.filter(c => c.csl[Object.keys(c.csl)[0]].id.substring(0, 4) === 'Film').length + 1)
        return {
            "style": "modern-language-association", 
            "locale": "locales-en-US", 
            "csl": {
                [id]:{
                    "accessed":{
                        "month": cslMonth ? cslMonth: "",
                        "year": accessedDate.getFullYear(),
                        "day": accessedDate.getDay()
                    },
                    "issued":{
                        "month": this.issued.month ? this.issued.month: "",
                        "year": this.issued.year ? this.issued.year: "",
                        "day": this.issued.day ? this.issued.day: ""
                    },
                    "type":"motion_picture",
                    "id": id,
                    "director": this.contributors.filter(c => c.type === "Director"),
                    "author": this.contributors.filter(c => c.type === "Writer" || c.type === "Actor/Performer" || c.type == "Author"),
                    "editorial-director": this.contributors.filter(c => c.type === "Producer"),
                    "publisher": this.publisher ? this.publisher: "",
                    "publisher-place": this.publisherPlace ? this.publisherPlace: "",
                    "title": this.title ? this.title: "",
                    "abstract": this.abstract ? this.abstract: ""
                }
            }
        }
    }
    cite() {
        console.log('Cite')
    }
}
import * as store from './store';

export default class WebsiteCitation {
    contributors: any[]
    source: string
    title: string
    url: string
    publisher: string
    issued: any

    constructor(contributors: any, source: any, title: any, url: any, publisher: any, issued: any) {
        this.contributors = contributors
        this.source = source
        this.title = title
        this.url = url
        this.publisher = publisher
        this.issued = issued //date published
    }

    removeContributor(index: number) {
        this.contributors = this.contributors.filter(element => element !== this.contributors[index]);
    }
    clearContributor(index: number) {
        this.contributors[index] = Object.assign(this.contributors[index], {given: null, middle: null, family: null, type: "Author"})
    }

    toCSL() {
        var cslMonth = this.issued.month + 1
        var accessedDate = new Date()
        //@ts-ignore
        var id: string = 'Website/' + (store.default.getters.getCitations.filter(c => c.csl.id.substring(0, 7) === 'Website').length + 1)
        return {
            "style": "modern-language-association", 
            "locale": "locales-en-US", 
            "csl": {
                [id]: {
                    "accessed":{
                        "month": cslMonth,
                        "year": accessedDate.getFullYear(),
                        "day": accessedDate.getDay()
                    },
                    "issued":{
                        "month": this.issued.month,
                        "year": this.issued.year,
                        "day": this.issued.day
                    },
                    "type":"website",
                    "id": id,
                    "author": this.contributors.filter(c => c.type === "Author"),
                    "editor": this.contributors.filter(c => c.type === "Editor"),
                    "title": this.title,
                    "URL": this.url
                }
            }
        }
    }
}
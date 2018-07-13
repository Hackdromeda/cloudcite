import * as store from './store';
export default class BookCitation {
    contributors: any[]
    chapter: any
    volNumber: any
    title: any
    publisher: any
    issued: any

    constructor(contributors: any[], chapter: any, volNumber: any, title: any, publisher: any, issued: object) {
        
        this.contributors = contributors
        this.chapter = chapter
        this.volNumber = volNumber
        this.title = title
        this.publisher = publisher
        this.issued = issued
    }

    removeContributor(index: number) {
        this.contributors = this.contributors.filter(element => element !== this.contributors[index]);
    }
    clearContributor(index: number) {
        this.contributors[index] = Object.assign(this.contributors[index], {first: null, middle: null, last: null, type: "Author"})
    }
    toCSL() {
        var cslMonth = this.issued.month + 1
        var accessedDate = new Date()
         //@ts-ignore
         var id: string = 'Book/' + (store.default.getters.getCitations.filter(c => c.csl[Object.keys(c.csl)[0]].id.substring(0, 4) === 'Book').length + 1)
        return {
            "style": "modern-language-association", 
            "locale": "locales-en-US", 
            "csl": {
                [id]:{
                    "accessed":{
                        "month": accessedDate.getMonth(),
                        "year": accessedDate.getFullYear(),
                        "day": accessedDate.getDay()
                    },
                    "issued":{
                        "month": cslMonth ? cslMonth: "",
                        "year": this.issued.year ? this.issued.year: "",
                        "day": this.issued.day ? this.issued.day: ""
                    },
                    "type":"book",
                    "id": id,
                    "author": this.contributors.filter(c => c.type === "Author"),
                    "editor": this.contributors.filter(c => c.type === "Editor"),
                    "title": this.title ? this.title: "",
                }
            }
        }
    }
}
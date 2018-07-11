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
        var accessedDate = new Date()
        return {
            "style": "modern-language-association", 
            "locale": "locales-en-US", 
            "csl": {
                "14058/NSBERGDK":{
                    "accessed":{
                        "month": accessedDate.getMonth(),
                        "year": accessedDate.getFullYear(),
                        "day": accessedDate.getDay()
                    },
                    "issued":{
                        "month": this.issued.month,
                        "year": this.issued.year,
                        "day": this.issued.day
                    },
                    "type":"book",
                    "id":"14058/NSBERGDK",
                    "author": this.contributors.filter(c => c.type === "Author"),
                    "editor": this.contributors.filter(c => c.type === "Editor"),
                    "title": this.title,
                }
            }
        }
    }
}
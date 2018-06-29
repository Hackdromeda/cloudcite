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
                    "type":"website",
                    "id":"14058/NSBERGDK",
                    "author": this.contributors.filter(c => c.type === "author"),
                    "title": this.title,
                    "URL": this.url
                }
            }
        }
    }
}
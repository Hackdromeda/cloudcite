export default class WebsiteCitation {
    contributors: any[]
    source: string
    title: string
    url: string
    publisher: string
    datePublished: object

    constructor(contributors: any, source: any, title: any, url: any, publisher: any, datePublished: any) {
        this.contributors = contributors
        this.source = source
        this.title = title
        this.url = url
        this.publisher = publisher
        this.datePublished = datePublished
    }

    removeContributor(index: number) {
        this.contributors = this.contributors.filter(element => element !== this.contributors[index]);
    }
    clearContributor(index: number) {
        this.contributors[index] = Object.assign(this.contributors[index], {given: null, middle: null, family: null, type: "Author"})
    }

    toCSL() {
        var accessedDate = new Date()
        return JSON.stringify({
            style: "modern-language-association", 
            locale: "locales-en-US",
            csl: {
                "INTERESTING/ID": {
                  "accessed": {
                  "month": accessedDate.getMonth(),
                  "year": accessedDate.getFullYear(),
                  "day": accessedDate.getDay()
                  },
                  "id": "AWESOME/ID",
                  "author": this.contributors.filter(c => c.type === "author"),
                  "title": this.title,
                  "type": "webpage",
                }
            }
        })
    }
}
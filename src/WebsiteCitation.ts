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
        this.contributors[index] = Object.assign(this.contributors[index], {first: null, middle: null, last: null, type: "Author"})
    }

    toCSL() {
        var accessedDate = new Date()
        return JSON.stringify({
            id: 'ITEM-1',
            lang: "en-us",
            type: 'webpage',
            title: this.url,
            style: 'citation-mla',
            URL: this.url,
            accessed: {
                "date-parts": [
                    [
                        accessedDate.getFullYear(),
                        accessedDate.getMonth(),
                        accessedDate.getDay()
                    ]
                ]
            },
            authors: this.contributors.filter(c => c.type === "author")
        })
    }
}
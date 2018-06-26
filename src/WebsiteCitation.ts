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
}
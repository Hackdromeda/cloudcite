export default class WebsiteCitation {
    authors: any[]
    source: string
    title: string
    url: string
    publisher: string
    datePublished: object

    constructor(authors: any, source: any, title: any, url: any, publisher: any, datePublished: any) {
        this.authors = authors
        this.source = source
        this.title = title
        this.url = url
        this.publisher = publisher
        this.datePublished = datePublished
    }

    removeAuthor(index: number) {
        this.authors = this.authors.filter(element => element !== this.authors[index]);
    }
    clearAuthor(index: number) {
        this.authors[index] = Object.assign(this.authors[index], {first: null, middle: null, last: null})
    }
}
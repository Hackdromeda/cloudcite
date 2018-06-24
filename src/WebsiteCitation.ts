export default class WebsiteCitation {
    authors: any[]
    source: string
    publisher: string
    published: object

    constructor(authors: any, source: any, publisher: any, published: any) {
        this.authors = authors
        this.source = source
        this.publisher = publisher
        this.published = published
    }

    removeAuthor(index: number) {
        this.authors = this.authors.filter(element => element !== this.authors[index]);
    }
    clearAuthor(index: number) {
        this.authors[index] = Object.assign(this.authors[index], {first: null, middle: null, last: null})
    }
}
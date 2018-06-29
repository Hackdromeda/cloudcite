export default class FilmCitation {
    contributors: any[]
    title: any
    publisher: any
    datePublished: object

    constructor(contributors: any[], title: any, publisher: any, datePublished: object) {
        
        this.contributors = contributors
        this.title = title
        this.publisher = publisher
        this.datePublished = datePublished
    }

    removeContributor(index: number) {
        this.contributors = this.contributors.filter(element => element !== this.contributors[index]);
    }
    clearContributor(index: number) {
        this.contributors[index] = Object.assign(this.contributors[index], {first: null, middle: null, last: null, type: "Director"})
    }
}
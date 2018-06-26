export default class WebsiteCitation {
    /*
    contributors: [
        {
            type: "author",
            name: { 
                first: "",
                middle: "",
                last: ""
            }
        },
        {
            type: "editor",
            name: { 
                first: "",
                middle: "",
                last: ""
            }
        }
    ]
    */
    contributors: any[]
    chapter: any
    volNumber: any
    title: any
    publisher: any
    datePublished: object

    constructor(contributors: any[], chapter: any, volNumber: any, title: any, publisher: any, datePublished: object) {
        
        this.contributors = contributors
        this.chapter = chapter
        this.volNumber = volNumber
        this.title = title
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
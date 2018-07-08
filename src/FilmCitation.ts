export default class FilmCitation {
    contributors: any[]
    title: string
    studio: string
    issued: any
    abstract: string

    constructor(contributors: any[], title: string, studio: string, issued: any, abstract: string) {
        this.contributors = contributors
        this.title = title
        this.studio = studio
        this.issued = issued
        this.abstract = abstract
    }

    removeContributor(index: number) {
        this.contributors = this.contributors.filter(element => element !== this.contributors[index]);
    }
    clearContributor(index: number) {
        this.contributors[index] = Object.assign(this.contributors[index], {first: null, middle: null, last: null, type: "Director"})
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
                    "type":"motion_picture",
                    "id":"14058/NSBERGDK",
                    "director": this.contributors.filter(c => c.type === "Director"),
                    "author": this.contributors.filter(c => c.type === "Writer" || c.type === "Actor/Performer" || c.type == "Author"),
                    "editorial-director": this.contributors.filter(c => c.type === "Producer"),
                    "title": this.title,
                }
            }
        }
    }
    cite() {
        console.log('Cite')
    }
}
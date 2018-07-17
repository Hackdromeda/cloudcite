import * as store from './store';
//@ts-ignore
import * as  _ from 'lodash/core';
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
        var cslMonth = this.issued.month + 1
        var accessedDate = new Date()
        var id = ('Book/' + _.filter(store.default.getters.getCitations, function(c: any) { return Object.keys(c)[0].substring(0, 4) === 'Book'}).length)
        return {
            [id]:{
                "accessed":{
                    "month": cslMonth ? cslMonth: "",
                    "year": accessedDate.getFullYear(),
                    "day": accessedDate.getDay()
                },
                "issued":{
                    "month": (this.issued.month && this.issued.month >= 1 && this.issued.month <= 12) ? this.issued.month: "",
                    "year": this.issued.year ? this.issued.year: "",
                    "day": this.issued.day ? this.issued.day: ""
                },
                "type":"book",
                "id": id,
                "author": this.contributors.filter(c => c.type === "Author"),
                "editor": this.contributors.filter(c => c.type === "Editor"),
                "title": this.title ? this.title: "",
            }
        }
    }
}
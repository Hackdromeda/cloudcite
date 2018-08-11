import * as store from '@/store';
//@ts-ignore
import * as  _ from 'lodash/core';
export default class BookCitation {
    contributors: any[]
    chapter: any
    volNumber: any
    title: any
    publisher: any
    accessed: any
    issued: any
    id: string

    constructor(contributors: any[], chapter: any, volNumber: any, title: any, publisher: any, accessed: object, issued: object, id: string) {
        this.contributors = contributors
        this.chapter = chapter
        this.volNumber = volNumber
        this.title = title
        this.publisher = publisher
        this.accessed = accessed
        this.issued = issued
        this.id = id
    }

    removeContributor(index: number) {
        this.contributors = this.contributors.filter(element => element !== this.contributors[index]);
    }
    clearContributor(index: number) {
        this.contributors[index] = Object.assign(this.contributors[index], {first: null, middle: null, last: null, type: "Author"})
    }
    toCSL() {
        return _.pickBy({
            [this.id]:{
                "accessed": _.pickBy({
                    "month": (this.accessed.month && this.accessed.month >= 1 && this.accessed.month <= 12) ? this.accessed.month: null,
                    "year": this.accessed.year ? this.accessed.year: null,
                    "day": this.accessed.day ? this.accessed.day: null
                }),
                "issued": _.pickBy({
                    "month": (this.issued.month && this.issued.month >= 1 && this.issued.month <= 12) ? this.issued.month: null,
                    "year": this.issued.year ? this.issued.year: null,
                    "day": this.issued.day ? this.issued.day: null
                }),
                "type":"book",
                "id": this.id,
                "author": this.contributors.filter(c => c.type === "Author"),
                "editor": this.contributors.filter(c => c.type === "Editor"),
                "title": this.title ? this.title: null,
            }
        })
    }
}
import * as store from '@/store';
//@ts-ignore
import * as  _ from 'lodash/core';
export default class FilmCitation {
    contributors: any[]
    title: string
    publisher: string
    accessed: any
    issued: any
    abstract: string
    publisherPlace: string
    id: string

    constructor(contributors: any[], title: string, publisher: string, publisherPlace: string, accessed: any, issued: any, abstract: string, id: string) {
        this.contributors = contributors
        this.title = title
        this.publisher = publisher
        this.publisherPlace = publisherPlace
        this.accessed = accessed
        this.issued = issued
        this.abstract = abstract
        this.id = id
    }

    removeContributor(index: number) {
        this.contributors = this.contributors.filter(element => element !== this.contributors[index]);
    }
    clearContributor(index: number) {
        this.contributors[index] = Object.assign(this.contributors[index], {first: null, middle: null, last: null, type: "Director"})
    }
    toCSL() {
        return _.pickBy({
            [this.id]: {
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
                "type":"motion_picture",
                "id": this.id,
                "director": this.contributors.filter(c => c.type === "Director"),
                "author": this.contributors.filter(c => c.type === "Writer" || c.type === "Actor/Performer" || c.type == "Author"),
                "editorial-director": this.contributors.filter(c => c.type === "Producer"),
                "publisher": this.publisher ? this.publisher: null,
                "publisher-place": this.publisherPlace ? this.publisherPlace: null,
                "title": this.title ? this.title: null,
                "abstract": this.abstract ? this.abstract: null
            }
        })
    }
    cite() {
        console.log('Cite')
    }
}
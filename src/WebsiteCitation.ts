import * as store from '@/store';
//@ts-ignore
import * as  _ from 'lodash/core';
export default class WebsiteCitation {
    contributors: any[]
    source: string
    title: string //container-title
    URL: string
    publisher: string
    accessed: any
    issued: any
    id: string

    constructor(contributors: any, source: any, title: any, URL: any, publisher: any, accessed: any, issued: any, id: string) {
        this.contributors = contributors
        this.source = source
        this.title = title
        this.URL = URL
        this.publisher = publisher
        this.accessed = accessed
        this.issued = issued //date published
        this.id = id
    }

    removeContributor(index: number) {
        this.contributors = this.contributors.filter(element => element !== this.contributors[index]);
    }
    clearContributor(index: number) {
        this.contributors[index] = Object.assign(this.contributors[index], {given: null, middle: null, family: null, type: "Author"})
    }

    toCSL() {
        return {
            [this.id]: {
                "accessed":{
                    "month": (this.accessed.month && this.accessed.month >= 1 && this.accessed.month <= 12) ? this.accessed.month: null,
                    "year": this.accessed.year ? this.accessed.year: null,
                    "day": this.accessed.day ? this.accessed.day: null
                },
                "issued":{
                    "month": (this.issued.month && this.issued.month >= 1 && this.issued.month <= 12) ? this.issued.month: null,
                    "year": this.issued.year ? this.issued.year: null,
                    "day": this.issued.day ? this.issued.day: null
                },
                "type":"website",
                "id": this.id,
                "author": this.contributors.filter(c => c.type === "Author"),
                "editor": this.contributors.filter(c => c.type === "Editor"),
                "container-title": this.title ? this.title: null,
                "URL": this.URL ? this.URL: null
            }
        }
    }
}
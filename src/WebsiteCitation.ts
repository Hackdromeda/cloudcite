import * as store from '@/store';
//@ts-ignore
import * as  _ from 'lodash/core';
export default class WebsiteCitation {
    contributors: any[]
    source: string
    title: string
    url: string
    publisher: string
    accessed: any
    issued: any
    id: string

    constructor(contributors: any, source: any, title: any, url: any, publisher: any, accessed: any, issued: any, id: string) {
        this.contributors = contributors
        this.source = source
        this.title = title
        this.url = url
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
                    "month": (this.accessed.month && this.accessed.month >= 1 && this.accessed.month <= 12) ? this.accessed.month: "",
                    "year": this.accessed.year ? this.accessed.year: "",
                    "day": this.accessed.day ? this.accessed.day: ""
                },
                "issued":{
                    "month": (this.issued.month && this.issued.month >= 1 && this.issued.month <= 12) ? this.issued.month: "",
                    "year": this.issued.year ? this.issued.year: "",
                    "day": this.issued.day ? this.issued.day: ""
                },
                "type":"website",
                "id": this.id,
                "author": this.contributors.filter(c => c.type === "Author"),
                "editor": this.contributors.filter(c => c.type === "Editor"),
                "title": this.title ? this.title: "",
                "URL": this.url ? this.url: ""
            }
        }
    }
}
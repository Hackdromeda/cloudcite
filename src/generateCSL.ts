//@ts-ignore
import _ from 'lodash'

export default function generateCSL(cslData: any) {
    if (cslData.id && cslData.id.includes('Website')) {
        return _.pickBy({
            [cslData.id]: {
                "accessed":{
                    "month": (cslData.accessed.month && cslData.accessed.month >= 1 && cslData.accessed.month <= 12) ? cslData.accessed.month: "",
                    "year": cslData.accessed.year ? cslData.accessed.year: "",
                    "day": cslData.accessed.day ? cslData.accessed.day: ""
                },
                "issued":{
                    "month": (cslData.issued && cslData.issued.month && cslData.issued.month >= 1 && cslData.issued.month <= 12) ? cslData.issued.month: "",
                    "year": (cslData.issued && cslData.issued.year) ? cslData.issued.year: "",
                    "day": (cslData.issued && cslData.issued.day) ? cslData.issued.day: ""
                },
                "type":"website",
                "id": cslData.id,
                //@ts-ignore
                "author": cslData.contributors.filter(c => c.type === "Author"),
                //@ts-ignore
                "editor": cslData.contributors.filter(c => c.type === "Editor"),
                "title": cslData.title ? cslData.title: "",
                "URL": cslData.url ? cslData.url: ""
            }
        })
    }
    else if (cslData.id && cslData.id.includes('Book')) {
        return _.pickBy({
            [cslData.id]:{
                "accessed":{
                    "month": (cslData.accessed.month && cslData.accessed.month >= 1 && cslData.accessed.month <= 12) ? cslData.accessed.month: "",
                    "year": cslData.accessed.year ? cslData.accessed.year: "",
                    "day": cslData.accessed.day ? cslData.accessed.day: ""
                },
                "issued":{
                    "month": (cslData.issued && cslData.issued.month && cslData.issued.month >= 1 && cslData.issued.month <= 12) ? cslData.issued.month: "",
                    "year": (cslData.issued && cslData.issued.year) ? cslData.issued.year: "",
                    "day": (cslData.issued && cslData.issued.day) ? cslData.issued.day: ""
                },
                "type":"book",
                "id": cslData.id,
                //@ts-ignore
                "author": cslData.contributors.filter(c => c.type === "Author"),
                //@ts-ignore
                "editor": cslData.contributors.filter(c => c.type === "Editor"),
                "title": cslData.title ? cslData.title: "",
            }
        })
    }
    else if (cslData.id && cslData.id.includes('Film')) {
        return _.pickBy({
            [cslData.id]: {
                "accessed":{
                    "month": (cslData.accessed.month && cslData.accessed.month >= 1 && cslData.accessed.month <= 12) ? cslData.accessed.month: "",
                    "year": cslData.accessed.year ? cslData.accessed.year: "",
                    "day": cslData.accessed.day ? cslData.accessed.day: ""
                },
                "issued":{
                    "month": (cslData.issued && cslData.issued.month && cslData.issued.month >= 1 && cslData.issued.month <= 12) ? cslData.issued.month: "",
                    "year": (cslData.issued && cslData.issued.year) ? cslData.issued.year: "",
                    "day": (cslData.issued && cslData.issued.day) ? cslData.issued.day: ""
                },
                "type":"motion_picture",
                "id": cslData.id,
                //@ts-ignore
                "director": cslData.contributors.filter(c => c.type === "Director"),
                //@ts-ignore
                "author": cslData.contributors.filter(c => c.type === "Writer" || c.type === "Actor/Performer" || c.type == "Author"),
                //@ts-ignore
                "editorial-director": cslData.contributors.filter(c => c.type === "Producer"),
                "publisher": cslData.publisher ? cslData.publisher: "",
                "publisher-place": cslData.publisherPlace ? cslData.publisherPlace: "",
                "title": cslData.title ? cslData.title: "",
                "abstract": cslData.abstract ? cslData.abstract: ""
            }
        })
    }
}
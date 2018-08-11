//@ts-ignore
import _ from 'lodash'

export default function generateCSL(cslData: any) {
    if (cslData.id && cslData.id.includes('Website')) {
        return _.pickBy({
            [cslData.id]: {
                "accessed": _.pickBy({
                    "month": (cslData.accessed.month && cslData.accessed.month >= 1 && cslData.accessed.month <= 12) ? cslData.accessed.month: null,
                    "year": cslData.accessed.year ? cslData.accessed.year: null,
                    "day": cslData.accessed.day ? cslData.accessed.day: null
                }),
                "issued": _.pickBy({
                    "month": (cslData.issued && cslData.issued.month && cslData.issued.month >= 1 && cslData.issued.month <= 12) ? cslData.issued.month: null,
                    "year": (cslData.issued && cslData.issued.year) ? cslData.issued.year: null,
                    "day": (cslData.issued && cslData.issued.day) ? cslData.issued.day: null
                }),
                "type":"website",
                "id": cslData.id,
                //@ts-ignore
                "author": cslData.contributors.filter(c => c.type === "Author" && (c.family || c.given || c.middle)).map(author => _.pickBy(author)),
                //@ts-ignore
                "editor": cslData.contributors.filter(c => c.type === "Editor" && (c.family || c.given || c.middle)).map(editor => _.pickBy(editor)),
                "container-title": cslData.containerTitle ? cslData.containerTitle: null,
                "URL": cslData.url ? cslData.url: null
            }
        })
    }
    else if (cslData.id && cslData.id.includes('Book')) {
        return _.pickBy({
            [cslData.id]:{
                "accessed": _.pickBy({
                    "month": (cslData.accessed.month && cslData.accessed.month >= 1 && cslData.accessed.month <= 12) ? cslData.accessed.month: null,
                    "year": cslData.accessed.year ? cslData.accessed.year: null,
                    "day": cslData.accessed.day ? cslData.accessed.day: null
                }),
                "issued": _.pickBy({
                    "month": (cslData.issued && cslData.issued.month && cslData.issued.month >= 1 && cslData.issued.month <= 12) ? cslData.issued.month: null,
                    "year": (cslData.issued && cslData.issued.year) ? cslData.issued.year: null,
                    "day": (cslData.issued && cslData.issued.day) ? cslData.issued.day: null
                }),
                "type":"book",
                "id": cslData.id,
                //@ts-ignore
                "author": cslData.contributors.filter(c => c.type === "Author" && (c.family || c.given || c.middle)).map(author => _.pickBy(author)),
                //@ts-ignore
                "editor": cslData.contributors.filter(c => c.type === "Editor" && (c.family || c.given || c.middle)).map(editor => _.pickBy(editor)),
                "title": cslData.title ? cslData.title: null,
            }
        })
    }
    else if (cslData.id && cslData.id.includes('Film')) {
        return _.pickBy({
            [cslData.id]: {
                "accessed": _.pickBy({
                    "month": (cslData.accessed.month && cslData.accessed.month >= 1 && cslData.accessed.month <= 12) ? cslData.accessed.month: null,
                    "year": cslData.accessed.year ? cslData.accessed.year: null,
                    "day": cslData.accessed.day ? cslData.accessed.day: null
                }),
                "issued": _.pickBy({
                    "month": (cslData.issued && cslData.issued.month && cslData.issued.month >= 1 && cslData.issued.month <= 12) ? cslData.issued.month: null,
                    "year": (cslData.issued && cslData.issued.year) ? cslData.issued.year: null,
                    "day": (cslData.issued && cslData.issued.day) ? cslData.issued.day: null
                }),
                "type":"motion_picture",
                "id": cslData.id,
                //@ts-ignore
                "director": cslData.contributors.filter(c => c.type === "Director"),
                //@ts-ignore
                "author": cslData.contributors.filter(c => c.type === "Writer" || c.type === "Actor/Performer" || c.type == "Author" && (c.family || c.given || c.middle)).map(author => _.pickBy(author)),
                //@ts-ignore
                "editorial-director": cslData.contributors.filter(c => c.type === "Producer" && (c.family || c.given || c.middle)).map(producer => _.pickBy(producer)),
                "publisher": cslData.publisher ? cslData.publisher: null,
                "publisher-place": cslData.publisherPlace ? cslData.publisherPlace: null,
                "title": cslData.title ? cslData.title: null,
                "abstract": cslData.abstract ? cslData.abstract: null
            }
        })
    }
}
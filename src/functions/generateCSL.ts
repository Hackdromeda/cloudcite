//@ts-ignore
import _ from 'lodash'

export default function generateCSL(cslData: any) {
    //@ts-ignore
    var contributors = cslData.contributors.map(contributor => _.pickBy(Object.assign(contributor, {given: (contributor.middle && contributor.middle != "" ? (contributor.given + " " + contributor.middle): contributor.given), middle: null})));

        return _.pickBy({
            [cslData.id]: {
                "accessed": _.pickBy({
                    "month": (cslData.accessed.month && cslData.accessed.month >= 1 && cslData.accessed.month <= 12) ? cslData.accessed.month: null,
                    "year": cslData.accessed.year,
                    "day": cslData.accessed.day
                }),
                "issued": _.pickBy({
                    "month": (cslData.issued && cslData.issued.month && cslData.issued.month >= 1 && cslData.issued.month <= 12) ? cslData.issued.month: null,
                    "year": (cslData.issued && cslData.issued.year) ? cslData.issued.year: null,
                    "day": (cslData.issued && cslData.issued.day) ? cslData.issued.day: null
                }),
                "type": cslData.type,
                "id": cslData.id,
                //@ts-ignore
                "author": contributors.filter(c => c.type == "Author" && (c.family || c.given || c.middle)).map(author => _.pickBy(author)),
                //@ts-ignore
                "editor": contributors.filter(c => c.type == "Editor" && (c.family || c.given || c.middle)).map(editor => _.pickBy(editor)),
                //@ts-ignore
                "director": contributors.filter(c => c.type == "Director" && (c.family || c.given || c.middle)).map(director => _.pickBy(director)),
                //@ts-ignore
                "editorial-director": contributors.filter(c => c.type == "Producer" && (c.family || c.given || c.middle)).map(producer => _.pickBy(producer)),
                "title": cslData.title,
                "title-short": cslData["title-short"],
                "genre": cslData.genre,
                "publisher": cslData.publisher,
                "publisher-place": cslData.publisherPlace,
                "URL": cslData.URL,
                "source": cslData.source,
                "archive": cslData.archive,
                "archive_location": cslData["archive_location"],
                "call-number": cslData["call-number"],
                "container-title": cslData["container-title"],
                "dimensions": cslData.dimensions,
                "edition": cslData.edition,
                "ISBN": cslData.ISBN,
                "medium": cslData.medium,
                "number-of-volumes": cslData["number-of-volumes"],
                "number-of-pages": cslData["number-of-pages"],
                "volume": cslData.volume,
                "abstract": cslData.abstract
            }
        })
}
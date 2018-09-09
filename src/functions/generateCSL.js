import removeEmptyFromObject from './removeEmptyFromObject';

export default async function generateCSL(cslData) {
        return new Promise(async (resolve, reject) => {
            try {
                if (cslData.contributors && cslData.contributors.length > 0) {
                    var contributors = await Promise.all(cslData.contributors.map(async contributor => await removeEmptyFromObject(Object.assign(contributor, {given: (contributor.middle && contributor.middle != "" ? (contributor.given + " " + contributor.middle): contributor.given), middle: null}))));
                } else {
                    var contributors = [];
                }
                resolve({
                    [cslData.id]: await removeEmptyFromObject({
                        "accessed": await removeEmptyFromObject({
                            "month": (cslData.accessed.month && cslData.accessed.month >= 1 && cslData.accessed.month <= 12) ? cslData.accessed.month: null,
                            "year": cslData.accessed.year,
                            "day": cslData.accessed.day
                        }),
                        "issued": await removeEmptyFromObject({
                            "month": (cslData.issued && cslData.issued.month && cslData.issued.month >= 1 && cslData.issued.month <= 12) ? cslData.issued.month: null,
                            "year": (cslData.issued && cslData.issued.year) ? cslData.issued.year: null,
                            "day": (cslData.issued && cslData.issued.day) ? cslData.issued.day: null
                        }),
                        "type": cslData.type,
                        "id": cslData.id,
                        "author": await Promise.all(contributors.filter(c => c.type == "Author" && (c.family || c.given || c.middle)).map(async author => await removeEmptyFromObject(author))),
                        "container-author": await Promise.all(contributors.filter(c => c.type == "Container Author" && (c.family || c.given || c.middle)).map(async containerAuthor => await removeEmptyFromObject(containerAuthor))),
                        "editor": await Promise.all(contributors.filter(c => c.type == "Editor" && (c.family || c.given || c.middle)).map(async editor => await removeEmptyFromObject(editor))),
                        "translator": await Promise.all(contributors.filter(c => c.type == "Translator" && (c.family || c.given || c.middle)).map(async translator => await removeEmptyFromObject(translator))),
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
                    })
                });
            }
            catch (error) {
                reject(error);
            }
        });
}
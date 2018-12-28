import moment from 'moment';

export function generateCitation(type, data) {
    const dateAccessed = moment().toObject();
    return {
        //@ts-ignore
        "id": window.crypto.getRandomValues(new Uint32Array(3)).join(''),
        "type": type,
        "URL": data.URL,
        "contributors": data.contributors ? data.contributors: [],
        "source": data.source,
        "archive": data.archive,
        "archive_location": data["archive_location"],
        "call-number": data["call-number"],
        "container-title": data["container-title"],
        "dimensions": data.dimensions,
        "edition": data.edition,
        "ISBN": data.ISBN,
        "medium": data.medium,
        "number-of-volumes": data["number-of-volumes"],
        "number-of-pages": data["number-of-pages"],
        "volume": data.volume,
        "title": data.title,
        "title-short": data["title-short"],
        "genre": data.genre,
        "publisher": data.publisher,
        "publisher-place": data["publisher-place"],
        "issued": {month: data.issued && data.issued.month ? parseInt(data.issued.month): "", day: data.issued && data.issued.day ? parseInt(data.issued.day): "", year: data.issued && data.issued.year ? parseInt(data.issued.year): ""},
        "accessed": {month: dateAccessed.months + 1, day: dateAccessed.date, year: dateAccessed.years},
        "abstract": data.abstract
    };
}
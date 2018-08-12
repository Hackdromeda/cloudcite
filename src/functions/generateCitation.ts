//@ts-ignore
import * as _ from 'lodash';
import * as Immutable from 'immutable';

export default function generateCitation(id: string, type: string, data: any) {
    var citation = Immutable.Map({
        "id": id,
        "type": type,
        "URL": data.URL,
        "contributors": data.contributors,
        "source": data.source,
        "container-title": data["container-title"],
        "title": data.title,
        "publisher": data.publisher,
        "publisher-place": data["publisher-place"],
        "issued": {month: data.issued && data.issued.month ? parseInt(data.issued.month): "", day: data.issued && data.issued.day ? parseInt(data.issued.day): "", year: data.issued && data.issued.year ? parseInt(data.issued.year): ""},
        "accessed": {month: "", day: "", year: ""},
        "abstract": data.abstract
    })
    return citation
}
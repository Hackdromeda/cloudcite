import shortid from 'shortid';
/**
 * @return {Object} new citation
 */
export function createCitation(citationData) {
    return {
        "id": shortid.generate(),
        "accessed": {
            "month": "",
            "day": "",
            "year": ""
        },
        "issued": {
            "month": "",
            "day": "",
            "year": ""
        },
        "contributors": citationData && citationData.contributors ? citationData.contributors.map(contributor => Object.create({...contributor, id: shortid.generate()})): [{given: '', family: '', type: '', id: shortid.generate()}],
        ...citationData
    };
}
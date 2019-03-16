import crypto from 'crypto';
/**
 * @return {Object} new citation
 */
export function createCitation(citationData) {
    let citation = {
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
        "contributors": citationData && citationData.contributors ? citationData.contributors: [{given: '', family: '', type: ''}],
        ...citationData
    };
    if (citationData && !citationData.id) {
        citation.id = crypto.randomBytes(10).toString('hex');
    }
    return citation;
}
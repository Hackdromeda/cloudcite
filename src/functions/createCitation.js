import crypto from 'crypto';
/**
 * @return {Object} new citation
 */
export function createCitation(citationData) {
    return {
        "id": crypto.randomBytes(10).toString('hex'),
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
 		"contributors": citationData && citationData.contributors ? citationData.contributors: [{key: crypto.randomBytes(10).toString('hex'), given: '', middle: '', family: '', type: ''}],
        ...citationData
    }
}
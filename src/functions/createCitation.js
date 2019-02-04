import crypto from 'crypto';
/**
 * @return {Object} new citation
 */
export function createCitation() {
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
 		"contributors": [{given: '', middle: '', family: ''}]
    }
}
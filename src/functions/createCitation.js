/**
 * @param {String} type 
 * @param {Object} citationData
 * @return {Object} new citation
 */
export function createCitation(citationData) {
	let currentDate = new Date();
    return {
        "id": crypto.randomBytes(10).toString('hex'),
        "accessed": {
        	"month": currentDate.getMonth() + 1,
        	"day": currentDate.getDate(),
        	"year": currentDate.getFullYear()
        },
        ...citationData
    }
}
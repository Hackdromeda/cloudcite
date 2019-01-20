import moment from 'moment';
const crypto = require('crypto');

/**
 * @param {String} type 
 * @param {Object} citationData
 * @return {Object} new citation
 */
export function createCitation(citationData) {
    return {
        "id": crypto.randomBytes(10).toString('hex'),
        "accessed": {
            ...moment().toObject()
        },
        ...citationData
    }
}
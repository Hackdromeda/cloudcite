import identity from 'lodash.identity';
import pickBy from 'lodash.pickby';

/**
 * @param {Array<String>} creatorsTypes
 * @param {Array<Object>} citationTray
 * @return {Object} CSL Object
 */
export function generateCSL(creatorsTypes, citationTray) { 
    return citationTray.reduce((accumulator, citationData) => {
        let contributors = [];
        if (citationData.contributors && citationData.contributors.length > 0) {
            contributors = citationData.contributors.map(contributor => pickBy(Object.assign(contributor, {given: (contributor.middle && contributor.middle !== "" ? (`${contributor.given} ${contributor.middle}`): contributor.given), middle: null}), identity));
        }
        let contributorsData = creatorsTypes.reduce((accumulator, currentValue) => {
            return Object.assign(accumulator, {[currentValue]: contributors.filter(c => c.type && c.type === currentValue && (c.family || c.given || c.middle)).map(contributor => pickBy(contributor, identity))})
        }, {});
        return accumulator.concat(pickBy({
            "accessed": pickBy({
                "month": (citationData.accessed.month && citationData.accessed.month >= 1 && citationData.accessed.month <= 12) ? citationData.accessed.month: null,
                "year": citationData.accessed.year,
                "day": citationData.accessed.day
            }, identity),
            "issued": pickBy({
                "month": (citationData.issued && citationData.issued.month && citationData.issued.month >= 1 && citationData.issued.month <= 12) ? citationData.issued.month: null,
                "year": (citationData.issued && citationData.issued.year) ? citationData.issued.year: null,
                "day": (citationData.issued && citationData.issued.day) ? citationData.issued.day: null
            }, identity),
            ...citationData,
            ...contributorsData
        }, identity));
    }, []);
}
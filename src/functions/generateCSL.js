import { simplifyObject } from './simplifyObject';

/**
 * @param {Array<Object>} citationTray
 * @return {Object} CSL Object
 */
export function generateCSL(creatorsTypes, citationTray) { 
    return citationTray.reduce((accumulator, citationData) => {
        let contributors = [];
        if (citationData.contributors && citationData.contributors.length > 0) {
            contributors = citationData.contributors.map(contributor => simplifyObject(Object.assign(contributor, {given: (contributor.middle && contributor.middle !== "" ? (`${contributor.given} ${contributor.middle}`): contributor.given), middle: null})));
        }
        let contributorsData = creatorsTypes.reduce((accumulator, currentValue) => {
            return Object.assign(accumulator, {[currentValue]: contributors.filter(c => c.type === currentValue && (c.family || c.given || c.middle)).map(contributor => simplifyObject(contributor))})
        }, {});
        console.log(contributorsData)

        return accumulator.concat(simplifyObject({
            "accessed": simplifyObject({
                "month": (citationData.accessed.month && citationData.accessed.month >= 1 && citationData.accessed.month <= 12) ? citationData.accessed.month: null,
                "year": citationData.accessed.year,
                "day": citationData.accessed.day
            }),
            "issued": simplifyObject({
                "month": (citationData.issued && citationData.issued.month && citationData.issued.month >= 1 && citationData.issued.month <= 12) ? citationData.issued.month: null,
                "year": (citationData.issued && citationData.issued.year) ? citationData.issued.year: null,
                "day": (citationData.issued && citationData.issued.day) ? citationData.issued.day: null
            }),
            ...citationData,
            ...contributorsData
        }));
    }, []);
}
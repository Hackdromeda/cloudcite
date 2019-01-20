import { simplifyObject } from './simplifyObject';

/**
 * @param {Array<Object>} citationTray
 * @return {Object} CSL Object
 */
export function generateCSL(citationTray) { 
    return citationTray.reduce((accumulator, citationData) => {
        let contributors = [];
        if (citationData.contributors && citationData.contributors.length > 0) {
            contributors = citationData.contributors.map(contributor => simplifyObject(Object.assign(contributor, {given: (contributor.middle && contributor.middle !== "" ? (`${contributor.given} ${contributor.middle}`): contributor.given), middle: null})));
        }
        return accumulator.concat(simplifyObject({
            ...citationData,
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
            "author": contributors.filter(c => c.type === "Author" && (c.family || c.given || c.middle)).map(author => simplifyObject(author)),
            "director": contributors.filter(c => c.type === "Director" && (c.family || c.given || c.middle)).map(director => simplifyObject(director)),
            "container-author": contributors.filter(c => c.type === "Container Author" && (c.family || c.given || c.middle)).map(containerAuthor => simplifyObject(containerAuthor)),
            "editor": contributors.filter(c => c.type === "Editor" && (c.family || c.given || c.middle)).map(editor => simplifyObject(editor)),
            "translator": contributors.filter(c => c.type === "Translator" && (c.family || c.given || c.middle)).map(translator => simplifyObject(translator))
        }));
    }, []);
}
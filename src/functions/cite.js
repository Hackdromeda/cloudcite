const CSL = require('citeproc');

/**
 * 
 * @param {Object} style 
 * @param {Object} locale 
 * @param {Array<Object>} citationTray Contains an array of citations
 */
export async function cite(style, locale, citationTray) {
    const styleFile = await fetch(`/static/csl-files/styles/${style}.csl`)
                                .then((response) => {
                                    return response.text();
                                })
                                .then((styleText) => {
                                    return styleText;
                                });
    const localeFile = await fetch(`/static/csl-files/locales/${locale}.xml`)
                                .then((response) => {
                                    return response.text();
                                })
                                .then((styleText) => {
                                    return styleText;
                                });    
                                                 
    let itemIDList = [];

    let citationsObject = citationTray.reduce((accumulator, currentValue) => {
        itemIDList.push(currentValue.id);
        return Object.assign(accumulator, {[currentValue.id]: currentValue});
    }, {});

    let sys = {
        retrieveLocale: function() {
            return localeFile;
        },
        retrieveItem: function(id) {
            return citationsObject[id];
        }
    };

    let citeproc = new CSL.Engine(sys, styleFile);
    citeproc.updateItems(itemIDList);
    return citeproc.makeBibliography();
}
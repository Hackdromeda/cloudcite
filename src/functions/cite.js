const CSL = require('citeproc');

export async function cite(style, locale, citationData) {
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
    let citations = citationData.items.reduce((accumulator, currentValue) => {
        itemIDList.push(currentValue.id);
        return Object.assign(accumulator, {[currentValue.id]: currentValue});
    }, {});
    let sys = {
        retrieveLocale: function (lang) {
            return localeFile;
        },
        retrieveItem: function(id) {
            return citations[id];
        }
    };
    let citeproc = new CSL.Engine(sys, styleFile);
    citeproc.updateItems(itemIDList);
    return citeproc.makeBibliography();
}
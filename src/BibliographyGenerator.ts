    const CSL = require('./citeproc-js/citeproc_commonjs')
    export default async function generateBibliography(request: any) {
        var citeproc: any = new CSL.Engine(sys, request.style);
        var sys = new citeproc.simpleSys();
        const enUS = await fetch('/static/locales/' + request.locale + '.xml');
        sys.addLocale('en-US', enUS);
        const styleString= await fetch('./styles/' + request.style + '.csl');
        var engine = sys.newEngine(styleString, 'en-US', null);
        var items = request.csl;
        sys.items = items;
        engine.updateItems(Object.keys(items));
        var bib = engine.makeBibliography();
        if (bib != null || bib != "") {
            console.log(bib);
            return bib;
        }
    }
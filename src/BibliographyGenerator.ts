export default async function generateBibliography(request: any) {
	//move XML en-us to code later
	const citeproc = require("citeproc-js-node");
	const axios = require("axios");
	//docs for citeproc https://citeproc-js.readthedocs.io/en/latest/index.html
		//var headers = event.headers;
		//headers = ConvertKeysToLowerCase(headers); //[required: { style: "modern-language-association"}, locale: "locales-en-US", csl: {<csl stuff>}]
	var sys: any = new citeproc.simpleSys();
	var localeLocation: string = '/static/locales/' + request.locale + '.xml';
	var enUS: any = await axios.get(localeLocation);
	sys.addLocale('en-US', enUS);
	var styleLocation = '/static/styles/' + request.style + '.csl';
	var styleString: any = await axios.get(styleLocation);
	var engine = sys.newEngine(styleString, 'en-US', null);
	var items: object = request.csl;
	/*     var items = {
			"14058/RN9M5BF3": {
			"accessed": {
			"month": "9",
			"year": "2010",
			"day": "10"
			},
			"id": "14058/RN9M5BF3",
			"author": [
			{
				"given": "Adel",
				"family": "Hendaoui"
			},
			{
				"given": "Moez",
				"family": "Limayem"
			},
			{
				"given": "Craig W.",
				"family": "Thompson"
			}
			],
			"title": "3D Social Virtual Worlds: <i>Research Issues and Challenges</i>",
			"type": "article-journal",
			"versionNumber": 6816
			},
			"14058/NSBERGDK": {
				"accessed": {
				"month": "9",
				"year": "2010",
				"day": "10"
				},
				"issued": {
				"month": "6",
				"year": "2009"
				},
				"event-place": "Istanbul",
				"type": "paper-conference",
				"DOI": "10.1109/DEST.2009.5276761",
				"page-first": "151",
				"id": "14058/NSBERGDK",
				"title-short": "3D virtual worlds as collaborative communities enriching human endeavours",
				"publisher-place": "Istanbul",
				"author": [
				{
					"given": "C.",
					"family": "Dreher"
				},
				{
					"given": "T.",
					"family": "Reiners"
				},
				{
					"given": "N.",
					"family": "Dreher"
				},
				{
					"given": "H.",
					"family": "Dreher"
				}
				],
				"title": "3D virtual worlds as collaborative communities enriching human endeavours: Innovative applications in e-Learning",
				"shortTitle": "3D virtual worlds as collaborative communities enriching human endeavours",
				"page": "151-156",
				"event": "2009 3rd IEEE International Conference on Digital Ecosystems and Technologies (DEST)",
				"URL": "http://ieeexplore.ieee.org/lpdocs/epic03/wrapper.htm?arnumber=5276761",
				"versionNumber": 1
			}
		}; */
		//Test case items
	sys.items = items;
	engine.updateItems(Object.keys(items));
	var bib: string = engine.makeBibliography();
	console.log(bib)
	if (bib != null || bib != "") {
		return bib;
	}	
	else {
		console.log("error: bibliography creation failed")
		return null
	}
}
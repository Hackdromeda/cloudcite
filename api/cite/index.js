const AWS = require('aws-sdk');
const CSL = require("citeproc");
const fs = require("fs"); //move XML en-us to code later
var citeproc = require("citeproc-js-node");
//available: lodash, request-promise, aws-sdk, and 
//docs for citeproc https://citeproc-js.readthedocs.io/en/latest/index.html

//exports.handler = function(event, context, callback) { //Removed for testing
/*     var headers = event.headers;
    headers = ConvertKeysToLowerCase(headers);
    var request = JSON.parse(event.body);
    if(headers["content-type"] != null && headers["content-type"].toLowerCase() != "application/json"){
        var body = "{error: the server can only send data in the application/json format}"
        var response = {
            "statusCode": 406,
            "headers": {
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true
            },
            "body": JSON.stringify(body),
            "isBase64Encoded": false
        };
        return callback(null, response);
    }
    if (request == null || request == "") {
        var body = "{error: empty request}"
        var response = {
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true
            },
            "body": JSON.stringify(body),
            "isBase64Encoded": false
        };
        return callback(null, response);
    } */

    var sys = new citeproc.simpleSys();
    var enUS = fs.readFileSync('./locales/locales-en-US.xml', 'utf8'); //Hardcoded for production
    sys.addLocale('en-US', enUS);
    var styleString = fs.readFileSync('./styles/modern-language-association.csl', 'utf8'); //Hardcoded for testing
    var engine = sys.newEngine(styleString, 'en-US', null); //Hardcoded for production
    //Hardcoded for testing
    var items = {
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
		};
    //Test case items
    sys.items = items;
    
    engine.updateItems(Object.keys(items));
    var bib = engine.makeBibliography();
    console.log(bib);
	//[required: { style: "modern-language-association"}, csl: {<csl stuff>}]
//} // end of Lambda export

const itemTypes = {
	1: 'note',
	2: 'book',
	3: 'bookSection',
	4: 'journalArticle',
	5: 'magazineArticle',
	6: 'newspaperArticle',
	7: 'thesis',
	8: 'letter',
	9: 'manuscript',
	10: 'interview',
	11: 'film',
	12: 'artwork',
	13: 'webpage',
	14: 'attachment',
	15: 'report',
	16: 'bill',
	17: 'case',
	18: 'hearing',
	19: 'patent',
	20: 'statute',
	21: 'email',
	22: 'map',
	23: 'blogPost',
	24: 'instantMessage',
	25: 'forumPost',
	26: 'audioRecording',
	27: 'presentation',
	28: 'videoRecording',
	29: 'tvBroadcast',
	30: 'radioBroadcast',
	31: 'podcast',
	32: 'computerProgram',
	33: 'conferencePaper',
	34: 'document',
	35: 'encyclopediaArticle',
	36: 'dictionaryEntry'
};
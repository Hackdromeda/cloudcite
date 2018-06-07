const AWS = require('aws-sdk');
const https = require('https');
const rp = require('request-promise-native');
const cheerio = require('cheerio');

exports.handler = function(event, context, callback) {
    var API = JSON.parse(event.body);
    if(API == null){
        body = "{error: empty request}"
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
    }
    switch (API.format) {
        case 'website':
            if(API.url == null || API.url == ""){
                body = "{error: expected website URL}"
                var response = {
                    "statusCode": 422,
                    "headers": {
                        "Access-Control-Allow-Origin" : "*",
                        "Access-Control-Allow-Credentials" : true
                    },
                    "body": JSON.stringify(body),
                    "isBase64Encoded": false
                };
                return callback(null, response);
            }
            rp({
                uri: API.url,
                transform: function(body) {
                    return cheerio.load(body);
                }
            }).then(($) => {
                var citation = API
                citation.container = $('meta[property="og:title"]').attr('content')
                if (citation.container == null) {
                    citation.container = $('title').text()
                }
                citation.source = $('meta[property="og:site_name"]').attr('content')
                citation.authors = $('meta[name="author"]').attr('content')
                citation.publisher = $('meta[property="article:publisher"]').attr('content')
                citation.datePublished = $('meta[property="article:modified_time"]').attr('content')
                if (citation.datePublished == null) {
                    citation.datePublished = $('meta[property="og:published_time"]').attr('content')
                }
                if (citation.datePublished != null) {
                    citation.datePublished = new Date(citation.datePublished)
                    citation.datePublished = {
                        month: citation.datePublished.getMonth(), 
                        day: citation.datePublished.getDate(), 
                        year: citation.datePublished.getFullYear()
                    }
                }
                citation = JSON.stringify(citation)
                //console.log('Citation: ' + citation)
                var response = {
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin" : "*",
                        "Access-Control-Allow-Credentials" : true
                    },
                    "body": JSON.stringify(citation),
                    "isBase64Encoded": false
                };
                callback(null, response);
            }).catch(function (err) {
                body = "{error: cited website unavailable}"
                var response = {
                    "statusCode": 422,
                    "headers": {
                        "Access-Control-Allow-Origin" : "*",
                        "Access-Control-Allow-Credentials" : true
                    },
                    "body": JSON.stringify(body),
                    "isBase64Encoded": false
                };
                return callback(null, response);
            });
        break;
        default:
            //console.log('Format is invalid');
            //console.log("request: " + JSON.stringify(event));
            body = "{error: bad request}"
            var response = {
                "statusCode": 400,
                "headers": {
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Credentials" : true
                },
                "body": JSON.stringify(body),
                "isBase64Encoded": false
            };
            callback(null, response);
    }
}
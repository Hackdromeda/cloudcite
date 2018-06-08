const AWS = require('aws-sdk');
const https = require('https');
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const _ = require('lodash');

exports.handler = function(event, context, callback) {
    var headers = event.headers;
    headers = ConvertKeysToLowerCase(headers);
    var request = JSON.parse(event.body);
    if(headers["content-type"] != null && headers["content-type"].toLowerCase() != "application/json"){
        body = "{error: the server can only send data in the application/json format}"
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
    if(request == null){
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
    switch (request.format) {
        case 'website':
            if(request.url == null || request.url == ""){
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
                uri: request.url,
                transform: function(body) {
                    return cheerio.load(body);
                }
            }).then(($) => {
                var citation = request
                var publishers = []
                $('div').each(function(i, elem) {
                    var text = $(this).text().replaceAll('\xa0',' ').replace(/[0-9]/g, '').trim();
                    var lower = text.toLowerCase();
                    if((lower.includes('©') || lower.indexOf('copyright') > 0) && (lower.indexOf('all rights reserved') > 0 || lower.length < 25)){
                      var start = text.indexOf("©") + 1;
                      var end = lower.substring(start).indexOf(".") + start;
                      if(end < 0){
                        var result = sanitizeInput(text.substring(start).trim());
                        if(result.length < 50 && result.length > 3){
                          publishers.push(result);
                        }
                      }
                      else{
                        var result = sanitizeInput(text.substring(start, end).trim());
                        if(result.length < 60 && result.length > 3){
                          publishers.push(result);
                        }
                      }
                    }
                });
                citation.container = $('meta[property="og:title"]').attr('content');
                if (citation.container == null || citation.container == "") {
                    citation.container = $('meta[name="og:title"]').attr('content');
                }
                if (citation.container == null || citation.container == "") {
                    citation.container = $('title').text();
                }
                citation.source = $('meta[property="og:site_name"]').attr('content');
                if(citation.source == null || citation.source == ""){
                    citation.source = $('meta[name="og:site_name"]').attr('content');
                }
                authors = [];       
                authors.push($('meta[property="author"]').attr('content'));
                authors.push( $('meta[name="author"]').attr('content'));
                authors = _.uniq(authors);
                authors = _.compact(authors)
                // add split of "and" as well as split of name into first, middle, and last.
                citation.authors = authors;
                if(publishers[0] == null || publishers[0] == ""){
                    citation.publisher = citation.source;
                }
                else{
                    citation.publisher = publishers[0]; 
                }
                // update later to find best match given source
                citation.datePublished = $('meta[property="article:modified_time"]').attr('content')
                if (citation.datePublished == null) {
                    citation.datePublished = $('meta[property="og:published_time"]').attr('content')
                }
                const MLAmonths = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec." ];
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

function sanitizeInput(s) {
    s = s.replace('©', ''); // may leave array of '' elements
    s = s.replace('-', '');
    s = s.replace('by', '');
    s = s.replaceAll('&nbsp;', ' ');
    s = s.replaceAll('\xa0',' ');
    s = s.replaceAll('All Rights Reserved', '');
    s = s.replace(' or its affiliated companies', '');
    s = s.replace('&lt;', '');
    s = s.replace('&gt;', '');
    s = s.replace('&#60;', '');
    s = s.replace('&#62;', '');
    s = s.replace('&#34;', '');
    s = s.replace('&quot;', '');
    s = s.replace('&quot', '');
    s = s.replace('&apos;', '');
    s = s.replace('&apos', '');     
    s = s.replace('&#39;', '');
    s = s.replace('&#162;', '');
    s = s.replace('&#169;', '');
    s = s.replace('&copy;', '');
    s = s.replace('&reg;', '');
    s = s.replace('&#174;', '');
    s = s.replace(/-+/g,'-'); //Removes consecutive dashes
    s = s.replace(/ +(?= )/g,''); //Removes double spacing
  
    return s;
  }
  
  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  };

  function ConvertKeysToLowerCase(obj) {
    var output = {};
    for (i in obj) {
        if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
           output[i.toLowerCase()] = ConvertKeysToLowerCase(obj[i]);
        }else if(Object.prototype.toString.apply(obj[i]) === '[object Array]'){
            output[i.toLowerCase()]=[];
             output[i.toLowerCase()].push(ConvertKeysToLowerCase(obj[i][0]));
        } else {
            output[i.toLowerCase()] = obj[i];
        }
    }
    return output;
};
const AWS = require('aws-sdk');
const https = require('https');
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const _ = require('lodash');
const Bluebird = require('bluebird');
const microdata = require('microdata-node');
const metascraper = require('metascraper');
const got = require('got');

exports.handler = function(event, context, callback) {
    var headers = event.headers;
    headers = ConvertKeysToLowerCase(headers);
    var request = JSON.parse(event.body);
/*     if(headers["content-type"] != null && headers["content-type"].toLowerCase() != "application/json"){
        var body = "{error: the server can only accept data in the application/json format}"
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
    } */
    if(request == null || request == ""){
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
    }
    switch (request.format) {
        case 'website':
            if(request.url == null || request.url == ""){
                var body = "{error: expected website URL}"
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
            var options = {
                timeout: 4000
            };
            (async () => {
                const {body: html, url} = await got(request.url, options)
                const meta = await metascraper({html, url})
                return meta; // remove duplicate request (got uses request) and merge with rp below
            })().then((meta) => {
                rp({
                    uri: request.url,
                    timeout: 4000,
                    transform: function(body) {
                        return cheerio.load(body);
                    }
                }).then(($) => {
                    var citation = request;
                    var rootDomain = extractRootDomain(citation.url).toLowerCase();
                    var html = $("html").html();
                    //console.log("HTML finished: " + html);
                    var schema = microdata.toJson(html);
                    var items = schema.items;
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
                    if(meta != null && meta.publisher != null && meta.publisher != ""){
                        publishers.push(meta.publisher);
                    }
                    citation.title = $('meta[property="og:title"]').attr('content');
                    if (citation.title == null || citation.title == "") {
                        citation.title = $('meta[name="og:title"]').attr('content');
                    }
                    if (citation.title == null || citation.title == "") {
                        citation.title = $('title').text();
                    }
                    citation.source = $('meta[property="og:site_name"]').attr('content');
                    if(citation.source == null || citation.source == ""){
                        citation.source = $('meta[name="og:site_name"]').attr('content');
                    }
                    if(citation.source == null || citation.source == ""){
                        for(var i = 0; i < items.length; i++){
                            if(items[i].type[0] == "http://schema.org/Organization"){
                                for(var j = 0; j < items[i].properties.name.length; j++){
                                    var org = items[i].properties.name[j];
                                    if(org != null && org != ""){
                                        citation.source = org;
                                    }
                                }
                            }
                        }
                    }
                    authors = [];       
                    authors.push($('meta[property="author"]').attr('content'));
                    authors.push( $('meta[name="author"]').attr('content'));
                    if(meta != null && meta.author != null && meta.author != ""){
                        authors.push(meta.author);
                    }
                    for(var i = 0; i < items.length; i++){
                      if(items[i].type[0] == "http://schema.org/Person"){
                        //console.log(items[i])
                        for(var j = 0; j < items[i].properties.name.length; j++){
                          authors.push(items[i].properties.name[j]);
                        }
                      }
                    }
                    for(var i = 0; i < authors.length; i++){
                        var temp = [];
                        if(authors[i] != null){
                            if(authors[i].indexOf(" and ") >= 0){
                                temp = authors[i].split(' and ');
                                authors[i] = null;
                                for(var j = 0; j < temp.length; j++){
                                    authors.push(temp[j]);
                                }
                            }
                        }
                    }
                    authors = _.uniq(authors);
                    authors = _.compact(authors)
                    citation.authors = [];
                    for(var i = 0; i < authors.length; i++){
                        if(authors[i] != null){      
                            var fullName = authors[i].split(' ');
                            var firstName = fullName[0];
                            var middleName;
                            var lastName;
                            if(fullName.length >= 2){
                                lastName = fullName[fullName.length - 1];
                            }
                            if(fullName.length == 3){
                                middleName = fullName[fullName.length - 2];
                            }
                            if(fullName.length > 3){
                                for(var j = 1; j > fullName.length - 2; j++){
                                    firstName = firstName + " " + fullName[j];
                                }
                                middleName = fullName[fullName.length - 2];
                            }
                            citation.authors.push({first: firstName, middle: middleName, last: lastName});
                        }
                    }
                    if(rootDomain == "youtu.be" || rootDomain == "youtube.com"){
                        var videoOwner = $('.yt-user-info > a').text();
                        if (videoOwner != null && videoOwner != ""){
                            citation.authors.push({first: videoOwner, middle: null, last: null});
                        }
                    }
                    if(rootDomain == "twitter.com" || (citation.source != null && citation.source.toLowerCase() == "twitter")){
                        for(var i = 0; i < citation.authors.length; i++){
                            var fn = citation.authors[i].first;
                            if(fn != null && fn != ""){
                                citation.authors[i].first = "@" + fn;
                            }
                        }
                    }
                    if((publishers[0] == null || publishers[0] == "") && (citation.source != null && citation.source != "")){
                        citation.publisher = citation.source;
                    }
                    else{
                        citation.publisher = publishers[0]; 
                    }
                    if((citation.publisher != null && citation.publisher != "") && (citation.source == null || citation.source == "")){
                        citation.source = citation.publisher;
                    }
                    // update later to find best match given source
                    citation.datePublished = $('meta[property="og:published_time"]').attr('content');
                    if (citation.datePublished == null || citation.datePublished == "") {
                        citation.datePublished = $('meta[property="article:published_time"]').attr('content');
                    }
                    if (citation.datePublished == null || citation.datePublished == "") {
                        citation.datePublished = $('meta[property="article:published"]').attr('content');
                    }
                    if (citation.datePublished == null || citation.datePublished == "") {
                        if(meta != null && meta.date != null && meta.date != ""){
                            citation.datePublished = meta.date;
                        }
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
                    console.log("Error in RP:" + err);
                    var body = "{error: cited website unavailable}"
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
            }).catch(function (err) {
                console.log("Error in GOT:" + err);
                var body = "{error: cited website unavailable}"
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
        case 'movie':
            if((request.title == null || request.title == "") && (request.ID == null || request.ID == "")){
                var body = "{error: expected movie title or movie ID}"
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
            if(request.ID == null || request.ID == ""){
                var page = "1";
                if(request.page != null && request.page != ""){
                    page = "" + request.page;
                }
                var url = "https://api.themoviedb.org/3/search/movie?api_key=" + process.env.TMDB_KEY + "&language=en-US&include_adult=false&query=" + request.title + "&page=" + page;
                rp({
                    uri: url,
                    method: 'GET',
                    timeout: 4000,
                    transform: function(body) {
                        return body;
                    }
                }).then((body) => {
                    var response = {
                        "statusCode": 200,
                        "headers": {
                            "Access-Control-Allow-Origin" : "*",
                            "Access-Control-Allow-Credentials" : true
                        },
                        "body": body,
                        "isBase64Encoded": false
                    };
                    return callback(null, response);
                }).catch(function (err) {
                    console.log("Error in RP:" + err);
                    var body = "{error: movie not found}"
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
            }
            else {
                var creditsURL = "https://api.themoviedb.org/3/movie/" + request.ID + "/credits?api_key=" + process.env.TMDB_KEY + "&language=en-US";
                var infoURL = "https://api.themoviedb.org/3/movie/" + request.ID + "?api_key=" + process.env.TMDB_KEY + "&language=en-US";

                var creditsOptions = {
                    uri: creditsURL,
                    method: 'GET',
                    timeout: 4000,
                    transform: function(body) {
                        return JSON.parse(body);
                    }
               }
               var infoOptions = {
                    uri: infoURL,
                    method: 'GET',
                    timeout: 4000,
                    transform: function(body) {
                        return JSON.parse(body);
                    }
                }

               var creditsRP = rp(creditsOptions);
               var infoRP = rp(infoOptions);
        
               Bluebird.all([creditsRP, infoRP])
                   .spread(function (credits, details) {
                    var array = [{credits: credits}, {details: details}];
                    return JSON.stringify(array);
                }).then((body) => {
                    var response = {
                        "statusCode": 200,
                        "headers": {
                            "Access-Control-Allow-Origin" : "*",
                            "Access-Control-Allow-Credentials" : true
                        },
                        "body": body,
                        "isBase64Encoded": false
                    };
                    return callback(null, response);
                }).catch(function (err) {
                    console.log("Error in RP:" + err);
                    var body = "{error: movie ID not found}"
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
            }
            break;
        default:
            //console.log('Format is invalid');
            //console.log("request: " + JSON.stringify(event));
            var body = "{error: bad request}"
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

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    return hostname;
};

function extractRootDomain(url) {
    var domain = extractHostname(url);
    splitArr = domain.split('.'),
    arrLen = splitArr.length;
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        if (splitArr[arrLen - 1].length == 2 && splitArr[arrLen - 1].length == 2) {
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
};

function youtubeID(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}
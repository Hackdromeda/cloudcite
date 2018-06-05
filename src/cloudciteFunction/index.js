const AWS = require('aws-sdk');
const https = require('https');
const rp = require('request-promise-native');
const cheerio = require('cheerio');

exports.handler = function(event, context, callback) {
    switch (event.format) {
        case 'website':
            rp({
                uri: event.url,
                transform: function(body) {
                    return cheerio.load(body);
                }
            }).then(($) => {
                var citation = event
                citation.title = $('title').text()
                if (citation.title == null) {
                    citation.title = $('meta[property="og:title"]').attr('content')
                }
                console.log('Citation: ' + citation)
                callback(null, citation)
            });
        break;
        case 'digital image':
            rp({
                uri: event.url,
                transform: function(body) {
                    return cheerio.load(body);
                }
            }).then(($) => {
                var citation = event
                citation.title = $('title').text()
                if (citation.title == null) {
                    citation.title = $('meta[property="og:title"]').attr('content')
                }
                console.log('Citation: ' + citation)
                callback(null, citation)
            });
            break;
        default:
            console.log('Format is invalid');
            callback('Invalid format', null)
    }
}
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
                citation.container = $('meta[property="og:title"]').attr('content')
                if (citation.container == null) {
                    citation.container = $('title').text()
                }
                citation.source = $('meta[property="og:site_name"]').attr('content')
                citation.authors = $('meta[property="article:author"]').attr('content')
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
                citation.container = $('img[src="' + citation.url + '"]').attr('src')
                if (citation.container != null && citation.container.indexOf('.jpg') != -1) {
                    var citationContainerPNGIndex = citation.container.indexOf('.jpg')
                    citation.container = citation.container.substring(0, citationContainerJPGIndex)
                } else if (citation.container != null && citation.container.indexOf('.jpeg') != -1) {
                    var citationContainerPNGIndex = citation.container.indexOf('.jpeg')
                    citation.container = citation.container.substring(0, citationContainerJPEGIndex)
                } else if (citation.container != null && citation.container.indexOf('.png') != -1) {
                    var citationContainerPNGIndex = citation.container.indexOf('.png')
                    citation.container = citation.container.substring(0, citationContainerPNGIndex)
                }
                citation.source = $('meta[property="og:site_name"]').attr('content')
                citation.authors = $('meta[property="article:author"]').attr('content')
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
                console.log('Citation: ' + citation)
                callback(null, citation)
            });
            break;
        default:
            console.log('Format is invalid');
            callback('Invalid format', null)
    }
}
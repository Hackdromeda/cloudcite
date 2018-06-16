'use strict';
exports.handler = (event, context, callback) => {
    const response = event.Records[0].cf.response;
    const headers = response.headers;
    
    headers['report-to'] = [{
        key:   'Report-To', 
        value: JSON.stringify({ "group": "csp-endpoint",
             "max-age": 10886400,
             "endpoints": [
               { "url": "https://cloudcite.report-uri.com/r/d/csp/enforce" }
             ] })
    }];
    
    headers['strict-transport-security'] = [{
        key:   'Strict-Transport-Security', 
        value: "max-age=31536000; includeSubdomains; preload"
    }];

    headers['content-security-policy'] = [{
        key:   'Content-Security-Policy', 
        value: "default-src 'self' *.cloudcite.net *.cloudflare.com *.googleapis.com; img-src 'self' *.gstatic.com gstatic.com *.google.com google.com translate.google.com *.googleapis.com data:; script-src 'self' 'unsafe-eval' translate.google.com *.googleapis.com; style-src 'self' 'unsafe-eval' 'unsafe-inline' data: cdn.materialdesignicons.com *.googleapis.com; object-src 'none'; font-src 'self' *.googleapis.com cdn.materialdesignicons.com data:; report-uri https://cloudcite.report-uri.com/r/d/csp/enforce; report-to csp-endpoint"
    }];

    headers['x-content-type-options'] = [{
        key:   'X-Content-Type-Options',
        value: "nosniff"
    }];
    
    headers['x-frame-options'] = [{
        key:   'X-Frame-Options',
        value: "DENY"
    }];
    
    headers['x-xss-protection'] = [{
        key:   'X-XSS-Protection',
        value: "1; mode=block"
    }];

    headers['referrer-policy'] = [{
        key:   'Referrer-Policy',
        value: "same-origin"
    }];
    
    callback(null, response);
};
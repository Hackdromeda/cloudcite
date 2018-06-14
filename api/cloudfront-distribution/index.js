'use strict';
exports.handler = (event, context, callback) => {
    const response = event.Records[0].cf.response;
    const headers = response.headers;
    
    headers['strict-transport-security'] = [{
        key:   'Strict-Transport-Security', 
        value: "max-age=31536000; includeSubdomains; preload"
    }];

    headers['content-security-policy'] = [{
        key:   'Content-Security-Policy', 
        value: "default-src 'self'; img-src 'self'; script-src 'self'; style-src 'self' cdn.materialdesignicons.com *.googleapis.com; object-src 'none'; font-src 'self' data:"
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
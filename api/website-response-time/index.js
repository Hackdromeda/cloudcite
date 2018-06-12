const AWS = require('aws-sdk');
const rp = require('request-promise');

exports.handler = function(event, context, callback) {
    var test = "https://cloudcite.net"
    var options = {
        uri: test,
        method: 'GET',
        timeout: 4000,
        time: true,
        resolveWithFullResponse: true
    }
    
    rp(options).then(function (response) {
        var d = new Date();
        var responseTime = (response.timings.end);
        var timestamp = Math.round((new Date()).getTime() / 1000);
        console.log("Unix Timestamp: " + timestamp);
        console.log("Response Time: " + responseTime);
        var url = "https://api.statuspage.io/v1/pages/" + process.env.PAGE_ID_1 + "/metrics/" + process.env.METRIC_ID_1 + "/data.json";
        //console.log(url);
            rp({
            uri: url,
            method: 'POST',
            timeout: 4000,
            body: {
                'data': {
                    'timestamp': timestamp,
                    'value': responseTime
                }
            },
            headers:{
                "Content-Type": "application/json",
                "Authorization": "OAuth " + process.env.API_KEY
            },
            json: true
        }).then(function (parsedBody) {
            console.log("Sent to " + url);
        }).catch(function (err) {
            console.log("Error in RP:" + err);
        });
    }).catch(function (err) {
        console.log("Error in RP:" + err);
    });
}


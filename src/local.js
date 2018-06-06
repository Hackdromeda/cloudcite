const rp = require('request-promise-native');

var currentDate = new Date()

rp({
    uri: 'https://q4s3hew332.execute-api.us-east-1.amazonaws.com/prod/CloudCite',
    headers: {
      'X-Api-Key': '9kj5EbG1bI4PXlSiFjRKH9Idjr2qf38A2yZPQEZy'
    },
    method: 'POST',
    body: JSON.stringify({
      "authors": null,
      "source": null,
      "container": null,
      "url": 'http://navalpatel.me',
      "format": 'website',
      "publisher": null,
      "datePublished": null,
      "dateAccessed": {
        "month": currentDate.getMonth(),
        "day": currentDate.getDate(),
        "year": currentDate.getFullYear()
      }
    }),
    transform: function(body) {
        return JSON.parse(body)
    }
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
        console.log(error)
    })
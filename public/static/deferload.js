(function () {
    'use strict';
    var getAsyncFile = function (fileStr) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 4000;
        xhr.overrideMimeType('text/css; charset=UTF-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var style = document.createElement('style'),
                    head = document.getElementsByTagName('head')[0];
                style.appendChild(document.createTextNode(xhr.responseText));
                head.appendChild(style);
            }
        };
        xhr.open('GET', fileStr, true);
        xhr.send(null);
    };
    getAsyncFile('https://cloudcite.net/static/MaterialDesign-Webfont-master/css/materialdesignicons.min.css');
});
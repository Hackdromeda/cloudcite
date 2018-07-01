var defer = document.createElement('link');
defer.rel = 'stylesheet';
defer.href = 'https://cloudcite.net/static/MaterialDesign-Webfont-master/css/materialdesignicons.min.css';
defer.type = 'text/css';
var godefer = document.getElementsByTagName('link')[0];
godefer.parentNode.insertBefore(defer, godefer);
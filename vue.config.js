const PrerenderSPAPlugin = require('prerender-spa-plugin');
const path = require('path');
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return

    return {
      plugins: [
        new PrerenderSPAPlugin(
          path.resolve(__dirname, 'dist'),
          // Add routes as we develop them
          ['/', '/about', '/pricing'],
          {
            postProcessHtml: function (context) {
              var titles = {
                '/': 'CloudCite · The Best Automatic Bibliography Generator',
                '/about': 'CloudCite · About',
                '/pricing': 'CloudCite · Pricing'
              }
              return context.html.replace(
                /<title>[^<]*<\/title>/i,
                '<title>' + titles[context.route] + '</title>'
              )
            }
          }
        ),
      ]
    }
  }
}
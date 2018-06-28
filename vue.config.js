const PrerenderSPAPlugin = require('prerender-spa-plugin');
const path = require('path');

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return

    return {
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: path.resolve(__dirname, 'dist'),
          // Add routes as we develop them
          routes: ['/', '/about', '/pricing'],
          postProcess: function (context) {
            var titles = {
              '/': 'CloudCite · The Best Automatic Bibliography Generator',
              '/about': 'CloudCite · About',
              '/pricing': 'CloudCite · Pricing'
            }
            var descriptions = {
              '/': 'CloudCite is a free, automatic bibliography generator for popular formats such as MLA 8th Edition, APA, and Chicago. It is built by students for students.',
              '/about': 'Learn about CloudCite. A free, secure and ad-free Bibliography Generator.',
              '/pricing': 'CloudCite is always free. No ads. No tracking.'
            }
            context.html = context.html.replace(
              /<title>[^<]*<\/title>/i,
              '<title>' + titles[context.route] + '</title>'
            )
            context.html = context.html.replace(
              /<meta [^>]*property=[\"']og:title[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/i,
              '<meta property="og:title" content="' + titles[context.route] + '">'
            )
            context.html = context.html.replace(
              /<meta [^>]*property=[\"']og:description[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/i,
              '<meta name="description" property="og:description" content="' + descriptions[context.route] + '">'
            )
            return context;
          }
        }),
      ]
    }
  }
}
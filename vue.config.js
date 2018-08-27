const PrerenderSPAPlugin = require('prerender-spa-plugin');
const path = require('path');
const JSDOMRenderer = require('@prerenderer/renderer-jsdom')

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return

    return {
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: path.resolve(__dirname, 'dist'),
          // Add routes as we develop them
          // Pending Routes:
          routes: ['/', '/about/', '/error/', '/projects/', '/pricing/', '/privacy/', '/contribute/', '/cite/website/', '/cite/book/', '/cite/film/', '/callback/', '/create/project/'],
          renderer: new JSDOMRenderer({

          }),
          postProcess: function (context) {
            var titles = {
              '/': 'CloudCite · The Best Free Automatic Bibliography Generator · MLA, APA, Chicago, Harvard Citation Styles',
              '/error/': 'CloudCite · Error',
              '/about/': 'CloudCite · About',
              '/projects/': 'CloudCite · Projects',
              '/pricing/': 'CloudCite · Pricing',
              '/contribute/': 'CloudCite · Contribute',
              '/privacy/': 'CloudCite · Privacy',
              '/callback/': 'CloudCite · Log In',
              '/cite/website/': 'CloudCite · Cite a Website · MLA, APA, Chicago, Harvard Citation Styles',
              '/cite/book/': 'CloudCite · Cite a Book · MLA, APA, Chicago, Harvard Citation Styles',
              '/cite/film/': 'CloudCite · Cite a Film · MLA, APA, Chicago, Harvard Citation Styles',
              '/create/project/': 'CloudCite · Create Project · MLA, APA, Chicago, Harvard Citation Styles'
            }
            var descriptions = {
              '/': 'CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago.',
              '/error/': 'CloudCite is a free, automatic, and ad-free bibliography generator for popular citation styles such as MLA 8th Edition, APA, and Chicago.',
              '/about/': 'Learn about CloudCite. A free, secure and ad-free Bibliography Generator.',
              '/projects/': 'Let CloudCite handle generating bibliographies and filling in fields for you. CloudCite can store multiple bibliography projects.',
              '/pricing/': 'CloudCite is always free. No ads.',
              '/privacy/': 'CloudCite is committed to user privacy. No ads. No tracking.',
              '/contribute/': 'Help support CloudCite development.',
              '/callback/': 'CloudCite is securely logging you in.',
              '/cite/website/': 'CloudCite can create website citations.',
              '/cite/book/': 'CloudCite can create book citations.',
              '/cite/film/': 'CloudCite can create film citations.',
              '/create/project/': 'CloudCite can create projects.'
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
            context.html = context.html.replace(
              /<meta [^>]*property=[\"']og:url[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/i,
              '<meta property="og:url" content="https://cloudcite.net' + context.route + '">'
            )
            return context;
          },
          minify: {
            collapseBooleanAttributes: true,
            minifyCSS: true,
            collapseWhitespace: true,
            decodeEntities: true,
            keepClosingSlash: true,
            sortAttributes: true
          }    
        })
      ]
    }
  },

  baseUrl: "/",
  productionSourceMap: true,
  parallel: true,

  css: {
    extract: true
  },

  pwa: {
    name: 'CloudCite',
    themeColor: '#005eea',
    msTileColor: '#005eea'
  }
}
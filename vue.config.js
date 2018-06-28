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
              // add options
          }
        ),
      ]
    }
  }
}
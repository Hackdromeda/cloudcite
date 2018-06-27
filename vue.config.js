const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const JSDOMRenderer = require('@prerenderer/renderer-jsdom')

module.exports = {
    configureWebpack: {
      plugins: [
        new PrerenderSPAPlugin({
            staticDir: __dirname,
            routes: ['/', '/about', '/callback', '/pricing'],
            renderer: new JSDOMRenderer()
          })
      ]
    }
  }
  
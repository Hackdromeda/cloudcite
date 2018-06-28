//const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const PrerenderPlugin = require('prerender-plugin')
//const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');

module.exports = {
    configureWebpack: {
      plugins: [
/*           new PrerenderPlugin({
            source: path.join(__dirname, 'public'),
            target: path.join(__dirname, 'dist'),
            routes: ['/', '/about', '/pricing'],
            capture: {
              delay: 3000
              // selector: 'mySelectorFromDocument',
              // event: 'myEventRaisedFromDocument'
            }
          }) *//* ,
          new PrerenderSPAPlugin({
            staticDir: path.join(__dirname, 'dist'),
            indexPath: path.join(__dirname, 'public'),                      
            routes: ['/', '/about', '/pricing'],
            renderer: new PuppeteerRenderer({
              renderAfterElementExists: '#app',
              renderAfterDocumentEvent: 'vue-render-event'
            })
          }) */
      ]
    }
  }
  
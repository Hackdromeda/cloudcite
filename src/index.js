import * as hyperHTML from 'hyperhtml';
import * as HyperHTMLApp from 'hyperhtml-app';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

/**
 * Utility
 */
function getCurrentRoute() {
  return window.location.pathname.replace('index.html', '');
}

/**
 * Router configuration
 */
const routerOutletEl = document.createElement('div');
const router = new HyperHTMLApp();
const renderRoute = hyperHTML.bind(routerOutletEl);

router.get('/', () => {
  import('./cloudcite-app.js').then(() => {
    renderRoute`
      <cloudcite-app name="hello"></cloudcite-app>
    `
    render()
  })
});

/*
<button onclick=${() => router.navigate('/user/Julia')}>
        See Julia
      </button>
      <button onclick=${() => router.navigate('/user/Andrea')}>
        See Andrea
      </button>
*/

router.get('/user/:name', ctx => {
  const userName = ctx.params.name
  
  renderRoute`
    <h1>Hello ${userName}</h1>
    <button onclick=${() => router.navigate('/')}>
      Go back
    </button>
  `
  render()
});

/**
 * Declarative render of the application and the active route
 */
const html = hyperHTML.bind(document.getElementById('app'))
function render() {
  return html`
    <div>
      ${routerOutletEl}
    </div>
  `;
}

// Trigger route handler for the initial route
router.navigate(getCurrentRoute());


import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Auth0Provider } from '@auth0/auth0-react';

// Debug için tam URL'i konsola yazdıralım
const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;
console.log('Redirect URI:', redirectUri);

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-gg4q1n6iysfjqaru.us.auth0.com"
    clientId="opZr0Gu3hieNd1xsTws9UVZAsWgVqkfN"
    authorizationParams={{
      redirect_uri: redirectUri,
      logoutParams: {
        returnTo: redirectUri
      }
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
)

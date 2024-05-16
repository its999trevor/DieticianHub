import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import App from './App.jsx'
import './index.css'

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure:true,
});
console.log(store)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <AuthProvider store={store}>

    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthProvider>

  </React.StrictMode>,
)

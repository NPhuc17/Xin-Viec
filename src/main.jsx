import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Home from './pages/homepage.jsx'
import Login from './features/Auth/loginpage.jsx'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <GoogleOAuthProvider clientId="738708814614-ussl2eb8pngqto0h1q4kuuqaoiu9i940.apps.googleusercontent.com">
    <App />
</GoogleOAuthProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import auth from './utils/auth';

// ensure axios default Authorization header is set from stored token on app start
auth.loadToken();

createRoot(document.getElementById('root')).render(
 
        <BrowserRouter>
            <App />
        </BrowserRouter>

)

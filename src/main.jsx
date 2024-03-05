import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MovieProvider } from "./Context/MovieContext"
import { AuthContextProvider } from "./Context/AuthContext"


ReactDOM.createRoot(document.getElementById('root')).render(
      <AuthContextProvider>
            <MovieProvider>
                  <App />
            </MovieProvider>
      </AuthContextProvider>
            
)

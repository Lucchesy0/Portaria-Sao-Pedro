// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Estilos
import './styles/global.css'
import './styles/components.css'
import './styles/layout.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

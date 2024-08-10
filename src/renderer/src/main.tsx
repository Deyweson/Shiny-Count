import React from 'react'
import ReactDOM from 'react-dom/client'
import { MainRoutes } from './Route'
import { HashRouter } from 'react-router-dom'
import './global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <MainRoutes />
    </HashRouter>
  </React.StrictMode>
)

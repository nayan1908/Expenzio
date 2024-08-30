import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { IconContext } from 'react-icons'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <IconContext.Provider value={{ style: { verticalAlign: 'middle', marginBottom: "1px" } }}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </IconContext.Provider>
  // </React.StrictMode>,
)

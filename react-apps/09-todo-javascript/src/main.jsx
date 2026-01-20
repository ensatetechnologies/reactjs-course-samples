/**
 * 📚 Todo App - JavaScript Version
 * From: Chapter 5 - JavaScript vs TypeScript in React
 * 
 * This is the JavaScript version without type annotations.
 * Compare with the TypeScript version to see the differences!
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

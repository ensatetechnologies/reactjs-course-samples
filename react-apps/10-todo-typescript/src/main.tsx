/**
 * 📚 Todo App - TypeScript Version
 * From: Chapter 5 - JavaScript vs TypeScript in React
 * 
 * This is the TypeScript version with full type annotations.
 * Compare with the JavaScript version to see the differences!
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

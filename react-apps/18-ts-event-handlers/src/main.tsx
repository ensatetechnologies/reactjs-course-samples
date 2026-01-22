/**
 * 📚 Typed Event Handlers Demo
 * From: React with TypeScript - Core Concepts
 * 
 * Demonstrates typing event handlers in React
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

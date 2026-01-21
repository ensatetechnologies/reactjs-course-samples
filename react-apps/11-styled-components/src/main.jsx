import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

// Global styles using styled-components
const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #22d3ee;
    --secondary: #a78bfa;
    --accent: #34d399;
    --danger: #ef4444;
    --warning: #fbbf24;
    --bg: #0a0f1c;
    --surface: #111827;
    --surface2: #1a2234;
    --text: #f1f5f9;
    --muted: #94a3b8;
    --border: #2d3a52;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    min-height: 100vh;
  }
`

// Theme object for styled-components
const theme = {
  colors: {
    primary: '#22d3ee',
    secondary: '#a78bfa',
    accent: '#34d399',
    danger: '#ef4444',
    warning: '#fbbf24',
    bg: '#0a0f1c',
    surface: '#111827',
    surface2: '#1a2234',
    text: '#f1f5f9',
    muted: '#94a3b8',
    border: '#2d3a52',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    full: '9999px',
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

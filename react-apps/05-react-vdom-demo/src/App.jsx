/**
 * 📚 React Virtual DOM Demo
 * From: Chapter 3.1 - DOM Reflow
 * 
 * Demonstrates how React's Virtual DOM solves reflow problems:
 * - Declarative rendering
 * - Automatic batching
 * - Efficient diffing
 */

import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [renderTime, setRenderTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const startTime = useRef(0)

  const ITEM_COUNT = 500

  const addItemsReact = () => {
    setIsRunning(true)
    startTime.current = performance.now()
    
    // React batches all these updates efficiently!
    const newItems = []
    for (let i = 1; i <= ITEM_COUNT; i++) {
      newItems.push({ id: i, text: `Item ${i}` })
    }
    
    setItems(newItems)
  }

  useEffect(() => {
    if (isRunning && items.length > 0) {
      const endTime = performance.now()
      setRenderTime(endTime - startTime.current)
      setIsRunning(false)
    }
  }, [items, isRunning])

  const clearItems = () => {
    setItems([])
    setRenderTime(0)
  }

  const updateRandomItem = () => {
    if (items.length === 0) return
    
    const start = performance.now()
    const randomIndex = Math.floor(Math.random() * items.length)
    
    setItems(prev => prev.map((item, i) => 
      i === randomIndex 
        ? { ...item, text: `Updated at ${new Date().toLocaleTimeString()}` }
        : item
    ))
    
    // Note: React only updates the ONE changed DOM node!
  }

  return (
    <div className="app">
      <header className="header">
        <h1>⚛️ React's Virtual DOM</h1>
        <p>How React solves the reflow problem</p>
      </header>

      <main>
        {/* How It Works */}
        <section className="section">
          <h2>💡 How Virtual DOM Works</h2>
          <div className="vdom-flow">
            <div className="flow-step">
              <div className="step-icon">📝</div>
              <h4>1. State Changes</h4>
              <p>You update state with setState</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-icon">🌳</div>
              <h4>2. Virtual DOM</h4>
              <p>React creates new virtual tree</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <div className="step-icon">🔍</div>
              <h4>3. Diffing</h4>
              <p>Compare with previous tree</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step highlight">
              <div className="step-icon">✨</div>
              <h4>4. Minimal Updates</h4>
              <p>Only changed nodes updated!</p>
            </div>
          </div>
        </section>

        {/* Demo */}
        <section className="section">
          <h2>🎮 Interactive Demo</h2>
          
          <div className="controls">
            <button className="btn-primary" onClick={addItemsReact}>
              ⚛️ Add {ITEM_COUNT} Items (React)
            </button>
            <button className="btn-secondary" onClick={updateRandomItem} disabled={items.length === 0}>
              🎲 Update Random Item
            </button>
            <button onClick={clearItems}>🗑️ Clear</button>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-value">{renderTime.toFixed(1)}</div>
              <div className="stat-label">Render Time (ms)</div>
            </div>
            <div className="stat">
              <div className="stat-value">{items.length}</div>
              <div className="stat-label">Items</div>
            </div>
            <div className="stat">
              <div className="stat-value">~1</div>
              <div className="stat-label">DOM Update</div>
            </div>
          </div>

          <div className="items-container">
            {items.map(item => (
              <div key={item.id} className="item">
                {item.text}
              </div>
            ))}
          </div>
        </section>

        {/* Code Comparison */}
        <section className="section">
          <h2>📝 The React Way</h2>
          <div className="code-block">
            <div className="code-header">
              <span className="badge good">✅ REACT</span>
              Declarative & Efficient
            </div>
            <pre><code>{`// Just declare WHAT you want to render
function ItemList() {
  const [items, setItems] = useState([])
  
  const addItems = () => {
    // React handles all the DOM magic!
    setItems([...newItems])
  }
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  )
}

// React's Virtual DOM:
// 1. Batches multiple state updates
// 2. Computes minimal DOM changes
// 3. Applies changes in single operation
// = Automatic optimization! ✨`}</code></pre>
          </div>
        </section>

        {/* Benefits */}
        <section className="section">
          <h2>🎁 Benefits of Virtual DOM</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">🎯</span>
              <h4>Minimal Updates</h4>
              <p>Only changed elements are updated in real DOM</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📦</span>
              <h4>Automatic Batching</h4>
              <p>Multiple state changes = single render</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🧠</span>
              <h4>Declarative</h4>
              <p>Describe what, not how - React handles optimization</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">⚡</span>
              <h4>Fast Diffing</h4>
              <p>O(n) algorithm compares trees efficiently</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

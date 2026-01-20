/**
 * 📚 Counter - React Version
 * From: Chapter 2 - HTML & JavaScript to React
 * 
 * Key Learning:
 * - useState for state management
 * - Automatic UI updates when state changes
 * - NO manual DOM manipulation needed!
 * 
 * Compare this clean code with the vanilla JS version!
 */

import { useState } from 'react'
import './App.css'

function App() {
  // State - React's way of managing data
  // When count changes, React automatically re-renders the UI!
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [history, setHistory] = useState([
    { action: 'init', value: 0, timestamp: new Date().toLocaleTimeString() }
  ])

  // Update counter - NO manual DOM updates needed!
  const updateCounter = (change) => {
    const newCount = count + change
    setCount(newCount) // React automatically updates the UI!
    
    // Add to history
    setHistory(prev => [
      { 
        action: change > 0 ? 'increase' : 'decrease', 
        value: newCount,
        change: Math.abs(change),
        timestamp: new Date().toLocaleTimeString() 
      },
      ...prev.slice(0, 9) // Keep last 10
    ])
  }

  // Reset counter
  const resetCounter = () => {
    setCount(0)
    setHistory(prev => [
      { action: 'reset', value: 0, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 9)
    ])
  }

  // Determine count color based on value
  const countClass = count > 0 ? 'positive' : count < 0 ? 'negative' : ''

  return (
    <div className="app">
      <header>
        <h1>⚛️ React Counter</h1>
        <p>Automatic state ↔ UI synchronization</p>
        <div className="success-banner">
          ✅ State changes automatically update the UI - no manual DOM manipulation!
        </div>
      </header>

      <main>
        <div className="counter-card">
          <h2>Simple Counter</h2>
          
          {/* Counter display - automatically updates when count changes! */}
          <div className={`counter-value ${countClass}`}>
            {count}
          </div>
          
          <div className="button-group">
            <button className="btn-danger" onClick={() => updateCounter(-1)}>
              - Decrease
            </button>
            <button className="btn-secondary" onClick={resetCounter}>
              Reset
            </button>
            <button className="btn-primary" onClick={() => updateCounter(1)}>
              + Increase
            </button>
          </div>
          
          {/* Step control */}
          <div className="step-control">
            <label>Step size:</label>
            <input 
              type="number" 
              value={step} 
              onChange={(e) => setStep(parseInt(e.target.value) || 1)}
              min="1"
              max="100"
            />
            <button onClick={() => updateCounter(step)}>Add Step</button>
            <button onClick={() => updateCounter(-step)}>Subtract Step</button>
          </div>
        </div>

        {/* Code explanation */}
        <div className="code-explanation">
          <h3>✨ How React Makes This Simple</h3>
          <pre><code>{`// React version - CLEAN & SIMPLE!
const [count, setCount] = useState(0)

// Just update state - React handles the DOM!
const updateCounter = (change) => {
  setCount(count + change) // UI updates automatically! 🎉
}

// In JSX, just use the variable:
<div>{count}</div>

// No manual DOM manipulation needed!`}</code></pre>
        </div>

        {/* History log */}
        <div className="history-section">
          <h3>📜 Action History</h3>
          <div className="history-log">
            {history.map((entry, index) => (
              <p key={index} className={`history-item ${entry.action}`}>
                [{entry.timestamp}] {
                  entry.action === 'increase' ? `⬆️ Increased by ${entry.change}` :
                  entry.action === 'decrease' ? `⬇️ Decreased by ${entry.change}` :
                  entry.action === 'reset' ? '🔄 Reset to 0' :
                  '🎬 Initialized at 0'
                } → {entry.value}
              </p>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

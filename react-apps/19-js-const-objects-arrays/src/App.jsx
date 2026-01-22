import { useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState({ name: 'John', age: 25, city: 'NYC' })
  const [fruits, setFruits] = useState(['🍎 Apple', '🍌 Banana', '🍊 Orange'])
  const [frozenConfig] = useState(() => 
    Object.freeze({ apiUrl: 'https://api.example.com', timeout: 5000 })
  )
  const [logs, setLogs] = useState([])

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { message, type, id: Date.now() + Math.random() }])
  }

  const clearLogs = () => setLogs([])

  const demoObjectMutation = () => {
    clearLogs()
    addLog('📦 const with Objects:', 'heading')
    addLog('')
    addLog('const user = { name: "John", age: 25, city: "NYC" }', 'code')
    addLog('')
    addLog('✅ Modifying properties WORKS:', 'success')
    const newUser = { ...user, name: 'Jane' }
    addLog(`  user.name = "Jane" → { name: "${newUser.name}", age: ${newUser.age} }`, 'info')
    setUser(newUser)
    addLog('')
    addLog('❌ Reassigning variable FAILS:', 'error')
    addLog('  user = { name: "Bob" } // TypeError!', 'code')
    addLog('')
    addLog('🔑 const locks the REFERENCE, not the CONTENTS', 'key')
  }

  const demoAddProperty = () => {
    clearLogs()
    addLog('➕ Adding properties to const object:', 'heading')
    addLog('')
    const newUser = { ...user, email: 'jane@example.com' }
    setUser(newUser)
    addLog('user.email = "jane@example.com"', 'code')
    addLog(`Result: ${JSON.stringify(newUser, null, 2)}`, 'success')
    addLog('')
    addLog('✅ Adding new properties works with const!', 'success')
  }

  const demoDeleteProperty = () => {
    clearLogs()
    addLog('🗑️ Deleting properties from const object:', 'heading')
    addLog('')
    const { city, ...rest } = user
    setUser(rest)
    addLog('delete user.city', 'code')
    addLog(`Result: ${JSON.stringify(rest)}`, 'success')
    addLog('')
    addLog('✅ Deleting properties works with const!', 'success')
  }

  const demoArrayMutation = () => {
    clearLogs()
    addLog('📚 const with Arrays:', 'heading')
    addLog('')
    addLog('const fruits = ["🍎", "🍌", "🍊"]', 'code')
    addLog('')
    addLog('✅ Mutating array WORKS:', 'success')
    addLog('  fruits.push("🍇") → adds grape', 'info')
    addLog('  fruits[0] = "🍓" → changes first item', 'info')
    addLog('  fruits.pop() → removes last item', 'info')
    addLog('')
    addLog('❌ Reassigning array FAILS:', 'error')
    addLog('  fruits = ["🥝"] // TypeError!', 'code')
    addLog('')
    addLog('🔑 Array reference is constant, not its elements', 'key')
  }

  const demoArrayPush = () => {
    clearLogs()
    const newFruit = '🍇 Grape'
    setFruits(prev => [...prev, newFruit])
    addLog(`fruits.push("${newFruit}")`, 'code')
    addLog('✅ Push works with const arrays!', 'success')
  }

  const demoArrayPop = () => {
    clearLogs()
    if (fruits.length > 0) {
      const removed = fruits[fruits.length - 1]
      setFruits(prev => prev.slice(0, -1))
      addLog(`fruits.pop() → removed "${removed}"`, 'code')
      addLog('✅ Pop works with const arrays!', 'success')
    }
  }

  const demoArraySplice = () => {
    clearLogs()
    if (fruits.length > 0) {
      setFruits(prev => prev.filter((_, i) => i !== 0))
      addLog('fruits.splice(0, 1) → removed first item', 'code')
      addLog('✅ Splice works with const arrays!', 'success')
    }
  }

  const resetFruits = () => {
    setFruits(['🍎 Apple', '🍌 Banana', '🍊 Orange'])
    clearLogs()
    addLog('Array reset to original', 'info')
  }

  const demoObjectFreeze = () => {
    clearLogs()
    addLog('🧊 Object.freeze() for TRUE immutability:', 'heading')
    addLog('')
    addLog('const config = Object.freeze({', 'code')
    addLog('  apiUrl: "https://api.example.com",', 'code')
    addLog('  timeout: 5000', 'code')
    addLog('});', 'code')
    addLog('')
    addLog(`config.apiUrl = "hacked" → still "${frozenConfig.apiUrl}"`, 'success')
    addLog('❄️ Modification silently fails (or throws in strict mode)', 'warning')
    addLog('')
    addLog('⚠️ Object.freeze() is SHALLOW!', 'warning')
    addLog('')
    addLog('const deep = Object.freeze({ nested: { value: 1 } });', 'code')
    addLog('deep.nested.value = 99; // ✅ This WORKS! 😱', 'warning')
  }

  const demoImmutablePatterns = () => {
    clearLogs()
    addLog('✨ Immutable Update Patterns:', 'heading')
    addLog('')
    addLog('// Adding to array (immutable)', 'code')
    addLog('const newArr = [...original, newItem];', 'code')
    addLog('')
    addLog('// Removing from array (immutable)', 'code')
    addLog('const filtered = arr.filter(x => x !== item);', 'code')
    addLog('')
    addLog('// Updating object (immutable)', 'code')
    addLog('const updated = { ...obj, prop: newValue };', 'code')
    addLog('')
    addLog('// Removing from object (immutable)', 'code')
    addLog('const { propToRemove, ...rest } = obj;', 'code')
    addLog('')
    addLog('🔑 These patterns create NEW objects/arrays!', 'key')
    addLog('Essential for React state updates!', 'success')
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📦 const with Objects & Arrays</h1>
        <p>Understanding what const actually locks and mutation patterns</p>
      </header>

      <div className="content">
        <div className="grid">
          <section className="section">
            <h2 className="section-title">📦 Objects</h2>
            <div className="object-display">
              <div className="object-label">const user =</div>
              <pre className="object-value">{JSON.stringify(user, null, 2)}</pre>
            </div>
            <div className="button-group">
              <button onClick={demoObjectMutation} className="btn btn-primary">🔍 How it Works</button>
              <button onClick={demoAddProperty} className="btn btn-success">➕ Add Property</button>
              <button onClick={demoDeleteProperty} className="btn btn-warning">🗑️ Delete Property</button>
              <button onClick={() => setUser({ name: 'John', age: 25, city: 'NYC' })} className="btn btn-secondary">🔄 Reset</button>
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">📚 Arrays</h2>
            <div className="array-display">
              <div className="array-label">const fruits =</div>
              <div className="array-items">
                {fruits.map((fruit, i) => (
                  <span key={i} className="array-item">{fruit}</span>
                ))}
              </div>
            </div>
            <div className="button-group">
              <button onClick={demoArrayMutation} className="btn btn-primary">🔍 How it Works</button>
              <button onClick={demoArrayPush} className="btn btn-success">➕ Push</button>
              <button onClick={demoArrayPop} className="btn btn-warning">➖ Pop</button>
              <button onClick={demoArraySplice} className="btn btn-danger">✂️ Splice</button>
              <button onClick={resetFruits} className="btn btn-secondary">🔄 Reset</button>
            </div>
          </section>
        </div>

        <section className="section full-width">
          <h2 className="section-title">🧊 True Immutability</h2>
          <div className="frozen-display">
            <div className="frozen-label">const config = Object.freeze(</div>
            <pre className="frozen-value">{JSON.stringify(frozenConfig, null, 2)}</pre>
            <div className="frozen-label">)</div>
          </div>
          <div className="button-group centered">
            <button onClick={demoObjectFreeze} className="btn btn-primary">🧊 Object.freeze() Demo</button>
            <button onClick={demoImmutablePatterns} className="btn btn-accent">✨ Immutable Patterns</button>
          </div>
        </section>

        <div className="console">
          <div className="console-header">
            <span>📟 Console</span>
            <button onClick={clearLogs} className="clear-btn">Clear</button>
          </div>
          <div className="console-body">
            {logs.length === 0 ? (
              <div className="console-empty">Click a button to see the explanation</div>
            ) : (
              logs.map(log => (
                <div key={log.id} className={`log-line ${log.type}`}>{log.message}</div>
              ))
            )}
          </div>
        </div>

        <div className="summary-grid">
          <div className="summary-card mutating">
            <h3>⚠️ Mutating Methods</h3>
            <p className="subtitle">These change the original array:</p>
            <ul>
              <li>push() / pop()</li>
              <li>shift() / unshift()</li>
              <li>splice()</li>
              <li>sort() / reverse()</li>
              <li>fill()</li>
            </ul>
          </div>
          <div className="summary-card non-mutating">
            <h3>✅ Non-Mutating Methods</h3>
            <p className="subtitle">These return a new array:</p>
            <ul>
              <li>map() / filter()</li>
              <li>slice() / concat()</li>
              <li>toSorted() (ES2023)</li>
              <li>toReversed() (ES2023)</li>
              <li>toSpliced() (ES2023)</li>
            </ul>
          </div>
          <div className="summary-card key-point">
            <h3>🔑 Key Takeaway</h3>
            <p className="subtitle">const prevents:</p>
            <div className="key-list">
              <div className="key-item blocked">❌ Reassigning the variable</div>
              <div className="key-item allowed">✅ Modifying object properties</div>
              <div className="key-item allowed">✅ Modifying array elements</div>
              <div className="key-item allowed">✅ Adding/removing properties</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

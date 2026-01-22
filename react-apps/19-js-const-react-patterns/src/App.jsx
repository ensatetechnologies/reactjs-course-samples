import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import './App.css'

// Pattern 1: const for useState destructuring
// The [value, setValue] pair ALWAYS uses const
function CounterDemo() {
  const [count, setCount] = useState(0)
  
  // Pattern 2: const for event handlers (often with useCallback)
  const increment = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1)
  }, [])
  
  // Pattern 3: const for derived values (often with useMemo)
  const doubled = useMemo(() => count * 2, [count])
  const squared = useMemo(() => count * count, [count])
  
  return (
    <div className="demo-card">
      <h3>🔢 Counter with const Patterns</h3>
      <div className="pattern-grid">
        <div className="pattern-box">
          <div className="pattern-label">useState</div>
          <code>const [count, setCount] = useState(0)</code>
        </div>
        <div className="pattern-box">
          <div className="pattern-label">useCallback</div>
          <code>const increment = useCallback(...)</code>
        </div>
        <div className="pattern-box">
          <div className="pattern-label">useMemo</div>
          <code>const doubled = useMemo(...)</code>
        </div>
      </div>
      <div className="counter-display">
        <div className="count-box">
          <span className="count-label">count</span>
          <span className="count-value">{count}</span>
        </div>
        <div className="count-box derived">
          <span className="count-label">doubled</span>
          <span className="count-value">{doubled}</span>
        </div>
        <div className="count-box derived">
          <span className="count-label">squared</span>
          <span className="count-value">{squared}</span>
        </div>
      </div>
      <div className="button-row">
        <button onClick={decrement} className="btn btn-danger">➖</button>
        <button onClick={increment} className="btn btn-success">➕</button>
      </div>
    </div>
  )
}

// Pattern 4: const for refs
function RefDemo() {
  const inputRef = useRef(null)
  const renderCount = useRef(0)
  
  useEffect(() => {
    renderCount.current += 1
  })
  
  const focusInput = () => {
    inputRef.current?.focus()
  }
  
  return (
    <div className="demo-card">
      <h3>📍 Refs with const</h3>
      <div className="pattern-box">
        <div className="pattern-label">useRef</div>
        <code>const inputRef = useRef(null)</code>
      </div>
      <div className="ref-explanation">
        <p>🔑 <code>const</code> locks the ref object, but <code>.current</code> can still change!</p>
      </div>
      <div className="ref-demo-area">
        <input ref={inputRef} placeholder="Click button to focus me" className="demo-input" />
        <button onClick={focusInput} className="btn btn-primary">Focus Input</button>
      </div>
      <div className="render-count">
        Render count: <span className="highlight">{renderCount.current}</span> 
        <span className="note">(mutated without re-render)</span>
      </div>
    </div>
  )
}

// Pattern 5: const for component props and local variables
function ProductCard({ product }) {
  // Derived calculations using const
  const discountedPrice = product.price * (1 - product.discount)
  const savings = product.price - discountedPrice
  const isOnSale = product.discount > 0
  
  // Formatting using const
  const formattedPrice = `$${discountedPrice.toFixed(2)}`
  const formattedSavings = `$${savings.toFixed(2)}`
  
  return (
    <div className={`product-card ${isOnSale ? 'on-sale' : ''}`}>
      <div className="product-emoji">{product.emoji}</div>
      <h4>{product.name}</h4>
      <div className="price-info">
        {isOnSale && <span className="original-price">${product.price.toFixed(2)}</span>}
        <span className="current-price">{formattedPrice}</span>
        {isOnSale && <span className="savings">Save {formattedSavings}!</span>}
      </div>
    </div>
  )
}

function DerivedValuesDemo() {
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 999, discount: 0.2, emoji: '💻' },
    { id: 2, name: 'Phone', price: 799, discount: 0.15, emoji: '📱' },
    { id: 3, name: 'Headphones', price: 199, discount: 0, emoji: '🎧' },
  ])
  
  // Derived totals
  const totalOriginal = products.reduce((sum, p) => sum + p.price, 0)
  const totalDiscounted = products.reduce((sum, p) => sum + p.price * (1 - p.discount), 0)
  const totalSavings = totalOriginal - totalDiscounted
  
  return (
    <div className="demo-card">
      <h3>💰 Derived Values with const</h3>
      <div className="pattern-box">
        <div className="pattern-label">Derived Calculations</div>
        <code>const total = products.reduce(...)</code>
      </div>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="totals-bar">
        <div className="total-item">
          <span className="total-label">Original:</span>
          <span className="total-value strike">${totalOriginal.toFixed(2)}</span>
        </div>
        <div className="total-item">
          <span className="total-label">Your Total:</span>
          <span className="total-value highlight">${totalDiscounted.toFixed(2)}</span>
        </div>
        <div className="total-item savings">
          <span className="total-label">You Save:</span>
          <span className="total-value">${totalSavings.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

// Pattern 6: const in event handlers
function FormDemo() {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  
  // const for handler functions
  const handleChange = (e) => {
    const { name, value } = e.target  // Destructuring with const
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedData = {  // Local const for processed data
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
    }
    console.log('Submitting:', trimmedData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }
  
  // Validation derived from state
  const isValid = formData.name.length > 0 && formData.email.includes('@')
  
  return (
    <div className="demo-card">
      <h3>📝 Event Handlers with const</h3>
      <div className="pattern-grid">
        <div className="pattern-box">
          <div className="pattern-label">Handler Function</div>
          <code>const handleChange = (e) =&gt; ...</code>
        </div>
        <div className="pattern-box">
          <div className="pattern-label">Destructuring</div>
          <code>const &#123; name, value &#125; = e.target</code>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="demo-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="demo-input"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="demo-input"
        />
        <button 
          type="submit" 
          className={`btn btn-primary ${!isValid ? 'disabled' : ''}`}
          disabled={!isValid}
        >
          {submitted ? '✅ Submitted!' : 'Submit'}
        </button>
      </form>
      <div className="validation-status">
        Validation: <span className={isValid ? 'valid' : 'invalid'}>
          {isValid ? '✅ Valid' : '❌ Invalid'}
        </span>
        <span className="note">(const isValid = ...)</span>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>⚛️ const in React Patterns</h1>
        <p>How const is used with hooks, handlers, and derived values</p>
      </header>

      <div className="content">
        <div className="key-principle">
          <h2>🔑 Key Principle</h2>
          <p>
            In React, <code>const</code> is used almost exclusively because values are 
            <strong> recomputed on each render</strong>. We don't reassign variables — 
            we trigger re-renders with new values!
          </p>
        </div>

        <CounterDemo />
        <RefDemo />
        <DerivedValuesDemo />
        <FormDemo />

        <div className="summary-section">
          <h2>📋 When to Use const vs let in React</h2>
          <div className="summary-grid">
            <div className="summary-card const-usage">
              <h4>✅ Use const (99% of cases)</h4>
              <ul>
                <li>useState destructuring</li>
                <li>useRef, useMemo, useCallback</li>
                <li>Event handler functions</li>
                <li>Derived/computed values</li>
                <li>Props destructuring</li>
                <li>Component declarations</li>
              </ul>
            </div>
            <div className="summary-card let-usage">
              <h4>⚠️ Use let (rare)</h4>
              <ul>
                <li>Loop counters (for...of)</li>
                <li>Accumulators in algorithms</li>
                <li>Reassignable inside useEffect</li>
                <li>Complex conditional assignments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

/**
 * 📚 Typed Hooks Demo
 * From: React with TypeScript - Core Concepts
 * 
 * Demonstrates:
 * - useState with explicit types
 * - useRef for DOM elements and mutable values
 * - useEffect with typed async data
 * - useReducer with typed actions
 * - useMemo and useCallback
 */

import { useState, useRef, useEffect, useReducer, useMemo, useCallback } from 'react'
import './App.css'

// ====================================
// TYPE DEFINITIONS
// ====================================

// User interface for useState demo
interface User {
  id: number
  name: string
  email: string
  status: "active" | "inactive"
}

// Post interface for useEffect demo
interface Post {
  id: number
  title: string
  body: string
}

// State and Action types for useReducer
interface CounterState {
  count: number
  history: number[]
  lastAction: string
}

type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET"; payload: number }
  | { type: "MULTIPLY"; payload: number }

// Timer state
interface TimerState {
  seconds: number
  isRunning: boolean
}

// Fetch status type
type FetchStatus = "idle" | "loading" | "success" | "error"

// ====================================
// REDUCER FUNCTION
// ====================================

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1],
        lastAction: "INCREMENT"
      }
    case "DECREMENT":
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1],
        lastAction: "DECREMENT"
      }
    case "RESET":
      return {
        count: 0,
        history: [0],
        lastAction: "RESET"
      }
    case "SET":
      return {
        count: action.payload,
        history: [...state.history, action.payload],
        lastAction: `SET to ${action.payload}`
      }
    case "MULTIPLY":
      return {
        count: state.count * action.payload,
        history: [...state.history, state.count * action.payload],
        lastAction: `MULTIPLY by ${action.payload}`
      }
    default:
      return state
  }
}

// ====================================
// MAIN COMPONENT
// ====================================

function App(): JSX.Element {
  // ====================================
  // useState Examples
  // ====================================
  
  // Inferred type (number)
  const [count, setCount] = useState(0)
  
  // Explicit type - nullable
  const [user, setUser] = useState<User | null>(null)
  
  // Explicit type - array
  const [users, setUsers] = useState<User[]>([])
  
  // Literal union type
  const [status, setStatus] = useState<FetchStatus>("idle")
  
  // Timer state
  const [timer, setTimer] = useState<TimerState>({ seconds: 0, isRunning: false })

  // ====================================
  // useRef Examples
  // ====================================
  
  // DOM element ref
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  
  // Mutable value ref (timer ID)
  const timerRef = useRef<number | null>(null)
  
  // Previous value ref
  const prevCountRef = useRef<number>(0)

  // ====================================
  // useReducer Example
  // ====================================
  
  const [counterState, dispatch] = useReducer(counterReducer, {
    count: 0,
    history: [0],
    lastAction: "INIT"
  })

  // ====================================
  // useEffect for fetching data
  // ====================================
  
  const [posts, setPosts] = useState<Post[]>([])
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false)

  useEffect(() => {
    // Track previous count value
    prevCountRef.current = count
  }, [count])

  const fetchPosts = async (): Promise<void> => {
    setLoadingPosts(true)
    setStatus("loading")
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
      const data: Post[] = await response.json()
      setPosts(data)
      setStatus("success")
    } catch {
      setStatus("error")
    } finally {
      setLoadingPosts(false)
    }
  }

  // ====================================
  // Timer Effect
  // ====================================
  
  useEffect(() => {
    if (timer.isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimer(prev => ({ ...prev, seconds: prev.seconds + 1 }))
      }, 1000)
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [timer.isRunning])

  // ====================================
  // useMemo Example
  // ====================================
  
  const expensiveCalculation = useMemo((): number => {
    // Simulate expensive calculation
    let result = 0
    for (let i = 0; i < 1000; i++) {
      result += counterState.count * i
    }
    return result
  }, [counterState.count])

  const sortedHistory = useMemo((): number[] => {
    return [...counterState.history].sort((a, b) => a - b)
  }, [counterState.history])

  // ====================================
  // useCallback Examples
  // ====================================
  
  const handleAddUser = useCallback((): void => {
    const newUser: User = {
      id: Date.now(),
      name: `User ${users.length + 1}`,
      email: `user${users.length + 1}@example.com`,
      status: "active"
    }
    setUsers(prev => [...prev, newUser])
  }, [users.length])

  const handleFocusInput = useCallback((): void => {
    inputRef.current?.focus()
  }, [])

  const toggleTimer = useCallback((): void => {
    setTimer(prev => ({ ...prev, isRunning: !prev.isRunning }))
  }, [])

  const resetTimer = useCallback((): void => {
    setTimer({ seconds: 0, isRunning: false })
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div className="app">
      <header className="header">
        <span className="badge hook">Hooks</span>
        <h1>🪝 Typing React Hooks</h1>
        <p>Type-safe hooks with TypeScript annotations</p>
      </header>

      {/* useState Section */}
      <section className="section">
        <h2 className="section-title">
          <span className="hook-badge">useState</span>
          State with Types
        </h2>
        
        <div className="demo-grid">
          {/* Simple counter */}
          <div className="demo-card">
            <h4>Inferred Type</h4>
            <div className="code-hint">
              <code>useState(0)</code> → <code>number</code>
            </div>
            <div className="counter-display">{count}</div>
            <div className="button-row">
              <button onClick={() => setCount(c => c - 1)}>-</button>
              <button onClick={() => setCount(c => c + 1)}>+</button>
            </div>
            <p className="prev-value">Previous: {prevCountRef.current}</p>
          </div>

          {/* User state */}
          <div className="demo-card">
            <h4>Nullable Type</h4>
            <div className="code-hint">
              <code>useState&lt;User | null&gt;(null)</code>
            </div>
            {user ? (
              <div className="user-display">
                <p><strong>{user.name}</strong></p>
                <p>{user.email}</p>
                <span className={`status-badge ${user.status}`}>{user.status}</span>
              </div>
            ) : (
              <p className="empty-state">No user selected</p>
            )}
            <button onClick={() => setUser({
              id: 1,
              name: "John Doe",
              email: "john@example.com",
              status: "active"
            })}>
              Set User
            </button>
            <button onClick={() => setUser(null)} className="secondary">
              Clear
            </button>
          </div>

          {/* Users array */}
          <div className="demo-card">
            <h4>Array Type</h4>
            <div className="code-hint">
              <code>useState&lt;User[]&gt;([])</code>
            </div>
            <div className="users-list">
              {users.length === 0 ? (
                <p className="empty-state">No users</p>
              ) : (
                users.map(u => (
                  <div key={u.id} className="user-item">{u.name}</div>
                ))
              )}
            </div>
            <button onClick={handleAddUser}>+ Add User</button>
          </div>

          {/* Status state */}
          <div className="demo-card">
            <h4>Union Type</h4>
            <div className="code-hint">
              <code>useState&lt;FetchStatus&gt;("idle")</code>
            </div>
            <div className={`status-display status-${status}`}>
              {status === "idle" && "⏸️ Idle"}
              {status === "loading" && "⏳ Loading..."}
              {status === "success" && "✅ Success"}
              {status === "error" && "❌ Error"}
            </div>
            <button onClick={fetchPosts} disabled={loadingPosts}>
              Fetch Data
            </button>
          </div>
        </div>
      </section>

      {/* useRef Section */}
      <section className="section">
        <h2 className="section-title">
          <span className="hook-badge">useRef</span>
          Refs for DOM & Values
        </h2>
        
        <div className="demo-grid">
          {/* DOM Ref */}
          <div className="demo-card">
            <h4>DOM Element Ref</h4>
            <div className="code-hint">
              <code>useRef&lt;HTMLInputElement&gt;(null)</code>
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Click button to focus"
              className="ref-input"
            />
            <button onClick={handleFocusInput}>Focus Input</button>
          </div>

          {/* Mutable Ref Timer */}
          <div className="demo-card">
            <h4>Mutable Value Ref</h4>
            <div className="code-hint">
              <code>useRef&lt;number | null&gt;(null)</code>
            </div>
            <div className="timer-display">
              ⏱️ {timer.seconds}s
            </div>
            <div className="button-row">
              <button 
                onClick={toggleTimer}
                className={timer.isRunning ? 'danger' : 'primary'}
              >
                {timer.isRunning ? 'Stop' : 'Start'}
              </button>
              <button onClick={resetTimer} className="secondary">Reset</button>
            </div>
          </div>

          {/* Output Ref */}
          <div className="demo-card">
            <h4>Div Element Ref</h4>
            <div className="code-hint">
              <code>useRef&lt;HTMLDivElement&gt;(null)</code>
            </div>
            <div ref={outputRef} className="output-box">
              Click to scroll into view
            </div>
            <button onClick={() => outputRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              Scroll to Box
            </button>
          </div>
        </div>
      </section>

      {/* useReducer Section */}
      <section className="section">
        <h2 className="section-title">
          <span className="hook-badge">useReducer</span>
          Complex State with Actions
        </h2>
        
        <div className="code-hint full-width">
          <code>type Action = &#123; type: "INCREMENT" &#125; | &#123; type: "SET"; payload: number &#125;</code>
        </div>

        <div className="reducer-demo">
          <div className="reducer-state">
            <div className="reducer-count">{counterState.count}</div>
            <p className="last-action">Last: {counterState.lastAction}</p>
          </div>
          
          <div className="reducer-actions">
            <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
            <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
            <button onClick={() => dispatch({ type: "SET", payload: 10 })}>Set 10</button>
            <button onClick={() => dispatch({ type: "MULTIPLY", payload: 2 })}>×2</button>
            <button onClick={() => dispatch({ type: "RESET" })} className="danger">Reset</button>
          </div>

          <div className="history-section">
            <h4>History (from state)</h4>
            <div className="history-items">
              {counterState.history.slice(-8).map((val, i) => (
                <span key={i} className="history-item">{val}</span>
              ))}
            </div>
          </div>

          <div className="sorted-section">
            <h4>Sorted (useMemo)</h4>
            <div className="history-items">
              {sortedHistory.slice(-8).map((val, i) => (
                <span key={i} className="history-item sorted">{val}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* useMemo/useCallback Section */}
      <section className="section">
        <h2 className="section-title">
          <span className="hook-badge">useMemo</span>
          <span className="hook-badge">useCallback</span>
          Memoization
        </h2>
        
        <div className="demo-grid">
          <div className="demo-card">
            <h4>useMemo Result</h4>
            <div className="code-hint">
              <code>useMemo((): number =&gt; ...</code>
            </div>
            <p>Expensive calculation based on count:</p>
            <div className="memo-result">{expensiveCalculation.toLocaleString()}</div>
          </div>

          <div className="demo-card">
            <h4>useCallback</h4>
            <div className="code-hint">
              <code>useCallback((): void =&gt; ...</code>
            </div>
            <p>Memoized functions for performance:</p>
            <button onClick={handleAddUser}>handleAddUser</button>
            <button onClick={handleFocusInput}>handleFocusInput</button>
          </div>
        </div>
      </section>

      {/* useEffect with Data */}
      <section className="section">
        <h2 className="section-title">
          <span className="hook-badge">useEffect</span>
          Async Data Fetching
        </h2>
        
        <div className="code-hint full-width">
          <code>const data: Post[] = await response.json()</code>
        </div>

        <div className="posts-container">
          {loadingPosts ? (
            <div className="loading">Loading posts...</div>
          ) : posts.length === 0 ? (
            <p className="empty-state">No posts loaded. Click "Fetch Data" above!</p>
          ) : (
            posts.map(post => (
              <div key={post.id} className="post-card">
                <h4>{post.title}</h4>
                <p>{post.body.substring(0, 100)}...</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Summary */}
      <footer className="summary">
        <h3>🎯 Hook Typing Patterns</h3>
        <div className="patterns-grid">
          <div className="pattern">
            <code>useState&lt;T&gt;(initial)</code>
            <span>Explicit state type</span>
          </div>
          <div className="pattern">
            <code>useState&lt;T | null&gt;(null)</code>
            <span>Nullable state</span>
          </div>
          <div className="pattern">
            <code>useRef&lt;HTMLElement&gt;(null)</code>
            <span>DOM element ref</span>
          </div>
          <div className="pattern">
            <code>useRef&lt;number&gt;(0)</code>
            <span>Mutable value</span>
          </div>
          <div className="pattern">
            <code>useReducer(reducer, init)</code>
            <span>Types inferred from reducer</span>
          </div>
          <div className="pattern">
            <code>useMemo((): T =&gt; ...)</code>
            <span>Return type annotation</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

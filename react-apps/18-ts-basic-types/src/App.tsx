/**
 * 📚 TypeScript Basic Types Demo
 * From: React with TypeScript - Core Concepts
 * 
 * Demonstrates:
 * - Primitive types (string, number, boolean)
 * - Arrays and objects
 * - Union types and literal types
 * - Type aliases and interfaces
 * - Function types
 */

import { useState } from 'react'
import './App.css'

// ====================================
// TYPE DEFINITIONS
// ====================================

// Type alias for union types
type Status = "idle" | "loading" | "success" | "error"
type Priority = "low" | "medium" | "high"
type ID = string | number  // Union type

// Interface for objects
interface User {
  id: number
  name: string
  email: string
  age?: number        // Optional property
  isAdmin: boolean
}

// Extending interfaces
interface Admin extends User {
  permissions: string[]
  department: string
}

// Interface for an item
interface Item {
  id: ID
  title: string
  price: number
  inStock: boolean
  tags: string[]
}

function App(): JSX.Element {
  // ====================================
  // PRIMITIVE TYPES
  // ====================================
  const [name, setName] = useState<string>("John Doe")
  const [age, setAge] = useState<number>(28)
  const [isActive, setIsActive] = useState<boolean>(true)
  
  // ====================================
  // ARRAYS
  // ====================================
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Node.js"])
  const [scores, setScores] = useState<number[]>([95, 88, 92, 78])
  const [mixed] = useState<(string | number)[]>(["Hello", 42, "World", 100])
  
  // ====================================
  // OBJECTS WITH INTERFACES
  // ====================================
  const [user, setUser] = useState<User>({
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    isAdmin: false
  })
  
  const [admin] = useState<Admin>({
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    isAdmin: true,
    permissions: ["read", "write", "delete"],
    department: "Engineering"
  })
  
  // ====================================
  // UNION & LITERAL TYPES
  // ====================================
  const [status, setStatus] = useState<Status>("idle")
  const [priority, setPriority] = useState<Priority>("medium")
  const [itemId] = useState<ID>(12345)  // Can be string or number
  
  // ====================================
  // ARRAY OF OBJECTS
  // ====================================
  const [items, setItems] = useState<Item[]>([
    { id: 1, title: "Laptop", price: 999, inStock: true, tags: ["electronics", "computers"] },
    { id: 2, title: "Headphones", price: 199, inStock: true, tags: ["electronics", "audio"] },
    { id: "SKU-003", title: "Mouse", price: 49, inStock: false, tags: ["electronics", "accessories"] }
  ])

  // ====================================
  // TYPED FUNCTIONS
  // ====================================
  
  // Function with parameter and return types
  const calculateTotal = (prices: number[]): number => {
    return prices.reduce((sum, price) => sum + price, 0)
  }
  
  // Function that returns void
  const addSkill = (skill: string): void => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill])
    }
  }
  
  // Function with optional parameter
  const greet = (greeting: string, userName?: string): string => {
    return userName ? `${greeting}, ${userName}!` : `${greeting}!`
  }
  
  // Toggle function
  const toggleActive = (): void => {
    setIsActive(!isActive)
  }
  
  // Status change handler
  const handleStatusChange = (newStatus: Status): void => {
    setStatus(newStatus)
  }

  return (
    <div className="app">
      <header className="header">
        <span className="badge">TypeScript</span>
        <h1>📦 TypeScript Basic Types</h1>
        <p>Essential type annotations for React development</p>
      </header>

      {/* PRIMITIVES SECTION */}
      <section className="section">
        <h2 className="section-title">
          <span className="icon">🔤</span> Primitive Types
        </h2>
        <div className="code-hint">
          <code>string</code> <code>number</code> <code>boolean</code>
        </div>
        
        <div className="grid">
          <div className="card">
            <label>Name (string)</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
            <div className="type-badge type-string">string</div>
          </div>
          
          <div className="card">
            <label>Age (number)</label>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="input"
            />
            <div className="type-badge type-number">number</div>
          </div>
          
          <div className="card">
            <label>Active (boolean)</label>
            <button 
              onClick={toggleActive}
              className={`toggle-btn ${isActive ? 'active' : ''}`}
            >
              {isActive ? '✅ Active' : '❌ Inactive'}
            </button>
            <div className="type-badge type-boolean">boolean</div>
          </div>
        </div>
        
        <div className="result-box">
          <strong>Current Values:</strong>
          <p>Name: <span className="value">{name}</span></p>
          <p>Age: <span className="value">{age}</span></p>
          <p>Active: <span className="value">{String(isActive)}</span></p>
        </div>
      </section>

      {/* ARRAYS SECTION */}
      <section className="section">
        <h2 className="section-title">
          <span className="icon">📋</span> Arrays
        </h2>
        <div className="code-hint">
          <code>string[]</code> <code>number[]</code> <code>(string | number)[]</code>
        </div>
        
        <div className="grid">
          <div className="card">
            <label>Skills (string[])</label>
            <div className="tags">
              {skills.map((skill, i) => (
                <span key={i} className="tag tag-string">{skill}</span>
              ))}
            </div>
            <button 
              className="small-btn"
              onClick={() => addSkill("GraphQL")}
            >
              + Add GraphQL
            </button>
          </div>
          
          <div className="card">
            <label>Scores (number[])</label>
            <div className="tags">
              {scores.map((score, i) => (
                <span key={i} className="tag tag-number">{score}</span>
              ))}
            </div>
            <p className="info">Average: {(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)}</p>
          </div>
          
          <div className="card">
            <label>Mixed ((string | number)[])</label>
            <div className="tags">
              {mixed.map((item, i) => (
                <span 
                  key={i} 
                  className={`tag ${typeof item === 'string' ? 'tag-string' : 'tag-number'}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTERFACES SECTION */}
      <section className="section">
        <h2 className="section-title">
          <span className="icon">📐</span> Interfaces & Objects
        </h2>
        <div className="code-hint">
          <code>interface User &#123; ... &#125;</code>
          <code>interface Admin extends User</code>
        </div>
        
        <div className="grid">
          <div className="card card-interface">
            <label>User Interface</label>
            <div className="object-display">
              <p><span className="prop">id:</span> {user.id}</p>
              <p><span className="prop">name:</span> {user.name}</p>
              <p><span className="prop">email:</span> {user.email}</p>
              <p><span className="prop">isAdmin:</span> {String(user.isAdmin)}</p>
              <p><span className="prop">age?:</span> {user.age ?? 'undefined'}</p>
            </div>
            <button 
              className="small-btn"
              onClick={() => setUser({ ...user, age: 25 })}
            >
              Set Age
            </button>
          </div>
          
          <div className="card card-admin">
            <label>Admin (extends User)</label>
            <div className="object-display">
              <p><span className="prop">id:</span> {admin.id}</p>
              <p><span className="prop">name:</span> {admin.name}</p>
              <p><span className="prop">isAdmin:</span> {String(admin.isAdmin)}</p>
              <p><span className="prop">department:</span> {admin.department}</p>
              <p><span className="prop">permissions:</span></p>
              <div className="tags small">
                {admin.permissions.map((p, i) => (
                  <span key={i} className="tag tag-perm">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNION TYPES SECTION */}
      <section className="section">
        <h2 className="section-title">
          <span className="icon">🔀</span> Union & Literal Types
        </h2>
        <div className="code-hint">
          <code>type Status = "idle" | "loading" | "success"</code>
          <code>type ID = string | number</code>
        </div>
        
        <div className="grid">
          <div className="card">
            <label>Status (Literal Union)</label>
            <div className="button-group">
              {(["idle", "loading", "success", "error"] as Status[]).map((s) => (
                <button
                  key={s}
                  className={`status-btn status-${s} ${status === s ? 'selected' : ''}`}
                  onClick={() => handleStatusChange(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="info">Current: <span className={`status-text status-${status}`}>{status}</span></p>
          </div>
          
          <div className="card">
            <label>Priority (Literal Union)</label>
            <div className="button-group">
              {(["low", "medium", "high"] as Priority[]).map((p) => (
                <button
                  key={p}
                  className={`priority-btn priority-${p} ${priority === p ? 'selected' : ''}`}
                  onClick={() => setPriority(p)}
                >
                  {p === 'low' ? '🟢' : p === 'medium' ? '🟡' : '🔴'} {p}
                </button>
              ))}
            </div>
          </div>
          
          <div className="card">
            <label>ID (string | number)</label>
            <p className="info">
              Value: <span className="value">{itemId}</span>
              <br />
              Type: <span className="type-badge type-number">{typeof itemId}</span>
            </p>
          </div>
        </div>
      </section>

      {/* TYPED FUNCTIONS SECTION */}
      <section className="section">
        <h2 className="section-title">
          <span className="icon">⚡</span> Typed Functions
        </h2>
        <div className="code-hint">
          <code>(param: Type): ReturnType =&gt; ...</code>
        </div>
        
        <div className="function-demos">
          <div className="function-card">
            <h4>calculateTotal(prices: number[]): number</h4>
            <p>Input: [{items.map(i => i.price).join(', ')}]</p>
            <p>Result: <span className="value">${calculateTotal(items.map(i => i.price))}</span></p>
          </div>
          
          <div className="function-card">
            <h4>greet(greeting: string, name?: string): string</h4>
            <p>greet("Hello"): <span className="value">"{greet("Hello")}"</span></p>
            <p>greet("Hello", "World"): <span className="value">"{greet("Hello", "World")}"</span></p>
          </div>
        </div>
      </section>

      {/* ARRAY OF OBJECTS SECTION */}
      <section className="section">
        <h2 className="section-title">
          <span className="icon">🗃️</span> Array of Objects
        </h2>
        <div className="code-hint">
          <code>Item[]</code> - Typed array of interface objects
        </div>
        
        <div className="items-list">
          {items.map((item) => (
            <div key={item.id} className={`item-card ${!item.inStock ? 'out-of-stock' : ''}`}>
              <div className="item-header">
                <h4>{item.title}</h4>
                <span className="price">${item.price}</span>
              </div>
              <p className="item-id">ID: {item.id} <span className="type-hint">({typeof item.id})</span></p>
              <div className="item-footer">
                <div className="tags small">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="tag tag-item">{tag}</span>
                  ))}
                </div>
                <span className={`stock-badge ${item.inStock ? 'in' : 'out'}`}>
                  {item.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="add-item-btn"
          onClick={() => setItems([...items, {
            id: `SKU-00${items.length + 1}`,
            title: "Keyboard",
            price: 149,
            inStock: true,
            tags: ["electronics", "accessories"]
          }])}
        >
          + Add Item
        </button>
      </section>

      {/* SUMMARY */}
      <footer className="summary">
        <h3>🎯 TypeScript Types Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="type-badge type-string">Primitives</span>
            <code>string, number, boolean</code>
          </div>
          <div className="summary-item">
            <span className="type-badge type-number">Arrays</span>
            <code>Type[], Array&lt;Type&gt;</code>
          </div>
          <div className="summary-item">
            <span className="type-badge type-interface">Objects</span>
            <code>interface, type</code>
          </div>
          <div className="summary-item">
            <span className="type-badge type-union">Unions</span>
            <code>A | B, "a" | "b"</code>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

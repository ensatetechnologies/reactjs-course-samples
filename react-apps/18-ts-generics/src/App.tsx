/**
 * 📚 TypeScript Generics Demo
 * From: React with TypeScript - Core Concepts
 * 
 * Demonstrates:
 * - Generic components that work with any type
 * - Generic custom hooks (useFetch, useLocalStorage, useArray)
 * - Type inference with generics
 * - Constrained generics (extends keyword)
 */

import { useState } from 'react'
import './App.css'
import { List, Select, Card, Table, Tabs } from './components'
import { useFetch, useLocalStorage, useArray, useSelection, useToggle } from './hooks'

// ====================================
// TYPE DEFINITIONS
// ====================================

interface User {
  id: number
  name: string
  email: string
  company: { name: string }
}

interface Product {
  id: number
  name: string
  price: number
  category: string
}

interface Todo {
  id: number
  title: string
  completed: boolean
}

// ====================================
// MAIN COMPONENT
// ====================================

function App(): JSX.Element {
  // Generic hook demos
  const { data: users, loading: usersLoading, error: usersError, refetch: refetchUsers } = 
    useFetch<User[]>('https://jsonplaceholder.typicode.com/users')

  const { data: todos, loading: todosLoading } = 
    useFetch<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')

  // useLocalStorage hook
  const [savedName, setSavedName] = useLocalStorage<string>('user-name', '')
  const [savedTheme, setSavedTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark')

  // useArray hook
  const products = useArray<Product>([
    { id: 1, name: "MacBook Pro", price: 2499, category: "Laptops" },
    { id: 2, name: "AirPods Pro", price: 249, category: "Audio" },
    { id: 3, name: "iPad Air", price: 599, category: "Tablets" },
  ])

  // useSelection hook
  const userSelection = useSelection<User>()
  const productSelection = useSelection<Product>()

  // useToggle hook
  const [showCode, toggleCode] = useToggle(false)

  // Tab state for generic tabs demo
  const [activeTab, setActiveTab] = useState<'list' | 'select' | 'table'>('list')

  // Product form state
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '' })

  // ====================================
  // HANDLERS
  // ====================================

  const handleAddProduct = (): void => {
    if (newProduct.name && newProduct.price) {
      products.push({
        id: Date.now(),
        name: newProduct.name,
        price: Number(newProduct.price),
        category: newProduct.category || 'General'
      })
      setNewProduct({ name: '', price: '', category: '' })
    }
  }

  return (
    <div className={`app theme-${savedTheme}`}>
      <header className="header">
        <span className="badge generic">Generics</span>
        <h1>🔧 TypeScript Generics</h1>
        <p>Reusable type-safe components and hooks</p>
      </header>

      {/* useFetch Demo */}
      <section className="section">
        <h2 className="section-title">
          <span className="generic-badge">useFetch&lt;T&gt;</span>
          Generic Data Fetching
        </h2>
        
        <div className="code-block">
          <code>const &#123; data, loading, error &#125; = useFetch&lt;User[]&gt;(url)</code>
        </div>

        <div className="fetch-demo">
          {usersLoading ? (
            <div className="loading">Loading users...</div>
          ) : usersError ? (
            <div className="error">Error: {usersError}</div>
          ) : (
            <div className="users-grid">
              {users?.slice(0, 4).map(user => (
                <div 
                  key={user.id} 
                  className={`user-card ${userSelection.isSelected(user, (a, b) => a.id === b.id) ? 'selected' : ''}`}
                  onClick={() => userSelection.select(user)}
                >
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                  <span className="company">{user.company.name}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="actions-row">
            <button onClick={refetchUsers} className="btn">🔄 Refetch</button>
            <button onClick={userSelection.deselect} className="btn secondary" disabled={!userSelection.selected}>
              Clear Selection
            </button>
          </div>
          
          {userSelection.selected && (
            <div className="selection-info">
              Selected: <strong>{userSelection.selected.name}</strong>
            </div>
          )}
        </div>
      </section>

      {/* useLocalStorage Demo */}
      <section className="section">
        <h2 className="section-title">
          <span className="generic-badge">useLocalStorage&lt;T&gt;</span>
          Typed Persistent State
        </h2>
        
        <div className="code-block">
          <code>const [value, setValue] = useLocalStorage&lt;string&gt;('key', 'default')</code>
        </div>

        <div className="storage-demo">
          <div className="storage-item">
            <label>Your Name (saved to localStorage):</label>
            <input
              type="text"
              value={savedName}
              onChange={(e) => setSavedName(e.target.value)}
              placeholder="Enter your name"
              className="input"
            />
          </div>
          
          <div className="storage-item">
            <label>Theme Preference:</label>
            <div className="theme-toggle">
              <button 
                className={`theme-btn ${savedTheme === 'light' ? 'active' : ''}`}
                onClick={() => setSavedTheme('light')}
              >
                ☀️ Light
              </button>
              <button 
                className={`theme-btn ${savedTheme === 'dark' ? 'active' : ''}`}
                onClick={() => setSavedTheme('dark')}
              >
                🌙 Dark
              </button>
            </div>
          </div>
          
          <p className="storage-hint">
            💡 Refresh the page - your values persist!
          </p>
        </div>
      </section>

      {/* useArray Demo */}
      <section className="section">
        <h2 className="section-title">
          <span className="generic-badge">useArray&lt;T&gt;</span>
          Array Management Hook
        </h2>
        
        <div className="code-block">
          <code>const &#123; array, push, remove, update, clear &#125; = useArray&lt;Product&gt;([])</code>
        </div>

        <div className="array-demo">
          <div className="add-product-form">
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="Product name"
              className="input"
            />
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="Price"
              className="input"
            />
            <button onClick={handleAddProduct} className="btn">+ Add</button>
            <button onClick={products.clear} className="btn danger">Clear All</button>
          </div>

          <div className="products-list">
            {products.array.map((product, index) => (
              <div 
                key={product.id} 
                className={`product-item ${productSelection.isSelected(product, (a, b) => a.id === b.id) ? 'selected' : ''}`}
                onClick={() => productSelection.select(product)}
              >
                <span className="product-name">{product.name}</span>
                <span className="product-price">${product.price}</span>
                <span className="product-category">{product.category}</span>
                <button 
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    products.remove(index)
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <p className="array-count">Total: {products.array.length} products</p>
        </div>
      </section>

      {/* Generic Components Demo */}
      <section className="section">
        <h2 className="section-title">
          <span className="generic-badge">Components&lt;T&gt;</span>
          Generic UI Components
        </h2>

        <button onClick={toggleCode} className="btn secondary" style={{ marginBottom: '1rem' }}>
          {showCode ? 'Hide' : 'Show'} Type Signatures
        </button>

        {showCode && (
          <div className="code-block multi">
            <code>function List&lt;T&gt;(props: ListProps&lt;T&gt;)</code>
            <code>function Select&lt;T extends Identifiable&gt;(props: SelectProps&lt;T&gt;)</code>
            <code>function Table&lt;T extends Identifiable&gt;(props: TableProps&lt;T&gt;)</code>
          </div>
        )}

        {/* Generic Tabs */}
        <Tabs<'list' | 'select' | 'table'>
          tabs={[
            { 
              id: 'list', 
              label: '📋 List<T>', 
              content: (
                <div className="tab-demo">
                  <h4>List&lt;Todo&gt;</h4>
                  {todosLoading ? (
                    <p>Loading todos...</p>
                  ) : (
                    <List<Todo>
                      items={todos || []}
                      keyExtractor={(todo) => todo.id}
                      renderItem={(todo) => (
                        <div className="todo-item">
                          <span className={todo.completed ? 'completed' : ''}>
                            {todo.completed ? '✅' : '⬜'} {todo.title}
                          </span>
                        </div>
                      )}
                      emptyMessage="No todos found"
                    />
                  )}
                </div>
              )
            },
            { 
              id: 'select', 
              label: '🔽 Select<T>', 
              content: (
                <div className="tab-demo">
                  <h4>Select&lt;Product&gt;</h4>
                  <Select<Product>
                    items={products.array}
                    value={productSelection.selected}
                    onChange={(p) => productSelection.select(p)}
                    getLabel={(p) => `${p.name} - $${p.price}`}
                    placeholder="Choose a product"
                  />
                  {productSelection.selected && (
                    <div className="selection-detail">
                      <p><strong>Selected:</strong> {productSelection.selected.name}</p>
                      <p><strong>Price:</strong> ${productSelection.selected.price}</p>
                      <p><strong>Category:</strong> {productSelection.selected.category}</p>
                    </div>
                  )}
                </div>
              )
            },
            { 
              id: 'table', 
              label: '📊 Table<T>', 
              content: (
                <div className="tab-demo">
                  <h4>Table&lt;Product&gt;</h4>
                  <Table<Product>
                    data={products.array}
                    columns={[
                      { key: 'name', header: 'Name', render: (p) => p.name },
                      { key: 'price', header: 'Price', render: (p) => `$${p.price}`, width: '100px' },
                      { key: 'category', header: 'Category', render: (p) => p.category },
                    ]}
                    onRowClick={(p) => productSelection.select(p)}
                    selectedId={productSelection.selected?.id}
                  />
                </div>
              )
            },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </section>

      {/* Summary */}
      <footer className="summary">
        <h3>🎯 Generic Patterns</h3>
        <div className="patterns-grid">
          <div className="pattern">
            <code>function Component&lt;T&gt;(props: Props&lt;T&gt;)</code>
            <span>Generic component</span>
          </div>
          <div className="pattern">
            <code>function useHook&lt;T&gt;(): Result&lt;T&gt;</code>
            <span>Generic hook</span>
          </div>
          <div className="pattern">
            <code>&lt;T extends Base&gt;</code>
            <span>Constrained generic</span>
          </div>
          <div className="pattern">
            <code>useFetch&lt;User[]&gt;(url)</code>
            <span>Type inference</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

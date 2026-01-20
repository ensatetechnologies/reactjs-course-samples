/**
 * 📚 Todo List - React Version
 * From: Chapter 2 - HTML & JavaScript to React
 * 
 * Key Learning:
 * - useState for state management
 * - Automatic UI updates when state changes
 * - Declarative rendering with .map()
 * - NO manual DOM manipulation!
 * 
 * Compare this ~60 lines with vanilla JS's ~150 lines!
 */

import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')

  // Add todo - just update state, React handles the DOM!
  const addTodo = () => {
    if (!input.trim()) return
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false }
    ])
    setInput('')
  }

  // Toggle todo - immutable update pattern
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Delete todo - filter creates new array
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Clear completed
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  // Filter todos for display
  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  // Stats - computed from state
  const completedCount = todos.filter(t => t.completed).length
  const pendingCount = todos.length - completedCount

  return (
    <div className="app">
      <header>
        <h1>⚛️ React Todo List</h1>
        <p>Clean, declarative, automatic UI updates</p>
        <div className="success-banner">
          ✅ ~60 lines vs ~150 in vanilla JS - and much cleaner!
        </div>
      </header>

      <main>
        <div className="todo-card">
          {/* Input Section */}
          <div className="input-section">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done?"
            />
            <button className="btn-primary" onClick={addTodo}>
              Add Task
            </button>
          </div>

          {/* Stats - automatically computed! */}
          <div className="stats-section">
            <span>Total: <strong>{todos.length}</strong></span>
            <span>Completed: <strong>{completedCount}</strong></span>
            <span>Pending: <strong>{pendingCount}</strong></span>
          </div>

          {/* Filter buttons */}
          <div className="filter-section">
            {['all', 'pending', 'completed'].map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
            <button className="btn-danger" onClick={clearCompleted}>
              Clear Completed
            </button>
          </div>

          {/* Todo list - declarative rendering with .map() */}
          <ul className="todo-list">
            {filteredTodos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div
                  className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
                  onClick={() => toggleTodo(todo.id)}
                />
                <span className="todo-text">{todo.text}</span>
                <button
                  className="todo-delete"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {/* Empty state */}
          {todos.length === 0 && (
            <div className="empty-state">
              <p>🎉 No todos yet! Add one above.</p>
            </div>
          )}
        </div>

        {/* Code comparison */}
        <div className="code-comparison">
          <h3>✨ Why React is Better</h3>
          <div className="comparison-grid">
            <div className="comparison-item success">
              <strong>Declarative Rendering</strong>
              <p>Just describe what to show: <code>{`{todos.map(...)}`}</code></p>
            </div>
            <div className="comparison-item success">
              <strong>Automatic Updates</strong>
              <p><code>setTodos()</code> triggers re-render automatically</p>
            </div>
            <div className="comparison-item success">
              <strong>No DOM Manipulation</strong>
              <p>No createElement, appendChild, or remove()</p>
            </div>
            <div className="comparison-item success">
              <strong>Less Code</strong>
              <p>~60 lines vs ~150 lines in vanilla JS</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

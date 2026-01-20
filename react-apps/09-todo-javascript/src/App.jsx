/**
 * 📚 Todo App - JavaScript Version
 * From: Chapter 5 - JavaScript vs TypeScript in React
 * 
 * NO TYPE ANNOTATIONS - Compare with TypeScript version!
 * 
 * Notice:
 * - No interface definitions
 * - No type annotations on useState
 * - No parameter types on functions
 * - No return types specified
 */

import { useState } from 'react'
import './App.css'

// No interface definition - object shape is implicit
// In TypeScript, we would define: interface Todo { id: number; text: string; completed: boolean }

function App() {
  // No type annotation on useState
  // TypeScript would be: useState<Todo[]>([])
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn JavaScript', completed: true },
    { id: 2, text: 'Learn React', completed: false },
    { id: 3, text: 'Compare with TypeScript', completed: false }
  ])
  
  // No type on input state
  // TypeScript would be: useState<string>('')
  const [input, setInput] = useState('')
  
  // No error state type
  const [error, setError] = useState('')

  // No parameter or return types
  // TypeScript would be: const addTodo = (): void => { ... }
  const addTodo = () => {
    if (!input.trim()) {
      setError('Please enter a task')
      return
    }
    
    // No type checking on the new todo object
    // Could accidentally add wrong properties!
    setTodos([...todos, {
      id: Date.now(),
      text: input,
      completed: false
    }])
    
    setInput('')
    setError('')
  }

  // No type on id parameter
  // TypeScript would be: (id: number): void
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ))
  }

  // No type on id parameter
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // No type checking - could do todos.filter(t => t.complted) and get undefined!
  const completedCount = todos.filter(t => t.completed).length
  const pendingCount = todos.length - completedCount

  // No event type annotation
  // TypeScript: (e: React.KeyboardEvent<HTMLInputElement>)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="app">
      <header className="header">
        <span className="badge">JavaScript</span>
        <h1>📝 Todo App (JS)</h1>
        <p>No type annotations - runtime errors possible</p>
      </header>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button onClick={addTodo} className="add-btn">
          Add
        </button>
      </div>
      
      {error && <p className="error">{error}</p>}

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span 
              className="todo-text"
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.completed ? '✅' : '⬜'} {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              className="delete-btn"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="empty-message">🎉 No todos! Add one above.</p>
      )}

      <div className="stats">
        <div className="stat">
          <div className="stat-value">{todos.length}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat">
          <div className="stat-value">{completedCount}</div>
          <div className="stat-label">Done</div>
        </div>
        <div className="stat">
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-label">Pending</div>
        </div>
      </div>

      <div className="warning-box">
        <strong>⚠️ JavaScript Limitations:</strong>
        <ul>
          <li>No compile-time type checking</li>
          <li>Typos in property names go unnoticed</li>
          <li>Wrong types passed to functions</li>
          <li>No autocomplete for object properties</li>
        </ul>
      </div>
    </div>
  )
}

export default App

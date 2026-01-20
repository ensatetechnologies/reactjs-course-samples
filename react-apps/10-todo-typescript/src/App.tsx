/**
 * 📚 Todo App - TypeScript Version
 * From: Chapter 5 - JavaScript vs TypeScript in React
 * 
 * FULL TYPE ANNOTATIONS - Compare with JavaScript version!
 * 
 * Notice:
 * - Interface definition for Todo
 * - Type annotations on useState
 * - Parameter types on functions
 * - Return types specified
 * - Event type annotations
 */

import { useState } from 'react'
import './App.css'

// ✅ Interface defines the shape of a Todo object
// This is enforced at compile time - typos are caught immediately!
interface Todo {
  id: number
  text: string
  completed: boolean
}

function App(): JSX.Element {
  // ✅ Typed useState - only Todo[] arrays allowed
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn TypeScript', completed: true },
    { id: 2, text: 'Learn React with TS', completed: false },
    { id: 3, text: 'Compare with JavaScript', completed: false }
  ])
  
  // ✅ Typed string state
  const [input, setInput] = useState<string>('')
  
  // ✅ Typed error state
  const [error, setError] = useState<string>('')

  // ✅ Return type specified as void
  const addTodo = (): void => {
    if (!input.trim()) {
      setError('Please enter a task')
      return
    }
    
    // ✅ TypeScript ensures the new object matches Todo interface
    // Try adding { id: Date.now(), text: input } - you'll get an error!
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false
    }
    
    setTodos([...todos, newTodo])
    setInput('')
    setError('')
  }

  // ✅ Parameter type specified - id must be a number
  const toggleTodo = (id: number): void => {
    setTodos(todos.map((todo: Todo) =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ))
  }

  // ✅ Parameter type specified
  const deleteTodo = (id: number): void => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id))
  }

  // ✅ TypeScript knows todos is Todo[], so t.completed is valid
  // If you tried t.complted (typo), you'd get an error!
  const completedCount: number = todos.filter((t: Todo) => t.completed).length
  const pendingCount: number = todos.length - completedCount

  // ✅ Event type annotation - full autocomplete on 'e'
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  // ✅ Input change handler with proper event type
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
  }

  return (
    <div className="app">
      <header className="header">
        <span className="badge">TypeScript</span>
        <h1>📝 Todo App (TS)</h1>
        <p>Full type safety - errors caught at compile time</p>
      </header>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
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
        {todos.map((todo: Todo) => (
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

      <div className="success-box">
        <strong>✅ TypeScript Benefits:</strong>
        <ul>
          <li>Compile-time type checking</li>
          <li>Typos caught immediately</li>
          <li>Full IDE autocomplete</li>
          <li>Self-documenting code</li>
        </ul>
      </div>
    </div>
  )
}

export default App

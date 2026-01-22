import { useState, useReducer, useCallback, useMemo } from 'react'
import './App.css'

// =============================================================================
// PATTERN 1: Action Types with as const
// =============================================================================

const ActionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  TOGGLE_ITEM: 'TOGGLE_ITEM',
  CLEAR_ALL: 'CLEAR_ALL',
} as const

type ActionType = typeof ActionTypes[keyof typeof ActionTypes]

// =============================================================================
// PATTERN 2: Status/Enum-like values with as const
// =============================================================================

const PRIORITY_LEVELS = ['low', 'medium', 'high', 'critical'] as const
type Priority = typeof PRIORITY_LEVELS[number]

const STATUS_OPTIONS = ['pending', 'in-progress', 'completed', 'cancelled'] as const
type Status = typeof STATUS_OPTIONS[number]

// =============================================================================
// PATTERN 3: Configuration objects with as const
// =============================================================================

const APP_CONFIG = {
  maxItems: 100,
  defaultPriority: 'medium',
  colors: {
    low: '#22c55e',
    medium: '#eab308',
    high: '#f97316',
    critical: '#ef4444',
  },
} as const

// =============================================================================
// TYPES
// =============================================================================

interface TodoItem {
  readonly id: number
  text: string
  completed: boolean
  priority: Priority
  status: Status
}

type TodoAction =
  | { type: typeof ActionTypes.ADD_ITEM; payload: Omit<TodoItem, 'id'> }
  | { type: typeof ActionTypes.REMOVE_ITEM; payload: number }
  | { type: typeof ActionTypes.TOGGLE_ITEM; payload: number }
  | { type: typeof ActionTypes.CLEAR_ALL }

// =============================================================================
// REDUCER
// =============================================================================

function todoReducer(state: readonly TodoItem[], action: TodoAction): TodoItem[] {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      return [...state, { ...action.payload, id: Date.now() }]
    case ActionTypes.REMOVE_ITEM:
      return state.filter(item => item.id !== action.payload)
    case ActionTypes.TOGGLE_ITEM:
      return state.map(item =>
        item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item
      )
    case ActionTypes.CLEAR_ALL:
      return []
    default:
      return [...state]
  }
}

// =============================================================================
// COMPONENTS
// =============================================================================

interface TodoItemProps {
  readonly item: Readonly<TodoItem>
  readonly onToggle: (id: number) => void
  readonly onRemove: (id: number) => void
}

function TodoItemComponent({ item, onToggle, onRemove }: TodoItemProps) {
  const priorityColor = APP_CONFIG.colors[item.priority]
  
  return (
    <div className={`todo-item ${item.completed ? 'completed' : ''}`}>
      <div 
        className="priority-indicator" 
        style={{ backgroundColor: priorityColor }}
        title={`Priority: ${item.priority}`}
      />
      <div className="todo-content">
        <span className="todo-text">{item.text}</span>
        <div className="todo-meta">
          <span className="priority-badge" style={{ color: priorityColor }}>
            {item.priority}
          </span>
          <span className="status-badge">{item.status}</span>
        </div>
      </div>
      <div className="todo-actions">
        <button 
          className="btn-icon" 
          onClick={() => onToggle(item.id)}
          title={item.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {item.completed ? '↩️' : '✅'}
        </button>
        <button 
          className="btn-icon btn-danger" 
          onClick={() => onRemove(item.id)}
          title="Remove"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

interface AddTodoFormProps {
  readonly onAdd: (item: Omit<TodoItem, 'id'>) => void
}

function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [status, setStatus] = useState<Status>('pending')

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    
    onAdd({ text: text.trim(), completed: false, priority, status })
    setText('')
  }, [text, priority, status, onAdd])

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new task..."
        className="text-input"
      />
      <select 
        value={priority} 
        onChange={e => setPriority(e.target.value as Priority)}
        className="select-input"
      >
        {PRIORITY_LEVELS.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <select 
        value={status} 
        onChange={e => setStatus(e.target.value as Status)}
        className="select-input"
      >
        {STATUS_OPTIONS.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button type="submit" className="btn btn-primary">Add</button>
    </form>
  )
}

// =============================================================================
// MAIN APP
// =============================================================================

const initialTodos: TodoItem[] = [
  { id: 1, text: 'Learn TypeScript const patterns', completed: false, priority: 'high', status: 'in-progress' },
  { id: 2, text: 'Understand as const assertion', completed: true, priority: 'medium', status: 'completed' },
  { id: 3, text: 'Practice readonly types', completed: false, priority: 'critical', status: 'pending' },
]

function App() {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos)

  // Handlers using const (standard pattern)
  const handleAdd = useCallback((item: Omit<TodoItem, 'id'>) => {
    dispatch({ type: ActionTypes.ADD_ITEM, payload: item })
  }, [])

  const handleToggle = useCallback((id: number) => {
    dispatch({ type: ActionTypes.TOGGLE_ITEM, payload: id })
  }, [])

  const handleRemove = useCallback((id: number) => {
    dispatch({ type: ActionTypes.REMOVE_ITEM, payload: id })
  }, [])

  const handleClearAll = useCallback(() => {
    dispatch({ type: ActionTypes.CLEAR_ALL })
  }, [])

  // Derived values using const + useMemo
  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter(t => t.completed).length
    const pending = total - completed
    const byPriority = PRIORITY_LEVELS.reduce((acc, p) => {
      acc[p] = todos.filter(t => t.priority === p).length
      return acc
    }, {} as Record<Priority, number>)
    return { total, completed, pending, byPriority }
  }, [todos])

  return (
    <div className="app">
      <header className="header">
        <h1>⚛️ const Patterns in React + TypeScript</h1>
        <p>Demonstrating type-safe patterns with as const, readonly, and literal types</p>
      </header>

      <div className="content">
        <div className="patterns-showcase">
          <h2>📋 Patterns Used</h2>
          <div className="pattern-cards">
            <div className="pattern-card">
              <h3>Action Types</h3>
              <code>{`const ActionTypes = { ... } as const`}</code>
              <p>Type-safe action creators</p>
            </div>
            <div className="pattern-card">
              <h3>Enum-like Arrays</h3>
              <code>{`const PRIORITIES = [...] as const`}</code>
              <p>Union types from arrays</p>
            </div>
            <div className="pattern-card">
              <h3>Config Objects</h3>
              <code>{`const CONFIG = { ... } as const`}</code>
              <p>Immutable configuration</p>
            </div>
            <div className="pattern-card">
              <h3>Readonly Props</h3>
              <code>{`readonly item: Readonly<T>`}</code>
              <p>Immutable component props</p>
            </div>
          </div>
        </div>

        <div className="main-section">
          <div className="todo-section">
            <h2>📝 Task Manager</h2>
            <AddTodoForm onAdd={handleAdd} />
            
            <div className="todo-list">
              {todos.length === 0 ? (
                <div className="empty-state">No tasks yet. Add one above!</div>
              ) : (
                todos.map(todo => (
                  <TodoItemComponent
                    key={todo.id}
                    item={todo}
                    onToggle={handleToggle}
                    onRemove={handleRemove}
                  />
                ))
              )}
            </div>

            {todos.length > 0 && (
              <button className="btn btn-danger btn-clear" onClick={handleClearAll}>
                🗑️ Clear All
              </button>
            )}
          </div>

          <div className="stats-section">
            <h2>📊 Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Total</span>
              </div>
              <div className="stat-card completed">
                <span className="stat-value">{stats.completed}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-card pending">
                <span className="stat-value">{stats.pending}</span>
                <span className="stat-label">Pending</span>
              </div>
            </div>

            <h3>By Priority</h3>
            <div className="priority-stats">
              {PRIORITY_LEVELS.map(p => (
                <div key={p} className="priority-stat">
                  <span 
                    className="priority-dot" 
                    style={{ backgroundColor: APP_CONFIG.colors[p] }}
                  />
                  <span className="priority-name">{p}</span>
                  <span className="priority-count">{stats.byPriority[p]}</span>
                </div>
              ))}
            </div>

            <div className="config-display">
              <h3>⚙️ Config (as const)</h3>
              <pre>{JSON.stringify(APP_CONFIG, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

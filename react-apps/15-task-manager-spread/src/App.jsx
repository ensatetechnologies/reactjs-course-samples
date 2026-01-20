import { useState } from 'react'
import './App.css'

/**
 * Task Manager App - Demonstrating Spread Operator in React
 * 
 * This app showcases all common spread patterns for React state management:
 * - ADD: [...tasks, newTask]
 * - REMOVE: tasks.filter(t => t.id !== id)
 * - UPDATE: tasks.map(t => t.id === id ? {...t, prop: value} : t)
 * - Object state: {...user, property: newValue}
 * - Nested objects: {...obj, nested: {...obj.nested, prop: value}}
 */

function App() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  
  // Array state for tasks
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn Spread Operator', completed: true, priority: 'high' },
    { id: 2, text: 'Practice React State', completed: false, priority: 'medium' },
    { id: 3, text: 'Build Projects', completed: false, priority: 'low' }
  ])
  
  // Input state
  const [inputValue, setInputValue] = useState('')
  const [priority, setPriority] = useState('medium')
  
  // Filter state
  const [filter, setFilter] = useState('all')
  
  // User settings state (object)
  const [settings, setSettings] = useState({
    theme: 'dark',
    showCompleted: true,
    notifications: {
      email: true,
      push: false
    }
  })
  
  // Edit mode state
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  // ==========================================
  // SPREAD PATTERNS FOR ARRAY STATE
  // ==========================================

  /**
   * ➕ ADD TASK - Pattern: [...tasks, newTask]
   * Creates new array with all existing tasks + new task at end
   */
  const addTask = () => {
    if (!inputValue.trim()) return
    
    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      priority: priority,
      createdAt: new Date().toLocaleTimeString()
    }
    
    // ✨ SPREAD: Add to array
    setTasks([...tasks, newTask])
    setInputValue('')
  }

  /**
   * 🗑️ DELETE TASK - Pattern: tasks.filter(t => t.id !== id)
   * Filter creates a new array without the deleted task
   */
  const deleteTask = (id) => {
    // Filter creates new array (immutable)
    setTasks(tasks.filter(task => task.id !== id))
  }

  /**
   * ✅ TOGGLE COMPLETE - Pattern: tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t)
   * Map creates new array, spread creates new object for updated item
   */
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed } // ✨ SPREAD object
        : task
    ))
  }

  /**
   * ✏️ UPDATE TASK TEXT - Pattern: tasks.map(t => t.id === id ? {...t, text: newText} : t)
   */
  const saveEdit = (id) => {
    if (!editText.trim()) {
      setEditingId(null)
      return
    }
    
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, text: editText.trim() } // ✨ SPREAD + override
        : task
    ))
    setEditingId(null)
    setEditText('')
  }

  /**
   * 🔄 UPDATE PRIORITY - Pattern: {...task, priority: newPriority}
   */
  const updatePriority = (id, newPriority) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, priority: newPriority }
        : task
    ))
  }

  /**
   * 🧹 CLEAR COMPLETED - Filter to keep only incomplete tasks
   */
  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed))
  }

  /**
   * 📋 DUPLICATE TASK - Pattern: [...tasks, {...task, id: newId}]
   */
  const duplicateTask = (task) => {
    const duplicated = {
      ...task,                    // ✨ SPREAD: Copy all properties
      id: Date.now(),            // Override id
      text: `${task.text} (copy)`,
      completed: false,
      createdAt: new Date().toLocaleTimeString()
    }
    setTasks([...tasks, duplicated])
  }

  // ==========================================
  // SPREAD PATTERNS FOR OBJECT STATE
  // ==========================================

  /**
   * 🎨 UPDATE SIMPLE SETTING - Pattern: {...settings, prop: value}
   */
  const toggleTheme = () => {
    setSettings({
      ...settings,
      theme: settings.theme === 'dark' ? 'light' : 'dark'
    })
  }

  /**
   * 👁️ TOGGLE SHOW COMPLETED - Pattern: {...settings, showCompleted: !settings.showCompleted}
   */
  const toggleShowCompleted = () => {
    setSettings({
      ...settings,
      showCompleted: !settings.showCompleted
    })
  }

  /**
   * 🔔 UPDATE NESTED SETTING - Pattern: {...obj, nested: {...obj.nested, prop: value}}
   * For nested objects, must spread at each level!
   */
  const toggleNotification = (type) => {
    setSettings({
      ...settings,                           // Spread top level
      notifications: {
        ...settings.notifications,           // ✨ SPREAD nested object
        [type]: !settings.notifications[type] // Update specific property
      }
    })
  }

  // ==========================================
  // COMPUTED/DERIVED VALUES
  // ==========================================

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true // 'all'
  }).filter(task => {
    // Also filter based on showCompleted setting
    if (!settings.showCompleted && task.completed) return false
    return true
  })

  // Statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority === 'high' && !t.completed).length
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className={`app ${settings.theme}`}>
      <header className="header">
        <div className="header-content">
          <h1>📝 Task Manager</h1>
          <p className="subtitle">Spread Operator Demo in React</p>
        </div>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={`Switch to ${settings.theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {settings.theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="main">
        {/* Code Pattern Display */}
        <section className="pattern-section">
          <h2>🔧 Spread Patterns Used</h2>
          <div className="patterns-grid">
            <div className="pattern-card">
              <div className="pattern-title">➕ Add</div>
              <code>[...tasks, newTask]</code>
            </div>
            <div className="pattern-card">
              <div className="pattern-title">🗑️ Remove</div>
              <code>filter(t =&gt; t.id !== id)</code>
            </div>
            <div className="pattern-card">
              <div className="pattern-title">✏️ Update</div>
              <code>map(t =&gt; ...t, prop: val)</code>
            </div>
            <div className="pattern-card">
              <div className="pattern-title">🔧 Object</div>
              <code>...obj, key: newValue</code>
            </div>
          </div>
        </section>

        {/* Add Task Section */}
        <section className="add-section">
          <h2>Add New Task</h2>
          <div className="add-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="What needs to be done?"
              className="task-input"
            />
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            <button onClick={addTask} className="btn btn-primary">
              Add Task
            </button>
          </div>
          <div className="code-hint">
            <code>setTasks([<span className="spread">...</span>tasks, newTask])</code>
          </div>
        </section>

        {/* Filter Section */}
        <section className="filter-section">
          <div className="filter-buttons">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className="count">
                  {f === 'all' ? stats.total : f === 'active' ? stats.active : stats.completed}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Task List */}
        <section className="tasks-section">
          <ul className="task-list">
            {filteredTasks.length === 0 ? (
              <li className="empty-state">
                {filter === 'completed' ? '✨ No completed tasks yet!' : 
                 filter === 'active' ? '🎉 All tasks completed!' : 
                 '📭 No tasks yet. Add one above!'}
              </li>
            ) : (
              filteredTasks.map(task => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
                  <div className="task-checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      className="task-checkbox"
                    />
                  </div>
                  
                  <div className="task-content">
                    {editingId === task.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit(task.id)}
                        onBlur={() => saveEdit(task.id)}
                        className="edit-input"
                        autoFocus
                      />
                    ) : (
                      <>
                        <span className="task-text">{task.text}</span>
                        <div className="task-meta">
                          <span className={`priority-badge ${task.priority}`}>
                            {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'} {task.priority}
                          </span>
                          {task.createdAt && <span className="created-at">{task.createdAt}</span>}
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="task-actions">
                    <select
                      value={task.priority}
                      onChange={(e) => updatePriority(task.id, e.target.value)}
                      className="priority-mini-select"
                      title="Change priority"
                    >
                      <option value="low">🟢</option>
                      <option value="medium">🟡</option>
                      <option value="high">🔴</option>
                    </select>
                    <button 
                      onClick={() => {
                        setEditingId(task.id)
                        setEditText(task.text)
                      }}
                      className="btn-icon"
                      title="Edit task"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => duplicateTask(task)}
                      className="btn-icon"
                      title="Duplicate task"
                    >
                      📋
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="btn-icon btn-delete"
                      title="Delete task"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>

        {/* Statistics */}
        <section className="stats-section">
          <h2>Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-card completed">
              <div className="stat-value">{stats.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card active">
              <div className="stat-value">{stats.active}</div>
              <div className="stat-label">Active</div>
            </div>
            <div className="stat-card high">
              <div className="stat-value">{stats.high}</div>
              <div className="stat-label">High Priority</div>
            </div>
          </div>
          
          {stats.completed > 0 && (
            <button onClick={clearCompleted} className="btn btn-secondary clear-btn">
              🧹 Clear Completed ({stats.completed})
            </button>
          )}
        </section>

        {/* Settings (Object State Demo) */}
        <section className="settings-section">
          <h2>⚙️ Settings (Object State Demo)</h2>
          <div className="settings-grid">
            <div className="setting-item">
              <span>Show Completed Tasks</span>
              <button 
                className={`toggle-btn ${settings.showCompleted ? 'active' : ''}`}
                onClick={toggleShowCompleted}
              >
                {settings.showCompleted ? '✅ On' : '❌ Off'}
              </button>
            </div>
            <div className="setting-item">
              <span>Email Notifications</span>
              <button 
                className={`toggle-btn ${settings.notifications.email ? 'active' : ''}`}
                onClick={() => toggleNotification('email')}
              >
                {settings.notifications.email ? '✅ On' : '❌ Off'}
              </button>
            </div>
            <div className="setting-item">
              <span>Push Notifications</span>
              <button 
                className={`toggle-btn ${settings.notifications.push ? 'active' : ''}`}
                onClick={() => toggleNotification('push')}
              >
                {settings.notifications.push ? '✅ On' : '❌ Off'}
              </button>
            </div>
          </div>
          <div className="code-hint nested">
            <strong>Nested object update:</strong>
            <code>
              {`{ ...settings, notifications: { ...settings.notifications, email: !email } }`}
            </code>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Part of <strong>ReactJS Course Sample Apps</strong></p>
        <p className="muted">Chapter: Spread Operator - React State Management</p>
      </footer>
    </div>
  )
}

export default App

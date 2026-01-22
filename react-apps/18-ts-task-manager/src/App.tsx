/**
 * 📚 TypeScript Task Manager
 * From: React with TypeScript - Core Concepts
 * 
 * A complete type-safe Task Manager app demonstrating:
 * - Typed state with useState
 * - Typed props with interfaces
 * - Typed event handlers
 * - Typed callbacks
 * - useMemo and useCallback with types
 * - Discriminated unions for filtering
 */

import { useState, useMemo, useCallback } from 'react'
import './App.css'
import { Task, Priority, FilterType, SortOption } from './types'
import { TaskList, AddTaskForm, FilterBar, Stats } from './components'

function App(): JSX.Element {
  // ====================================
  // STATE
  // ====================================
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      text: 'Learn TypeScript with React',
      completed: true,
      priority: 'high',
      createdAt: new Date(Date.now() - 86400000),
      tags: ['learning', 'typescript']
    },
    {
      id: '2',
      text: 'Build a type-safe task manager',
      completed: false,
      priority: 'high',
      createdAt: new Date(Date.now() - 43200000),
      tags: ['project']
    },
    {
      id: '3',
      text: 'Practice typing component props',
      completed: false,
      priority: 'medium',
      createdAt: new Date(),
      tags: ['practice']
    }
  ])

  const [filter, setFilter] = useState<FilterType>('all')
  const [sortBy, setSortBy] = useState<SortOption>('createdAt')

  // ====================================
  // HANDLERS (with useCallback)
  // ====================================

  // Add new task
  const handleAddTask = useCallback((
    text: string, 
    priority: Priority, 
    tags: string[]
  ): void => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      createdAt: new Date(),
      tags
    }
    setTasks(prev => [newTask, ...prev])
  }, [])

  // Toggle task completion
  const handleToggleTask = useCallback((id: string): void => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }, [])

  // Delete task
  const handleDeleteTask = useCallback((id: string): void => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }, [])

  // Edit task
  const handleEditTask = useCallback((id: string, updates: Partial<Task>): void => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, ...updates } : task
    ))
  }, [])

  // Clear completed tasks
  const handleClearCompleted = useCallback((): void => {
    setTasks(prev => prev.filter(task => !task.completed))
  }, [])

  // ====================================
  // COMPUTED VALUES (with useMemo)
  // ====================================

  // Filter tasks
  const filteredTasks = useMemo((): Task[] => {
    let result = [...tasks]
    
    // Apply filter
    switch (filter) {
      case 'active':
        result = result.filter(t => !t.completed)
        break
      case 'completed':
        result = result.filter(t => t.completed)
        break
    }
    
    // Apply sort
    switch (sortBy) {
      case 'priority':
        const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 }
        result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
        break
      case 'alphabetical':
        result.sort((a, b) => a.text.localeCompare(b.text))
        break
      case 'createdAt':
      default:
        result.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    }
    
    return result
  }, [tasks, filter, sortBy])

  // Calculate stats
  const stats = useMemo(() => ({
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    highPriority: tasks.filter(t => t.priority === 'high' && !t.completed).length
  }), [tasks])

  // ====================================
  // RENDER
  // ====================================

  return (
    <div className="app">
      <header className="header">
        <div className="header-badges">
          <span className="badge ts">TypeScript</span>
          <span className="badge react">React</span>
        </div>
        <h1>📝 Task Manager</h1>
        <p>A complete type-safe application</p>
      </header>

      <Stats 
        total={stats.total}
        active={stats.active}
        completed={stats.completed}
        highPriority={stats.highPriority}
      />

      <AddTaskForm onAdd={handleAddTask} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />

      {stats.completed > 0 && (
        <div className="actions-footer">
          <button 
            className="clear-btn"
            onClick={handleClearCompleted}
          >
            🗑️ Clear {stats.completed} Completed
          </button>
        </div>
      )}

      <footer className="app-footer">
        <div className="type-summary">
          <h3>📚 Types Used in This App</h3>
          <div className="types-grid">
            <div className="type-item">
              <code>Task</code>
              <span>Interface</span>
            </div>
            <div className="type-item">
              <code>Priority</code>
              <span>Union Type</span>
            </div>
            <div className="type-item">
              <code>FilterType</code>
              <span>Literal Union</span>
            </div>
            <div className="type-item">
              <code>TaskItemProps</code>
              <span>Props Interface</span>
            </div>
            <div className="type-item">
              <code>ChangeEvent&lt;T&gt;</code>
              <span>Event Type</span>
            </div>
            <div className="type-item">
              <code>Partial&lt;Task&gt;</code>
              <span>Utility Type</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

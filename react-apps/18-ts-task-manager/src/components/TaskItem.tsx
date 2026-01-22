/**
 * 📚 TaskItem Component
 * From: React with TypeScript - Core Concepts
 * 
 * Individual task item with full type safety
 */

import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { TaskItemProps, PRIORITY_CONFIG, Priority } from '../types'

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editText, setEditText] = useState<string>(task.text)

  const priorityConfig = PRIORITY_CONFIG[task.priority]

  // Handle edit input change
  const handleEditChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditText(e.target.value)
  }

  // Handle keyboard events in edit mode
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && editText.trim()) {
      onEdit(task.id, { text: editText.trim() })
      setIsEditing(false)
    }
    if (e.key === 'Escape') {
      setEditText(task.text)
      setIsEditing(false)
    }
  }

  // Handle priority change
  const handlePriorityChange = (newPriority: Priority): void => {
    onEdit(task.id, { priority: newPriority })
  }

  // Format date
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox-wrapper">
        <button
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed && '✓'}
        </button>
      </div>

      <div className="task-content">
        {isEditing ? (
          <input
            type="text"
            className="task-edit-input"
            value={editText}
            onChange={handleEditChange}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (editText.trim() && editText !== task.text) {
                onEdit(task.id, { text: editText.trim() })
              }
              setIsEditing(false)
            }}
            autoFocus
          />
        ) : (
          <span 
            className="task-text"
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
        )}

        <div className="task-meta">
          <span className="task-date">{formatDate(task.createdAt)}</span>
          {task.tags.length > 0 && (
            <div className="task-tags">
              {task.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="task-actions">
        <div className="priority-selector">
          {(["low", "medium", "high"] as Priority[]).map((p) => (
            <button
              key={p}
              className={`priority-btn ${task.priority === p ? 'active' : ''}`}
              onClick={() => handlePriorityChange(p)}
              title={PRIORITY_CONFIG[p].label}
              style={{ 
                borderColor: task.priority === p ? PRIORITY_CONFIG[p].color : 'transparent'
              }}
            >
              {PRIORITY_CONFIG[p].icon}
            </button>
          ))}
        </div>

        <button
          className="task-delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          ×
        </button>
      </div>
    </div>
  )
}

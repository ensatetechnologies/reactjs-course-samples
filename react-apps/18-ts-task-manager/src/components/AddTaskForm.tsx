/**
 * 📚 AddTaskForm Component
 * From: React with TypeScript - Core Concepts
 * 
 * Form to add new tasks with typed event handlers
 */

import { useState, FormEvent, ChangeEvent, KeyboardEvent } from 'react'
import { AddTaskFormProps, Priority, PRIORITY_CONFIG } from '../types'

export function AddTaskForm({ onAdd }: AddTaskFormProps): JSX.Element {
  const [text, setText] = useState<string>('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [tagInput, setTagInput] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [error, setError] = useState<string>('')

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    
    if (!text.trim()) {
      setError('Please enter a task')
      return
    }

    onAdd(text.trim(), priority, tags)
    
    // Reset form
    setText('')
    setPriority('medium')
    setTags([])
    setTagInput('')
    setError('')
  }

  // Handle text input change
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value)
    if (error) setError('')
  }

  // Handle tag input
  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  // Remove tag
  const removeTag = (tagToRemove: string): void => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-group">
          <input
            type="text"
            className={`task-input ${error ? 'error' : ''}`}
            value={text}
            onChange={handleTextChange}
            placeholder="What needs to be done?"
          />
          {error && <span className="error-message">{error}</span>}
        </div>

        <div className="priority-selector-form">
          {(["low", "medium", "high"] as Priority[]).map((p) => (
            <button
              key={p}
              type="button"
              className={`priority-option ${priority === p ? 'active' : ''}`}
              onClick={() => setPriority(p)}
              style={{ 
                backgroundColor: priority === p ? `${PRIORITY_CONFIG[p].color}20` : undefined,
                borderColor: priority === p ? PRIORITY_CONFIG[p].color : undefined
              }}
            >
              {PRIORITY_CONFIG[p].icon}
            </button>
          ))}
        </div>

        <button type="submit" className="add-btn">
          + Add Task
        </button>
      </div>

      <div className="tags-row">
        <input
          type="text"
          className="tag-input"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagKeyDown}
          placeholder="Add tags (press Enter)"
        />
        {tags.length > 0 && (
          <div className="tags-list">
            {tags.map((tag, i) => (
              <span key={i} className="tag editable">
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>×</button>
              </span>
            ))}
          </div>
        )}
      </div>
    </form>
  )
}

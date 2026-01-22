/**
 * 📚 TaskList Component
 * From: React with TypeScript - Core Concepts
 * 
 * List of tasks with typed props
 */

import { TaskListProps } from '../types'
import { TaskItem } from './TaskItem'

export function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps): JSX.Element {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks found</h3>
        <p>Add a new task or change your filter</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

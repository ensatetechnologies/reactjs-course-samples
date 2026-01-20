/**
 * UserCard Component - TypeScript
 * 
 * ✅ FULL PROPS VALIDATION!
 * - user must match User interface
 * - onUpdate must be a function that takes User
 * - onDelete must be a function that takes number
 */

import { useState } from 'react'
import './UserCard.css'
import { User, UserCardProps } from '../types'

// ✅ Props are typed with UserCardProps interface
function UserCard({ user, onUpdate, onDelete }: UserCardProps): JSX.Element {
  // ✅ State types are explicit
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedName, setEditedName] = useState<string>(user.name)
  const [editedAge, setEditedAge] = useState<number>(user.age)

  const handleSave = (): void => {
    // ✅ TypeScript ensures the updated user matches User interface
    const updatedUser: User = {
      ...user,
      name: editedName,
      age: editedAge  // Already a number, no parseInt needed!
    }
    onUpdate(updatedUser)
    setIsEditing(false)
  }

  const handleCancel = (): void => {
    setEditedName(user.name)
    setEditedAge(user.age)
    setIsEditing(false)
  }

  // ✅ Event type is explicit
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedName(e.target.value)
  }

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedAge(parseInt(e.target.value) || 0)
  }

  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>
      
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            placeholder="Name"
          />
          <input
            type="number"
            value={editedAge}
            onChange={handleAgeChange}
            placeholder="Age"
          />
          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave}>Save</button>
            <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="user-info">
          <h3>{user.name}</h3>
          <p className="user-role">{user.role}</p>
          <p className="user-detail">📧 {user.email}</p>
          <p className="user-detail">🎂 {user.age} years old</p>
          <div className="user-actions">
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              ✏️ Edit
            </button>
            <button className="btn-delete" onClick={() => onDelete(user.id)}>
              🗑️ Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserCard

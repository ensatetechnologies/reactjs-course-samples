/**
 * UserCard Component - JavaScript
 * 
 * NO PROPS VALIDATION!
 * - user could be anything
 * - onUpdate could be undefined
 * - onDelete might not be a function
 */

import { useState } from 'react'
import './UserCard.css'

// No interface or props type definition
function UserCard({ user, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user.name)
  const [editedAge, setEditedAge] = useState(user.age)

  const handleSave = () => {
    // No validation that user has the right shape
    onUpdate({
      ...user,
      name: editedName,
      age: parseInt(editedAge) // Could be NaN!
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedName(user.name)
    setEditedAge(user.age)
    setIsEditing(false)
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
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="number"
            value={editedAge}
            onChange={(e) => setEditedAge(e.target.value)}
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

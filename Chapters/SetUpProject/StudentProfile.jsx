import { useState } from 'react'
import './StudentProfile.css'

// Basic component - Expandable for learning!
function StudentProfile({ student }) {
  // State for showing/hiding details
  const [showDetails, setShowDetails] = useState(false)
  
  // State for editing mode (expand later!)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="student-card">
      {/* Header Section */}
      <div className="student-header">
        <div className="avatar">
          {student.name.charAt(0)}
        </div>
        <div className="student-info">
          <h3 className="student-name">{student.name}</h3>
          <p className="student-class">Class {student.class}</p>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        className="toggle-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {/* Conditional Rendering - Details Section */}
      {showDetails && (
        <div className="student-details">
          <div className="detail-item">
            <span className="label">📧 Email:</span>
            <span>{student.email}</span>
          </div>
          <div className="detail-item">
            <span className="label">📚 Subjects:</span>
            <span>{student.subjects.join(', ')}</span>
          </div>
          <div className="detail-item">
            <span className="label">📊 Grade:</span>
            <span className={`grade grade-${student.grade}`}>
              {student.grade}
            </span>
          </div>
        </div>
      )}

      {/* Future Expansion Areas (commented for learning) */}
      {/* TODO: Add edit functionality */}
      {/* TODO: Add delete confirmation */}
      {/* TODO: Add photo upload */}
      {/* TODO: Add progress chart */}
    </div>
  )
}

export default StudentProfile

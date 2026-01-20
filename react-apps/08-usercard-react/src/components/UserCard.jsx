/**
 * 📚 UserCard Component - Reusable UI Building Block
 * From: Chapter 2 - HTML & JavaScript to React
 * 
 * This component demonstrates:
 * - Props for receiving data from parent
 * - Reusability - same component, different data
 * - Component composition
 */

import './UserCard.css'

function UserCard({ 
  name, 
  role, 
  avatar, 
  skills = [], 
  followers = 0,
  isFollowing = false,
  onFollow 
}) {
  return (
    <div className="user-card">
      {/* Avatar */}
      <div className="user-avatar">
        <img src={avatar} alt={name} />
      </div>
      
      {/* User Info */}
      <div className="user-info">
        <h3 className="user-name">{name}</h3>
        <p className="user-role">{role}</p>
      </div>
      
      {/* Skills */}
      {skills.length > 0 && (
        <div className="user-skills">
          {skills.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      )}
      
      {/* Stats */}
      <div className="user-stats">
        <span className="stat-item">
          <strong>{followers.toLocaleString()}</strong> followers
        </span>
      </div>
      
      {/* Follow Button */}
      <button 
        className={`follow-btn ${isFollowing ? 'following' : ''}`}
        onClick={onFollow}
      >
        {isFollowing ? '✓ Following' : 'Follow'}
      </button>
    </div>
  )
}

export default UserCard

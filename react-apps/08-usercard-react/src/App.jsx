/**
 * 📚 UserCard - Reusable Component Demo
 * From: Chapter 2 - HTML & JavaScript to React
 * 
 * Key Learning:
 * - Components as reusable UI building blocks
 * - Props for passing data to components
 * - Building UIs like LEGO blocks!
 * 
 * In vanilla JS, you'd copy-paste HTML for each user.
 * In React, define once, use everywhere with different data!
 */

import { useState } from 'react'
import UserCard from './components/UserCard'
import './App.css'

// Sample user data
const users = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Frontend Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    skills: ['React', 'TypeScript', 'CSS'],
    followers: 1234
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'UI/UX Designer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    skills: ['Figma', 'Sketch', 'CSS'],
    followers: 2567
  },
  {
    id: 3,
    name: 'Bob Wilson',
    role: 'Backend Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    skills: ['Node.js', 'Python', 'PostgreSQL'],
    followers: 891
  },
  {
    id: 4,
    name: 'Alice Brown',
    role: 'Full Stack Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    skills: ['React', 'Node.js', 'MongoDB'],
    followers: 3456
  }
]

function App() {
  const [followedUsers, setFollowedUsers] = useState([])

  const handleFollow = (userId) => {
    setFollowedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  return (
    <div className="app">
      <header>
        <h1>⚛️ Reusable Components</h1>
        <p>Define once, use everywhere with different props!</p>
        <div className="success-banner">
          ✅ One UserCard component renders 4 different users - no copy-paste!
        </div>
      </header>

      <main>
        {/* Card Grid - Same component, different data */}
        <div className="user-grid">
          {users.map(user => (
            <UserCard
              key={user.id}
              name={user.name}
              role={user.role}
              avatar={user.avatar}
              skills={user.skills}
              followers={user.followers}
              isFollowing={followedUsers.includes(user.id)}
              onFollow={() => handleFollow(user.id)}
            />
          ))}
        </div>

        {/* Code explanation */}
        <div className="code-explanation">
          <h3>🧩 How Reusable Components Work</h3>
          
          <div className="code-section">
            <h4>1. Define the Component Once</h4>
            <pre><code>{`// UserCard.jsx - Define ONCE
function UserCard({ name, role, avatar, onFollow }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
      <button onClick={onFollow}>Follow</button>
    </div>
  )
}`}</code></pre>
          </div>

          <div className="code-section">
            <h4>2. Use Everywhere with Different Props</h4>
            <pre><code>{`// App.jsx - Use with different data!
<UserCard name="John" role="Developer" avatar="..." />
<UserCard name="Jane" role="Designer" avatar="..." />
<UserCard name="Bob" role="Manager" avatar="..." />

// Or map over an array:
{users.map(user => (
  <UserCard key={user.id} {...user} />
))}`}</code></pre>
          </div>

          <div className="comparison-grid">
            <div className="comparison-item danger">
              <strong>❌ Vanilla JS</strong>
              <p>Copy-paste HTML for each user card. Change style? Update every file!</p>
            </div>
            <div className="comparison-item success">
              <strong>✅ React Components</strong>
              <p>Define once, use anywhere. Change style? Update one file!</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-section">
          <div className="stat">
            <div className="stat-value">{users.length}</div>
            <div className="stat-label">Users Displayed</div>
          </div>
          <div className="stat">
            <div className="stat-value">1</div>
            <div className="stat-label">Component Defined</div>
          </div>
          <div className="stat">
            <div className="stat-value">{followedUsers.length}</div>
            <div className="stat-label">Users Followed</div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

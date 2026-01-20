/**
 * 📚 UserCard Component - JavaScript Version
 * From: Chapter 5 - JavaScript vs TypeScript in React
 * 
 * Demonstrates props without type annotations.
 * Notice: No validation that props are correct!
 */

import { useState } from 'react'
import './App.css'
import UserCard from './components/UserCard'

function App() {
  // No type on users array
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', age: 28, email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com', role: 'Designer' },
    { id: 3, name: 'Bob Wilson', age: 25, email: 'bob@example.com', role: 'Manager' }
  ])

  // No parameter types
  const handleUpdate = (updatedUser) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u))
    console.log('Updated:', updatedUser)
  }

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id))
  }

  return (
    <div className="app">
      <header className="header">
        <span className="badge">JavaScript</span>
        <h1>👤 UserCard Demo (JS)</h1>
        <p>Component props without type checking</p>
      </header>

      <div className="cards-grid">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="warning-box">
        <strong>⚠️ JavaScript Issues:</strong>
        <p>Try passing wrong props - no errors until runtime!</p>
        <code>
          {`<UserCard user="wrong" />  // No compile error!`}
        </code>
      </div>
    </div>
  )
}

export default App

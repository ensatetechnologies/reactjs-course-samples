/**
 * 📚 UserCard Component - TypeScript Version
 * From: Chapter 5 - JavaScript vs TypeScript in React
 * 
 * Demonstrates props WITH type annotations.
 * Notice: Full type safety - wrong props caught at compile time!
 */

import { useState } from 'react'
import './App.css'
import UserCard from './components/UserCard'
import { User } from './types'

function App(): JSX.Element {
  // ✅ Typed state - array must contain User objects
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', age: 28, email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com', role: 'Designer' },
    { id: 3, name: 'Bob Wilson', age: 25, email: 'bob@example.com', role: 'Manager' }
  ])

  // ✅ Typed parameter - must be a User object
  const handleUpdate = (updatedUser: User): void => {
    setUsers(users.map((u: User) => u.id === updatedUser.id ? updatedUser : u))
    console.log('Updated:', updatedUser)
  }

  // ✅ Typed parameter - must be a number
  const handleDelete = (id: number): void => {
    setUsers(users.filter((u: User) => u.id !== id))
  }

  return (
    <div className="app">
      <header className="header">
        <span className="badge">TypeScript</span>
        <h1>👤 UserCard Demo (TS)</h1>
        <p>Component props with full type safety</p>
      </header>

      <div className="cards-grid">
        {users.map((user: User) => (
          <UserCard
            key={user.id}
            user={user}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="success-box">
        <strong>✅ TypeScript Benefits:</strong>
        <p>Wrong props are caught at compile time!</p>
        <code>
          {`<UserCard user="wrong" />  // ❌ Compile error!`}
        </code>
        <code>
          {`<UserCard user={user} />   // ❌ Missing onUpdate, onDelete`}
        </code>
      </div>
    </div>
  )
}

export default App

/**
 * 📚 User Directory - Complete CRUD App
 * From: Chapter 17 - Async/Await Complete Guide
 * 
 * A comprehensive app demonstrating all async patterns:
 * - Fetching all users
 * - Fetching user details with posts (parallel)
 * - Creating new users
 * - Updating users
 * - Deleting users (with optimistic updates)
 */

import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://jsonplaceholder.typicode.com'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '' })
  const [actionStatus, setActionStatus] = useState({ type: '', message: '' })

  // Fetch all users on mount
  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_URL}/users`)
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`)
      }
      
      const data = await response.json()
      setUsers(data)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Fetch user details with posts (PARALLEL!)
  const fetchUserDetails = async (userId) => {
    setLoadingDetails(true)
    setSelectedUser(null)
    
    try {
      // Parallel fetching with Promise.all!
      const [userRes, postsRes] = await Promise.all([
        fetch(`${API_URL}/users/${userId}`),
        fetch(`${API_URL}/users/${userId}/posts`)
      ])
      
      if (!userRes.ok || !postsRes.ok) {
        throw new Error('Failed to fetch user details')
      }
      
      const user = await userRes.json()
      const posts = await postsRes.json()
      
      setSelectedUser({ ...user, posts: posts.slice(0, 3) })
      
    } catch (err) {
      setError('Failed to load user details')
    } finally {
      setLoadingDetails(false)
    }
  }

  // Create new user (POST)
  const createUser = async (e) => {
    e.preventDefault()
    
    if (!newUser.name.trim() || !newUser.email.trim()) {
      setActionStatus({ type: 'error', message: 'Please fill all fields' })
      return
    }
    
    setActionStatus({ type: 'loading', message: 'Creating user...' })
    
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      })
      
      if (!response.ok) {
        throw new Error('Failed to create user')
      }
      
      const createdUser = await response.json()
      
      // Add to local state (API returns with new ID)
      setUsers(prev => [...prev, { ...createdUser, id: prev.length + 1 }])
      setNewUser({ name: '', email: '' })
      setShowAddForm(false)
      setActionStatus({ type: 'success', message: 'User created successfully!' })
      
      setTimeout(() => setActionStatus({ type: '', message: '' }), 3000)
      
    } catch (err) {
      setActionStatus({ type: 'error', message: err.message })
    }
  }

  // Delete user (with optimistic update)
  const deleteUser = async (userId) => {
    // Optimistic: Update UI immediately
    const previousUsers = [...users]
    setUsers(users.filter(u => u.id !== userId))
    
    if (selectedUser?.id === userId) {
      setSelectedUser(null)
    }
    
    setActionStatus({ type: 'loading', message: 'Deleting user...' })
    
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Delete failed')
      }
      
      setActionStatus({ type: 'success', message: 'User deleted!' })
      setTimeout(() => setActionStatus({ type: '', message: '' }), 3000)
      
    } catch (err) {
      // Rollback on error
      setUsers(previousUsers)
      setActionStatus({ type: 'error', message: 'Failed to delete. Rolled back.' })
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>👥 User Directory</h1>
        <p>Complete CRUD App with async/await patterns</p>
      </header>

      <main>
        {/* Action Status */}
        {actionStatus.message && (
          <div className={`action-status ${actionStatus.type}`}>
            {actionStatus.type === 'loading' && <span className="spinner-small"></span>}
            {actionStatus.type === 'success' && '✅'}
            {actionStatus.type === 'error' && '❌'}
            {actionStatus.message}
          </div>
        )}

        {/* Toolbar */}
        <div className="toolbar">
          <button 
            className="btn-primary"
            onClick={fetchUsers}
            disabled={loading}
          >
            {loading ? '⏳ Loading...' : '🔄 Refresh'}
          </button>
          <button 
            className="btn-accent"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? '✕ Cancel' : '➕ Add User'}
          </button>
        </div>

        {/* Add User Form */}
        {showAddForm && (
          <div className="add-form-container">
            <h3>➕ Add New User</h3>
            <form onSubmit={createUser} className="add-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com"
                />
              </div>
              <button type="submit" className="btn-accent">
                Create User
              </button>
            </form>
          </div>
        )}

        {/* Main Content */}
        <div className="main-content">
          {/* Users List */}
          <div className="users-panel">
            <h2>📋 Users ({users.length})</h2>
            
            {loading && (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Fetching users...</p>
              </div>
            )}
            
            {error && !loading && (
              <div className="error-state">
                <p>❌ {error}</p>
                <button className="btn-secondary" onClick={fetchUsers}>
                  Try Again
                </button>
              </div>
            )}
            
            {!loading && !error && (
              <div className="users-list">
                {users.map(user => (
                  <div 
                    key={user.id} 
                    className={`user-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
                  >
                    <div 
                      className="user-main"
                      onClick={() => fetchUserDetails(user.id)}
                    >
                      <div className="user-avatar">
                        {user.name.charAt(0)}
                      </div>
                      <div className="user-info">
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                    <button 
                      className="btn-delete"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteUser(user.id)
                      }}
                      title="Delete user"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Details */}
          <div className="details-panel">
            <h2>👤 User Details</h2>
            
            {!selectedUser && !loadingDetails && (
              <div className="empty-state">
                <span className="empty-icon">👈</span>
                <p>Click on a user to view details</p>
              </div>
            )}
            
            {loadingDetails && (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading details...</p>
                <p className="loading-note">
                  (Fetching user + posts in parallel!)
                </p>
              </div>
            )}
            
            {selectedUser && !loadingDetails && (
              <div className="user-details">
                <div className="detail-header">
                  <div className="detail-avatar">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h3>{selectedUser.name}</h3>
                    <p>@{selectedUser.username}</p>
                  </div>
                </div>
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-icon">📧</span>
                    <div>
                      <span className="detail-label">Email</span>
                      <span className="detail-value">{selectedUser.email}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📞</span>
                    <div>
                      <span className="detail-label">Phone</span>
                      <span className="detail-value">{selectedUser.phone}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🌐</span>
                    <div>
                      <span className="detail-label">Website</span>
                      <span className="detail-value">{selectedUser.website}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">🏢</span>
                    <div>
                      <span className="detail-label">Company</span>
                      <span className="detail-value">{selectedUser.company?.name}</span>
                    </div>
                  </div>
                  <div className="detail-item full-width">
                    <span className="detail-icon">📍</span>
                    <div>
                      <span className="detail-label">Address</span>
                      <span className="detail-value">
                        {selectedUser.address?.city}, {selectedUser.address?.street}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedUser.posts && (
                  <div className="posts-section">
                    <h4>📝 Recent Posts ({selectedUser.posts.length})</h4>
                    <div className="posts-list">
                      {selectedUser.posts.map(post => (
                        <div key={post.id} className="post-item">
                          <div className="post-title">{post.title}</div>
                          <div className="post-body">{post.body.substring(0, 100)}...</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Patterns Used */}
        <section className="patterns-section">
          <h2>🎯 Async Patterns Used</h2>
          <div className="patterns-grid">
            <div className="pattern-card">
              <span className="pattern-icon">📥</span>
              <h4>useEffect + async</h4>
              <p>Initial data fetch on mount</p>
            </div>
            <div className="pattern-card">
              <span className="pattern-icon">⚡</span>
              <h4>Promise.all</h4>
              <p>Parallel fetch (user + posts)</p>
            </div>
            <div className="pattern-card">
              <span className="pattern-icon">📤</span>
              <h4>POST Request</h4>
              <p>Creating new users</p>
            </div>
            <div className="pattern-card">
              <span className="pattern-icon">🎯</span>
              <h4>Optimistic Update</h4>
              <p>Delete with rollback</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

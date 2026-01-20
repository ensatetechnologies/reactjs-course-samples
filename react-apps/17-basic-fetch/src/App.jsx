/**
 * 📚 Basic Fetch Demo - React Data Fetching
 * From: Chapter 17 - Async/Await Complete Guide
 * 
 * Demonstrates the proper pattern for fetching data in React:
 * - useEffect + async function
 * - Loading states
 * - Error handling
 */

import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // State for data, loading, and error
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ⚠️ Important: useEffect callback cannot be async directly!
  // You must define an async function inside and call it.
  useEffect(() => {
    // ✅ Define async function inside useEffect
    async function fetchUsers() {
      try {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        
        const data = await response.json()
        setUsers(data)
        setError(null)
        
      } catch (err) {
        setError(err.message)
        setUsers([])
      } finally {
        setLoading(false)
      }
    }

    fetchUsers() // Call the async function
  }, []) // Empty array = run once on mount

  // Refetch function for manual refresh
  const refetch = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>⚛️ Basic Data Fetching</h1>
        <p>useEffect + async/await pattern in React</p>
      </header>

      <main>
        {/* Pattern Explanation */}
        <section className="section">
          <h2>📝 The Pattern</h2>
          <div className="code-block">
            <div className="code-header">
              <span className="badge">useEffect + async</span>
              Proper async pattern
            </div>
            <pre><code>{`useEffect(() => {
  // ❌ Can't do: useEffect(async () => {...})
  
  // ✅ Define async function inside
  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  fetchData(); // Call it
}, []); // Empty array = run once`}</code></pre>
          </div>
        </section>

        {/* Demo Section */}
        <section className="section">
          <h2>🎮 Live Demo</h2>
          
          <div className="controls">
            <button 
              className="btn-primary" 
              onClick={refetch}
              disabled={loading}
            >
              {loading ? '⏳ Loading...' : '🔄 Refresh Data'}
            </button>
          </div>

          {/* Status Display */}
          <div className="status-container">
            <div className={`status ${loading ? 'loading' : error ? 'error' : 'success'}`}>
              <span className="status-dot"></span>
              <span className="status-text">
                {loading ? 'Fetching users...' : 
                 error ? `Error: ${error}` : 
                 `Loaded ${users.length} users`}
              </span>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading users from API...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="error-container">
              <span className="error-icon">❌</span>
              <p>{error}</p>
              <button className="btn-secondary" onClick={refetch}>
                Try Again
              </button>
            </div>
          )}

          {/* Success State - User List */}
          {!loading && !error && (
            <div className="users-grid">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-avatar">
                    {user.name.charAt(0)}
                  </div>
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                    <div className="user-company">🏢 {user.company.name}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* State Breakdown */}
        <section className="section">
          <h2>📊 State Management</h2>
          <div className="state-grid">
            <div className="state-card">
              <h4>data (users)</h4>
              <div className="state-value">{users.length} items</div>
              <p>Stores fetched data</p>
            </div>
            <div className="state-card">
              <h4>loading</h4>
              <div className={`state-value ${loading ? 'active' : ''}`}>
                {loading ? 'true' : 'false'}
              </div>
              <p>Shows loading indicator</p>
            </div>
            <div className="state-card">
              <h4>error</h4>
              <div className={`state-value ${error ? 'error' : ''}`}>
                {error ? 'Error!' : 'null'}
              </div>
              <p>Displays error message</p>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="section">
          <h2>💡 Key Points</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-icon">⚠️</span>
              <h4>Can't use async directly</h4>
              <p>useEffect callback can't be async. Define async function inside.</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🔄</span>
              <h4>Always handle loading</h4>
              <p>Show loading state to give user feedback.</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🛡️</span>
              <h4>Always handle errors</h4>
              <p>Use try/catch and display error messages.</p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">✅</span>
              <h4>Check response.ok</h4>
              <p>fetch doesn't throw on HTTP errors like 404.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

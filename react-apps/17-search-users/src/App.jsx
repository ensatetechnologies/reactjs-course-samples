/**
 * 📚 Search Users Demo - Fetch on User Action
 * From: Chapter 17 - Async/Await Complete Guide
 * 
 * Demonstrates fetching data on user actions:
 * - Async event handlers
 * - Search functionality
 * - Loading states during user actions
 */

import { useState } from 'react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(false)

  // Async handler for search button click
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term')
      return
    }
    
    setLoading(true)
    setError(null)
    setSelectedUser(null)
    
    try {
      // Fetch all users and filter client-side (API doesn't support search)
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      
      const data = await response.json()
      
      // Filter users by name or email
      const filtered = data.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      setUsers(filtered)
      
      if (filtered.length === 0) {
        setError('No users found matching your search')
      }
      
    } catch (err) {
      setError(err.message)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  // Async handler for viewing user details
  const handleViewUser = async (userId) => {
    setLoadingUser(true)
    setSelectedUser(null)
    
    try {
      // Fetch user details and their posts in parallel!
      const [userRes, postsRes] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      ])
      
      if (!userRes.ok || !postsRes.ok) {
        throw new Error('Failed to fetch user details')
      }
      
      const user = await userRes.json()
      const posts = await postsRes.json()
      
      setSelectedUser({ ...user, posts: posts.slice(0, 3) })
      
    } catch (err) {
      setError(err.message)
    } finally {
      setLoadingUser(false)
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🔍 Search Users</h1>
        <p>Fetch data on user action with async event handlers</p>
      </header>

      <main>
        {/* Pattern Explanation */}
        <section className="section">
          <h2>📝 Async Event Handlers</h2>
          <div className="code-block">
            <div className="code-header">
              <span className="badge">async onClick</span>
              Event handler pattern
            </div>
            <pre><code>{`// Event handlers CAN be async directly!
const handleSearch = async () => {
  if (!query.trim()) return;
  
  setLoading(true);
  try {
    const response = await fetch(\`/api/search?q=\${query}\`);
    const data = await response.json();
    setResults(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

<button onClick={handleSearch}>Search</button>`}</code></pre>
          </div>
        </section>

        {/* Search Section */}
        <section className="section">
          <h2>🎮 Live Demo</h2>
          
          <div className="search-container">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button 
              className="btn-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? '⏳ Searching...' : '🔍 Search'}
            </button>
          </div>

          <div className="search-hints">
            <span className="hint">Try: "Leanne", "Bret", or "@april"</span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Searching users...</p>
            </div>
          )}

          {/* Results */}
          {!loading && users.length > 0 && (
            <div className="results-container">
              <div className="results-header">
                <span>Found {users.length} user(s)</span>
              </div>
              <div className="users-list">
                {users.map(user => (
                  <div key={user.id} className="user-card">
                    <div className="user-avatar">
                      {user.name.charAt(0)}
                    </div>
                    <div className="user-info">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                    <button 
                      className="btn-secondary"
                      onClick={() => handleViewUser(user.id)}
                      disabled={loadingUser}
                    >
                      {loadingUser ? '...' : 'View'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* User Details Modal */}
        {(selectedUser || loadingUser) && (
          <section className="section user-details-section">
            <h2>👤 User Details</h2>
            
            {loadingUser ? (
              <div className="loading-container small">
                <div className="loading-spinner"></div>
                <p>Loading user details...</p>
              </div>
            ) : selectedUser && (
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
                    <span className="detail-label">📧 Email</span>
                    <span className="detail-value">{selectedUser.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">📞 Phone</span>
                    <span className="detail-value">{selectedUser.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">🌐 Website</span>
                    <span className="detail-value">{selectedUser.website}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">🏢 Company</span>
                    <span className="detail-value">{selectedUser.company.name}</span>
                  </div>
                </div>

                {selectedUser.posts && (
                  <div className="posts-section">
                    <h4>📝 Recent Posts</h4>
                    <div className="posts-list">
                      {selectedUser.posts.map(post => (
                        <div key={post.id} className="post-item">
                          <div className="post-title">{post.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  className="btn-close"
                  onClick={() => setSelectedUser(null)}
                >
                  ✕ Close
                </button>
              </div>
            )}
          </section>
        )}

        {/* Tips */}
        <section className="section">
          <h2>💡 Key Differences</h2>
          <div className="comparison-grid">
            <div className="comparison-card">
              <h4>useEffect</h4>
              <ul>
                <li>Runs automatically on mount</li>
                <li>Callback can't be async</li>
                <li>Good for initial data load</li>
              </ul>
            </div>
            <div className="comparison-card highlight">
              <h4>Event Handlers</h4>
              <ul>
                <li>Runs on user action</li>
                <li>Handler CAN be async</li>
                <li>Good for search, submit, etc.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

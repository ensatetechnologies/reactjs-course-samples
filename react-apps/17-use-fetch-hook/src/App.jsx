/**
 * 📚 Custom useFetch Hook Demo
 * From: Chapter 17 - Async/Await Complete Guide
 * 
 * Demonstrates a reusable custom hook for data fetching:
 * - Encapsulates loading/error/data states
 * - Includes cleanup for memory leak prevention
 * - Can be reused across components
 */

import { useState } from 'react'
import { useFetch } from './useFetch'
import './App.css'

// Component using useFetch for Users
function UsersList() {
  const { data: users, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  )

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <span>Loading users...</span>
      </div>
    )
  }

  if (error) {
    return <div className="error-state">❌ Error: {error}</div>
  }

  return (
    <div className="data-grid">
      {users?.slice(0, 4).map(user => (
        <div key={user.id} className="data-card">
          <div className="card-avatar">{user.name.charAt(0)}</div>
          <div className="card-content">
            <div className="card-title">{user.name}</div>
            <div className="card-subtitle">{user.email}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Component using useFetch for Posts
function PostsList() {
  const { data: posts, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/posts'
  )

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <span>Loading posts...</span>
      </div>
    )
  }

  if (error) {
    return <div className="error-state">❌ Error: {error}</div>
  }

  return (
    <div className="posts-list">
      {posts?.slice(0, 4).map(post => (
        <div key={post.id} className="post-card">
          <div className="post-number">#{post.id}</div>
          <div className="post-content">
            <div className="post-title">{post.title}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Component using useFetch for Todos
function TodosList() {
  const { data: todos, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/todos'
  )

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <span>Loading todos...</span>
      </div>
    )
  }

  if (error) {
    return <div className="error-state">❌ Error: {error}</div>
  }

  return (
    <div className="todos-list">
      {todos?.slice(0, 5).map(todo => (
        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <span className="todo-check">{todo.completed ? '✅' : '⬜'}</span>
          <span className="todo-text">{todo.title}</span>
        </div>
      ))}
    </div>
  )
}

// Dynamic URL Demo
function DynamicUserFetch() {
  const [userId, setUserId] = useState(1)
  const { data: user, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  )

  return (
    <div className="dynamic-fetch">
      <div className="id-selector">
        <label>Select User ID:</label>
        <div className="id-buttons">
          {[1, 2, 3, 4, 5].map(id => (
            <button
              key={id}
              className={`id-btn ${userId === id ? 'active' : ''}`}
              onClick={() => setUserId(id)}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <div className="user-result">
        {loading ? (
          <div className="loading-state small">
            <div className="loading-spinner"></div>
            <span>Loading...</span>
          </div>
        ) : error ? (
          <div className="error-state">❌ {error}</div>
        ) : user ? (
          <div className="user-detail">
            <div className="detail-avatar">{user.name?.charAt(0)}</div>
            <div className="detail-info">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <p className="company">🏢 {user.company?.name}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function App() {
  const [showComponents, setShowComponents] = useState({
    users: true,
    posts: false,
    todos: false
  })

  return (
    <div className="app">
      <header className="header">
        <h1>🎣 Custom useFetch Hook</h1>
        <p>Reusable data fetching with cleanup</p>
      </header>

      <main>
        {/* Hook Code */}
        <section className="section">
          <h2>📝 The useFetch Hook</h2>
          <div className="code-block">
            <div className="code-header">
              <span className="badge">useFetch.js</span>
              Custom Hook Implementation
            </div>
            <pre><code>{`import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;  // For cleanup

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        
        const result = await response.json();
        
        // Only update state if still mounted
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}`}</code></pre>
          </div>
        </section>

        {/* Usage Example */}
        <section className="section">
          <h2>💻 Usage - So Clean!</h2>
          <div className="code-block">
            <div className="code-header">
              <span className="badge success">Usage</span>
              One-liner data fetching
            </div>
            <pre><code>{`function UserList() {
  // Just one line to fetch data! 🎉
  const { data: users, loading, error } = useFetch(
    'https://api.example.com/users'
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users?.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}`}</code></pre>
          </div>
        </section>

        {/* Live Demos */}
        <section className="section">
          <h2>🎮 Live Demos</h2>
          
          <div className="toggle-buttons">
            <button 
              className={`toggle-btn ${showComponents.users ? 'active' : ''}`}
              onClick={() => setShowComponents(s => ({ ...s, users: !s.users }))}
            >
              👥 Users {showComponents.users ? '(Hide)' : '(Show)'}
            </button>
            <button 
              className={`toggle-btn ${showComponents.posts ? 'active' : ''}`}
              onClick={() => setShowComponents(s => ({ ...s, posts: !s.posts }))}
            >
              📝 Posts {showComponents.posts ? '(Hide)' : '(Show)'}
            </button>
            <button 
              className={`toggle-btn ${showComponents.todos ? 'active' : ''}`}
              onClick={() => setShowComponents(s => ({ ...s, todos: !s.todos }))}
            >
              ✅ Todos {showComponents.todos ? '(Hide)' : '(Show)'}
            </button>
          </div>

          <div className="demos-grid">
            {showComponents.users && (
              <div className="demo-card">
                <h3>👥 Users</h3>
                <code className="url-display">useFetch('/users')</code>
                <UsersList />
              </div>
            )}
            
            {showComponents.posts && (
              <div className="demo-card">
                <h3>📝 Posts</h3>
                <code className="url-display">useFetch('/posts')</code>
                <PostsList />
              </div>
            )}
            
            {showComponents.todos && (
              <div className="demo-card">
                <h3>✅ Todos</h3>
                <code className="url-display">useFetch('/todos')</code>
                <TodosList />
              </div>
            )}
          </div>
        </section>

        {/* Dynamic URL Demo */}
        <section className="section">
          <h2>🔄 Dynamic URL - Re-fetches Automatically</h2>
          <p className="section-desc">
            When the URL changes, useFetch automatically re-fetches the data!
          </p>
          <DynamicUserFetch />
        </section>

        {/* Benefits */}
        <section className="section">
          <h2>💡 Why Use a Custom Hook?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">♻️</span>
              <h4>Reusable</h4>
              <p>Use in any component with any URL</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🧹</span>
              <h4>Clean Components</h4>
              <p>Components stay focused on UI</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🛡️</span>
              <h4>Memory Safe</h4>
              <p>Cleanup prevents memory leaks</p>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">📦</span>
              <h4>Encapsulated</h4>
              <p>All fetch logic in one place</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

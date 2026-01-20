/**
 * 📚 Fetch API Demo
 * From: Chapter 17 - Async/Await Complete Guide
 * 
 * Demonstrates GET, POST, PUT, DELETE requests with the Fetch API.
 */

const API_URL = 'https://jsonplaceholder.typicode.com';

// ============================================
// UTILITY FUNCTIONS
// ============================================

function setStatus(elementId, status, text) {
  const statusBar = document.getElementById(elementId);
  statusBar.className = `status-bar ${status}`;
  statusBar.querySelector('.status-text').textContent = text;
}

function logTo(elementId, message, type = 'info') {
  const output = document.getElementById(elementId);
  const line = document.createElement('div');
  line.className = `log-line log-${type}`;
  line.textContent = message;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function clearOutput(elementId) {
  document.getElementById(elementId).innerHTML = '';
}

// ============================================
// GET REQUESTS
// ============================================

async function fetchUsers() {
  clearOutput('getOutput');
  document.getElementById('usersContainer').innerHTML = '';
  setStatus('getStatus', 'loading', 'Fetching users...');
  
  logTo('getOutput', '📥 GET /users', 'info');
  
  try {
    const startTime = performance.now();
    const response = await fetch(`${API_URL}/users`);
    
    logTo('getOutput', `Response status: ${response.status} ${response.statusText}`, 'info');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users = await response.json();
    const endTime = performance.now();
    
    setStatus('getStatus', 'success', `Fetched ${users.length} users in ${(endTime - startTime).toFixed(0)}ms`);
    logTo('getOutput', `✅ Received ${users.length} users`, 'success');
    
    // Render users
    const container = document.getElementById('usersContainer');
    users.slice(0, 6).forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <div class="user-avatar">${user.name.charAt(0)}</div>
        <div class="user-info">
          <div class="user-name">${user.name}</div>
          <div class="user-email">${user.email}</div>
        </div>
      `;
      container.appendChild(card);
    });
    
  } catch (error) {
    setStatus('getStatus', 'error', 'Failed to fetch');
    logTo('getOutput', `❌ Error: ${error.message}`, 'error');
  }
}

async function fetchSingleUser() {
  clearOutput('getOutput');
  document.getElementById('usersContainer').innerHTML = '';
  setStatus('getStatus', 'loading', 'Fetching user...');
  
  const randomId = Math.floor(Math.random() * 10) + 1;
  logTo('getOutput', `📥 GET /users/${randomId}`, 'info');
  
  try {
    const response = await fetch(`${API_URL}/users/${randomId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const user = await response.json();
    
    setStatus('getStatus', 'success', 'User fetched');
    logTo('getOutput', '✅ User data received:', 'success');
    logTo('getOutput', `   Name: ${user.name}`, 'data');
    logTo('getOutput', `   Email: ${user.email}`, 'data');
    logTo('getOutput', `   Phone: ${user.phone}`, 'data');
    logTo('getOutput', `   City: ${user.address.city}`, 'data');
    logTo('getOutput', `   Company: ${user.company.name}`, 'data');
    
  } catch (error) {
    setStatus('getStatus', 'error', 'Failed');
    logTo('getOutput', `❌ Error: ${error.message}`, 'error');
  }
}

// ============================================
// POST REQUEST
// ============================================

async function createUser() {
  clearOutput('postOutput');
  setStatus('postStatus', 'loading', 'Creating user...');
  
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  
  const userData = { name, email };
  
  logTo('postOutput', '📤 POST /users', 'info');
  logTo('postOutput', `   Sending: ${JSON.stringify(userData)}`, 'data');
  
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    
    const newUser = await response.json();
    
    setStatus('postStatus', 'success', 'User created!');
    logTo('postOutput', '✅ User created successfully:', 'success');
    logTo('postOutput', `   ID: ${newUser.id}`, 'data');
    logTo('postOutput', `   Name: ${newUser.name}`, 'data');
    logTo('postOutput', `   Email: ${newUser.email}`, 'data');
    
  } catch (error) {
    setStatus('postStatus', 'error', 'Failed');
    logTo('postOutput', `❌ Error: ${error.message}`, 'error');
  }
}

// ============================================
// PUT REQUEST
// ============================================

async function updateUser() {
  clearOutput('putOutput');
  setStatus('putStatus', 'loading', 'Updating user...');
  
  const id = document.getElementById('updateId').value;
  const name = document.getElementById('updateName').value;
  
  logTo('putOutput', `✏️ PUT /users/${id}`, 'info');
  logTo('putOutput', `   New name: ${name}`, 'data');
  
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name })
    });
    
    if (!response.ok) {
      throw new Error('Update failed');
    }
    
    const updatedUser = await response.json();
    
    setStatus('putStatus', 'success', 'User updated!');
    logTo('putOutput', '✅ User updated successfully:', 'success');
    logTo('putOutput', `   ID: ${updatedUser.id}`, 'data');
    logTo('putOutput', `   Name: ${updatedUser.name}`, 'data');
    
  } catch (error) {
    setStatus('putStatus', 'error', 'Failed');
    logTo('putOutput', `❌ Error: ${error.message}`, 'error');
  }
}

// ============================================
// DELETE REQUEST
// ============================================

async function deleteUser() {
  clearOutput('deleteOutput');
  setStatus('deleteStatus', 'loading', 'Deleting user...');
  
  const id = document.getElementById('deleteId').value;
  
  logTo('deleteOutput', `🗑️ DELETE /users/${id}`, 'info');
  
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Delete failed');
    }
    
    setStatus('deleteStatus', 'success', 'User deleted!');
    logTo('deleteOutput', `✅ User ${id} deleted successfully`, 'success');
    logTo('deleteOutput', '   (Note: JSONPlaceholder simulates deletion)', 'data');
    
  } catch (error) {
    setStatus('deleteStatus', 'error', 'Failed');
    logTo('deleteOutput', `❌ Error: ${error.message}`, 'error');
  }
}

// ============================================
// ERROR HANDLING DEMOS
// ============================================

async function simulate404() {
  clearOutput('errorOutput');
  
  logTo('errorOutput', '📥 GET /users/9999 (non-existent)', 'info');
  
  try {
    const response = await fetch(`${API_URL}/users/9999`);
    
    logTo('errorOutput', `Response status: ${response.status}`, 'info');
    logTo('errorOutput', `response.ok: ${response.ok}`, 'info');
    
    // fetch() doesn't throw on 404!
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    logTo('errorOutput', `Data: ${JSON.stringify(data)}`, 'data');
    
  } catch (error) {
    logTo('errorOutput', '', 'info');
    logTo('errorOutput', '❌ Error caught in catch block:', 'error');
    logTo('errorOutput', `   ${error.message}`, 'error');
    logTo('errorOutput', '', 'info');
    logTo('errorOutput', '💡 Note: We had to manually check response.ok', 'info');
    logTo('errorOutput', '   fetch() doesn\'t throw on HTTP errors!', 'info');
  }
}

async function simulateNetworkError() {
  clearOutput('errorOutput');
  
  logTo('errorOutput', '📥 GET https://invalid-url-that-does-not-exist.com', 'info');
  logTo('errorOutput', '   (This will cause a network error)', 'info');
  
  try {
    const response = await fetch('https://invalid-url-that-does-not-exist.com/api');
    const data = await response.json();
    logTo('errorOutput', `Data: ${JSON.stringify(data)}`, 'data');
    
  } catch (error) {
    logTo('errorOutput', '', 'info');
    logTo('errorOutput', '❌ Network error caught:', 'error');
    logTo('errorOutput', `   ${error.message}`, 'error');
    logTo('errorOutput', '', 'info');
    logTo('errorOutput', '💡 fetch() DOES throw on network errors', 'success');
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

document.getElementById('fetchUsers').addEventListener('click', fetchUsers);
document.getElementById('fetchSingleUser').addEventListener('click', fetchSingleUser);
document.getElementById('createUser').addEventListener('click', createUser);
document.getElementById('updateUser').addEventListener('click', updateUser);
document.getElementById('deleteUser').addEventListener('click', deleteUser);
document.getElementById('fetch404').addEventListener('click', simulate404);
document.getElementById('fetchNetworkError').addEventListener('click', simulateNetworkError);

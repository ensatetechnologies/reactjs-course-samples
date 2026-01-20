/**
 * 📚 Callbacks vs Promises vs Async/Await
 * From: Chapter 17 - Async/Await Complete Guide
 * 
 * Demonstrates the evolution from callbacks to promises to async/await.
 */

// ============================================
// SIMULATED API FUNCTIONS
// ============================================

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Callback-based function (old way)
function fetchUserCallback(id, callback) {
  setTimeout(() => {
    callback({ id, name: 'John Doe', email: 'john@example.com' });
  }, 800);
}

function fetchPostsCallback(userId, callback) {
  setTimeout(() => {
    callback([
      { id: 1, title: 'First Post', userId },
      { id: 2, title: 'Second Post', userId }
    ]);
  }, 600);
}

function fetchCommentsCallback(postId, callback) {
  setTimeout(() => {
    callback([
      { id: 1, text: 'Great post!', postId },
      { id: 2, text: 'Thanks for sharing!', postId }
    ]);
  }, 500);
}

// Promise-based functions
function fetchUserPromise(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'John Doe', email: 'john@example.com' });
    }, 800);
  });
}

function fetchPostsPromise(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'First Post', userId },
        { id: 2, title: 'Second Post', userId }
      ]);
    }, 600);
  });
}

function fetchCommentsPromise(postId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Great post!', postId },
        { id: 2, text: 'Thanks for sharing!', postId }
      ]);
    }, 500);
  });
}

// ============================================
// OUTPUT HELPERS
// ============================================

function logTo(elementId, message, type = 'callback') {
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
// CALLBACK DEMO
// ============================================
function runCallbackDemo() {
  clearOutput('callbackOutput');
  const startTime = performance.now();
  
  logTo('callbackOutput', '📞 Starting callback chain...', 'callback');
  logTo('callbackOutput', '   Level 1: Fetching user...', 'callback');
  
  // CALLBACK HELL - Nested callbacks
  fetchUserCallback(1, (user) => {
    logTo('callbackOutput', `   ✓ Got user: ${user.name}`, 'success');
    logTo('callbackOutput', '      Level 2: Fetching posts...', 'callback');
    
    fetchPostsCallback(user.id, (posts) => {
      logTo('callbackOutput', `      ✓ Got ${posts.length} posts`, 'success');
      logTo('callbackOutput', '         Level 3: Fetching comments...', 'callback');
      
      fetchCommentsCallback(posts[0].id, (comments) => {
        logTo('callbackOutput', `         ✓ Got ${comments.length} comments`, 'success');
        
        const endTime = performance.now();
        logTo('callbackOutput', '', 'callback');
        logTo('callbackOutput', `⏱️ Total time: ${(endTime - startTime).toFixed(0)}ms`, 'success');
        logTo('callbackOutput', '😵 Notice the deep nesting in the code!', 'error');
      });
    });
  });
}

// ============================================
// PROMISE DEMO
// ============================================
function runPromiseDemo() {
  clearOutput('promiseOutput');
  const startTime = performance.now();
  
  logTo('promiseOutput', '🤝 Starting promise chain...', 'promise');
  
  fetchUserPromise(1)
    .then(user => {
      logTo('promiseOutput', `✓ Got user: ${user.name}`, 'success');
      return fetchPostsPromise(user.id);
    })
    .then(posts => {
      logTo('promiseOutput', `✓ Got ${posts.length} posts`, 'success');
      return fetchCommentsPromise(posts[0].id);
    })
    .then(comments => {
      logTo('promiseOutput', `✓ Got ${comments.length} comments`, 'success');
      
      const endTime = performance.now();
      logTo('promiseOutput', '', 'promise');
      logTo('promiseOutput', `⏱️ Total time: ${(endTime - startTime).toFixed(0)}ms`, 'success');
      logTo('promiseOutput', '✅ Notice the flat chain - no nesting!', 'success');
    })
    .catch(error => {
      logTo('promiseOutput', `❌ Error: ${error.message}`, 'error');
    });
}

// ============================================
// ASYNC/AWAIT DEMO
// ============================================
async function runAsyncDemo() {
  clearOutput('asyncOutput');
  const startTime = performance.now();
  
  logTo('asyncOutput', '✨ Starting async/await...', 'async');
  
  try {
    // Looks like synchronous code!
    const user = await fetchUserPromise(1);
    logTo('asyncOutput', `✓ Got user: ${user.name}`, 'success');
    
    const posts = await fetchPostsPromise(user.id);
    logTo('asyncOutput', `✓ Got ${posts.length} posts`, 'success');
    
    const comments = await fetchCommentsPromise(posts[0].id);
    logTo('asyncOutput', `✓ Got ${comments.length} comments`, 'success');
    
    const endTime = performance.now();
    logTo('asyncOutput', '', 'async');
    logTo('asyncOutput', `⏱️ Total time: ${(endTime - startTime).toFixed(0)}ms`, 'success');
    logTo('asyncOutput', '✅ Code reads like synchronous - but it\'s async!', 'success');
    
  } catch (error) {
    logTo('asyncOutput', `❌ Error: ${error.message}`, 'error');
  }
}

// ============================================
// EVENT LISTENERS
// ============================================
document.getElementById('runCallbackDemo').addEventListener('click', runCallbackDemo);
document.getElementById('runPromiseDemo').addEventListener('click', runPromiseDemo);
document.getElementById('runAsyncDemo').addEventListener('click', runAsyncDemo);

// Initial message
document.querySelectorAll('.output').forEach(output => {
  const line = document.createElement('div');
  line.className = 'log-line';
  line.textContent = '👋 Click a button to run the demo!';
  output.appendChild(line);
});

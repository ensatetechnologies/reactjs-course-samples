/**
 * 📚 Promise Utility Methods
 * From: Chapter 17 - Async/Await Complete Guide
 * 
 * Demonstrates Promise.all, Promise.race, and Promise.allSettled.
 */

// ============================================
// SIMULATED API FUNCTIONS
// ============================================

function simulateRequest(name, duration, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`${name} failed!`));
      } else {
        resolve({ name, data: `Data from ${name}`, duration });
      }
    }, duration);
  });
}

// ============================================
// OUTPUT HELPERS
// ============================================

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
// PROMISE.ALL DEMO
// ============================================

async function runPromiseAllSuccess() {
  clearOutput('allOutput');
  resetProgressBars();
  
  const startTime = performance.now();
  logTo('allOutput', '🎯 Starting Promise.all with 3 requests...', 'info');
  
  // Create promises with progress tracking
  const promises = [
    trackProgress('allFill1', simulateRequest('User', 800), 800),
    trackProgress('allFill2', simulateRequest('Posts', 600), 600),
    trackProgress('allFill3', simulateRequest('Settings', 400), 400)
  ];
  
  try {
    const results = await Promise.all(promises);
    const endTime = performance.now();
    
    results.forEach(r => {
      logTo('allOutput', `✅ ${r.name}: completed in ${r.duration}ms`, 'success');
    });
    
    logTo('allOutput', '', 'info');
    logTo('allOutput', `⏱️ Total time: ${(endTime - startTime).toFixed(0)}ms (parallel!)`, 'success');
    logTo('allOutput', '💡 All completed at the same time!', 'info');
    
  } catch (error) {
    logTo('allOutput', `❌ Error: ${error.message}`, 'error');
  }
}

async function runPromiseAllFail() {
  clearOutput('allOutput');
  resetProgressBars();
  
  const startTime = performance.now();
  logTo('allOutput', '🎯 Starting Promise.all (one will fail)...', 'info');
  
  // Second request will fail
  const promises = [
    trackProgress('allFill1', simulateRequest('User', 800), 800),
    trackProgress('allFill2', simulateRequest('Posts', 300, true), 300, true), // FAILS!
    trackProgress('allFill3', simulateRequest('Settings', 600), 600)
  ];
  
  try {
    const results = await Promise.all(promises);
    results.forEach(r => {
      logTo('allOutput', `✅ ${r.name}: completed`, 'success');
    });
  } catch (error) {
    const endTime = performance.now();
    logTo('allOutput', `❌ FAILED: ${error.message}`, 'error');
    logTo('allOutput', '', 'info');
    logTo('allOutput', `⏱️ Failed after: ${(endTime - startTime).toFixed(0)}ms`, 'error');
    logTo('allOutput', '⚠️ Promise.all fails fast - other results lost!', 'error');
  }
}

function trackProgress(fillId, promise, duration, willFail = false) {
  const fill = document.getElementById(fillId);
  const startTime = performance.now();
  
  const interval = setInterval(() => {
    const elapsed = performance.now() - startTime;
    const progress = Math.min((elapsed / duration) * 100, 100);
    fill.style.width = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      fill.classList.add(willFail ? 'error' : 'success');
    }
  }, 20);
  
  return promise;
}

function resetProgressBars() {
  ['allFill1', 'allFill2', 'allFill3'].forEach(id => {
    const fill = document.getElementById(id);
    fill.style.width = '0';
    fill.classList.remove('success', 'error');
  });
}

// ============================================
// PROMISE.RACE DEMO
// ============================================

async function runPromiseRace() {
  clearOutput('raceOutput');
  resetRace();
  
  const durations = [
    500 + Math.random() * 500,  // 500-1000ms
    300 + Math.random() * 500,  // 300-800ms
    700 + Math.random() * 500   // 700-1200ms
  ];
  
  logTo('raceOutput', '🏃 Starting race between 3 servers...', 'info');
  durations.forEach((d, i) => {
    logTo('raceOutput', `   Server ${i + 1}: will take ${d.toFixed(0)}ms`, 'info');
  });
  
  // Animate runners
  animateRunners(durations);
  
  const promises = [
    simulateRequest('Server 1', durations[0]),
    simulateRequest('Server 2', durations[1]),
    simulateRequest('Server 3', durations[2])
  ];
  
  try {
    const winner = await Promise.race(promises);
    logTo('raceOutput', '', 'info');
    logTo('raceOutput', `🏆 WINNER: ${winner.name} (${winner.duration.toFixed(0)}ms)`, 'success');
  } catch (error) {
    logTo('raceOutput', `❌ First to fail: ${error.message}`, 'error');
  }
}

async function runPromiseRaceTimeout() {
  clearOutput('raceOutput');
  resetRace();
  
  logTo('raceOutput', '⏰ Racing request against 500ms timeout...', 'info');
  
  const slowRequest = simulateRequest('Slow Server', 1500);
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout!')), 500);
  });
  
  // Animate slow runner
  animateRunners([1500, 500, 2000]);
  
  try {
    const result = await Promise.race([slowRequest, timeout]);
    logTo('raceOutput', `✅ Got result: ${result.name}`, 'success');
  } catch (error) {
    logTo('raceOutput', '', 'info');
    logTo('raceOutput', `⏰ TIMEOUT: ${error.message}`, 'error');
    logTo('raceOutput', '💡 Useful pattern for request timeouts!', 'info');
  }
}

function animateRunners(durations) {
  durations.forEach((duration, i) => {
    const runner = document.getElementById(`runner${i + 1}`);
    const timeEl = document.getElementById(`time${i + 1}`);
    const startTime = performance.now();
    
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 95);
      runner.style.left = `${progress}%`;
      timeEl.textContent = `${elapsed.toFixed(0)}ms`;
      
      if (elapsed >= duration) {
        clearInterval(interval);
        runner.style.left = '95%';
        timeEl.textContent = `${duration.toFixed(0)}ms ✓`;
      }
    }, 20);
  });
}

function resetRace() {
  [1, 2, 3].forEach(i => {
    document.getElementById(`runner${i}`).style.left = '0';
    document.getElementById(`time${i}`).textContent = '';
  });
}

// ============================================
// PROMISE.ALLSETTLED DEMO
// ============================================

async function runPromiseAllSettled() {
  clearOutput('settledOutput');
  resetSettled();
  
  logTo('settledOutput', '📊 Starting Promise.allSettled...', 'info');
  logTo('settledOutput', '   Request 1: will succeed', 'info');
  logTo('settledOutput', '   Request 2: will FAIL', 'info');
  logTo('settledOutput', '   Request 3: will succeed', 'info');
  
  const promises = [
    simulateRequest('Request 1', 600),
    simulateRequest('Request 2', 400, true), // FAILS!
    simulateRequest('Request 3', 800)
  ];
  
  // Animate items
  setTimeout(() => updateSettledItem('settled1', true), 600);
  setTimeout(() => updateSettledItem('settled2', false), 400);
  setTimeout(() => updateSettledItem('settled3', true), 800);
  
  const results = await Promise.allSettled(promises);
  
  logTo('settledOutput', '', 'info');
  logTo('settledOutput', '📋 Results:', 'info');
  
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      logTo('settledOutput', `   ✅ Request ${i + 1}: fulfilled - ${result.value.name}`, 'success');
    } else {
      logTo('settledOutput', `   ❌ Request ${i + 1}: rejected - ${result.reason.message}`, 'error');
    }
  });
  
  logTo('settledOutput', '', 'info');
  logTo('settledOutput', '💡 All results returned, even the failure!', 'success');
}

function updateSettledItem(id, success) {
  const item = document.getElementById(id);
  item.classList.add(success ? 'success' : 'error');
  item.querySelector('.settled-status').textContent = success ? '✅' : '❌';
}

function resetSettled() {
  ['settled1', 'settled2', 'settled3'].forEach(id => {
    const item = document.getElementById(id);
    item.classList.remove('success', 'error');
    item.querySelector('.settled-status').textContent = '⏳';
  });
}

// ============================================
// EVENT LISTENERS
// ============================================

document.getElementById('runAllSuccess').addEventListener('click', runPromiseAllSuccess);
document.getElementById('runAllFail').addEventListener('click', runPromiseAllFail);
document.getElementById('runRace').addEventListener('click', runPromiseRace);
document.getElementById('runRaceTimeout').addEventListener('click', runPromiseRaceTimeout);
document.getElementById('runSettled').addEventListener('click', runPromiseAllSettled);

// Initial message
document.querySelectorAll('.output').forEach(output => {
  const line = document.createElement('div');
  line.className = 'log-line log-info';
  line.textContent = '👋 Click a button to run the demo!';
  output.appendChild(line);
});

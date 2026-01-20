/**
 * 📚 Counter Demo - Vanilla JavaScript
 * From: Chapter 2 - HTML & JavaScript to React
 * 
 * Key Learning Point:
 * In vanilla JS, we must MANUALLY update the DOM every time
 * our state (count) changes. This is the "pain point" that
 * React solves with automatic re-rendering!
 */

// =====================================================
// STATE - Just a regular variable
// =====================================================
let count = 0;

// =====================================================
// DOM ELEMENT REFERENCES
// =====================================================
const counterDisplay = document.getElementById('counter-value');
const historyLog = document.getElementById('history-log');
const stepInput = document.getElementById('step-input');

// =====================================================
// UPDATE FUNCTIONS
// =====================================================

/**
 * Update counter by a given amount
 * 
 * NOTICE: We must manually:
 * 1. Update the state (count variable)
 * 2. Update the DOM (counterDisplay.textContent)
 * 3. Update any related UI (history, colors)
 * 
 * This manual sync is error-prone and tedious!
 */
function updateCounter(change) {
  // 1. Update state
  count += change;
  
  // 2. MANUALLY update DOM - this is the pain point!
  counterDisplay.textContent = count;
  
  // 3. Update styling based on value
  updateCounterStyle();
  
  // 4. Log the action
  logAction(change > 0 ? 'increase' : 'decrease', change);
  
  console.log(`Counter updated: ${count}`);
}

/**
 * Update counter by step value
 */
function updateCounterByStep(direction) {
  const step = parseInt(stepInput.value) || 1;
  const change = step * direction;
  
  count += change;
  counterDisplay.textContent = count;
  updateCounterStyle();
  logAction(direction > 0 ? 'increase' : 'decrease', change);
}

/**
 * Reset counter to zero
 */
function resetCounter() {
  const previousValue = count;
  
  // 1. Reset state
  count = 0;
  
  // 2. MANUALLY update DOM
  counterDisplay.textContent = count;
  
  // 3. Reset styling
  updateCounterStyle();
  
  // 4. Log the reset
  logAction('reset', previousValue);
  
  console.log('Counter reset to 0');
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Update counter display styling based on value
 * 
 * Again, we must manually handle all UI updates!
 */
function updateCounterStyle() {
  // Remove existing classes
  counterDisplay.classList.remove('positive', 'negative');
  
  // Add appropriate class based on value
  if (count > 0) {
    counterDisplay.classList.add('positive');
  } else if (count < 0) {
    counterDisplay.classList.add('negative');
  }
}

/**
 * Log action to history
 */
function logAction(type, value) {
  const item = document.createElement('p');
  item.className = `history-item ${type}`;
  
  const timestamp = new Date().toLocaleTimeString();
  
  switch (type) {
    case 'increase':
      item.textContent = `[${timestamp}] ⬆️ Increased by ${Math.abs(value)} → ${count}`;
      break;
    case 'decrease':
      item.textContent = `[${timestamp}] ⬇️ Decreased by ${Math.abs(value)} → ${count}`;
      break;
    case 'reset':
      item.textContent = `[${timestamp}] 🔄 Reset from ${value} to 0`;
      break;
  }
  
  // Insert at the beginning of the log
  historyLog.insertBefore(item, historyLog.firstChild);
  
  // Keep only last 10 entries
  while (historyLog.children.length > 10) {
    historyLog.removeChild(historyLog.lastChild);
  }
}

// =====================================================
// INITIALIZATION
// =====================================================
console.log('⚡ Vanilla JS Counter loaded!');
console.log('State: count =', count);
console.log('');
console.log('📝 Notice: Every state change requires manual DOM updates!');
console.log('This is what React solves with automatic re-rendering.');

/**
 * 📚 Connecting JavaScript to HTML Demo
 * From: Chapter 2 - HTML & JavaScript to React
 * 
 * This demonstrates how JavaScript interacts with the DOM:
 * - Selecting elements
 * - Adding event listeners
 * - Modifying content and styles
 */

// =====================================================
// 📌 SELECTING ELEMENTS
// =====================================================

// Select elements using getElementById
const title = document.getElementById('title');
const description = document.getElementById('description');
const changeBtn = document.getElementById('change-btn');

// Add click event listener to button
changeBtn.addEventListener('click', () => {
  // Change content
  title.textContent = 'Button Clicked!';
  title.classList.add('changed');
  
  // Change style
  title.style.color = '#22d3ee';
  
  // Change description with HTML
  description.innerHTML = '<strong>Content changed!</strong> JavaScript modified this text.';
  
  console.log('Content changed via JavaScript!');
});

// =====================================================
// 🎯 EVENT LISTENERS
// =====================================================

const eventBox = document.getElementById('event-box');
const eventOutput = document.getElementById('event-output');

// Mouse enter event
eventBox.addEventListener('mouseenter', () => {
  eventOutput.textContent = '🖱️ Mouse entered the box!';
  eventOutput.style.color = '#22d3ee';
});

// Mouse leave event
eventBox.addEventListener('mouseleave', () => {
  eventOutput.textContent = '👋 Mouse left the box';
  eventOutput.style.color = '#94a3b8';
});

// Click event
eventBox.addEventListener('click', (event) => {
  eventBox.classList.add('clicked');
  eventOutput.textContent = `🎯 Clicked at position: (${event.clientX}, ${event.clientY})`;
  eventOutput.style.color = '#22c55e';
  
  // Remove clicked class after animation
  setTimeout(() => {
    eventBox.classList.remove('clicked');
  }, 200);
});

// =====================================================
// 🎨 DYNAMIC STYLING
// =====================================================

const styleBox = document.getElementById('style-box');

// Change background color
function changeColor(color) {
  const colors = {
    red: '#ef4444',
    green: '#22c55e',
    blue: '#3b82f6'
  };
  
  styleBox.style.backgroundColor = colors[color];
  styleBox.style.borderColor = colors[color];
  styleBox.textContent = `Background: ${color}`;
  
  console.log(`Style changed to ${color}`);
}

// Toggle size using classList
let isLarge = false;
function toggleSize() {
  isLarge = !isLarge;
  styleBox.classList.toggle('large');
  
  if (isLarge) {
    styleBox.textContent = 'Large size!';
  } else {
    styleBox.textContent = 'Normal size';
  }
}

// Reset all styles
function resetStyle() {
  styleBox.style.backgroundColor = '';
  styleBox.style.borderColor = '';
  styleBox.classList.remove('large');
  styleBox.textContent = 'Click buttons to change my style';
  isLarge = false;
}

// =====================================================
// ⌨️ INPUT HANDLING
// =====================================================

const textInput = document.getElementById('text-input');
const inputMirror = document.getElementById('input-mirror');
const charCount = document.getElementById('char-count');

// Listen for input events (fires on every keystroke)
textInput.addEventListener('input', (event) => {
  const value = event.target.value;
  
  // Update mirror text
  inputMirror.textContent = value || 'nothing yet';
  
  // Update character count
  charCount.textContent = value.length;
  
  // Change color based on length
  if (value.length > 20) {
    charCount.style.color = '#ef4444';
  } else if (value.length > 10) {
    charCount.style.color = '#fbbf24';
  } else {
    charCount.style.color = '#22c55e';
  }
});

// Log when script loads
console.log('🔗 Connecting JS to HTML demo loaded!');
console.log('Try interacting with the elements on the page.');

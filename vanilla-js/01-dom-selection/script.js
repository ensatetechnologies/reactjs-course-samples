/**
 * 📚 DOM Selection Methods Demo
 * From: Chapter 3 - DOM Complete Guide
 */

const consoleOutput = document.getElementById('console-output');

function log(message, type = '') {
  const line = document.createElement('p');
  line.className = `console-line ${type}`;
  line.textContent = message;
  consoleOutput.innerHTML = '';
  consoleOutput.appendChild(line);
}

function logMultiple(messages) {
  consoleOutput.innerHTML = '';
  messages.forEach(msg => {
    const line = document.createElement('p');
    line.className = `console-line ${msg.type || ''}`;
    line.textContent = msg.text;
    consoleOutput.appendChild(line);
  });
}

function resetAll() {
  document.querySelectorAll('.demo-box').forEach(el => {
    el.classList.remove('highlighted');
  });
  log('All selections reset', 'muted');
}

// getElementById - returns single element or null
function selectById() {
  resetAll();
  const element = document.getElementById('unique-element');
  
  if (element) {
    element.classList.add('highlighted');
    logMultiple([
      { text: "document.getElementById('unique-element')", type: 'info' },
      { text: `Returns: ${element.tagName} element`, type: 'success' },
      { text: `ID: ${element.id}`, type: '' },
      { text: 'Note: Returns single element or null', type: 'muted' }
    ]);
  }
}

// getElementsByClassName - returns HTMLCollection
function selectByClass() {
  resetAll();
  const elements = document.getElementsByClassName('demo-item');
  
  Array.from(elements).forEach(el => el.classList.add('highlighted'));
  
  logMultiple([
    { text: "document.getElementsByClassName('demo-item')", type: 'info' },
    { text: `Returns: HTMLCollection with ${elements.length} elements`, type: 'success' },
    { text: 'Note: Returns live HTMLCollection (updates automatically)', type: 'muted' },
    { text: 'Tip: Convert to array with Array.from() to use forEach', type: 'muted' }
  ]);
}

// querySelector - returns first match or null
function selectQueryOne() {
  resetAll();
  const element = document.querySelector('.demo-item');
  
  if (element) {
    element.classList.add('highlighted');
    logMultiple([
      { text: "document.querySelector('.demo-item')", type: 'info' },
      { text: `Returns: First matching ${element.tagName} element`, type: 'success' },
      { text: 'Note: Only the FIRST match is selected', type: 'muted' },
      { text: 'Supports any CSS selector!', type: 'muted' }
    ]);
  }
}

// querySelectorAll - returns NodeList
function selectQueryAll() {
  resetAll();
  const elements = document.querySelectorAll('.demo-item');
  
  elements.forEach(el => el.classList.add('highlighted'));
  
  logMultiple([
    { text: "document.querySelectorAll('.demo-item')", type: 'info' },
    { text: `Returns: NodeList with ${elements.length} elements`, type: 'success' },
    { text: 'Note: Returns static NodeList (can use forEach directly)', type: 'muted' },
    { text: 'Best choice for most selection needs!', type: 'muted' }
  ]);
}

// Complex CSS selector
function selectComplex() {
  resetAll();
  const element = document.querySelector('.demo-item.special');
  
  if (element) {
    element.classList.add('highlighted');
    logMultiple([
      { text: "document.querySelector('.demo-item.special')", type: 'info' },
      { text: `Returns: Element with BOTH classes`, type: 'success' },
      { text: 'Note: Use any CSS selector syntax!', type: 'muted' },
      { text: 'Examples: "div > p", "[data-id]", ":first-child"', type: 'muted' }
    ]);
  }
}

console.log('🎯 DOM Selection Methods Demo loaded!');

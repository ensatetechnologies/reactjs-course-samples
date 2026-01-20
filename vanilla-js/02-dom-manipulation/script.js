/**
 * 📚 DOM Manipulation Demo
 * From: Chapter 3 - DOM Complete Guide
 */

const targetBox = document.getElementById('target-box');
const targetTitle = document.getElementById('target-title');
const targetText = document.getElementById('target-text');
const consoleOutput = document.getElementById('console-output');

// Original values for reset
const originalTitle = 'Original Title';
const originalText = 'This is the original text content.';

function log(message, type = 'info') {
  const line = document.createElement('p');
  line.className = `console-line ${type}`;
  line.textContent = message;
  consoleOutput.innerHTML = '';
  consoleOutput.appendChild(line);
}

// Content manipulation
function changeTextContent() {
  const input = document.getElementById('text-input');
  const newText = input.value || 'New text content!';
  
  targetText.textContent = newText;
  log(`textContent set to: "${newText}"`, 'success');
  input.value = '';
}

function changeInnerHTML() {
  const input = document.getElementById('html-input');
  const newHTML = input.value || '<strong>Bold</strong> and <em>italic</em> text!';
  
  targetText.innerHTML = newHTML;
  log(`innerHTML set to: "${newHTML}"`, 'success');
  input.value = '';
}

// Attribute manipulation
function setAttribute() {
  const name = document.getElementById('attr-name').value;
  const value = document.getElementById('attr-value').value;
  
  if (!name) {
    log('Please enter an attribute name', 'muted');
    return;
  }
  
  targetBox.setAttribute(name, value);
  log(`Set attribute: ${name}="${value}"`, 'success');
}

function getAttribute() {
  const name = document.getElementById('attr-name').value;
  
  if (!name) {
    log('Please enter an attribute name', 'muted');
    return;
  }
  
  const value = targetBox.getAttribute(name);
  log(`getAttribute('${name}') = "${value}"`, 'info');
}

// Style manipulation
function changeStyle(property, value) {
  targetBox.style[property] = value;
  log(`style.${property} = '${value}'`, 'success');
}

// classList manipulation
function toggleClass(className) {
  const wasPresent = targetBox.classList.contains(className);
  targetBox.classList.toggle(className);
  log(`classList.toggle('${className}') - ${wasPresent ? 'Removed' : 'Added'}`, 'success');
}

function addClass(className) {
  targetBox.classList.add(className);
  log(`classList.add('${className}')`, 'success');
}

function removeClass(className) {
  targetBox.classList.remove(className);
  log(`classList.remove('${className}')`, 'success');
}

// Reset all changes
function resetAll() {
  targetTitle.textContent = originalTitle;
  targetText.textContent = originalText;
  targetBox.style.cssText = '';
  targetBox.className = 'target-box';
  
  // Clear attribute inputs
  document.getElementById('attr-name').value = '';
  document.getElementById('attr-value').value = '';
  
  log('All changes reset!', 'muted');
}

console.log('🎨 DOM Manipulation Demo loaded!');

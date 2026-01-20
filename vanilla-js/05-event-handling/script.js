/**
 * 📚 DOM Events Demo
 * From: Chapter 3 - DOM Complete Guide
 */

// =====================================================
// MOUSE EVENTS
// =====================================================
const mouseBox = document.getElementById('mouse-box');
const mouseInfo = document.getElementById('mouse-info');

mouseBox.addEventListener('click', (e) => {
  mouseInfo.textContent = `Click at (${e.clientX}, ${e.clientY})`;
  mouseInfo.style.color = '#22d3ee';
});

mouseBox.addEventListener('dblclick', () => {
  mouseBox.classList.add('active');
  mouseInfo.textContent = 'Double-clicked! 🎉';
  mouseInfo.style.color = '#34d399';
  setTimeout(() => mouseBox.classList.remove('active'), 500);
});

mouseBox.addEventListener('mouseenter', () => {
  mouseInfo.textContent = 'Mouse entered the box';
  mouseInfo.style.color = '#a78bfa';
});

mouseBox.addEventListener('mouseleave', () => {
  mouseInfo.textContent = 'Mouse left the box';
  mouseInfo.style.color = '#94a3b8';
});

// =====================================================
// KEYBOARD EVENTS
// =====================================================
const keyInput = document.getElementById('key-input');
const keyInfo = document.getElementById('key-info');

keyInput.addEventListener('keydown', (e) => {
  const info = [
    `Key: "${e.key}"`,
    `Code: ${e.code}`,
    `Modifiers: ${[
      e.ctrlKey && 'Ctrl',
      e.shiftKey && 'Shift',
      e.altKey && 'Alt'
    ].filter(Boolean).join('+') || 'None'}`
  ].join(' | ');
  
  keyInfo.textContent = info;
  keyInfo.style.color = '#22d3ee';
});

keyInput.addEventListener('keyup', () => {
  keyInfo.style.color = '#94a3b8';
});

// =====================================================
// FORM EVENTS
// =====================================================
const form = document.getElementById('demo-form');
const formInput = document.getElementById('form-input');
const formInfo = document.getElementById('form-info');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload!
  const value = formInput.value;
  formInfo.textContent = `Form submitted with: "${value}"`;
  formInfo.style.color = '#34d399';
  formInput.value = '';
});

formInput.addEventListener('focus', () => {
  formInfo.textContent = 'Input focused';
  formInfo.style.color = '#a78bfa';
});

formInput.addEventListener('blur', () => {
  formInfo.textContent = 'Input lost focus';
  formInfo.style.color = '#94a3b8';
});

formInput.addEventListener('input', (e) => {
  formInfo.textContent = `Typing: "${e.target.value}" (${e.target.value.length} chars)`;
  formInfo.style.color = '#fbbf24';
});

// =====================================================
// EVENT BUBBLING
// =====================================================
const outer = document.getElementById('outer');
const middle = document.getElementById('middle');
const inner = document.getElementById('inner');
const bubbleLog = document.getElementById('bubble-log');
const stopStatus = document.getElementById('stop-status');

let useStopPropagation = false;

function logBubble(element, name) {
  const entry = document.createElement('div');
  entry.className = `log-entry ${name}`;
  entry.textContent = `${name.toUpperCase()} clicked! (bubbling ${useStopPropagation ? 'stopped' : 'continues'})`;
  bubbleLog.insertBefore(entry, bubbleLog.firstChild);
  
  element.classList.add('highlight');
  setTimeout(() => element.classList.remove('highlight'), 300);
}

outer.addEventListener('click', (e) => {
  logBubble(outer, 'outer');
});

middle.addEventListener('click', (e) => {
  if (useStopPropagation) e.stopPropagation();
  logBubble(middle, 'middle');
});

inner.addEventListener('click', (e) => {
  if (useStopPropagation) e.stopPropagation();
  logBubble(inner, 'inner');
});

function toggleStopPropagation() {
  useStopPropagation = !useStopPropagation;
  stopStatus.textContent = useStopPropagation ? 'ON' : 'OFF';
  stopStatus.style.color = useStopPropagation ? '#34d399' : '#ef4444';
}

function clearBubbleLog() {
  bubbleLog.innerHTML = '';
}

console.log('🎯 DOM Events Demo loaded!');

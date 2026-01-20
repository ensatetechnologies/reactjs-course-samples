/**
 * 📚 Creating & Removing Elements Demo
 * From: Chapter 3 - DOM Complete Guide
 */

const container = document.getElementById('element-container');
const consoleOutput = document.getElementById('console-output');
const emptyMsg = document.getElementById('empty-msg');
let itemCounter = 3;

function log(message, type = 'info') {
  const line = document.createElement('p');
  line.className = `console-line ${type}`;
  line.textContent = message;
  consoleOutput.innerHTML = '';
  consoleOutput.appendChild(line);
}

function checkEmpty() {
  const items = container.querySelectorAll('.item');
  emptyMsg.classList.toggle('hidden', items.length > 0);
}

function createItem(text) {
  itemCounter++;
  
  // 1. Create element
  const div = document.createElement('div');
  div.className = 'item';
  div.setAttribute('data-id', itemCounter);
  
  // 2. Add content
  const span = document.createElement('span');
  span.textContent = text || `Item ${itemCounter}`;
  
  const button = document.createElement('button');
  button.className = 'remove-btn';
  button.textContent = '×';
  button.onclick = function() { removeItem(this); };
  
  // 3. Assemble
  div.appendChild(span);
  div.appendChild(button);
  
  return div;
}

// Add at end
function addItemEnd() {
  const text = document.getElementById('new-item-text').value;
  const item = createItem(text);
  
  container.appendChild(item);
  
  log(`appendChild() - Added "${item.querySelector('span').textContent}" at end`, 'success');
  document.getElementById('new-item-text').value = '';
  checkEmpty();
}

// Add at start
function addItemStart() {
  const text = document.getElementById('new-item-text').value;
  const item = createItem(text);
  
  container.prepend(item);
  
  log(`prepend() - Added "${item.querySelector('span').textContent}" at start`, 'success');
  document.getElementById('new-item-text').value = '';
  checkEmpty();
}

// Add at specific position
function addItemAt() {
  const text = document.getElementById('new-item-text').value;
  const item = createItem(text);
  const items = container.querySelectorAll('.item');
  
  if (items.length >= 2) {
    items[1].before(item);
    log(`before() - Inserted "${item.querySelector('span').textContent}" at position 2`, 'success');
  } else {
    container.appendChild(item);
    log(`Container has less than 2 items, appended at end`, 'info');
  }
  
  document.getElementById('new-item-text').value = '';
  checkEmpty();
}

// Remove specific item
function removeItem(button) {
  const item = button.parentElement;
  const text = item.querySelector('span').textContent;
  
  item.remove();
  
  log(`remove() - Removed "${text}"`, 'success');
  checkEmpty();
}

// Remove first item
function removeFirst() {
  const first = container.querySelector('.item');
  if (first) {
    const text = first.querySelector('span').textContent;
    first.remove();
    log(`Removed first item: "${text}"`, 'success');
  } else {
    log('No items to remove!', 'muted');
  }
  checkEmpty();
}

// Remove last item
function removeLast() {
  const items = container.querySelectorAll('.item');
  if (items.length > 0) {
    const last = items[items.length - 1];
    const text = last.querySelector('span').textContent;
    last.remove();
    log(`Removed last item: "${text}"`, 'success');
  } else {
    log('No items to remove!', 'muted');
  }
  checkEmpty();
}

// Clear all items
function clearAll() {
  const count = container.querySelectorAll('.item').length;
  container.innerHTML = '';
  log(`Cleared all ${count} items`, 'success');
  checkEmpty();
}

// Replace first item
function replaceFirst() {
  const first = container.querySelector('.item');
  const text = document.getElementById('replace-text').value;
  
  if (!first) {
    log('No items to replace!', 'muted');
    return;
  }
  
  if (!text) {
    log('Please enter replacement text', 'muted');
    return;
  }
  
  const newItem = createItem(text);
  first.replaceWith(newItem);
  
  log(`replaceWith() - Replaced first item with "${text}"`, 'success');
  document.getElementById('replace-text').value = '';
}

console.log('➕ Creating & Removing Elements Demo loaded!');
checkEmpty();

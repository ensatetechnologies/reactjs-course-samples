/**
 * 📚 Todo List using DOM Methods
 * From: Chapter 3 - DOM Complete Guide
 * 
 * Demonstrates practical DOM manipulation:
 * - createElement, appendChild
 * - Event listeners
 * - classList manipulation
 * - Querying and updating elements
 */

const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const todoCount = document.getElementById('todo-count');

function updateUI() {
  const items = todoList.querySelectorAll('.todo-item');
  const count = items.length;
  
  // Update count
  todoCount.textContent = count;
  
  // Toggle empty state
  emptyState.classList.toggle('hidden', count > 0);
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;
  
  // 1. Create list item
  const li = document.createElement('li');
  li.className = 'todo-item';
  
  // 2. Create checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-checkbox';
  checkbox.addEventListener('change', function() {
    li.classList.toggle('completed', this.checked);
  });
  
  // 3. Create text span
  const span = document.createElement('span');
  span.className = 'todo-text';
  span.textContent = text;
  
  // 4. Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'todo-delete';
  deleteBtn.textContent = '×';
  deleteBtn.addEventListener('click', function() {
    li.remove();
    updateUI();
  });
  
  // 5. Assemble the todo item
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  
  // 6. Add to list
  todoList.appendChild(li);
  
  // 7. Clear input and update UI
  todoInput.value = '';
  todoInput.focus();
  updateUI();
  
  console.log(`Added todo: "${text}"`);
}

function clearCompleted() {
  const completedItems = todoList.querySelectorAll('.todo-item.completed');
  completedItems.forEach(item => item.remove());
  updateUI();
  console.log(`Cleared ${completedItems.length} completed todos`);
}

// Initial UI update
updateUI();

console.log('📋 Todo List (DOM) loaded!');
console.log('Try adding, completing, and deleting todos.');

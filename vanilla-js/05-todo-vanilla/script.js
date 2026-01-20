/**
 * 📚 Todo List - Vanilla JavaScript (Pain Points Demo)
 * From: Chapter 2 - HTML & JavaScript to React
 * 
 * This demonstrates the PAIN POINTS of vanilla JavaScript:
 * 1. Manual DOM manipulation for every action
 * 2. Keeping state and DOM in sync
 * 3. Complex element creation
 * 4. Event listener management
 * 
 * Compare this ~150 lines with React's ~30 lines!
 */

// =====================================================
// STATE - Array to store todos
// =====================================================
let todos = [];
let currentFilter = 'all';

// =====================================================
// DOM ELEMENT REFERENCES
// =====================================================
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const totalCount = document.getElementById('total-count');
const completedCount = document.getElementById('completed-count');
const pendingCount = document.getElementById('pending-count');

// =====================================================
// TODO FUNCTIONS
// =====================================================

/**
 * Add a new todo
 * 
 * PAIN POINT: We must manually:
 * 1. Update state array
 * 2. Create DOM element with all its children
 * 3. Attach event listeners
 * 4. Append to the list
 * 5. Update all counters
 * 6. Clear input
 */
function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;
  
  // 1. Create todo object and add to state
  const todo = {
    id: Date.now(),
    text: text,
    completed: false
  };
  todos.push(todo);
  
  // 2. MANUALLY create DOM element - this is tedious!
  const li = createTodoElement(todo);
  
  // 3. Append to list
  todoList.appendChild(li);
  
  // 4. Update counters manually
  updateCounters();
  
  // 5. Update empty state
  updateEmptyState();
  
  // 6. Clear input
  todoInput.value = '';
  todoInput.focus();
  
  console.log('Todo added:', todo);
  console.log('Current state:', todos);
}

/**
 * Create a todo DOM element
 * 
 * PAIN POINT: Creating complex DOM structures is verbose!
 * Look at how many elements we need to create manually.
 */
function createTodoElement(todo) {
  // Create list item
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.id = `todo-${todo.id}`;
  if (todo.completed) {
    li.classList.add('completed');
  }
  
  // Create checkbox
  const checkbox = document.createElement('div');
  checkbox.className = `todo-checkbox ${todo.completed ? 'checked' : ''}`;
  checkbox.addEventListener('click', () => toggleTodo(todo.id));
  
  // Create text span
  const textSpan = document.createElement('span');
  textSpan.className = 'todo-text';
  textSpan.textContent = todo.text;
  
  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'todo-delete';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
  
  // Assemble the element
  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(deleteBtn);
  
  return li;
}

/**
 * Toggle todo completion
 * 
 * PAIN POINT: We must update both state AND DOM manually!
 */
function toggleTodo(id) {
  // 1. Find and update in state
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  
  todo.completed = !todo.completed;
  
  // 2. MANUALLY update DOM element
  const li = document.getElementById(`todo-${id}`);
  const checkbox = li.querySelector('.todo-checkbox');
  
  if (todo.completed) {
    li.classList.add('completed');
    checkbox.classList.add('checked');
  } else {
    li.classList.remove('completed');
    checkbox.classList.remove('checked');
  }
  
  // 3. Update counters manually
  updateCounters();
  
  // 4. Apply filter
  applyFilter();
  
  console.log('Todo toggled:', todo);
}

/**
 * Delete a todo
 * 
 * PAIN POINT: Must update state AND remove from DOM
 */
function deleteTodo(id) {
  // 1. Remove from state
  todos = todos.filter(t => t.id !== id);
  
  // 2. MANUALLY remove from DOM
  const li = document.getElementById(`todo-${id}`);
  li.remove();
  
  // 3. Update counters manually
  updateCounters();
  
  // 4. Update empty state
  updateEmptyState();
  
  console.log('Todo deleted, remaining:', todos);
}

/**
 * Filter todos
 * 
 * PAIN POINT: Must manually show/hide elements
 */
function filterTodos(filter) {
  currentFilter = filter;
  
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.toLowerCase() === filter || 
        (filter === 'pending' && btn.textContent === 'Pending')) {
      btn.classList.add('active');
    }
  });
  // Fix: properly set active class
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const btnFilter = btn.textContent.toLowerCase();
    btn.classList.toggle('active', btnFilter === filter);
  });
  
  applyFilter();
}

/**
 * Apply current filter
 */
function applyFilter() {
  const items = todoList.querySelectorAll('.todo-item');
  
  items.forEach(item => {
    const id = parseInt(item.id.replace('todo-', ''));
    const todo = todos.find(t => t.id === id);
    
    if (!todo) return;
    
    let show = false;
    switch (currentFilter) {
      case 'all':
        show = true;
        break;
      case 'pending':
        show = !todo.completed;
        break;
      case 'completed':
        show = todo.completed;
        break;
    }
    
    item.style.display = show ? 'flex' : 'none';
  });
}

/**
 * Clear completed todos
 */
function clearCompleted() {
  // Get IDs of completed todos
  const completedIds = todos.filter(t => t.completed).map(t => t.id);
  
  // Remove each from DOM
  completedIds.forEach(id => {
    const li = document.getElementById(`todo-${id}`);
    if (li) li.remove();
  });
  
  // Update state
  todos = todos.filter(t => !t.completed);
  
  // Update counters
  updateCounters();
  updateEmptyState();
  
  console.log('Cleared completed. Remaining:', todos);
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Update all counters
 * 
 * PAIN POINT: Must manually update multiple DOM elements
 */
function updateCounters() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;
  
  // Manually update each counter
  totalCount.textContent = total;
  completedCount.textContent = completed;
  pendingCount.textContent = pending;
}

/**
 * Update empty state visibility
 */
function updateEmptyState() {
  if (todos.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }
}

// =====================================================
// INITIALIZATION
// =====================================================
console.log('📝 Vanilla JS Todo List loaded!');
console.log('');
console.log('😰 Pain Points in this code:');
console.log('1. ~150 lines of code for basic CRUD');
console.log('2. Manual DOM element creation');
console.log('3. Manual state ↔ DOM synchronization');
console.log('4. Manual counter updates');
console.log('');
console.log('⚛️ React version: only ~30 lines! (see react-apps/07-todo-react)');

// Initialize counters
updateCounters();

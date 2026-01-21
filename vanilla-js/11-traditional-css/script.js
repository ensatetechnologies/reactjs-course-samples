/**
 * Traditional CSS Approach - JavaScript
 * Demonstrates the pain points of manual DOM manipulation
 */

// Sample student data
let students = [
  { id: 1, name: 'Alice Johnson', age: 15, grade: 'A' },
  { id: 2, name: 'Bob Smith', age: 16, grade: 'B' },
  { id: 3, name: 'Carol White', age: 15, grade: 'A' },
  { id: 4, name: 'David Brown', age: 17, grade: 'C' },
];

// Track selected cards - STATE IS SEPARATE FROM VIEW!
let selectedCards = new Set();
let nextId = 5;

/**
 * Initialize the app
 */
function init() {
  renderStudents();
}

/**
 * Render all student cards
 * ⚠️ Must manually create and insert DOM elements!
 */
function renderStudents() {
  const grid = document.getElementById('student-grid');
  grid.innerHTML = '';

  students.forEach(student => {
    const cardHTML = createStudentCardHTML(student);
    grid.insertAdjacentHTML('beforeend', cardHTML);
  });

  updateSelectedCount();
}

/**
 * Create HTML string for a student card
 * ⚠️ Building HTML as strings is error-prone!
 */
function createStudentCardHTML(student) {
  const isSelected = selectedCards.has(student.id);
  
  return `
    <div class="student-card ${isSelected ? 'selected' : ''}" id="card-${student.id}">
      <div class="card-header">
        <h3 class="student-name">${student.name}</h3>
        <span class="grade-badge grade-${student.grade}">${student.grade}</span>
      </div>
      <p class="student-details">Age: ${student.age}</p>
      <div class="card-actions">
        <button 
          class="btn ${isSelected ? 'btn-selected' : 'btn-primary'}" 
          onclick="toggleSelect(${student.id})"
        >
          ${isSelected ? 'Deselect' : 'Select'}
        </button>
        <button class="btn btn-danger" onclick="deleteStudent(${student.id})">
          Delete
        </button>
      </div>
    </div>
  `;
}

/**
 * Toggle student card selection
 * ⚠️ Must manually add/remove classes!
 */
function toggleSelect(id) {
  const card = document.getElementById(`card-${id}`);
  const btn = card.querySelector('.btn-primary, .btn-selected');
  
  if (selectedCards.has(id)) {
    // Deselect
    selectedCards.delete(id);
    card.classList.remove('selected');
    btn.classList.remove('btn-selected');
    btn.classList.add('btn-primary');
    btn.textContent = 'Select';
  } else {
    // Select
    selectedCards.add(id);
    card.classList.add('selected');
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-selected');
    btn.textContent = 'Deselect';
  }
  
  updateSelectedCount();
}

/**
 * Delete a student
 * ⚠️ Must update both state AND DOM!
 */
function deleteStudent(id) {
  // Update state
  students = students.filter(s => s.id !== id);
  selectedCards.delete(id);
  
  // Update DOM
  const card = document.getElementById(`card-${id}`);
  if (card) {
    card.style.transform = 'scale(0.8)';
    card.style.opacity = '0';
    setTimeout(() => {
      card.remove();
      updateSelectedCount();
    }, 200);
  }
}

/**
 * Add a new student
 */
function addStudent() {
  const names = ['Emma', 'James', 'Olivia', 'William', 'Sophia', 'Benjamin'];
  const grades = ['A', 'B', 'C', 'A', 'B'];
  
  const newStudent = {
    id: nextId++,
    name: `${names[Math.floor(Math.random() * names.length)]} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
    age: 14 + Math.floor(Math.random() * 5),
    grade: grades[Math.floor(Math.random() * grades.length)]
  };
  
  students.push(newStudent);
  
  // ⚠️ Must manually add to DOM!
  const grid = document.getElementById('student-grid');
  const cardHTML = createStudentCardHTML(newStudent);
  grid.insertAdjacentHTML('beforeend', cardHTML);
  
  // Animate in
  const card = document.getElementById(`card-${newStudent.id}`);
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  setTimeout(() => {
    card.style.transition = 'all 0.3s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 10);
}

/**
 * Clear all selections
 */
function clearSelection() {
  selectedCards.forEach(id => {
    const card = document.getElementById(`card-${id}`);
    if (card) {
      const btn = card.querySelector('.btn-selected');
      card.classList.remove('selected');
      if (btn) {
        btn.classList.remove('btn-selected');
        btn.classList.add('btn-primary');
        btn.textContent = 'Select';
      }
    }
  });
  
  selectedCards.clear();
  updateSelectedCount();
}

/**
 * Update the selected count display
 */
function updateSelectedCount() {
  document.getElementById('selected-count').textContent = selectedCards.size;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);

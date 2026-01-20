/**
 * 📚 Read-Write Pattern Demo
 * From: Chapter 3.1 - DOM Reflow
 */

const boxesContainer = document.getElementById('boxes-container');
const timeDisplay = document.getElementById('time-display');
const readsDisplay = document.getElementById('reads-display');
const patternDisplay = document.getElementById('pattern-display');

const BOX_COUNT = 50;
let boxes = [];

// Initialize boxes
function initBoxes() {
  boxesContainer.innerHTML = '';
  boxes = [];
  
  for (let i = 0; i < BOX_COUNT; i++) {
    const box = document.createElement('div');
    box.className = 'demo-box';
    boxesContainer.appendChild(box);
    boxes.push(box);
  }
}

function updateStats(time, reads, pattern, isBad) {
  timeDisplay.textContent = time.toFixed(2);
  timeDisplay.className = `stat-value ${isBad ? 'bad' : 'good'}`;
  
  readsDisplay.textContent = reads;
  readsDisplay.className = `stat-value ${isBad ? 'bad' : 'good'}`;
  
  patternDisplay.textContent = pattern;
  patternDisplay.className = `stat-value ${isBad ? 'bad' : 'good'}`;
}

// BAD: Read-Write in loop (forced synchronous layout)
function runBadPattern() {
  resetBoxes();
  
  // Reference box for dimensions
  const refBox = boxes[0];
  let layoutReads = 0;
  
  const start = performance.now();
  
  boxes.forEach((box, i) => {
    // READ forces layout calculation
    const width = refBox.offsetWidth; // 🔄 Forced layout!
    layoutReads++;
    
    // WRITE
    box.style.width = (width + i * 2) + 'px';
    
    // READ again - forces ANOTHER layout!
    const height = refBox.offsetHeight; // 🔄 Forced layout!
    layoutReads++;
    
    // WRITE
    box.style.height = (height + i) + 'px';
    box.style.backgroundColor = `hsl(${i * 7}, 70%, 50%)`;
  });
  
  const end = performance.now();
  
  updateStats(end - start, layoutReads, 'Bad', true);
  
  console.log(`BAD PATTERN: ${layoutReads} layout reads in loop`);
  console.log(`Time: ${(end - start).toFixed(2)}ms`);
}

// GOOD: Read once, write many
function runGoodPattern() {
  resetBoxes();
  
  // Reference box for dimensions
  const refBox = boxes[0];
  let layoutReads = 0;
  
  const start = performance.now();
  
  // READ ONCE outside the loop
  const baseWidth = refBox.offsetWidth;
  layoutReads++;
  const baseHeight = refBox.offsetHeight;
  layoutReads++;
  
  // WRITE many times (browser batches these)
  boxes.forEach((box, i) => {
    box.style.width = (baseWidth + i * 2) + 'px';
    box.style.height = (baseHeight + i) + 'px';
    box.style.backgroundColor = `hsl(${i * 7}, 70%, 50%)`;
  });
  
  const end = performance.now();
  
  updateStats(end - start, layoutReads, 'Good', false);
  
  console.log(`GOOD PATTERN: Only ${layoutReads} layout reads (outside loop)`);
  console.log(`Time: ${(end - start).toFixed(2)}ms`);
}

function resetBoxes() {
  boxes.forEach(box => {
    box.style.width = '';
    box.style.height = '';
    box.style.backgroundColor = '';
  });
  updateStats(0, 0, '-', false);
}

// Initialize
initBoxes();

console.log('📖 Read-Write Pattern Demo loaded!');
console.log('Compare the two patterns to see the difference.');

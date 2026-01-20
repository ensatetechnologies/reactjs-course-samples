/**
 * 📚 DocumentFragment Solution Demo
 * From: Chapter 3.1 - DOM Reflow
 */

const itemList = document.getElementById('item-list');
const timeDisplay = document.getElementById('time-display');
const reflowDisplay = document.getElementById('reflow-display');
const itemsDisplay = document.getElementById('items-display');

const ITEM_COUNT = 100;

function updateStats(time, reflows, items, isBad) {
  timeDisplay.textContent = time.toFixed(2);
  timeDisplay.className = `stat-value ${isBad ? 'bad' : 'good'}`;
  
  reflowDisplay.textContent = isBad ? `~${reflows}` : reflows;
  reflowDisplay.className = `stat-value ${isBad ? 'bad' : 'good'}`;
  
  itemsDisplay.textContent = items;
  itemsDisplay.className = `stat-value ${isBad ? 'bad' : 'good'}`;
}

// BAD: Multiple reflows
function addItemsBad() {
  clearList();
  
  const start = performance.now();
  
  // Each appendChild triggers a reflow!
  for (let i = 1; i <= ITEM_COUNT; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    itemList.appendChild(li); // 🔄 Reflow on each!
  }
  
  const end = performance.now();
  
  updateStats(end - start, ITEM_COUNT, ITEM_COUNT, true);
  
  console.log(`BAD: Added ${ITEM_COUNT} items with ~${ITEM_COUNT} reflows`);
  console.log(`Time: ${(end - start).toFixed(2)}ms`);
}

// GOOD: Single reflow with DocumentFragment
function addItemsGood() {
  clearList();
  
  const start = performance.now();
  
  // Create a DocumentFragment - lives in memory
  const fragment = document.createDocumentFragment();
  
  // Build all elements in memory (no reflows!)
  for (let i = 1; i <= ITEM_COUNT; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    fragment.appendChild(li); // No reflow - in memory!
  }
  
  // Single DOM update = single reflow
  itemList.appendChild(fragment); // 🔄 Only 1 reflow!
  
  const end = performance.now();
  
  updateStats(end - start, 1, ITEM_COUNT, false);
  
  console.log(`GOOD: Added ${ITEM_COUNT} items with 1 reflow`);
  console.log(`Time: ${(end - start).toFixed(2)}ms`);
}

function clearList() {
  itemList.innerHTML = '';
  updateStats(0, 0, 0, false);
}

console.log('📦 DocumentFragment Demo loaded!');
console.log('Compare the performance of both methods.');

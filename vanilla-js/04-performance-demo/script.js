/**
 * 📚 Performance Comparison Demo
 * From: Chapter 3.1 - DOM Reflow
 */

const badList = document.getElementById('bad-list');
const goodList = document.getElementById('good-list');
const badTime = document.getElementById('bad-time');
const goodTime = document.getElementById('good-time');
const speedDiff = document.getElementById('speed-diff');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

const ITEM_COUNT = 500;

async function runBothTests() {
  clearResults();
  
  // Run bad method
  progressText.textContent = 'Running bad method (multiple reflows)...';
  progressFill.style.width = '25%';
  
  await delay(100);
  const badResult = runBadMethod();
  progressFill.style.width = '50%';
  
  // Run good method
  progressText.textContent = 'Running good method (DocumentFragment)...';
  await delay(100);
  
  const goodResult = runGoodMethod();
  progressFill.style.width = '100%';
  
  // Update display
  badTime.textContent = badResult.toFixed(1);
  goodTime.textContent = goodResult.toFixed(1);
  
  const diff = (badResult / goodResult).toFixed(1);
  speedDiff.textContent = diff + 'x';
  speedDiff.style.color = '#22d3ee';
  
  progressText.textContent = `Done! DocumentFragment is ${diff}x faster with ${ITEM_COUNT} items.`;
  
  console.log(`Performance Results:`);
  console.log(`Bad method: ${badResult.toFixed(2)}ms`);
  console.log(`Good method: ${goodResult.toFixed(2)}ms`);
  console.log(`Speed improvement: ${diff}x faster`);
}

function runBadMethod() {
  badList.innerHTML = '';
  
  const start = performance.now();
  
  // BAD: Each appendChild causes a reflow
  for (let i = 1; i <= ITEM_COUNT; i++) {
    const div = document.createElement('div');
    div.className = 'output-item';
    div.textContent = `Item ${i}`;
    badList.appendChild(div); // 🔄 Reflow!
  }
  
  const end = performance.now();
  return end - start;
}

function runGoodMethod() {
  goodList.innerHTML = '';
  
  const start = performance.now();
  
  // GOOD: Build in memory, single append
  const fragment = document.createDocumentFragment();
  
  for (let i = 1; i <= ITEM_COUNT; i++) {
    const div = document.createElement('div');
    div.className = 'output-item';
    div.textContent = `Item ${i}`;
    fragment.appendChild(div); // No reflow - in memory
  }
  
  goodList.appendChild(fragment); // 🔄 Single reflow!
  
  const end = performance.now();
  return end - start;
}

function clearResults() {
  badList.innerHTML = '';
  goodList.innerHTML = '';
  badTime.textContent = '-';
  goodTime.textContent = '-';
  speedDiff.textContent = '-';
  speedDiff.style.color = '';
  progressFill.style.width = '0%';
  progressText.textContent = '';
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('📊 Performance Comparison Demo loaded!');
console.log('Click "Run Both Methods" to see the difference.');

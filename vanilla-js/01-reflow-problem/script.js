/**
 * 📚 The Reflow Problem Demo
 * From: Chapter 3.1 - DOM Reflow
 */

const demoBox = document.getElementById('demo-box');
const badResult = document.getElementById('bad-result');

function runBadDemo() {
  // Reset first
  resetDemo();
  
  const start = performance.now();
  
  // BAD: Each style change triggers a separate reflow
  // The browser has to recalculate layout after each change!
  
  demoBox.style.width = '300px';           // 🔄 Reflow 1
  demoBox.style.height = '150px';          // 🔄 Reflow 2
  demoBox.style.margin = '20px';           // 🔄 Reflow 3
  demoBox.style.padding = '30px';          // 🔄 Reflow 4
  demoBox.style.backgroundColor = '#ef4444'; // No reflow (color only)
  demoBox.style.borderRadius = '20px';     // 🔄 Reflow 5
  demoBox.style.fontSize = '1.5rem';       // 🔄 Reflow 6
  
  const end = performance.now();
  
  demoBox.textContent = '6 style changes = 6 potential reflows!';
  
  badResult.innerHTML = `
    <strong style="color: #ef4444;">Multiple DOM updates:</strong><br>
    • 6 style changes made<br>
    • Each layout property change = potential reflow<br>
    • Time: ${(end - start).toFixed(2)}ms<br>
    <br>
    <em style="color: #94a3b8;">
      In a real app with many elements, this adds up fast! 🐌
    </em>
  `;
}

function resetDemo() {
  demoBox.style.cssText = '';
  demoBox.textContent = 'Watch me change!';
  badResult.innerHTML = '<em>Click the button above to run the demo...</em>';
}

console.log('🔄 The Reflow Problem Demo loaded!');
console.log('Each DOM layout change triggers a reflow - expensive!');

/**
 * Spread Operator with Arrays - Interactive Demo
 * 
 * This script demonstrates various array operations using the spread operator:
 * - Copy arrays
 * - Merge arrays
 * - Add elements immutably
 * - Pass arrays as function arguments
 * - Remove duplicates
 * - Convert strings to arrays
 */

// ============================================
// Helper Functions
// ============================================

/**
 * Parse comma-separated string into array
 */
function parseArray(str) {
  return str.split(',').map(item => item.trim()).filter(item => item !== '');
}

/**
 * Format array for display with visual brackets
 */
function formatArrayVisual(arr) {
  const items = arr.map(item => `<span class="array-item">${item}</span>`).join('');
  return `<span class="bracket">[</span> ${items} <span class="bracket">]</span>`;
}

/**
 * Format array with highlighting for new items
 */
function formatArrayWithNew(arr, newIndices = []) {
  const items = arr.map((item, idx) => {
    const isNew = newIndices.includes(idx);
    return `<span class="array-item ${isNew ? 'new' : ''}">${item}</span>`;
  }).join('');
  return `<span class="bracket">[</span> ${items} <span class="bracket">]</span>`;
}

// ============================================
// Demo 1: Copy Array
// ============================================

function demoCopyArray() {
  const input = document.getElementById('copy-input').value;
  const original = parseArray(input);
  
  // ✨ SPREAD: Copy array
  const copy = [...original];
  
  // Modify the copy to show independence
  copy.push('🆕');
  
  const resultContainer = document.getElementById('copy-result');
  resultContainer.classList.add('success', 'fade-in');
  
  resultContainer.innerHTML = `
    <div class="result-row">
      <div>
        <div class="result-label">Original Array</div>
        <div class="array-visual">${formatArrayVisual(original)}</div>
      </div>
    </div>
    
    <div class="result-row">
      <div class="result-label">Code Used</div>
      <span class="result-value spread">const copy = [...original];</span>
    </div>
    
    <div class="result-row">
      <div>
        <div class="result-label">Copy (with added element)</div>
        <div class="array-visual">${formatArrayWithNew(copy, [copy.length - 1])}</div>
      </div>
    </div>
    
    <div class="result-note success">
      ✅ Original array unchanged! Copy is independent.
    </div>
  `;
}

// ============================================
// Demo 2: Merge Arrays
// ============================================

function demoMergeArrays() {
  const arr1Input = document.getElementById('merge-arr1').value;
  const arr2Input = document.getElementById('merge-arr2').value;
  
  const arr1 = parseArray(arr1Input);
  const arr2 = parseArray(arr2Input);
  
  // ✨ SPREAD: Merge arrays
  const merged = [...arr1, ...arr2];
  
  // Also demonstrate inserting item in between
  const withMiddle = [...arr1, '🍕', ...arr2];
  
  const resultContainer = document.getElementById('merge-result');
  resultContainer.classList.add('success', 'fade-in');
  
  resultContainer.innerHTML = `
    <div class="result-row">
      <div>
        <div class="result-label">Array 1</div>
        <div class="array-visual">${formatArrayVisual(arr1)}</div>
      </div>
      <span style="color: var(--muted); font-size: 1.5rem;">+</span>
      <div>
        <div class="result-label">Array 2</div>
        <div class="array-visual">${formatArrayVisual(arr2)}</div>
      </div>
    </div>
    
    <div class="result-row">
      <div class="result-label">Code Used</div>
      <span class="result-value spread">const merged = [...arr1, ...arr2];</span>
    </div>
    
    <div class="result-row">
      <div>
        <div class="result-label">Merged Result</div>
        <div class="array-visual">${formatArrayVisual(merged)}</div>
      </div>
    </div>
    
    <div class="result-row">
      <div>
        <div class="result-label">With Item in Between: [...arr1, '🍕', ...arr2]</div>
        <div class="array-visual">${formatArrayWithNew(withMiddle, [arr1.length])}</div>
      </div>
    </div>
    
    <div class="result-note success">
      ✅ Arrays combined into a new array!
    </div>
  `;
}

// ============================================
// Demo 3: Add Elements
// ============================================

function demoAddElement(position) {
  const baseInput = document.getElementById('add-base').value;
  const newElement = document.getElementById('add-element').value.trim() || 'NEW';
  
  const base = parseArray(baseInput);
  let result, code, newIndices;
  
  switch (position) {
    case 'start':
      // ✨ SPREAD: Add to beginning
      result = [newElement, ...base];
      code = `[newElement, ...base]`;
      newIndices = [0];
      break;
    
    case 'end':
      // ✨ SPREAD: Add to end
      result = [...base, newElement];
      code = `[...base, newElement]`;
      newIndices = [result.length - 1];
      break;
    
    case 'middle':
      // ✨ SPREAD: Add to middle using slice
      const midPoint = Math.floor(base.length / 2);
      result = [...base.slice(0, midPoint), newElement, ...base.slice(midPoint)];
      code = `[...base.slice(0, mid), newElement, ...base.slice(mid)]`;
      newIndices = [midPoint];
      break;
  }
  
  const resultContainer = document.getElementById('add-result');
  resultContainer.classList.add('success', 'fade-in');
  
  resultContainer.innerHTML = `
    <div class="result-row">
      <div>
        <div class="result-label">Original Array</div>
        <div class="array-visual">${formatArrayVisual(base)}</div>
      </div>
      <span class="result-arrow">→</span>
      <div>
        <div class="result-label">New Element</div>
        <span class="array-item new">${newElement}</span>
      </div>
    </div>
    
    <div class="result-row">
      <div class="result-label">Code Used</div>
      <span class="result-value spread">${code}</span>
    </div>
    
    <div class="result-row">
      <div>
        <div class="result-label">Result (added to ${position})</div>
        <div class="array-visual">${formatArrayWithNew(result, newIndices)}</div>
      </div>
    </div>
    
    <div class="result-note success">
      ✅ Original array unchanged! New array created with element at ${position}.
    </div>
  `;
}

// ============================================
// Demo 4: Function Arguments
// ============================================

function demoFunctionArgs() {
  const input = document.getElementById('func-input').value;
  const numbers = parseArray(input).map(n => parseFloat(n)).filter(n => !isNaN(n));
  
  if (numbers.length === 0) {
    document.getElementById('func-result').innerHTML = `
      <div class="result-note" style="color: var(--danger);">
        ❌ Please enter valid numbers!
      </div>
    `;
    return;
  }
  
  // ✨ SPREAD: Pass array as function arguments
  const max = Math.max(...numbers);
  const min = Math.min(...numbers);
  const sum = numbers.reduce((a, b) => a + b, 0);
  
  const resultContainer = document.getElementById('func-result');
  resultContainer.classList.add('success', 'fade-in');
  
  resultContainer.innerHTML = `
    <div class="result-row">
      <div>
        <div class="result-label">Input Array</div>
        <div class="array-visual">${formatArrayVisual(numbers)}</div>
      </div>
    </div>
    
    <div class="result-row">
      <div class="result-label">Code Used</div>
      <span class="result-value spread">Math.max(...numbers)</span>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
      <div style="text-align: center; padding: 1rem; background: var(--surface); border-radius: 10px; border: 1px solid var(--accent);">
        <div style="font-size: 2rem; color: var(--accent); font-weight: bold;">${max}</div>
        <div style="color: var(--muted); font-size: 0.8rem;">Maximum</div>
      </div>
      <div style="text-align: center; padding: 1rem; background: var(--surface); border-radius: 10px; border: 1px solid var(--primary);">
        <div style="font-size: 2rem; color: var(--primary); font-weight: bold;">${min}</div>
        <div style="color: var(--muted); font-size: 0.8rem;">Minimum</div>
      </div>
      <div style="text-align: center; padding: 1rem; background: var(--surface); border-radius: 10px; border: 1px solid var(--secondary);">
        <div style="font-size: 2rem; color: var(--secondary); font-weight: bold;">${sum}</div>
        <div style="color: var(--muted); font-size: 0.8rem;">Sum</div>
      </div>
    </div>
    
    <div class="result-note success">
      ✅ Spread unpacks array into individual arguments!
    </div>
  `;
}

// ============================================
// Demo 5: Remove Duplicates
// ============================================

function demoRemoveDuplicates() {
  const input = document.getElementById('unique-input').value;
  const withDuplicates = parseArray(input);
  
  // ✨ SPREAD: Convert Set back to array (removes duplicates)
  const unique = [...new Set(withDuplicates)];
  
  // Count duplicates
  const duplicateCount = withDuplicates.length - unique.length;
  
  const resultContainer = document.getElementById('unique-result');
  resultContainer.classList.add('success', 'fade-in');
  
  resultContainer.innerHTML = `
    <div class="result-row">
      <div>
        <div class="result-label">Original Array (with duplicates)</div>
        <div class="array-visual">${formatArrayVisual(withDuplicates)}</div>
      </div>
    </div>
    
    <div class="result-row">
      <div class="result-label">Code Used</div>
      <span class="result-value spread">[...new Set(array)]</span>
    </div>
    
    <div class="result-row">
      <div>
        <div class="result-label">Unique Values Only</div>
        <div class="array-visual">${formatArrayWithNew(unique, unique.map((_, i) => i))}</div>
      </div>
    </div>
    
    <div class="result-note success">
      ✅ Removed ${duplicateCount} duplicate(s)! ${withDuplicates.length} → ${unique.length} items
    </div>
  `;
}

// ============================================
// Demo 6: String to Array
// ============================================

function demoStringToArray() {
  const input = document.getElementById('string-input').value;
  
  // ✨ SPREAD: Convert string to array of characters
  const chars = [...input];
  
  // Also show reversed
  const reversed = [...input].reverse().join('');
  
  const resultContainer = document.getElementById('string-result');
  resultContainer.classList.add('success', 'fade-in');
  
  resultContainer.innerHTML = `
    <div class="result-row">
      <div>
        <div class="result-label">Input String</div>
        <span class="result-value" style="color: var(--str);">"${input}"</span>
      </div>
    </div>
    
    <div class="result-row">
      <div class="result-label">Code Used</div>
      <span class="result-value spread">[...string]</span>
    </div>
    
    <div class="result-row">
      <div>
        <div class="result-label">Array of Characters</div>
        <div class="array-visual">${formatArrayVisual(chars)}</div>
      </div>
    </div>
    
    <div class="result-row">
      <div>
        <div class="result-label">Reversed: [...str].reverse().join('')</div>
        <span class="result-value accent">"${reversed}"</span>
      </div>
    </div>
    
    <div class="result-note success">
      ✅ String split into ${chars.length} characters!
    </div>
  `;
}

// ============================================
// Initialize on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Add some initial results
  console.log('Spread Operator Array Demo loaded!');
  console.log('Try the interactive demos above.');
});

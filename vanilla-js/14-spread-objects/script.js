/**
 * Spread Operator with Objects - Interactive Demo
 * 
 * This script demonstrates various object operations using the spread operator:
 * - Copy objects
 * - Update properties immutably
 * - Merge objects
 * - Add new properties
 * - Remove properties (with destructuring)
 * - Shallow vs Deep copy
 */

// ============================================
// Helper Functions
// ============================================

/**
 * Format object for display as HTML
 */
function formatObjectVisual(obj, options = {}) {
  const { highlight = [], newProps = [], removed = [] } = options;
  
  const props = Object.entries(obj).map(([key, value]) => {
    const isHighlighted = highlight.includes(key);
    const isNew = newProps.includes(key);
    const isRemoved = removed.includes(key);
    
    let valueClass = typeof value === 'string' ? 'str' : 'num';
    let propClass = '';
    
    if (isNew) propClass = 'new';
    if (isHighlighted) propClass = 'highlighted';
    if (isRemoved) propClass = 'removed';
    
    const displayValue = typeof value === 'string' ? `"${value}"` : value;
    
    return `<span class="prop ${propClass}"><span class="prop-name">${key}</span>: <span class="prop-val ${valueClass}">${displayValue}</span></span>`;
  }).join('');
  
  return `<div class="object-visual ${newProps.length ? 'new-prop' : ''}">{${props}}</div>`;
}

/**
 * Format object as JSON-like string
 */
function formatObjectString(obj) {
  const props = Object.entries(obj).map(([key, value]) => {
    const displayValue = typeof value === 'string' ? `"${value}"` : value;
    return `${key}: ${displayValue}`;
  }).join(', ');
  
  return `{ ${props} }`;
}

// ============================================
// Demo 1: Copy Object
// ============================================

function demoCopyObject() {
  const name = document.getElementById('copy-name').value;
  const age = parseInt(document.getElementById('copy-age').value) || 0;
  const city = document.getElementById('copy-city').value;
  
  const original = { name, age, city };
  
  // ✨ SPREAD: Copy object
  const copy = { ...original };
  
  // Modify the copy to show independence
  copy.age = age + 5;
  copy.city = copy.city + ' (modified)';
  
  const resultContainer = document.getElementById('copy-result');
  resultContainer.classList.add('success', 'fade-in');
  
  resultContainer.innerHTML = `
    <div class="result-row">
      <div>
        <div class="result-label">Original Object</div>
        ${formatObjectVisual(original)}
      </div>
    </div>
    
    <div class="result-row">
      <div class="result-label">Code Used</div>
      <span class="result-value spread">const copy = { ...original };</span>
    </div>
    
    <div class="result-row">
      <div>
        <div class="result-label">Copy (after modifications)</div>
        ${formatObjectVisual(copy, { highlight: ['age', 'city'] })}
      </div>
    </div>
    
    <div class="result-note success">
      ✅ Original object unchanged! Copy is independent.
    </div>
  `;
}

// ============================================
// Demo 2: Update Property
// ============================================

function demoUpdateProperty() {
  const person = { name: 'John', age: 25, city: 'Mumbai' };
  
  const propToUpdate = document.getElementById('update-prop').value;
  let newValue = document.getElementById('update-value').value;
  
  // Convert to number if updating age
  if (propToUpdate === 'age') {
    newValue = parseInt(newValue) || 0;
  }
  
  // ✨ SPREAD: Update property immutably
  const updated = { ...person, [propToUpdate]: newValue };
  
  const resultContainer = document.getElementById('update-result');
  resultContainer.classList.add('success', 'fade-in');
  
  resultContainer.innerHTML = `
    <div class="result-row">
      <div>
        <div class="result-label">Original Object</div>
        ${formatObjectVisual(person)}
      </div>
      <span class="result-arrow">→</span>
      <div>
        <div class="result-label">Updated Object</div>
        ${formatObjectVisual(updated, { highlight: [propToUpdate] })}
      </div>
    </div>
    
    <div class="result-row">
      <div class="result-label">Code Used</div>
      <span class="result-value spread">{ ...person, ${propToUpdate}: "${newValue}" }</span>
    </div>
    
    <div class="result-note success">
      ✅ Property "${propToUpdate}" updated: "${person[propToUpdate]}" → "${newValue}"<br>
      Original object unchanged!
    </div>
  `;
}

// ============================================
// Demo 3: Merge Objects
// ============================================

function demoMergeObjects() {
  const defaults = { theme: 'light', fontSize: 16, lang: 'en' };
  
  const theme = document.getElementById('merge-theme').value || 'dark';
  const fontSize = parseInt(document.getElementById('merge-fontSize').value) || 18;
  
  const userPrefs = { theme, fontSize };
  
  // ✨ SPREAD: Merge objects (later properties override earlier ones)
  const settings = { ...defaults, ...userPrefs };
  
  const resultContainer = document.getElementById('merge-result');
  resultContainer.classList.add('success', 'fade-in');
  
  resultContainer.innerHTML = `
    <div class="result-row">
      <div>
        <div class="result-label">Defaults</div>
        ${formatObjectVisual(defaults)}
      </div>
      <span style="color: var(--muted); font-size: 1.5rem;">+</span>
      <div>
        <div class="result-label">User Prefs</div>
        ${formatObjectVisual(userPrefs)}
      </div>
    </div>
    
    <div class="result-row">
      <div class="result-label">Code Used</div>
      <span class="result-value spread">{ ...defaults, ...userPrefs }</span>
    </div>
    
    <div class="result-row">
      <div>
        <div class="result-label">Merged Settings</div>
        ${formatObjectVisual(settings, { highlight: ['theme', 'fontSize'] })}
      </div>
    </div>
    
    <div class="result-note success">
      ✅ Objects merged! User preferences override defaults.<br>
      "theme" and "fontSize" from userPrefs win, "lang" kept from defaults.
    </div>
  `;
}

// ============================================
// Demo 4: Add Property
// ============================================

function demoAddProperty() {
  const user = { name: 'John', age: 25 };
  
  const newKey = document.getElementById('add-prop-key').value.trim() || 'job';
  const newValue = document.getElementById('add-prop-value').value || 'Developer';
  
  // ✨ SPREAD: Add new property
  const withNewProp = { ...user, [newKey]: newValue };
  
  const resultContainer = document.getElementById('add-result');
  resultContainer.classList.add('success', 'fade-in');
  
  resultContainer.innerHTML = `
    <div class="result-row">
      <div>
        <div class="result-label">Original Object</div>
        ${formatObjectVisual(user)}
      </div>
      <span class="result-arrow">→</span>
      <div>
        <div class="result-label">With New Property</div>
        ${formatObjectVisual(withNewProp, { newProps: [newKey] })}
      </div>
    </div>
    
    <div class="result-row">
      <div class="result-label">Code Used</div>
      <span class="result-value spread">{ ...user, ${newKey}: "${newValue}" }</span>
    </div>
    
    <div class="result-note success">
      ✅ New property "${newKey}" added with value "${newValue}"!<br>
      Original object unchanged.
    </div>
  `;
}

// ============================================
// Demo 5: Remove Property
// ============================================

function demoRemoveProperty() {
  const user = {
    id: 1,
    name: 'John',
    password: 'secret123',
    email: 'john@example.com'
  };
  
  // ✨ SPREAD: Remove property using destructuring + rest
  const { password, ...safeUser } = user;
  
  const resultContainer = document.getElementById('remove-result');
  resultContainer.classList.add('success', 'fade-in');
  
  resultContainer.innerHTML = `
    <div class="result-row">
      <div>
        <div class="result-label">Original Object (with sensitive data)</div>
        ${formatObjectVisual(user)}
      </div>
    </div>
    
    <div class="result-row">
      <div class="result-label">Code Used</div>
      <span class="result-value spread">const { password, ...safeUser } = user;</span>
    </div>
    
    <div class="result-row">
      <div>
        <div class="result-label">Extracted Password</div>
        <span class="result-value removed">"${password}"</span>
      </div>
    </div>
    
    <div class="result-row">
      <div>
        <div class="result-label">Safe User Object (password removed)</div>
        ${formatObjectVisual(safeUser)}
      </div>
    </div>
    
    <div class="result-note success">
      ✅ Password removed from safe user object!<br>
      Destructuring extracts "password", rest spread (...) collects everything else.
    </div>
  `;
}

// ============================================
// Demo 6: Shallow vs Deep Copy
// ============================================

function demoShallowCopy(type) {
  const original = {
    name: 'John',
    address: {
      city: 'Mumbai',
      zip: '400001'
    }
  };
  
  const resultContainer = document.getElementById('shallow-result');
  
  if (type === 'shallow') {
    // ❌ SHALLOW COPY - nested objects still referenced
    const shallowCopy = { ...original };
    
    // Modify nested object
    shallowCopy.address.city = 'Delhi';
    
    resultContainer.classList.remove('success');
    resultContainer.classList.add('warning', 'fade-in');
    
    resultContainer.innerHTML = `
      <div class="result-row">
        <div class="result-label">Code Used (Shallow Copy)</div>
        <span class="result-value spread">const copy = { ...original };</span>
      </div>
      
      <div class="result-row">
        <div>
          <div class="result-label">Original Object (CHANGED! 😱)</div>
          <div class="object-visual">
            <span class="prop"><span class="prop-name">name</span>: <span class="prop-val str">"John"</span></span>
            <span class="prop"><span class="prop-name">address</span>: {
              <span class="prop" style="margin-left: 1rem;"><span class="prop-name">city</span>: <span class="prop-val str" style="color: var(--danger);">"Delhi" ← Changed!</span></span>
              <span class="prop" style="margin-left: 1rem;"><span class="prop-name">zip</span>: <span class="prop-val str">"400001"</span></span>
            }</span>
          </div>
        </div>
      </div>
      
      <div class="result-note danger">
        ❌ PROBLEM: Shallow copy only copies the first level!<br>
        Nested objects are still REFERENCED, not copied.<br>
        Modifying copy.address.city also changed original.address.city!
      </div>
    `;
  } else {
    // ✅ DEEP COPY - spread nested objects too
    const deepCopy = {
      ...original,
      address: { ...original.address }
    };
    
    // Modify nested object in copy
    deepCopy.address.city = 'Delhi';
    
    resultContainer.classList.remove('warning');
    resultContainer.classList.add('success', 'fade-in');
    
    resultContainer.innerHTML = `
      <div class="result-row">
        <div class="result-label">Code Used (Deep Copy)</div>
        <span class="result-value spread">{ ...original, address: { ...original.address } }</span>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
        <div>
          <div class="result-label">Original Object (UNCHANGED! ✅)</div>
          <div class="object-visual">
            <span class="prop"><span class="prop-name">name</span>: <span class="prop-val str">"John"</span></span>
            <span class="prop"><span class="prop-name">address</span>: {
              <span class="prop" style="margin-left: 1rem;"><span class="prop-name">city</span>: <span class="prop-val str">"Mumbai"</span></span>
              <span class="prop" style="margin-left: 1rem;"><span class="prop-name">zip</span>: <span class="prop-val str">"400001"</span></span>
            }</span>
          </div>
        </div>
        
        <div>
          <div class="result-label">Deep Copy (Modified)</div>
          <div class="object-visual">
            <span class="prop"><span class="prop-name">name</span>: <span class="prop-val str">"John"</span></span>
            <span class="prop"><span class="prop-name">address</span>: {
              <span class="prop" style="margin-left: 1rem;"><span class="prop-name">city</span>: <span class="prop-val str" style="color: var(--accent);">"Delhi"</span></span>
              <span class="prop" style="margin-left: 1rem;"><span class="prop-name">zip</span>: <span class="prop-val str">"400001"</span></span>
            }</span>
          </div>
        </div>
      </div>
      
      <div class="result-note success">
        ✅ SOLUTION: Spread nested objects too!<br>
        Original stays at "Mumbai", copy changed to "Delhi".<br>
        For deeply nested structures, consider structuredClone() or JSON.parse(JSON.stringify()).
      </div>
    `;
  }
}

// ============================================
// Initialize on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Spread Operator Object Demo loaded!');
  console.log('Try the interactive demos above.');
});

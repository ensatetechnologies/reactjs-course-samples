/**
 * CSS Selectors Playground
 * Interactive demonstration of CSS selector types and specificity
 */

// DOM Elements
const navButtons = document.querySelectorAll('.nav-btn');
const selectorDemos = document.querySelectorAll('.selector-demo');
const selectorInput = document.getElementById('selector-input');
const calcBtn = document.getElementById('calc-btn');
const specResult = document.getElementById('spec-result');

// Specificity display elements
const specInline = document.getElementById('spec-inline');
const specId = document.getElementById('spec-id');
const specClass = document.getElementById('spec-class');
const specElement = document.getElementById('spec-element');

/**
 * Initialize event listeners
 */
function init() {
  // Navigation buttons
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selector = btn.dataset.selector;
      switchDemo(selector);
      
      // Update active button
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Specificity calculator
  calcBtn.addEventListener('click', calculateSpecificity);
  selectorInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateSpecificity();
  });

  // Show first demo
  switchDemo('element');
}

/**
 * Switch between different selector demos
 * @param {string} selector - The selector type to show
 */
function switchDemo(selector) {
  selectorDemos.forEach(demo => {
    demo.classList.remove('active');
    if (demo.id === `demo-${selector}`) {
      demo.classList.add('active');
    }
  });
}

/**
 * Calculate CSS specificity for a given selector
 */
function calculateSpecificity() {
  const selector = selectorInput.value.trim();
  
  if (!selector) {
    showResult('Please enter a CSS selector', false);
    resetSpecDisplay();
    return;
  }

  try {
    const specificity = getSpecificity(selector);
    
    // Update display
    specInline.textContent = specificity.inline;
    specId.textContent = specificity.ids;
    specClass.textContent = specificity.classes;
    specElement.textContent = specificity.elements;

    // Animate the values
    animateSpecValues();

    // Show result
    const total = `${specificity.inline},${specificity.ids},${specificity.classes},${specificity.elements}`;
    showResult(`Specificity: (${total}) = ${calculateTotal(specificity)}`, true);
  } catch (error) {
    showResult('Invalid selector syntax', false);
    resetSpecDisplay();
  }
}

/**
 * Parse a CSS selector and calculate its specificity
 * @param {string} selector - The CSS selector to parse
 * @returns {Object} Specificity breakdown
 */
function getSpecificity(selector) {
  const specificity = {
    inline: 0,
    ids: 0,
    classes: 0,
    elements: 0
  };

  // Remove :not() content but count what's inside
  let processedSelector = selector;
  const notMatches = selector.match(/:not\(([^)]+)\)/g);
  if (notMatches) {
    notMatches.forEach(match => {
      const inner = match.match(/:not\(([^)]+)\)/)[1];
      const innerSpec = getSpecificity(inner);
      specificity.ids += innerSpec.ids;
      specificity.classes += innerSpec.classes;
      specificity.elements += innerSpec.elements;
    });
    processedSelector = selector.replace(/:not\([^)]+\)/g, '');
  }

  // Count IDs (#id)
  const idMatches = processedSelector.match(/#[a-zA-Z_-][a-zA-Z0-9_-]*/g);
  if (idMatches) {
    specificity.ids += idMatches.length;
  }

  // Remove IDs for further processing
  processedSelector = processedSelector.replace(/#[a-zA-Z_-][a-zA-Z0-9_-]*/g, '');

  // Count classes (.class), pseudo-classes (:hover), and attribute selectors ([attr])
  const classMatches = processedSelector.match(/\.[a-zA-Z_-][a-zA-Z0-9_-]*/g);
  const pseudoClassMatches = processedSelector.match(/:[a-zA-Z-]+(\([^)]*\))?/g);
  const attrMatches = processedSelector.match(/\[[^\]]+\]/g);

  if (classMatches) {
    specificity.classes += classMatches.length;
  }
  if (pseudoClassMatches) {
    // Filter out pseudo-elements (::before, ::after, etc.)
    const realPseudoClasses = pseudoClassMatches.filter(p => !p.startsWith('::'));
    specificity.classes += realPseudoClasses.length;
  }
  if (attrMatches) {
    specificity.classes += attrMatches.length;
  }

  // Remove classes, pseudo-classes, attributes
  processedSelector = processedSelector.replace(/\.[a-zA-Z_-][a-zA-Z0-9_-]*/g, '');
  processedSelector = processedSelector.replace(/:[a-zA-Z-]+(\([^)]*\))?/g, '');
  processedSelector = processedSelector.replace(/\[[^\]]+\]/g, '');

  // Count pseudo-elements (::before, ::after)
  const pseudoElementMatches = selector.match(/::[a-zA-Z-]+/g);
  if (pseudoElementMatches) {
    specificity.elements += pseudoElementMatches.length;
  }

  // Count elements (remaining tag names)
  const elementMatches = processedSelector.match(/[a-zA-Z][a-zA-Z0-9]*/g);
  if (elementMatches) {
    // Filter out common combinators and keywords
    const validElements = elementMatches.filter(e => 
      !['not', 'is', 'where', 'has', 'nth', 'child', 'type', 'of', 'first', 'last', 'only', 'even', 'odd', 'n'].includes(e.toLowerCase())
    );
    specificity.elements += validElements.length;
  }

  return specificity;
}

/**
 * Calculate total specificity as a single number
 * @param {Object} spec - Specificity object
 * @returns {number} Total specificity
 */
function calculateTotal(spec) {
  return spec.inline * 1000 + spec.ids * 100 + spec.classes * 10 + spec.elements;
}

/**
 * Show result message
 * @param {string} message - Message to display
 * @param {boolean} success - Whether it's a success message
 */
function showResult(message, success) {
  specResult.textContent = message;
  specResult.classList.toggle('highlight', success);
}

/**
 * Reset specificity display to zeros
 */
function resetSpecDisplay() {
  specInline.textContent = '0';
  specId.textContent = '0';
  specClass.textContent = '0';
  specElement.textContent = '0';
}

/**
 * Animate specificity values
 */
function animateSpecValues() {
  const values = [specInline, specId, specClass, specElement];
  values.forEach(el => {
    el.style.transform = 'scale(1.2)';
    el.style.color = '#34d399';
    setTimeout(() => {
      el.style.transform = 'scale(1)';
      el.style.color = '#22d3ee';
    }, 200);
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);

/**
 * Flexbox Playground
 * Interactive demonstration of Flexbox properties
 */

// State for container properties
const containerState = {
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  alignContent: 'stretch',
  gap: 10
};

// State for item count and size
let itemCount = 5;
let itemMinWidth = 80;

// State for individual item properties
const itemStates = {
  1: { flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', order: 0 },
  2: { flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', order: 0 },
  3: { flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', order: 0 }
};

let selectedItem = 1;

// DOM Elements
const flexContainer = document.getElementById('flex-container');
const cssOutput = document.querySelector('#css-output code');
const mainAxisIndicator = document.getElementById('main-axis');
const crossAxisIndicator = document.getElementById('cross-axis');

// Item property elements
const itemFlexContainer = document.getElementById('item-flex-container');
const selectedItemNum = document.getElementById('selected-item-num');

/**
 * Initialize the application
 */
function init() {
  // Container property buttons
  document.querySelectorAll('.prop-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prop = btn.dataset.prop;
      const value = btn.dataset.value;
      
      // Update state
      containerState[prop] = value;
      
      // Update active button in group
      const group = btn.closest('.btn-group');
      group.querySelectorAll('.prop-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      updateContainer();
    });
  });

  // Gap slider
  const gapSlider = document.getElementById('gap-slider');
  const gapValue = document.getElementById('gap-value');
  gapSlider.addEventListener('input', (e) => {
    containerState.gap = parseInt(e.target.value);
    gapValue.textContent = containerState.gap;
    updateContainer();
  });

  // Items count slider
  const itemsSlider = document.getElementById('items-slider');
  const itemsValue = document.getElementById('items-value');
  itemsSlider.addEventListener('input', (e) => {
    itemCount = parseInt(e.target.value);
    itemsValue.textContent = itemCount;
    updateItems();
    updateContainer();
  });

  // Item width slider
  const itemWidthSlider = document.getElementById('item-width-slider');
  const itemWidthValue = document.getElementById('item-width-value');
  itemWidthSlider.addEventListener('input', (e) => {
    itemMinWidth = parseInt(e.target.value);
    itemWidthValue.textContent = itemMinWidth;
    updateContainer();
  });

  // Item property controls
  initItemControls();

  // Initial render
  updateContainer();
  updateItemPreview();
}

/**
 * Initialize item property controls
 */
function initItemControls() {
  // Grow slider
  const growSlider = document.getElementById('grow-slider');
  const growValue = document.getElementById('grow-value');
  growSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    itemStates[selectedItem].flexGrow = value;
    growValue.textContent = value;
    updateItemPreview();
  });

  // Shrink slider
  const shrinkSlider = document.getElementById('shrink-slider');
  const shrinkValue = document.getElementById('shrink-value');
  shrinkSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    itemStates[selectedItem].flexShrink = value;
    shrinkValue.textContent = value;
    updateItemPreview();
  });

  // Basis select
  const basisSelect = document.getElementById('basis-select');
  const basisValue = document.getElementById('basis-value');
  basisSelect.addEventListener('change', (e) => {
    itemStates[selectedItem].flexBasis = e.target.value;
    basisValue.textContent = e.target.value;
    updateItemPreview();
  });

  // Align-self select
  const alignSelfSelect = document.getElementById('align-self-select');
  alignSelfSelect.addEventListener('change', (e) => {
    itemStates[selectedItem].alignSelf = e.target.value;
    updateItemPreview();
  });

  // Order slider
  const orderSlider = document.getElementById('order-slider');
  const orderValue = document.getElementById('order-value');
  orderSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    itemStates[selectedItem].order = value;
    orderValue.textContent = value;
    updateItemPreview();
  });

  // Item selection
  itemFlexContainer.addEventListener('click', (e) => {
    const item = e.target.closest('.item-flex-item');
    if (item) {
      selectItem(parseInt(item.dataset.index));
    }
  });
}

/**
 * Select an item for property editing
 */
function selectItem(index) {
  selectedItem = index;
  selectedItemNum.textContent = index;

  // Update selected state
  itemFlexContainer.querySelectorAll('.item-flex-item').forEach(item => {
    item.classList.toggle('selected', parseInt(item.dataset.index) === index);
  });

  // Update controls to reflect selected item's properties
  const state = itemStates[index];
  document.getElementById('grow-slider').value = state.flexGrow;
  document.getElementById('grow-value').textContent = state.flexGrow;
  document.getElementById('shrink-slider').value = state.flexShrink;
  document.getElementById('shrink-value').textContent = state.flexShrink;
  document.getElementById('basis-select').value = state.flexBasis;
  document.getElementById('basis-value').textContent = state.flexBasis;
  document.getElementById('align-self-select').value = state.alignSelf;
  document.getElementById('order-slider').value = state.order;
  document.getElementById('order-value').textContent = state.order;
}

/**
 * Update flex items count
 */
function updateItems() {
  flexContainer.innerHTML = '';
  for (let i = 1; i <= itemCount; i++) {
    const item = document.createElement('div');
    item.className = 'flex-item';
    item.dataset.index = i;
    item.textContent = i;
    flexContainer.appendChild(item);
  }
}

/**
 * Update the flex container visualization
 */
function updateContainer() {
  // Apply container styles
  flexContainer.style.flexDirection = containerState.flexDirection;
  flexContainer.style.flexWrap = containerState.flexWrap;
  flexContainer.style.justifyContent = containerState.justifyContent;
  flexContainer.style.alignItems = containerState.alignItems;
  flexContainer.style.alignContent = containerState.alignContent;
  flexContainer.style.gap = `${containerState.gap}px`;

  // Update item widths
  flexContainer.querySelectorAll('.flex-item').forEach(item => {
    item.style.minWidth = `${itemMinWidth}px`;
  });

  // Update axis indicators
  updateAxisIndicators();

  // Update CSS output
  updateCSSOutput();
}

/**
 * Update axis direction indicators
 */
function updateAxisIndicators() {
  const isColumn = containerState.flexDirection.includes('column');
  const isReverse = containerState.flexDirection.includes('reverse');

  if (isColumn) {
    mainAxisIndicator.textContent = isReverse ? 'Main Axis ↑' : 'Main Axis ↓';
    crossAxisIndicator.textContent = 'Cross Axis →';
  } else {
    mainAxisIndicator.textContent = isReverse ? 'Main Axis ←' : 'Main Axis →';
    crossAxisIndicator.textContent = 'Cross Axis ↓';
  }
}

/**
 * Update the CSS code output
 */
function updateCSSOutput() {
  const css = `<span style="color: #e06c75;">.flex-container</span> {
  <span style="color: #56b6c2;">display</span>: <span style="color: #d19a66;">flex</span>;
  <span style="color: #56b6c2;">flex-direction</span>: <span style="color: #d19a66;">${containerState.flexDirection}</span>;
  <span style="color: #56b6c2;">flex-wrap</span>: <span style="color: #d19a66;">${containerState.flexWrap}</span>;
  <span style="color: #56b6c2;">justify-content</span>: <span style="color: #d19a66;">${containerState.justifyContent}</span>;
  <span style="color: #56b6c2;">align-items</span>: <span style="color: #d19a66;">${containerState.alignItems}</span>;
  <span style="color: #56b6c2;">align-content</span>: <span style="color: #d19a66;">${containerState.alignContent}</span>;
  <span style="color: #56b6c2;">gap</span>: <span style="color: #d19a66;">${containerState.gap}px</span>;
}`;

  cssOutput.innerHTML = css;
}

/**
 * Update the item properties preview
 */
function updateItemPreview() {
  itemFlexContainer.querySelectorAll('.item-flex-item').forEach(item => {
    const index = parseInt(item.dataset.index);
    const state = itemStates[index];
    
    item.style.flexGrow = state.flexGrow;
    item.style.flexShrink = state.flexShrink;
    item.style.flexBasis = state.flexBasis;
    item.style.alignSelf = state.alignSelf;
    item.style.order = state.order;
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);

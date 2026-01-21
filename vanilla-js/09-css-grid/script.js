/**
 * CSS Grid Playground
 * Interactive demonstration of CSS Grid properties
 */

// State
const gridState = {
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'auto',
  gap: 16,
  justifyItems: 'stretch',
  alignItems: 'stretch'
};

let itemCount = 6;
let selectedItem = 1;
const itemSpans = {};

// DOM Elements
const gridContainer = document.getElementById('grid-container');
const cssOutput = document.querySelector('#css-output code');

/**
 * Initialize the application
 */
function init() {
  // Column select
  const columnsSelect = document.getElementById('columns-select');
  columnsSelect.addEventListener('change', (e) => {
    gridState.gridTemplateColumns = e.target.value;
    updateGrid();
  });

  // Row select
  const rowsSelect = document.getElementById('rows-select');
  rowsSelect.addEventListener('change', (e) => {
    gridState.gridTemplateRows = e.target.value;
    updateGrid();
  });

  // Gap slider
  const gapSlider = document.getElementById('gap-slider');
  const gapValue = document.getElementById('gap-value');
  gapSlider.addEventListener('input', (e) => {
    gridState.gap = parseInt(e.target.value);
    gapValue.textContent = gridState.gap;
    updateGrid();
  });

  // Property buttons
  document.querySelectorAll('.prop-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prop = btn.dataset.prop;
      const value = btn.dataset.value;
      
      gridState[prop] = value;
      
      const group = btn.closest('.btn-group');
      group.querySelectorAll('.prop-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      updateGrid();
    });
  });

  // Items slider
  const itemsSlider = document.getElementById('items-slider');
  const itemsValue = document.getElementById('items-value');
  itemsSlider.addEventListener('input', (e) => {
    itemCount = parseInt(e.target.value);
    itemsValue.textContent = itemCount;
    updateItems();
    updateGrid();
  });

  // Column span slider
  const colSpanSlider = document.getElementById('col-span-slider');
  const colSpanValue = document.getElementById('col-span-value');
  colSpanSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    colSpanValue.textContent = value;
    if (!itemSpans[selectedItem]) itemSpans[selectedItem] = { col: 1, row: 1 };
    itemSpans[selectedItem].col = value;
    updateGrid();
  });

  // Row span slider
  const rowSpanSlider = document.getElementById('row-span-slider');
  const rowSpanValue = document.getElementById('row-span-value');
  rowSpanSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    rowSpanValue.textContent = value;
    if (!itemSpans[selectedItem]) itemSpans[selectedItem] = { col: 1, row: 1 };
    itemSpans[selectedItem].row = value;
    updateGrid();
  });

  // Item selection
  gridContainer.addEventListener('click', (e) => {
    const item = e.target.closest('.grid-item');
    if (item) {
      selectItem(parseInt(item.dataset.index));
    }
  });

  // Initialize item 1 span state
  itemSpans[1] = { col: 1, row: 1 };

  // Initial render
  updateGrid();
}

/**
 * Select a grid item
 */
function selectItem(index) {
  selectedItem = index;
  
  // Update selection UI
  gridContainer.querySelectorAll('.grid-item').forEach(item => {
    item.classList.toggle('selected', parseInt(item.dataset.index) === index);
  });

  // Initialize span state if needed
  if (!itemSpans[index]) {
    itemSpans[index] = { col: 1, row: 1 };
  }

  // Update sliders to reflect selected item
  document.getElementById('col-span-slider').value = itemSpans[index].col;
  document.getElementById('col-span-value').textContent = itemSpans[index].col;
  document.getElementById('row-span-slider').value = itemSpans[index].row;
  document.getElementById('row-span-value').textContent = itemSpans[index].row;
}

/**
 * Update grid items count
 */
function updateItems() {
  gridContainer.innerHTML = '';
  for (let i = 1; i <= itemCount; i++) {
    const item = document.createElement('div');
    item.className = 'grid-item';
    if (i === selectedItem) item.classList.add('selected');
    item.dataset.index = i;
    item.textContent = i;
    gridContainer.appendChild(item);
  }
}

/**
 * Update the grid visualization
 */
function updateGrid() {
  // Apply container styles
  gridContainer.style.gridTemplateColumns = gridState.gridTemplateColumns;
  gridContainer.style.gridTemplateRows = gridState.gridTemplateRows;
  gridContainer.style.gap = `${gridState.gap}px`;
  gridContainer.style.justifyItems = gridState.justifyItems;
  gridContainer.style.alignItems = gridState.alignItems;

  // Apply item spans
  gridContainer.querySelectorAll('.grid-item').forEach(item => {
    const index = parseInt(item.dataset.index);
    const span = itemSpans[index] || { col: 1, row: 1 };
    
    item.style.gridColumn = span.col > 1 ? `span ${span.col}` : '';
    item.style.gridRow = span.row > 1 ? `span ${span.row}` : '';
  });

  // Update CSS output
  updateCSSOutput();
}

/**
 * Update the CSS code output
 */
function updateCSSOutput() {
  let css = `<span style="color: #e06c75;">.grid-container</span> {
  <span style="color: #56b6c2;">display</span>: <span style="color: #d19a66;">grid</span>;
  <span style="color: #56b6c2;">grid-template-columns</span>: <span style="color: #d19a66;">${gridState.gridTemplateColumns}</span>;
  <span style="color: #56b6c2;">grid-template-rows</span>: <span style="color: #d19a66;">${gridState.gridTemplateRows}</span>;
  <span style="color: #56b6c2;">gap</span>: <span style="color: #d19a66;">${gridState.gap}px</span>;
  <span style="color: #56b6c2;">justify-items</span>: <span style="color: #d19a66;">${gridState.justifyItems}</span>;
  <span style="color: #56b6c2;">align-items</span>: <span style="color: #d19a66;">${gridState.alignItems}</span>;
}`;

  // Add span CSS for selected item if applicable
  const span = itemSpans[selectedItem];
  if (span && (span.col > 1 || span.row > 1)) {
    css += `

<span style="color: #e06c75;">.grid-item-${selectedItem}</span> {`;
    if (span.col > 1) {
      css += `
  <span style="color: #56b6c2;">grid-column</span>: <span style="color: #d19a66;">span ${span.col}</span>;`;
    }
    if (span.row > 1) {
      css += `
  <span style="color: #56b6c2;">grid-row</span>: <span style="color: #d19a66;">span ${span.row}</span>;`;
    }
    css += `
}`;
  }

  cssOutput.innerHTML = css;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);

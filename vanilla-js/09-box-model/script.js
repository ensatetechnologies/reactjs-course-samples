/**
 * CSS Box Model Visualizer
 * Interactive visualization of the CSS box model
 */

// State
let boxSizing = 'border-box';
let width = 200;
let height = 150;
let padding = 20;
let border = 4;
let borderRadius = 8;
let margin = 20;

// DOM Elements
const toggleBtns = document.querySelectorAll('.toggle-btn');
const widthSlider = document.getElementById('width-slider');
const heightSlider = document.getElementById('height-slider');
const paddingSlider = document.getElementById('padding-slider');
const borderSlider = document.getElementById('border-slider');
const radiusSlider = document.getElementById('radius-slider');
const marginSlider = document.getElementById('margin-slider');

// Value displays
const widthValue = document.getElementById('width-value');
const heightValue = document.getElementById('height-value');
const paddingValue = document.getElementById('padding-value');
const borderValue = document.getElementById('border-value');
const radiusValue = document.getElementById('radius-value');
const marginValue = document.getElementById('margin-value');

// Visualization elements
const marginLayer = document.getElementById('margin-layer');
const borderLayer = document.getElementById('border-layer');
const paddingLayer = document.getElementById('padding-layer');
const contentLayer = document.getElementById('content-layer');

// Dimension displays
const contentDim = document.getElementById('content-dim');
const withPaddingDim = document.getElementById('with-padding-dim');
const withBorderDim = document.getElementById('with-border-dim');
const totalDim = document.getElementById('total-dim');

// Other elements
const cssOutput = document.querySelector('#css-output code');
const boxSizingMode = document.getElementById('box-sizing-mode');
const boxSizingExplanation = document.getElementById('box-sizing-explanation');

/**
 * Initialize the application
 */
function init() {
  // Box sizing toggle
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      boxSizing = btn.dataset.value;
      updateVisualization();
    });
  });

  // Sliders
  widthSlider.addEventListener('input', (e) => {
    width = parseInt(e.target.value);
    widthValue.textContent = width;
    updateVisualization();
  });

  heightSlider.addEventListener('input', (e) => {
    height = parseInt(e.target.value);
    heightValue.textContent = height;
    updateVisualization();
  });

  paddingSlider.addEventListener('input', (e) => {
    padding = parseInt(e.target.value);
    paddingValue.textContent = padding;
    updateVisualization();
  });

  borderSlider.addEventListener('input', (e) => {
    border = parseInt(e.target.value);
    borderValue.textContent = border;
    updateVisualization();
  });

  radiusSlider.addEventListener('input', (e) => {
    borderRadius = parseInt(e.target.value);
    radiusValue.textContent = borderRadius;
    updateVisualization();
  });

  marginSlider.addEventListener('input', (e) => {
    margin = parseInt(e.target.value);
    marginValue.textContent = margin;
    updateVisualization();
  });

  // Initial render
  updateVisualization();
}

/**
 * Update the box model visualization
 */
function updateVisualization() {
  // Calculate actual dimensions based on box-sizing
  let contentWidth, contentHeight;
  
  if (boxSizing === 'border-box') {
    // Content shrinks to fit within width/height
    contentWidth = Math.max(0, width - (padding * 2) - (border * 2));
    contentHeight = Math.max(0, height - (padding * 2) - (border * 2));
  } else {
    // Width/height is just the content
    contentWidth = width;
    contentHeight = height;
  }

  // Calculate layer dimensions
  const paddingWidth = contentWidth + (padding * 2);
  const paddingHeight = contentHeight + (padding * 2);
  const borderWidth = paddingWidth + (border * 2);
  const borderHeight = paddingHeight + (border * 2);
  const totalWidth = borderWidth + (margin * 2);
  const totalHeight = borderHeight + (margin * 2);

  // Update visualization layers
  contentLayer.style.width = `${contentWidth}px`;
  contentLayer.style.height = `${contentHeight}px`;

  paddingLayer.style.padding = `${padding}px`;
  
  borderLayer.style.borderWidth = `${border}px`;
  borderLayer.style.borderRadius = `${borderRadius}px`;
  
  marginLayer.style.padding = `${margin}px`;
  marginLayer.style.borderRadius = `${borderRadius + border + 4}px`;

  // Update padding layer border radius
  paddingLayer.style.borderRadius = `${Math.max(0, borderRadius - border)}px`;
  contentLayer.style.borderRadius = `${Math.max(0, borderRadius - border - 2)}px`;

  // Update dimension displays
  contentDim.textContent = `${contentWidth} × ${contentHeight}`;
  withPaddingDim.textContent = `${paddingWidth} × ${paddingHeight}`;
  withBorderDim.textContent = `${borderWidth} × ${borderHeight}`;
  totalDim.textContent = `${totalWidth} × ${totalHeight}`;

  // Update explanation
  updateExplanation();

  // Update CSS output
  updateCSSOutput();
}

/**
 * Update the explanation text based on box-sizing mode
 */
function updateExplanation() {
  boxSizingMode.textContent = boxSizing;
  
  if (boxSizing === 'border-box') {
    boxSizingExplanation.innerHTML = `
      With <strong>border-box</strong>, the width/height (${width}px × ${height}px) includes padding and border. 
      The content area shrinks to fit within the specified dimensions.
    `;
  } else {
    const actualWidth = width + (padding * 2) + (border * 2);
    const actualHeight = height + (padding * 2) + (border * 2);
    boxSizingExplanation.innerHTML = `
      With <strong>content-box</strong>, the width/height (${width}px × ${height}px) is just the content. 
      Padding and border are ADDED, making the actual box ${actualWidth}px × ${actualHeight}px.
    `;
  }
}

/**
 * Update the CSS code output
 */
function updateCSSOutput() {
  const css = `.box {
  <span style="color: #56b6c2;">box-sizing</span>: <span style="color: #d19a66;">${boxSizing}</span>;
  <span style="color: #56b6c2;">width</span>: <span style="color: #d19a66;">${width}px</span>;
  <span style="color: #56b6c2;">height</span>: <span style="color: #d19a66;">${height}px</span>;
  <span style="color: #56b6c2;">padding</span>: <span style="color: #d19a66;">${padding}px</span>;
  <span style="color: #56b6c2;">border</span>: <span style="color: #d19a66;">${border}px solid #fbbf24</span>;
  <span style="color: #56b6c2;">border-radius</span>: <span style="color: #d19a66;">${borderRadius}px</span>;
  <span style="color: #56b6c2;">margin</span>: <span style="color: #d19a66;">${margin}px</span>;
}`;

  cssOutput.innerHTML = css;
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);

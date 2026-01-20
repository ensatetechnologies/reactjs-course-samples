/**
 * 📚 DOM Traversal Demo
 * From: Chapter 3 - DOM Complete Guide
 */

let selectedElement = document.getElementById('child-2');

// Make tree nodes clickable
document.querySelectorAll('.tree-node').forEach(node => {
  node.addEventListener('click', (e) => {
    e.stopPropagation();
    selectElement(node);
  });
});

function selectElement(element) {
  // Remove previous selection
  document.querySelectorAll('.tree-node').forEach(n => {
    n.classList.remove('selected', 'highlighted');
  });
  
  // Select new element
  element.classList.add('selected');
  selectedElement = element;
  
  // Update label
  const label = element.querySelector('.node-label');
  if (label) {
    label.textContent = label.textContent.replace(' (selected)', '') + ' (selected)';
  }
  
  // Clean other labels
  document.querySelectorAll('.node-label').forEach(l => {
    if (l !== label) {
      l.textContent = l.textContent.replace(' (selected)', '');
    }
  });
  
  updateInfo();
}

function updateInfo() {
  document.getElementById('current-element').textContent = selectedElement.id || 'unnamed';
  document.getElementById('current-parent').textContent = selectedElement.parentElement?.id || 'none';
  
  const children = selectedElement.querySelectorAll(':scope > .tree-node');
  document.getElementById('current-children').textContent = children.length;
  
  const parent = selectedElement.parentElement;
  if (parent) {
    const siblings = parent.querySelectorAll(':scope > .tree-node');
    document.getElementById('current-siblings').textContent = siblings.length - 1;
  } else {
    document.getElementById('current-siblings').textContent = 0;
  }
}

// Navigation functions
function goToParent() {
  const parent = selectedElement.parentElement;
  if (parent && parent.classList.contains('tree-node')) {
    selectElement(parent);
  } else {
    alert('No parent element found!');
  }
}

function goToClosest(selector) {
  const closest = selectedElement.closest(selector);
  if (closest && closest.classList.contains('tree-node')) {
    selectElement(closest);
  } else {
    alert(`No element matching "${selector}" found!`);
  }
}

function goToPrevSibling() {
  let sibling = selectedElement.previousElementSibling;
  while (sibling && !sibling.classList.contains('tree-node')) {
    sibling = sibling.previousElementSibling;
  }
  if (sibling) {
    selectElement(sibling);
  } else {
    alert('No previous sibling found!');
  }
}

function goToNextSibling() {
  let sibling = selectedElement.nextElementSibling;
  while (sibling && !sibling.classList.contains('tree-node')) {
    sibling = sibling.nextElementSibling;
  }
  if (sibling) {
    selectElement(sibling);
  } else {
    alert('No next sibling found!');
  }
}

function goToFirstChild() {
  const children = selectedElement.querySelectorAll(':scope > .tree-node');
  if (children.length > 0) {
    selectElement(children[0]);
  } else {
    alert('No children found!');
  }
}

function goToLastChild() {
  const children = selectedElement.querySelectorAll(':scope > .tree-node');
  if (children.length > 0) {
    selectElement(children[children.length - 1]);
  } else {
    alert('No children found!');
  }
}

function selectAllChildren() {
  const children = selectedElement.querySelectorAll(':scope > .tree-node');
  children.forEach(child => child.classList.add('highlighted'));
  setTimeout(() => {
    children.forEach(child => child.classList.remove('highlighted'));
  }, 1500);
}

function resetSelection() {
  selectedElement = document.getElementById('child-2');
  document.querySelectorAll('.tree-node').forEach(n => {
    n.classList.remove('selected', 'highlighted');
  });
  document.getElementById('child-2').classList.add('selected');
  
  // Reset labels
  document.querySelectorAll('.node-label').forEach(l => {
    l.textContent = l.textContent.replace(' (selected)', '');
  });
  document.querySelector('#child-2 .node-label').textContent = 'Child 2 (selected)';
  
  updateInfo();
}

// Initialize
updateInfo();
console.log('🧭 DOM Traversal Demo loaded!');

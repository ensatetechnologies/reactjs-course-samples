/**
 * Responsive Design Demo
 * Interactive demonstration of responsive web design concepts
 */

// DOM Elements
const viewportSize = document.getElementById('viewport-size');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

/**
 * Initialize the application
 */
function init() {
  // Update viewport size display
  updateViewportIndicator();
  window.addEventListener('resize', updateViewportIndicator);

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking links
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/**
 * Update the viewport indicator based on current window size
 */
function updateViewportIndicator() {
  const width = window.innerWidth;
  viewportSize.textContent = `${width}px`;

  // Update viewport info
  const viewportIcon = document.querySelector('.viewport-icon');
  const viewportName = document.querySelector('.viewport-name');
  
  // Update breakpoint bar
  const breakpoints = document.querySelectorAll('.breakpoint');
  breakpoints.forEach(bp => bp.classList.remove('active'));

  if (width < 768) {
    viewportIcon.textContent = '📱';
    viewportName.textContent = 'Mobile';
    document.querySelector('.breakpoint.mobile').classList.add('active');
  } else if (width < 1024) {
    viewportIcon.textContent = '📱';
    viewportName.textContent = 'Tablet';
    document.querySelector('.breakpoint.tablet').classList.add('active');
  } else if (width < 1440) {
    viewportIcon.textContent = '💻';
    viewportName.textContent = 'Desktop';
    document.querySelector('.breakpoint.desktop').classList.add('active');
  } else {
    viewportIcon.textContent = '🖥️';
    viewportName.textContent = 'Large Desktop';
    document.querySelector('.breakpoint.large').classList.add('active');
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);

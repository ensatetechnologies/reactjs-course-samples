/**
 * CSS Animations & Transitions Demo
 * Interactive demonstration of CSS animation concepts
 */

/**
 * Initialize the application
 */
function init() {
  // Timing function play button
  const playTimingBtn = document.getElementById('play-timing');
  playTimingBtn.addEventListener('click', playTimingDemo);

  // Replay buttons for keyframe animations
  document.querySelectorAll('.replay-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target) {
        replayAnimation(target);
      }
    });
  });

  // Progress bar replay
  const progressReplay = document.getElementById('progress-replay');
  if (progressReplay) {
    progressReplay.addEventListener('click', () => {
      const progressFill = document.querySelector('.progress-fill');
      progressFill.style.animation = 'none';
      progressFill.offsetHeight; // Trigger reflow
      progressFill.style.animation = 'fillProgress 2s ease-out forwards';
    });
  }
}

/**
 * Play the timing functions demonstration
 */
function playTimingDemo() {
  const balls = document.querySelectorAll('.timing-ball');
  
  // Remove animation class
  balls.forEach(ball => {
    ball.classList.remove('animate');
  });

  // Force reflow
  void document.body.offsetHeight;

  // Add animation class with slight delay for visual effect
  setTimeout(() => {
    balls.forEach(ball => {
      ball.classList.add('animate');
    });
  }, 50);

  // Remove class after animation completes to allow replay
  setTimeout(() => {
    balls.forEach(ball => {
      ball.classList.remove('animate');
    });
  }, 2100);
}

/**
 * Replay a keyframe animation
 * @param {string} className - The class of the element to animate
 */
function replayAnimation(className) {
  const element = document.querySelector(`.${className}`);
  if (!element) return;

  // Get the current animation
  const computedStyle = window.getComputedStyle(element);
  const animationName = computedStyle.animationName;

  // Remove animation
  element.style.animation = 'none';

  // Trigger reflow
  element.offsetHeight;

  // Re-add animation
  element.style.animation = '';
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);

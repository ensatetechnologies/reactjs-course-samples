/**
 * 📚 Async Basics - Sync vs Async Demo
 * From: Chapter 17 - Async/Await Complete Guide
 * 
 * Demonstrates the difference between synchronous and asynchronous
 * code execution in JavaScript.
 */

// DOM Elements
const output = document.getElementById('output');
const timeline = document.getElementById('timeline');
const execTime = document.getElementById('execTime');
const breakfastOutput = document.getElementById('breakfastOutput');

// Timing
let startTime = 0;

// Helper: Log to output console
function log(message, type = 'sync') {
  const elapsed = performance.now() - startTime;
  const line = document.createElement('div');
  line.className = 'log-line';
  line.innerHTML = `
    <span class="log-time">${elapsed.toFixed(0)}ms</span>
    <span class="log-${type}">${message}</span>
  `;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

// Helper: Add timeline bar
function addTimelineBar(text, startMs, durationMs, type, row) {
  const bar = document.createElement('div');
  bar.className = `timeline-bar ${type}`;
  bar.textContent = text;
  bar.style.left = `${(startMs / 2000) * 100}%`;
  bar.style.width = `${Math.max((durationMs / 2000) * 100, 10)}%`;
  bar.style.top = `${row * 35}px`;
  timeline.appendChild(bar);
}

// Clear output and timeline
function clearOutput() {
  output.innerHTML = '';
  timeline.innerHTML = '';
  execTime.textContent = '';
}

// ============================================
// SYNCHRONOUS DEMO
// ============================================
function runSyncDemo() {
  clearOutput();
  startTime = performance.now();
  
  log('1. Start', 'sync');
  addTimelineBar('Start', 0, 100, 'sync', 0);
  
  // Simulate "work" with a blocking loop
  log('2. Processing... (blocking)', 'sync');
  addTimelineBar('Processing', 100, 500, 'sync', 1);
  
  // Block for a short time to show synchronous behavior
  const blockEnd = performance.now() + 500;
  while (performance.now() < blockEnd) {
    // Blocking loop
  }
  
  log('3. Still processing...', 'sync');
  addTimelineBar('More work', 600, 400, 'sync', 2);
  
  log('4. End', 'sync');
  addTimelineBar('End', 1000, 100, 'sync', 3);
  
  const totalTime = performance.now() - startTime;
  execTime.textContent = `Total: ${totalTime.toFixed(0)}ms`;
  
  log(`✅ Total time: ${totalTime.toFixed(0)}ms (sequential)`, 'sync');
}

// ============================================
// ASYNCHRONOUS DEMO
// ============================================
function runAsyncDemo() {
  clearOutput();
  startTime = performance.now();
  
  log('1. Start', 'sync');
  addTimelineBar('Start', 0, 100, 'sync', 0);
  
  // Schedule async operation
  log('2. Scheduling async task (setTimeout 1000ms)...', 'async');
  addTimelineBar('setTimeout', 100, 200, 'async', 1);
  
  setTimeout(() => {
    const elapsed = performance.now() - startTime;
    log('4. Async callback executed!', 'callback');
    addTimelineBar('Callback', elapsed, 200, 'callback', 3);
    
    const totalTime = performance.now() - startTime;
    execTime.textContent = `Total: ${totalTime.toFixed(0)}ms`;
  }, 1000);
  
  // This runs BEFORE the setTimeout callback!
  log('3. Continue immediately (non-blocking)', 'sync');
  addTimelineBar('Continue', 300, 300, 'sync', 2);
  
  log('💡 Notice: Line 3 runs before Line 4!', 'sync');
}

// ============================================
// BREAKFAST DEMO - Real World Analogy
// ============================================
function runBreakfastDemo() {
  breakfastOutput.innerHTML = '';
  const logBreakfast = (msg, type = 'sync') => {
    const line = document.createElement('div');
    line.className = 'log-line';
    line.innerHTML = `<span class="log-${type}">${msg}</span>`;
    breakfastOutput.appendChild(line);
  };
  
  logBreakfast('🍳 Starting breakfast preparation...', 'async');
  logBreakfast('', 'sync');
  logBreakfast('📋 ASYNC CHEF (parallel):', 'async');
  
  const asyncStart = performance.now();
  
  // Simulate async breakfast
  logBreakfast('  → Starting toaster... 🍞', 'async');
  logBreakfast('  → Starting kettle... ☕', 'async');
  logBreakfast('  → Preparing coffee grounds... 🫘', 'async');
  
  // Simulate parallel completion
  setTimeout(() => {
    logBreakfast('  ✓ Toast ready!', 'callback');
  }, 1000);
  
  setTimeout(() => {
    logBreakfast('  ✓ Water boiled!', 'callback');
  }, 1500);
  
  setTimeout(() => {
    logBreakfast('  ✓ Coffee ready!', 'callback');
    const asyncTime = performance.now() - asyncStart;
    logBreakfast('', 'sync');
    logBreakfast(`🎉 Async breakfast done in ${asyncTime.toFixed(0)}ms!`, 'callback');
    logBreakfast('', 'sync');
    logBreakfast('💡 All tasks ran in PARALLEL, saving time!', 'async');
  }, 2000);
}

// ============================================
// EVENT LISTENERS
// ============================================
document.getElementById('runSyncBtn').addEventListener('click', runSyncDemo);
document.getElementById('runAsyncBtn').addEventListener('click', runAsyncDemo);
document.getElementById('clearBtn').addEventListener('click', clearOutput);
document.getElementById('runBreakfastDemo').addEventListener('click', runBreakfastDemo);

// Initial message
log('👋 Click a button to see the demo!', 'sync');

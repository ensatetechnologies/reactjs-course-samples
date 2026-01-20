/**
 * 📚 JavaScript Basics Demo
 * From: Chapter 2 - HTML & JavaScript to React
 * 
 * This file demonstrates fundamental JavaScript concepts
 */

// =====================================================
// 📦 VARIABLES DEMO
// =====================================================
function runVariablesDemo() {
  const output = document.getElementById('variables-output');
  let result = '';
  
  // let - can be reassigned
  let name = "John";
  result += `<span class="label">let name = "John"</span>\n`;
  result += `<span class="result">→ name: ${name}</span>\n\n`;
  
  name = "Jane";  // Reassignment allowed
  result += `<span class="label">name = "Jane" (reassigned)</span>\n`;
  result += `<span class="result">→ name: ${name}</span>\n\n`;
  
  // const - cannot be reassigned
  const age = 25;
  result += `<span class="label">const age = 25</span>\n`;
  result += `<span class="result">→ age: ${age}</span>\n\n`;
  
  result += `<span class="label">// const age = 30 would throw an error!</span>`;
  
  output.innerHTML = result;
  console.log("Variables Demo - Check the output box!");
}

// =====================================================
// 📊 DATA TYPES DEMO
// =====================================================
function runDataTypesDemo() {
  const output = document.getElementById('datatypes-output');
  let result = '';
  
  // String
  const string = "Hello World";
  result += `<span class="label">String:</span> "${string}" <span class="result">→ typeof: ${typeof string}</span>\n`;
  
  // Number
  const number = 42;
  result += `<span class="label">Number:</span> ${number} <span class="result">→ typeof: ${typeof number}</span>\n`;
  
  // Boolean
  const boolean = true;
  result += `<span class="label">Boolean:</span> ${boolean} <span class="result">→ typeof: ${typeof boolean}</span>\n`;
  
  // Array
  const array = [1, 2, 3, "four", true];
  result += `<span class="label">Array:</span> [${array.join(', ')}] <span class="result">→ Array.isArray: ${Array.isArray(array)}</span>\n`;
  
  // Object
  const object = { name: "John", age: 25 };
  result += `<span class="label">Object:</span> ${JSON.stringify(object)} <span class="result">→ typeof: ${typeof object}</span>\n`;
  
  // Null and Undefined
  const nullValue = null;
  let undefinedValue;
  result += `<span class="label">Null:</span> ${nullValue} <span class="result">→ typeof: ${typeof nullValue}</span>\n`;
  result += `<span class="label">Undefined:</span> ${undefinedValue} <span class="result">→ typeof: ${typeof undefinedValue}</span>`;
  
  output.innerHTML = result;
  console.log("Data Types Demo - Check the output box!");
}

// =====================================================
// ⚡ FUNCTIONS DEMO
// =====================================================

// Regular function
function greet(name) {
  return `Hello, ${name}!`;
}

// Arrow function (modern syntax)
const greetArrow = (name) => `Hello, ${name}! (Arrow function)`;

// Function with default parameter
const greetWithDefault = (name = "Guest") => `Welcome, ${name}!`;

function runFunctionsDemo() {
  const output = document.getElementById('functions-output');
  const nameInput = document.getElementById('name-input').value;
  let result = '';
  
  const inputName = nameInput || "World";
  
  result += `<span class="label">Regular function:</span>\n`;
  result += `<span class="result">→ ${greet(inputName)}</span>\n\n`;
  
  result += `<span class="label">Arrow function:</span>\n`;
  result += `<span class="result">→ ${greetArrow(inputName)}</span>\n\n`;
  
  result += `<span class="label">Function with default:</span>\n`;
  result += `<span class="result">→ ${greetWithDefault()}</span>`;
  
  output.innerHTML = result;
  console.log("Functions Demo - Check the output box!");
}

// =====================================================
// 🔀 CONDITIONALS DEMO
// =====================================================
function runConditionalsDemo() {
  const output = document.getElementById('conditionals-output');
  const ageInput = document.getElementById('age-input').value;
  let result = '';
  
  const age = parseInt(ageInput) || 0;
  
  result += `<span class="label">Age entered: ${age}</span>\n\n`;
  
  // if-else statement
  if (age >= 18) {
    result += `<span class="result">✅ You are an adult (age >= 18)</span>\n`;
  } else if (age >= 13) {
    result += `<span class="result">👦 You are a teenager (13-17)</span>\n`;
  } else if (age > 0) {
    result += `<span class="result">👶 You are a child (< 13)</span>\n`;
  } else {
    result += `<span class="result">⚠️ Please enter a valid age!</span>\n`;
  }
  
  // Ternary operator
  result += `\n<span class="label">Ternary check:</span>\n`;
  const status = age >= 18 ? "Can vote" : "Cannot vote yet";
  result += `<span class="result">→ Voting status: ${status}</span>`;
  
  output.innerHTML = result;
  console.log("Conditionals Demo - Check the output box!");
}

// =====================================================
// 🔄 LOOPS DEMO
// =====================================================
function runLoopsDemo() {
  const output = document.getElementById('loops-output');
  let result = '';
  
  // For loop
  result += `<span class="label">For loop (0 to 4):</span>\n`;
  let forResult = [];
  for (let i = 0; i < 5; i++) {
    forResult.push(i);
  }
  result += `<span class="result">→ [${forResult.join(', ')}]</span>\n\n`;
  
  // forEach
  const fruits = ['🍎 Apple', '🍌 Banana', '🍊 Orange'];
  result += `<span class="label">forEach on array:</span>\n`;
  fruits.forEach((fruit, index) => {
    result += `<span class="result">  ${index}: ${fruit}</span>\n`;
  });
  
  // map
  result += `\n<span class="label">map (double numbers):</span>\n`;
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(n => n * 2);
  result += `<span class="result">→ [${numbers.join(', ')}] → [${doubled.join(', ')}]</span>\n\n`;
  
  // filter
  result += `<span class="label">filter (even numbers):</span>\n`;
  const evenNumbers = numbers.filter(n => n % 2 === 0);
  result += `<span class="result">→ [${numbers.join(', ')}] → [${evenNumbers.join(', ')}]</span>`;
  
  output.innerHTML = result;
  console.log("Loops Demo - Check the output box!");
}

// Initial message
console.log("📚 JavaScript Basics Demo loaded!");
console.log("Click the buttons to see demos in action.");

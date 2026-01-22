import { useState } from 'react'
import './App.css'

// Demonstrating const vs let vs var behavior
function App() {
  const [activeSection, setActiveSection] = useState('comparison')
  const [logs, setLogs] = useState([])

  // Helper to add log messages
  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { message, type, id: Date.now() }])
  }

  const clearLogs = () => setLogs([])

  // Demo 1: const vs let vs var comparison
  const demoComparison = () => {
    clearLogs()
    
    // const - cannot reassign
    const PI = 3.14159
    addLog(`const PI = ${PI}`, 'const')
    addLog('Attempting PI = 3.14... would cause TypeError!', 'error')
    
    // let - can reassign
    let counter = 0
    addLog(`let counter = ${counter}`, 'let')
    counter = 1
    addLog(`counter = 1 → counter is now ${counter}`, 'let')
    
    // var - can reassign and redeclare (legacy)
    var name = 'Alice'
    addLog(`var name = "${name}"`, 'var')
    var name = 'Bob' // Redeclaration allowed with var!
    addLog(`var name = "Bob" (redeclared!) → name is "${name}"`, 'var')
    
    addLog('✅ const prevents accidental reassignment', 'success')
    addLog('⚠️ var allows redeclaration - avoid using it!', 'warning')
  }

  // Demo 2: Block Scope
  const demoBlockScope = () => {
    clearLogs()
    
    addLog('Testing block scope with if statement:', 'info')
    
    if (true) {
      const blockConst = 'I am const inside block'
      let blockLet = 'I am let inside block'
      var blockVar = 'I am var inside block'
      
      addLog(`Inside block - const: "${blockConst}"`, 'const')
      addLog(`Inside block - let: "${blockLet}"`, 'let')
      addLog(`Inside block - var: "${blockVar}"`, 'var')
    }
    
    // blockConst and blockLet are not accessible here
    addLog('Outside block:', 'info')
    addLog('const and let are NOT accessible (block-scoped) ✅', 'success')
    addLog(`var IS accessible: "${blockVar}" (function-scoped) ⚠️`, 'warning')
    
    addLog('', 'info')
    addLog('🔑 const/let = Block Scope (safer)', 'success')
    addLog('⚠️ var = Function Scope (can leak!)', 'warning')
  }

  // Demo 3: Loop Scope with closures
  const demoLoopScope = () => {
    clearLogs()
    
    addLog('Creating button handlers with let vs var:', 'info')
    
    // Using let (correct behavior)
    const letButtons = []
    for (let i = 0; i < 3; i++) {
      letButtons.push(() => i)
    }
    
    addLog('With let in loop:', 'let')
    letButtons.forEach((btn, idx) => {
      addLog(`  Button ${idx} returns: ${btn()}`, 'success')
    })
    
    // Using var (incorrect behavior)
    const varButtons = []
    for (var j = 0; j < 3; j++) {
      varButtons.push(() => j)
    }
    
    addLog('With var in loop:', 'var')
    varButtons.forEach((btn, idx) => {
      addLog(`  Button ${idx} returns: ${btn()} (all same! 😱)`, 'error')
    })
    
    addLog('', 'info')
    addLog('let creates new binding each iteration ✅', 'success')
    addLog('var shares same binding across iterations ❌', 'error')
  }

  // Demo 4: Hoisting and TDZ
  const demoHoisting = () => {
    clearLogs()
    
    addLog('Hoisting & Temporal Dead Zone (TDZ):', 'info')
    addLog('', 'info')
    
    // var hoisting
    addLog('var behavior (hoisted to undefined):', 'var')
    addLog('  Accessing varValue before declaration...', 'info')
    // In real code: console.log(varValue) would be undefined
    var varValue = 'I am var'
    addLog(`  var is hoisted but undefined until assigned`, 'warning')
    
    addLog('', 'info')
    
    // let/const TDZ
    addLog('let/const behavior (Temporal Dead Zone):', 'const')
    addLog('  Accessing constValue before declaration...', 'info')
    addLog('  Would throw ReferenceError! 🛑', 'error')
    const constValue = 'I am const'
    addLog(`  After declaration: "${constValue}"`, 'success')
    
    addLog('', 'info')
    addLog('🔑 TDZ catches bugs by throwing errors early!', 'success')
  }

  // Demo 5: Must Initialize const
  const demoInitialization = () => {
    clearLogs()
    
    addLog('const requires initialization:', 'info')
    addLog('', 'info')
    
    // Valid const declarations
    const name = 'John'
    const age = 25
    const isActive = true
    const nothing = null
    const empty = undefined
    
    addLog(`const name = "${name}" ✅`, 'const')
    addLog(`const age = ${age} ✅`, 'const')
    addLog(`const isActive = ${isActive} ✅`, 'const')
    addLog(`const nothing = ${nothing} ✅`, 'const')
    addLog(`const empty = ${empty} ✅`, 'const')
    
    addLog('', 'info')
    addLog('Invalid: const x; // SyntaxError! ❌', 'error')
    addLog('', 'info')
    
    // let doesn't require initialization
    let uninitializedLet
    addLog(`let uninitializedLet; // Valid, value is: ${uninitializedLet}`, 'let')
    
    addLog('', 'info')
    addLog('🔑 const MUST be initialized at declaration', 'success')
  }

  const sections = {
    comparison: { title: '⚖️ const vs let vs var', action: demoComparison },
    scope: { title: '🔲 Block Scope', action: demoBlockScope },
    loops: { title: '🔄 Loops & Closures', action: demoLoopScope },
    hoisting: { title: '⬆️ Hoisting & TDZ', action: demoHoisting },
    initialization: { title: '📝 Initialization', action: demoInitialization },
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🔒 JavaScript const Basics</h1>
        <p>Understanding const, let, var, scope, and the Temporal Dead Zone</p>
      </header>

      <div className="content">
        <nav className="nav">
          {Object.entries(sections).map(([key, { title }]) => (
            <button
              key={key}
              className={`nav-btn ${activeSection === key ? 'active' : ''}`}
              onClick={() => setActiveSection(key)}
            >
              {title}
            </button>
          ))}
        </nav>

        <div className="demo-section">
          <div className="demo-header">
            <h2>{sections[activeSection].title}</h2>
            <button className="run-btn" onClick={sections[activeSection].action}>
              ▶️ Run Demo
            </button>
          </div>

          <div className="code-examples">
            {activeSection === 'comparison' && (
              <pre className="code-block">
{`// const - cannot be reassigned
const PI = 3.14159;
PI = 3.14;  // ❌ TypeError!

// let - can be reassigned
let counter = 0;
counter = 1;  // ✅ Works

// var - can be reassigned AND redeclared
var name = "Alice";
var name = "Bob";  // ✅ Works (but confusing!)`}
              </pre>
            )}
            {activeSection === 'scope' && (
              <pre className="code-block">
{`if (true) {
  const x = 10;  // Block-scoped
  let y = 20;    // Block-scoped
  var z = 30;    // Function-scoped
}

console.log(x);  // ❌ ReferenceError
console.log(y);  // ❌ ReferenceError
console.log(z);  // ✅ 30 (leaked out!)`}
              </pre>
            )}
            {activeSection === 'loops' && (
              <pre className="code-block">
{`// With let - each iteration gets own binding
for (let i = 0; i < 3; i++) {
  buttons.push(() => console.log(i));
}
// Logs: 0, 1, 2 ✅

// With var - all share same binding
for (var j = 0; j < 3; j++) {
  buttons.push(() => console.log(j));
}
// Logs: 3, 3, 3 😱`}
              </pre>
            )}
            {activeSection === 'hoisting' && (
              <pre className="code-block">
{`// var - hoisted to undefined
console.log(a);  // undefined
var a = 5;

// let/const - Temporal Dead Zone
console.log(b);  // ❌ ReferenceError!
const b = 10;    // Cannot access before init

// TDZ catches bugs early!`}
              </pre>
            )}
            {activeSection === 'initialization' && (
              <pre className="code-block">
{`// const MUST be initialized
const name = "John";  // ✅ Valid
const age;            // ❌ SyntaxError!

// let can be uninitialized
let count;            // ✅ Valid (undefined)
count = 10;           // ✅ Assign later

// var can be uninitialized
var value;            // ✅ Valid (undefined)`}
              </pre>
            )}
          </div>

          <div className="console">
            <div className="console-header">
              <span>📟 Console Output</span>
              <button className="clear-btn" onClick={clearLogs}>Clear</button>
            </div>
            <div className="console-body">
              {logs.length === 0 ? (
                <div className="console-empty">Click "Run Demo" to see results</div>
              ) : (
                logs.map(log => (
                  <div key={log.id} className={`log-line ${log.type}`}>
                    {log.message}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="summary-card">
          <h3>📋 Quick Reference</h3>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="var-col">var</th>
                <th className="let-col">let</th>
                <th className="const-col">const</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Scope</td>
                <td>Function</td>
                <td>Block</td>
                <td>Block</td>
              </tr>
              <tr>
                <td>Reassign</td>
                <td>✅</td>
                <td>✅</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Redeclare</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Hoisting</td>
                <td>undefined</td>
                <td>TDZ</td>
                <td>TDZ</td>
              </tr>
              <tr>
                <td>Must Init</td>
                <td>❌</td>
                <td>❌</td>
                <td>✅</td>
              </tr>
              <tr>
                <td>Use?</td>
                <td className="avoid">Avoid</td>
                <td className="sometimes">When needed</td>
                <td className="default">Default</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App

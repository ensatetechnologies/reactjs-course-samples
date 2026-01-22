import { useState } from 'react'
import './App.css'

// Type inference demonstrations
function App() {
  const [activeTab, setActiveTab] = useState<'primitives' | 'objects' | 'arrays' | 'functions'>('primitives')

  return (
    <div className="app">
      <header className="header">
        <h1>🔷 TypeScript const Inference</h1>
        <p>How const affects type inference and enables literal types</p>
      </header>

      <div className="content">
        <nav className="tabs">
          {(['primitives', 'objects', 'arrays', 'functions'] as const).map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {activeTab === 'primitives' && <PrimitivesDemo />}
        {activeTab === 'objects' && <ObjectsDemo />}
        {activeTab === 'arrays' && <ArraysDemo />}
        {activeTab === 'functions' && <FunctionsDemo />}

        <div className="key-insight">
          <h3>🔑 Key Insight</h3>
          <p>
            <code>const</code> in TypeScript narrows types to their <strong>literal values</strong>,
            while <code>let</code> infers <strong>wider types</strong> that allow reassignment.
          </p>
        </div>
      </div>
    </div>
  )
}

function PrimitivesDemo() {
  return (
    <section className="demo-section">
      <h2>📝 Primitive Types</h2>
      
      <div className="comparison-grid">
        <div className="comparison-card const-card">
          <h3>const (Literal Type)</h3>
          <div className="code-block">
            <pre>{`const name = "Alice";
// Type: "Alice" (literal)

const age = 25;
// Type: 25 (literal)

const isActive = true;
// Type: true (literal)`}</pre>
          </div>
          <div className="type-badge literal">Narrow/Literal Types</div>
        </div>

        <div className="comparison-card let-card">
          <h3>let (Wide Type)</h3>
          <div className="code-block">
            <pre>{`let name = "Alice";
// Type: string (wide)

let age = 25;
// Type: number (wide)

let isActive = true;
// Type: boolean (wide)`}</pre>
          </div>
          <div className="type-badge wide">Wide/Mutable Types</div>
        </div>
      </div>

      <div className="explanation">
        <h4>Why Does This Matter?</h4>
        <div className="example-box">
          <pre>{`type Status = "pending" | "approved" | "rejected";

// ✅ Works with const
const status1 = "pending";
const order1: { status: Status } = { status: status1 };

// ❌ Error with let!
let status2 = "pending";
// Error: Type 'string' is not assignable to type 'Status'
// const order2: { status: Status } = { status: status2 };`}</pre>
        </div>
      </div>
    </section>
  )
}

function ObjectsDemo() {
  return (
    <section className="demo-section">
      <h2>📦 Object Types</h2>
      
      <div className="comparison-grid">
        <div className="comparison-card const-card">
          <h3>const Object (Mutable Contents!)</h3>
          <div className="code-block">
            <pre>{`const user = {
  name: "Alice",
  age: 25
};

// Type: { name: string; age: number }
// NOT: { name: "Alice"; age: 25 }

user.name = "Bob";  // ✅ Allowed!
user.age = 30;      // ✅ Allowed!

// user = {};       // ❌ Can't reassign`}</pre>
          </div>
          <div className="type-badge warning">Properties Still Mutable!</div>
        </div>

        <div className="comparison-card as-const-card">
          <h3>as const (Deep Readonly)</h3>
          <div className="code-block">
            <pre>{`const user = {
  name: "Alice",
  age: 25
} as const;

// Type: { readonly name: "Alice"; 
//         readonly age: 25 }

// user.name = "Bob";  // ❌ Error!
// user.age = 30;      // ❌ Error!`}</pre>
          </div>
          <div className="type-badge literal">Literal + Readonly</div>
        </div>
      </div>

      <div className="explanation">
        <h4>The <code>as const</code> Pattern</h4>
        <div className="example-box">
          <pre>{`// Without as const - properties are wide types
const config = { 
  env: "production", 
  port: 3000 
};
// Type: { env: string; port: number }

// With as const - properties are literal types
const configStrict = { 
  env: "production", 
  port: 3000 
} as const;
// Type: { readonly env: "production"; readonly port: 3000 }

type Env = typeof configStrict.env; // "production"`}</pre>
        </div>
      </div>
    </section>
  )
}

function ArraysDemo() {
  return (
    <section className="demo-section">
      <h2>📚 Array Types</h2>
      
      <div className="comparison-grid">
        <div className="comparison-card const-card">
          <h3>const Array (Mutable!)</h3>
          <div className="code-block">
            <pre>{`const colors = ["red", "green", "blue"];
// Type: string[]

colors.push("yellow");  // ✅ Allowed!
colors[0] = "purple";   // ✅ Allowed!

// colors = [];         // ❌ Can't reassign`}</pre>
          </div>
          <div className="type-badge warning">Elements Mutable</div>
        </div>

        <div className="comparison-card as-const-card">
          <h3>as const (Tuple)</h3>
          <div className="code-block">
            <pre>{`const colors = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]

// colors.push("yellow"); // ❌ Error!
// colors[0] = "purple";  // ❌ Error!

type Color = typeof colors[number];
// "red" | "green" | "blue"`}</pre>
          </div>
          <div className="type-badge literal">Readonly Tuple</div>
        </div>
      </div>

      <div className="explanation">
        <h4>Creating Union Types from Arrays</h4>
        <div className="example-box">
          <pre>{`// Common pattern: derive union type from array
const STATUSES = ["pending", "active", "done"] as const;
type Status = typeof STATUSES[number];
// Type: "pending" | "active" | "done"

// Without as const, this would be 'string'!

function setStatus(status: Status) {
  // TypeScript ensures only valid statuses
}

setStatus("pending");  // ✅
setStatus("active");   // ✅
setStatus("invalid");  // ❌ Error!`}</pre>
        </div>
      </div>
    </section>
  )
}

function FunctionsDemo() {
  return (
    <section className="demo-section">
      <h2>⚡ Function Parameters</h2>
      
      <div className="comparison-grid">
        <div className="comparison-card problem-card">
          <h3>❌ The Problem</h3>
          <div className="code-block">
            <pre>{`function request(method: "GET" | "POST") {
  // ...
}

const method = "GET";
request(method);  // ✅ Works

let method2 = "GET";
request(method2);  // ❌ Error!
// Argument of type 'string' is not 
// assignable to parameter of type 
// '"GET" | "POST"'`}</pre>
          </div>
          <div className="type-badge error">let Widens Type</div>
        </div>

        <div className="comparison-card solution-card">
          <h3>✅ The Solutions</h3>
          <div className="code-block">
            <pre>{`// Solution 1: Use const
const method = "GET";
request(method);  // ✅

// Solution 2: Type assertion
let method2 = "GET" as const;
request(method2);  // ✅

// Solution 3: Explicit type annotation
let method3: "GET" | "POST" = "GET";
request(method3);  // ✅`}</pre>
          </div>
          <div className="type-badge success">Multiple Options</div>
        </div>
      </div>

      <div className="explanation">
        <h4>Real-World Example: Fetch Options</h4>
        <div className="example-box">
          <pre>{`// TypeScript's fetch expects literal method types
const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" }
};
// options.method is 'string', not "POST"!

// fetch("/api", options); // ❌ May error

// Fix with as const:
const options2 = {
  method: "POST",
  headers: { "Content-Type": "application/json" }
} as const;

// fetch("/api", options2); // ✅ Works!`}</pre>
        </div>
      </div>
    </section>
  )
}

export default App

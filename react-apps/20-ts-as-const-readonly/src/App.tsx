import { useState } from 'react'
import './App.css'

// Example types for demonstrations
interface User {
  readonly id: number;
  name: string;
  email: string;
}

type ImmutableUser = Readonly<User>;

function App() {
  const [activeSection, setActiveSection] = useState<'asConst' | 'readonly' | 'readonlyT' | 'comparison'>('asConst')

  const sections = {
    asConst: 'as const',
    readonly: 'readonly modifier',
    readonlyT: 'Readonly<T>',
    comparison: 'Comparison',
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🔒 as const & Readonly</h1>
        <p>TypeScript patterns for immutable data structures</p>
      </header>

      <div className="content">
        <nav className="nav">
          {(Object.keys(sections) as Array<keyof typeof sections>).map(key => (
            <button
              key={key}
              className={`nav-btn ${activeSection === key ? 'active' : ''}`}
              onClick={() => setActiveSection(key)}
            >
              {sections[key]}
            </button>
          ))}
        </nav>

        {activeSection === 'asConst' && <AsConstDemo />}
        {activeSection === 'readonly' && <ReadonlyModifierDemo />}
        {activeSection === 'readonlyT' && <ReadonlyTypeDemo />}
        {activeSection === 'comparison' && <ComparisonDemo />}
      </div>
    </div>
  )
}

function AsConstDemo() {
  return (
    <section className="demo-section">
      <h2>✨ as const Assertion</h2>
      <p className="intro">Makes all properties deeply readonly AND infers literal types</p>

      <div className="example-grid">
        <div className="example-card">
          <h3>📦 With Objects</h3>
          <div className="code-block">
            <pre>{`const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
} as const;

// Type is:
// {
//   readonly apiUrl: "https://api.example.com";
//   readonly timeout: 5000;
//   readonly retries: 3;
// }

// config.timeout = 10000;  // ❌ Error!

// Extract literal type:
type Timeout = typeof config.timeout; // 5000`}</pre>
          </div>
        </div>

        <div className="example-card">
          <h3>📚 With Arrays</h3>
          <div className="code-block">
            <pre>{`const ROLES = ["admin", "user", "guest"] as const;
// Type: readonly ["admin", "user", "guest"]

// Create union type from array:
type Role = typeof ROLES[number];
// Type: "admin" | "user" | "guest"

// ROLES.push("superadmin");  // ❌ Error!
// ROLES[0] = "superuser";    // ❌ Error!

function assignRole(role: Role) {
  // Only accepts literal values
}

assignRole("admin");   // ✅
assignRole("invalid"); // ❌ Error!`}</pre>
          </div>
        </div>

        <div className="example-card full-width">
          <h3>🎯 Common Pattern: Action Types</h3>
          <div className="code-block">
            <pre>{`// Define action types as const
const ActionTypes = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
} as const;

// Extract action type union
type ActionType = typeof ActionTypes[keyof typeof ActionTypes];
// Type: "ADD_TODO" | "REMOVE_TODO" | "TOGGLE_TODO"

// Use in reducer
interface Action {
  type: ActionType;
  payload?: unknown;
}

function reducer(state: unknown, action: Action) {
  switch (action.type) {
    case ActionTypes.ADD_TODO:    // Autocomplete works!
    case ActionTypes.REMOVE_TODO:
    case ActionTypes.TOGGLE_TODO:
      // ...
  }
}`}</pre>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReadonlyModifierDemo() {
  return (
    <section className="demo-section">
      <h2>🔐 readonly Modifier</h2>
      <p className="intro">Marks individual properties as immutable at the type level</p>

      <div className="example-grid">
        <div className="example-card">
          <h3>📝 Interface Properties</h3>
          <div className="code-block">
            <pre>{`interface User {
  readonly id: number;      // Can't change
  readonly createdAt: Date; // Can't change
  name: string;             // Can change
  email: string;            // Can change
}

const user: User = {
  id: 1,
  createdAt: new Date(),
  name: "Alice",
  email: "alice@example.com"
};

user.name = "Bob";      // ✅ Allowed
user.email = "b@x.com"; // ✅ Allowed

// user.id = 2;           // ❌ Error!
// user.createdAt = new Date(); // ❌ Error!`}</pre>
          </div>
        </div>

        <div className="example-card">
          <h3>📚 Readonly Arrays</h3>
          <div className="code-block">
            <pre>{`// Using ReadonlyArray<T>
const numbers: ReadonlyArray<number> = [1, 2, 3];

// Or shorthand syntax:
const letters: readonly string[] = ["a", "b", "c"];

// Reading is allowed
console.log(numbers[0]);     // ✅
console.log(letters.length); // ✅

// Mutating methods are blocked
// numbers.push(4);     // ❌ Error!
// letters[0] = "x";    // ❌ Error!
// numbers.pop();       // ❌ Error!

// Non-mutating methods work
const doubled = numbers.map(n => n * 2); // ✅
const filtered = letters.filter(l => l !== "a"); // ✅`}</pre>
          </div>
        </div>

        <div className="example-card full-width">
          <h3>⚠️ Important: readonly is Shallow!</h3>
          <div className="code-block">
            <pre>{`interface Team {
  readonly name: string;
  readonly members: string[];  // Array reference is readonly
}

const team: Team = {
  name: "Engineering",
  members: ["Alice", "Bob"]
};

// team.name = "Product";    // ❌ Error!
// team.members = [];         // ❌ Error! Can't reassign

team.members.push("Charlie"); // ✅ But mutation works!
team.members[0] = "Zoe";      // ✅ This also works!

// To prevent this, use:
interface SafeTeam {
  readonly name: string;
  readonly members: readonly string[];  // Elements also readonly
}`}</pre>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReadonlyTypeDemo() {
  return (
    <section className="demo-section">
      <h2>📦 Readonly&lt;T&gt; Utility Type</h2>
      <p className="intro">Makes ALL properties of T readonly (shallow)</p>

      <div className="example-grid">
        <div className="example-card">
          <h3>🔄 Converting Types</h3>
          <div className="code-block">
            <pre>{`interface MutableUser {
  id: number;
  name: string;
  email: string;
}

// Make all properties readonly
type ImmutableUser = Readonly<MutableUser>;

// Equivalent to:
// {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
// }

const user: ImmutableUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

// user.name = "Bob";  // ❌ Error!`}</pre>
          </div>
        </div>

        <div className="example-card">
          <h3>⚡ Function Parameters</h3>
          <div className="code-block">
            <pre>{`interface Config {
  apiUrl: string;
  timeout: number;
}

// Prevent accidental mutations in functions
function validateConfig(config: Readonly<Config>) {
  // Can read all properties
  console.log(config.apiUrl);
  console.log(config.timeout);
  
  // config.timeout = 0;  // ❌ Error!
  // Can't accidentally mutate!
}

const myConfig = { apiUrl: "...", timeout: 5000 };
validateConfig(myConfig);  // ✅

// Original is still mutable
myConfig.timeout = 10000;  // ✅`}</pre>
          </div>
        </div>

        <div className="example-card">
          <h3>🔁 DeepReadonly Pattern</h3>
          <div className="code-block">
            <pre>{`// Readonly<T> is shallow - nested objects stay mutable

interface NestedConfig {
  server: {
    host: string;
    port: number;
  };
}

type ShallowReadonly = Readonly<NestedConfig>;
// server itself is readonly, but server.host isn't!

// For deep readonly, create a recursive type:
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object 
    ? DeepReadonly<T[P]> 
    : T[P];
};

type FullyImmutable = DeepReadonly<NestedConfig>;
// Now server.host and server.port are also readonly!`}</pre>
          </div>
        </div>

        <div className="example-card">
          <h3>🎯 React Props Pattern</h3>
          <div className="code-block">
            <pre>{`interface TodoProps {
  todo: {
    id: number;
    text: string;
    done: boolean;
  };
  onToggle: (id: number) => void;
}

// Props should generally be treated as readonly
function TodoItem({ todo, onToggle }: Readonly<TodoProps>) {
  // todo.done = true;  // ❌ TypeScript prevents this!
  
  return (
    <div onClick={() => onToggle(todo.id)}>
      {todo.text}
    </div>
  );
}

// Note: React already makes props readonly at runtime,
// but Readonly<T> adds type-level safety!`}</pre>
          </div>
        </div>
      </div>
    </section>
  )
}

function ComparisonDemo() {
  return (
    <section className="demo-section">
      <h2>📊 Comparison</h2>
      <p className="intro">When to use each immutability pattern</p>

      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>as const</th>
              <th>readonly modifier</th>
              <th>Readonly&lt;T&gt;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Scope</td>
              <td>Deep (recursive)</td>
              <td>Individual properties</td>
              <td>Shallow (top-level)</td>
            </tr>
            <tr>
              <td>Literal Types</td>
              <td className="yes">✅ Yes</td>
              <td className="no">❌ No</td>
              <td className="no">❌ No</td>
            </tr>
            <tr>
              <td>Use Case</td>
              <td>Constants, config, enums</td>
              <td>Interface design</td>
              <td>Function params, state</td>
            </tr>
            <tr>
              <td>Applied To</td>
              <td>Values (expressions)</td>
              <td>Type definitions</td>
              <td>Type transformations</td>
            </tr>
            <tr>
              <td>Runtime Effect</td>
              <td className="no">None</td>
              <td className="no">None</td>
              <td className="no">None</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="use-cases">
        <div className="use-case-card">
          <h3>✅ Use <code>as const</code> when:</h3>
          <ul>
            <li>Defining configuration objects</li>
            <li>Creating string literal unions from arrays</li>
            <li>Defining action types for reducers</li>
            <li>You want both readonly AND literal types</li>
          </ul>
        </div>

        <div className="use-case-card">
          <h3>✅ Use <code>readonly</code> modifier when:</h3>
          <ul>
            <li>Designing interfaces with some immutable properties</li>
            <li>Marking IDs, timestamps as unchangeable</li>
            <li>Creating readonly tuple types</li>
            <li>Fine-grained control over mutability</li>
          </ul>
        </div>

        <div className="use-case-card">
          <h3>✅ Use <code>Readonly&lt;T&gt;</code> when:</h3>
          <ul>
            <li>Making function parameters immutable</li>
            <li>Protecting state from accidental mutation</li>
            <li>Creating immutable versions of existing types</li>
            <li>Working with React props</li>
          </ul>
        </div>
      </div>

      <div className="tip-box">
        <h4>💡 Pro Tip</h4>
        <p>
          Remember: All these patterns only provide <strong>compile-time</strong> safety.
          At runtime, JavaScript doesn't enforce readonly. Use <code>Object.freeze()</code>
          if you need runtime immutability too!
        </p>
      </div>
    </section>
  )
}

export default App

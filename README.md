# 🚀 ReactJS Course - Sample Applications

A comprehensive collection of sample applications demonstrating the journey from HTML/JavaScript to React.

## 📚 Course Chapters

| Chapter | Topics Covered | Apps |
|---------|----------------|------|
| **Chapter 2** | HTML, JavaScript to React | 8 apps |
| **Chapter 3** | DOM Complete Guide | 6 apps |
| **Chapter 3.1** | DOM Reflow & Performance | 5 apps |
| **Chapter 5** | JavaScript vs TypeScript | 5 apps |
| **Chapter 9** | CSS & Stylesheets Complete Guide | 9 apps |
| **Spread Operator** | Arrays, Objects, React State | 3 apps |
| **Chapter 11** | React Styling Deep Dive | 5 apps |

**Total: 32 Sample Applications**

## 🎯 Quick Start

```bash
# Clone the repository
git clone https://github.com/ensatetechnologies/reactjs-course-samples.git
cd reactjs-course-samples

# For Vanilla JS samples - just open in browser
start vanilla-js/01-basic-html-structure/index.html

# For React apps (JavaScript)
cd react-apps/09-todo-javascript
npm install
npm run dev

# For React apps (TypeScript)
cd react-apps/10-todo-typescript
npm install
npm run dev
```

## 📂 Repository Structure

```
reactjs-course-samples/
├── vanilla-js/
│   │
│   │   # Chapter 2: HTML & JS Basics
│   ├── 01-basic-html-structure/
│   ├── 02-javascript-basics/
│   ├── 03-connecting-js-html/
│   ├── 04-counter-vanilla/
│   ├── 05-todo-vanilla/
│   │
│   │   # Chapter 3: DOM Complete Guide
│   ├── 01-dom-selection/
│   ├── 02-dom-manipulation/
│   ├── 03-element-creation/
│   ├── 04-todo-dom/
│   ├── 05-event-handling/
│   ├── 06-dom-traversal/
│   │
│   │   # Chapter 3.1: DOM Reflow
│   ├── 01-reflow-problem/
│   ├── 02-document-fragment/
│   ├── 03-read-write-pattern/
│   ├── 04-performance-demo/
│   │
│   │   # Chapter 5: JS vs TS
│   ├── 07-js-basics-comparison/
│   │
│   │   # Chapter 9: CSS & Stylesheets
│   ├── 09-css-selectors/       # CSS selector playground
│   ├── 09-box-model/           # Box model visualizer
│   ├── 09-flexbox/             # Flexbox patterns
│   ├── 09-css-grid/            # CSS Grid layouts
│   ├── 09-responsive/          # Responsive design & media queries
│   ├── 09-animations/          # Transitions & keyframes
│   │
│   │   # Spread Operator Chapter
│   ├── 13-spread-arrays/
│   ├── 14-spread-objects/
│   │
│   │   # Chapter 11: React Styling
│   └── 11-traditional-css/         # Traditional HTML/CSS/JS approach
│
└── react-apps/
    │
    │   # Chapter 2: React Intro
    ├── 05-react-vdom-demo/
    ├── 06-counter-react/
    ├── 07-todo-react/
    ├── 08-usercard-react/
    │
    │   # Chapter 5: JS vs TS Comparison
    ├── 09-todo-javascript/      # Todo in JavaScript
    ├── 10-todo-typescript/      # Todo in TypeScript
    ├── 11-usercard-javascript/  # UserCard in JavaScript
    ├── 12-usercard-typescript/  # UserCard in TypeScript
    │
    │   # Chapter 9: CSS in React
    ├── 09-css-modules/          # CSS Modules with scoped styles
    ├── 09-react-bootstrap/      # React-Bootstrap components
    ├── 09-responsive-hooks/     # useMediaQuery custom hook
    │
    │   # Spread Operator Chapter
    ├── 15-task-manager-spread/     # Full Task Manager demo
    │
    │   # Chapter 11: React Styling
    ├── 11-inline-styles/           # React inline styles
    ├── 11-css-modules-demo/        # CSS Modules (recommended)
    ├── 11-styled-components/       # CSS-in-JS styling
    └── 11-student-management/      # Complete styled app
```

## 🎓 Learning Path

### Chapter 2: From HTML/JS to React
Learn why React was created by experiencing the pain points of vanilla JavaScript:
- **Basic HTML** - Document structure
- **JavaScript Fundamentals** - Variables, functions, DOM
- **Counter (Vanilla)** - Manual state/UI sync pain
- **Todo (Vanilla)** - Complex DOM manipulation
- **Counter (React)** - Declarative, simple state
- **Todo (React)** - Same app, 50% less code!

### Chapter 3: DOM Complete Guide
Master DOM manipulation:
- **Selection** - getElementById, querySelector, querySelectorAll
- **Manipulation** - textContent, innerHTML, classList
- **Creation** - createElement, appendChild, DocumentFragment
- **Events** - addEventListener, bubbling, delegation
- **Traversal** - parent, children, siblings

### Chapter 3.1: DOM Reflow & Performance
Understand browser rendering performance:
- **What triggers reflows** - Layout property changes
- **DocumentFragment** - Batch DOM updates
- **Read-Write Pattern** - Avoid forced layout
- **Virtual DOM** - How React optimizes automatically

### Chapter 5: JavaScript vs TypeScript
Understand the differences between JS and TS in React:
- **Syntax Comparison** - Variables, functions, objects, arrays
- **Todo App (JS)** - Without type annotations
- **Todo App (TS)** - With full type safety
- **UserCard (JS)** - Component props without types
- **UserCard (TS)** - Component props with interfaces

### Spread Operator Chapter
Master the three magical dots (...) for immutable operations:
- **Array Spread** - Copy, merge, add elements, function arguments
- **Object Spread** - Copy, update, merge, remove properties
- **React State** - Immutable state updates with spread
- **Task Manager** - Complete app using all spread patterns

### Chapter 11: React Styling Deep Dive 🆕
Master every way to style React components:
- **Inline Styles** - JavaScript style objects, dynamic values
- **CSS Modules** - Scoped styles, no conflicts (recommended!)
- **Styled Components** - CSS-in-JS, prop-based styling
- **Complete App** - Student Management with CSS Modules

## 🟨🟦 JavaScript vs TypeScript

| Aspect | JavaScript | TypeScript |
|--------|------------|------------|
| File Extension | `.jsx` | `.tsx` |
| Type Checking | Runtime only | Compile time |
| IDE Support | Basic | Full IntelliSense |
| Learning Curve | Lower | Higher |
| Best For | Prototypes, small projects | Production, teams |

```javascript
// JavaScript - No types
const addTodo = (text) => {
  setTodos([...todos, { id: Date.now(), text }])
}
```

```typescript
// TypeScript - Full type safety
interface Todo { id: number; text: string }

const addTodo = (text: string): void => {
  setTodos([...todos, { id: Date.now(), text }])
}
```

## ... Spread Operator Patterns

| Operation | Pattern | Example |
|-----------|---------|---------|
| Copy Array | `[...arr]` | `const copy = [...original]` |
| Add to Array | `[...arr, item]` | `setTodos([...todos, newTodo])` |
| Merge Arrays | `[...a, ...b]` | `const all = [...arr1, ...arr2]` |
| Copy Object | `{...obj}` | `const copy = {...user}` |
| Update Object | `{...obj, key: val}` | `setUser({...user, name: 'New'})` |
| Nested Update | `{...obj, nested: {...obj.nested}}` | `{...settings, prefs: {...prefs}}` |

```javascript
// React state update patterns
// ADD
setTasks([...tasks, newTask])

// REMOVE
setTasks(tasks.filter(t => t.id !== id))

// UPDATE
setTasks(tasks.map(t => 
  t.id === id ? {...t, completed: !t.completed} : t
))
```

## 🎨 React Styling Methods

| Method | Scoped? | Dynamic? | Best For |
|--------|---------|----------|----------|
| **Inline Styles** | ✅ Yes | ✅ Easy | Quick dynamic styles |
| **CSS Files** | ❌ No | ❌ Hard | Simple projects |
| **CSS Modules** | ✅ Yes | ⚠️ Medium | Component libraries ⭐ |
| **Styled Components** | ✅ Yes | ✅ Easy | Dynamic theming |
| **Tailwind CSS** | ✅ Yes | ⚠️ Medium | Rapid prototyping |

```jsx
// CSS Modules - Recommended approach
import styles from './Card.module.css';
import clsx from 'clsx';

function Card({ isSelected }) {
  return (
    <div className={clsx(styles.card, { [styles.selected]: isSelected })}>
      Content
    </div>
  );
}
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - ES6+ features
- **TypeScript** - Static type checking
- **React 18** - Functional components, hooks
- **Vite** - Fast development server

## 📖 How to Use This Repository

1. **Start with Chapter 2** - Understand why React exists
2. **Build Vanilla JS apps** - Feel the pain of manual DOM
3. **Compare with React** - See the difference
4. **Deep dive into DOM (Ch 3)** - Understand what React abstracts
5. **Learn about Reflows (Ch 3.1)** - Appreciate Virtual DOM
6. **Compare JS vs TS (Ch 5)** - Choose the right tool
7. **Master Styling (Ch 11)** - Learn all styling approaches

## 🎨 Sample App Features

All sample applications feature:
- ✨ Modern, dark-themed UI
- 📱 Responsive design
- 💡 Inline code examples
- 🎮 Interactive demos
- 📝 Clear comments

## 🤝 Contributing

This repository is part of Ensate Technologies' ReactJS course materials.

## 📄 License

Educational use - Ensate Technologies

---

Made with ❤️ by **Ensate Technologies**

🌐 [ensate.in](https://ensate.in) | 📧 learning@ensate.in

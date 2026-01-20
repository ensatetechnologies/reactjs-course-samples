# 🚀 ReactJS Course - Sample Applications

A comprehensive collection of sample applications demonstrating the journey from HTML/JavaScript to React.

## 📚 Course Chapters

Each chapter has its own branch with specific sample applications:

| Branch | Chapter | Topics Covered |
|--------|---------|----------------|
| [`chapter-2-html-js-to-react`](../../tree/chapter-2-html-js-to-react) | HTML, JavaScript to React | Basic HTML, JS fundamentals, DOM manipulation, Counter & Todo apps |
| [`chapter-3-dom-complete-guide`](../../tree/chapter-3-dom-complete-guide) | DOM Complete Guide | Selection methods, manipulation, events, traversal |
| [`chapter-3.1-dom-reflow`](../../tree/chapter-3.1-dom-reflow) | DOM Reflow | Performance, DocumentFragment, Virtual DOM |

## 🎯 Quick Start

### Clone and Explore

```bash
# Clone the repository
git clone https://github.com/ensatetechnologies/reactjs-course-samples.git
cd reactjs-course-samples

# Switch to a chapter branch
git checkout chapter-2-html-js-to-react  # or any other chapter

# For Vanilla JS samples - just open in browser
start vanilla-js/01-basic-html-structure/index.html

# For React apps
cd react-apps/06-counter-react
npm install
npm run dev
```

## 📂 Repository Structure

```
reactjs-course-samples/
├── master (this branch)
│   └── README.md (overview)
│
├── chapter-2-html-js-to-react/
│   ├── vanilla-js/
│   │   ├── 01-basic-html-structure/
│   │   ├── 02-javascript-basics/
│   │   ├── 03-connecting-js-html/
│   │   ├── 04-counter-vanilla/
│   │   └── 05-todo-vanilla/
│   └── react-apps/
│       ├── 06-counter-react/
│       ├── 07-todo-react/
│       └── 08-usercard-react/
│
├── chapter-3-dom-complete-guide/
│   └── vanilla-js/
│       ├── 01-dom-selection/
│       ├── 02-dom-manipulation/
│       ├── 03-element-creation/
│       ├── 04-todo-dom/
│       ├── 05-event-handling/
│       └── 06-dom-traversal/
│
└── chapter-3.1-dom-reflow/
    ├── vanilla-js/
    │   ├── 01-reflow-problem/
    │   ├── 02-document-fragment/
    │   ├── 03-read-write-pattern/
    │   └── 04-performance-demo/
    └── react-apps/
        └── 05-react-vdom-demo/
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

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - ES6+ features
- **React 18** - Functional components, hooks
- **Vite** - Fast development server

## 📖 How to Use This Repository

1. **Start with Chapter 2** - Understand why React exists
2. **Build Vanilla JS apps** - Feel the pain of manual DOM
3. **Compare with React** - See the difference
4. **Deep dive into DOM (Ch 3)** - Understand what React abstracts
5. **Learn about Reflows (Ch 3.1)** - Appreciate Virtual DOM

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

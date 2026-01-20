---
name: Chapter 17 Async Apps
overview: Create sample applications for Chapter 17 (Async/Await Complete Guide) covering vanilla JavaScript async concepts and React async patterns, following the established project structure and dark theme.
todos:
  - id: git-setup
    content: Initialize git, add remote, create branch chapter-17-async-await
    status: completed
  - id: vanilla-async-basics
    content: Create vanilla-js/17-async-basics (sync vs async demo)
    status: completed
    dependencies:
      - git-setup
  - id: vanilla-callbacks-promises
    content: Create vanilla-js/17-callbacks-promises (callback hell vs promises)
    status: completed
    dependencies:
      - git-setup
  - id: vanilla-promise-methods
    content: Create vanilla-js/17-promise-methods (all, race, allSettled)
    status: completed
    dependencies:
      - git-setup
  - id: vanilla-fetch-api
    content: Create vanilla-js/17-fetch-api (CRUD operations)
    status: completed
    dependencies:
      - git-setup
  - id: react-basic-fetch
    content: Create react-apps/17-basic-fetch (useEffect + async)
    status: completed
    dependencies:
      - git-setup
  - id: react-search-users
    content: Create react-apps/17-search-users (fetch on action)
    status: completed
    dependencies:
      - git-setup
  - id: react-use-fetch-hook
    content: Create react-apps/17-use-fetch-hook (custom hook)
    status: completed
    dependencies:
      - git-setup
  - id: react-user-directory
    content: Create react-apps/17-user-directory (complete CRUD app)
    status: completed
    dependencies:
      - git-setup
  - id: update-readme
    content: Update README.md with Chapter 17 section
    status: completed
    dependencies:
      - vanilla-async-basics
      - vanilla-callbacks-promises
      - vanilla-promise-methods
      - vanilla-fetch-api
      - react-basic-fetch
      - react-search-users
      - react-use-fetch-hook
      - react-user-directory
  - id: git-push
    content: Commit all changes and push to remote branch
    status: in_progress
    dependencies:
      - update-readme
---

# Chapter 17 - Async/Await Sample Applications

## Overview

Create 8 sample applications demonstrating async/await concepts from both vanilla JavaScript and React perspectives, following the established project structure and dark theme used in chapters 3, 3.1, and 5.

## Branch Setup

- Branch name: `chapter-17-async-await`
- Remote: `https://github.com/ensatetechnologies/reactjs-course-samples.git`

## Applications to Create

### Vanilla JavaScript Apps (4 apps in `vanilla-js/`)

| App | Folder | Concepts Covered |

|-----|--------|------------------|

| 1 | `17-async-basics` | Sync vs Async execution, setTimeout, event loop visualization |

| 2 | `17-callbacks-promises` | Callback hell problem, Promise creation, chaining with .then() |

| 3 | `17-promise-methods` | Promise.all, Promise.race, Promise.allSettled demos |

| 4 | `17-fetch-api` | GET/POST requests, error handling, CRUD operations |

### React Apps (4 apps in `react-apps/`)

| App | Folder | Concepts Covered |

|-----|--------|------------------|

| 5 | `17-basic-fetch` | useEffect + async function, loading/error states |

| 6 | `17-search-users` | Fetch on user action, async event handlers |

| 7 | `17-use-fetch-hook` | Custom useFetch hook with cleanup |

| 8 | `17-user-directory` | Complete CRUD app with parallel fetching, optimistic updates |

## File Structure

Each vanilla JS app:

```
vanilla-js/17-xxx/
  - index.html
  - script.js
  - styles.css
```

Each React app:

```
react-apps/17-xxx/
  - index.html
  - package.json
  - vite.config.js
  - src/
    - main.jsx
    - App.jsx
    - App.css
    - index.css
```

## Theme (from existing apps)

Using the established CSS variables from [`react-apps/05-react-vdom-demo/src/index.css`](react-apps/05-react-vdom-demo/src/index.css):

- `--primary: #22d3ee` (cyan)
- `--secondary: #a78bfa` (purple)
- `--accent: #34d399` (green)
- `--bg: #0a0f1c` (dark navy)
- `--surface: #111827`

Additional async-specific colors (from Chapter 17 HTML):

- `--async: #f472b6` (pink for async keyword)
- `--await: #38bdf8` (blue for await keyword)
- `--promise: #fb923c` (orange for promises)

## Key Code Examples to Expand

1. **Sync vs Async Demo** - Interactive visualization showing execution order
2. **Callback Hell** - Nested callbacks vs flat Promise chains
3. **Promise Methods** - Side-by-side comparison of all, race, allSettled
4. **Fetch API** - Working CRUD operations against JSONPlaceholder API
5. **React useEffect Pattern** - Proper async function inside useEffect
6. **Custom useFetch Hook** - Reusable hook with loading/error/data states
7. **User Directory** - Full-featured app from chapter with all patterns

## Implementation Steps

1. Initialize git repository and create branch
2. Create vanilla JS apps (17-async-basics through 17-fetch-api)
3. Create React apps (17-basic-fetch through 17-user-directory)
4. Update README.md with Chapter 17 section
5. Commit and push to remote branch
import { useState } from 'react';
import clsx from 'clsx';
import styles from './App.module.css';
import StudentCard from './StudentCard';

// Initial students data
const initialStudents = [
  { id: 1, name: 'Alice Johnson', age: 15, grade: 'A' },
  { id: 2, name: 'Bob Smith', age: 16, grade: 'B' },
  { id: 3, name: 'Carol White', age: 15, grade: 'A' },
  { id: 4, name: 'David Brown', age: 17, grade: 'C' },
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [nextId, setNextId] = useState(5);

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const addStudent = () => {
    const names = ['Emma', 'James', 'Olivia', 'William', 'Sophia'];
    const grades = ['A', 'B', 'C', 'A', 'B'];
    const newStudent = {
      id: nextId,
      name: `${names[Math.floor(Math.random() * names.length)]} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
      age: 14 + Math.floor(Math.random() * 5),
      grade: grades[Math.floor(Math.random() * grades.length)],
    };
    setStudents((prev) => [...prev, newStudent]);
    setNextId((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <header className={styles.hero}>
        <span className={styles.badge}>Chapter 11</span>
        <h1 className={styles.heroTitle}>CSS Modules</h1>
        <p className={styles.heroSubtitle}>
          Scoped styles without conflicts - The Recommended Approach
        </p>
      </header>

      {/* Info Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>📦 How CSS Modules Work</h2>
        <p className={styles.sectionDesc}>
          CSS Modules automatically transform class names to unique identifiers
        </p>

        <div className={styles.highlightBox}>
          <h4 className={styles.highlightTitle}>🎯 The Magic of CSS Modules</h4>
          <p className={styles.highlightText}>
            You write: <code className={styles.code}>.card &#123; &#125;</code>
            <br />
            Browser sees: <code className={styles.code}>.StudentCard_card_x7yz3 &#123; &#125;</code>
            <br />
            Each class gets a <strong>unique hash</strong> - no more conflicts!
          </p>
        </div>

        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={clsx(styles.dot, styles.dotRed)}></span>
            <span className={clsx(styles.dot, styles.dotYellow)}></span>
            <span className={clsx(styles.dot, styles.dotGreen)}></span>
            <span>How to use CSS Modules</span>
          </div>
          <pre className={styles.codeContent}>
{`// Import as an object!
import styles from './StudentCard.module.css';
import clsx from 'clsx';

function StudentCard({ student, isSelected }) {
  // Access classes as object properties
  const cardClasses = clsx(
    styles.card,
    { [styles.selected]: isSelected }
  );

  return (
    <div className={cardClasses}>
      <h3 className={styles.name}>{student.name}</h3>
      <span className={styles.badge}>{student.grade}</span>
    </div>
  );
}`}
          </pre>
        </div>
      </section>

      {/* Student Cards Demo */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🎓 Live Demo - Student Cards</h2>
        <p className={styles.sectionDesc}>
          These cards use CSS Modules for scoped styling
        </p>

        <div className={styles.studentGrid}>
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              isSelected={selectedIds.has(student.id)}
              onToggle={() => toggleSelect(student.id)}
              onDelete={() => deleteStudent(student.id)}
            />
          ))}
        </div>

        <div className={styles.controls}>
          <button className={styles.primaryButton} onClick={addStudent}>
            ➕ Add Student
          </button>
          <button
            className={styles.ghostButton}
            onClick={() => setSelectedIds(new Set())}
          >
            Clear Selection
          </button>
          <div className={styles.countBadge}>
            Selected: {selectedIds.size}
          </div>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>✅ Pros & Cons</h2>
        <p className={styles.sectionDesc}>
          CSS Modules are recommended for most React projects
        </p>

        <div className={styles.prosConsGrid}>
          <div className={styles.prosCard}>
            <h4>✅ Advantages</h4>
            <ul>
              <li><strong>Locally scoped</strong> - no conflicts!</li>
              <li>Full CSS features (hover, media queries)</li>
              <li>Works with existing CSS knowledge</li>
              <li>Built into Vite & Create React App</li>
              <li>Composition support with composes</li>
            </ul>
          </div>
          <div className={styles.consCard}>
            <h4>❌ Disadvantages</h4>
            <ul>
              <li>Verbose syntax (styles.className)</li>
              <li>Dynamic values still need inline styles</li>
              <li>TypeScript requires extra setup</li>
              <li>Can't easily share styles between files</li>
            </ul>
          </div>
        </div>

        <div className={styles.tipBox}>
          <div className={styles.tipTitle}>💡 CSS Modules + clsx = ❤️</div>
          <p className={styles.tipText}>
            Use <code className={styles.code}>clsx</code> library for clean conditional class names.
            It's already installed in this demo!
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;

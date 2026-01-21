import { useState } from 'react';

// Theme colors
const colors = {
  primary: '#22d3ee',
  secondary: '#a78bfa',
  accent: '#34d399',
  danger: '#ef4444',
  warning: '#fbbf24',
  bg: '#0a0f1c',
  surface: '#111827',
  surface2: '#1a2234',
  text: '#f1f5f9',
  muted: '#94a3b8',
  border: '#2d3a52',
};

const gradeColors = {
  A: '#22c55e',
  B: '#3b82f6',
  C: '#f59e0b',
  D: '#f97316',
  F: '#ef4444',
};

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

  // Container style
  const containerStyle = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: 32,
  };

  // Hero styles - using object variables for cleaner code
  const heroStyle = {
    textAlign: 'center',
    padding: '48px 32px',
    background: `linear-gradient(135deg, ${colors.surface}, ${colors.surface2})`,
    borderRadius: 20,
    marginBottom: 32,
    border: `1px solid ${colors.border}`,
    position: 'relative',
    overflow: 'hidden',
  };

  const badgeStyle = {
    display: 'inline-block',
    background: colors.warning,
    color: colors.bg,
    padding: '6px 16px',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 16,
  };

  const heroTitleStyle = {
    fontSize: 40,
    background: `linear-gradient(135deg, ${colors.text}, ${colors.warning})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: 8,
  };

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
    <div style={containerStyle}>
      {/* Hero Section */}
      <header style={heroStyle}>
        <div style={badgeStyle}>Chapter 11</div>
        <h1 style={heroTitleStyle}>React Inline Styles</h1>
        <p style={{ color: colors.muted, fontSize: 18 }}>
          Dynamic styling with JavaScript objects
        </p>
      </header>

      {/* Info Section */}
      <InfoSection />

      {/* Student Cards */}
      <section style={sectionStyle}>
        <h2 style={{ color: colors.primary, marginBottom: 8 }}>
          📝 Live Demo - Student Cards
        </h2>
        <p style={{ color: colors.muted, marginBottom: 24 }}>
          Click Select to see dynamic styles in action
        </p>

        <div style={gridStyle}>
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

        {/* Controls */}
        <div style={controlsStyle}>
          <button style={primaryButtonStyle} onClick={addStudent}>
            ➕ Add Student
          </button>
          <button
            style={ghostButtonStyle}
            onClick={() => setSelectedIds(new Set())}
          >
            Clear Selection
          </button>
          <div style={countBadgeStyle}>Selected: {selectedIds.size}</div>
        </div>
      </section>

      {/* Pros & Cons */}
      <ProsConsSection />
    </div>
  );
}

// Shared styles
const sectionStyle = {
  background: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: 16,
  padding: 32,
  marginBottom: 32,
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: 24,
  marginBottom: 24,
};

const controlsStyle = {
  display: 'flex',
  gap: 16,
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: 16,
  background: colors.surface2,
  borderRadius: 12,
};

const primaryButtonStyle = {
  padding: '12px 24px',
  borderRadius: 8,
  border: 'none',
  background: colors.primary,
  color: colors.bg,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const ghostButtonStyle = {
  padding: '12px 24px',
  borderRadius: 8,
  border: `1px solid ${colors.border}`,
  background: 'transparent',
  color: colors.text,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
};

const countBadgeStyle = {
  marginLeft: 'auto',
  padding: '8px 16px',
  background: colors.surface,
  borderRadius: 8,
  color: colors.primary,
  fontWeight: 600,
};

// Student Card Component with inline styles
function StudentCard({ student, isSelected, onToggle, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Dynamic styles based on props and state
  const cardStyle = {
    background: isSelected ? 'rgba(34,211,238,0.1)' : colors.surface2,
    padding: 20,
    borderRadius: 12,
    border: isSelected
      ? `2px solid ${colors.primary}`
      : `2px solid ${colors.border}`,
    transform: isSelected
      ? 'scale(1.02)'
      : isHovered
        ? 'translateY(-2px)'
        : 'scale(1)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  };

  const nameStyle = {
    fontSize: 18,
    fontWeight: 600,
    color: colors.text,
    margin: 0,
  };

  // ✅ Dynamic badge color based on grade
  const badgeStyle = {
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600,
    color: 'white',
    background: gradeColors[student.grade] || '#666',
  };

  const detailsStyle = {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 16,
  };

  const actionsStyle = {
    display: 'flex',
    gap: 8,
  };

  // ✅ Dynamic button style based on selection state
  const selectButtonStyle = {
    padding: '8px 16px',
    borderRadius: 8,
    border: 'none',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    background: isSelected ? colors.secondary : colors.primary,
    color: isSelected ? 'white' : colors.bg,
    transition: 'all 0.2s ease',
  };

  const deleteButtonStyle = {
    padding: '8px 16px',
    borderRadius: 8,
    border: 'none',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    background: colors.danger,
    color: 'white',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={headerStyle}>
        <h3 style={nameStyle}>{student.name}</h3>
        <span style={badgeStyle}>{student.grade}</span>
      </div>
      <p style={detailsStyle}>Age: {student.age}</p>
      <div style={actionsStyle}>
        <button style={selectButtonStyle} onClick={onToggle}>
          {isSelected ? 'Deselect' : 'Select'}
        </button>
        <button style={deleteButtonStyle} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

// Info Section Component
function InfoSection() {
  const tipStyle = {
    background: 'rgba(34,211,238,0.1)',
    borderLeft: `4px solid ${colors.primary}`,
    padding: 20,
    borderRadius: '0 12px 12px 0',
    marginBottom: 24,
  };

  const codeBlockStyle = {
    background: '#0d1321',
    borderRadius: 12,
    overflow: 'hidden',
    border: `1px solid ${colors.border}`,
    marginTop: 16,
  };

  const codeHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 16px',
    background: colors.surface2,
    borderBottom: `1px solid ${colors.border}`,
    fontSize: 13,
    color: colors.muted,
    fontFamily: "'JetBrains Mono', monospace",
  };

  const codeBodyStyle = {
    padding: 16,
    margin: 0,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    lineHeight: 1.6,
    overflow: 'auto',
  };

  return (
    <section style={sectionStyle}>
      <h2 style={{ color: colors.primary, marginBottom: 8 }}>
        📐 Inline Style Syntax
      </h2>
      <p style={{ color: colors.muted, marginBottom: 16 }}>
        Inline styles use JavaScript objects with camelCase properties
      </p>

      <div style={tipStyle}>
        <div style={{ color: colors.primary, fontWeight: 600, marginBottom: 8 }}>
          💡 Key Differences from CSS
        </div>
        <ul style={{ color: colors.muted, paddingLeft: 20, fontSize: 14 }}>
          <li>
            <strong>camelCase</strong>: background-color → backgroundColor
          </li>
          <li>
            <strong>String values</strong>: color: 'red' (not color: red)
          </li>
          <li>
            <strong>Numbers = pixels</strong>: padding: 16 → 16px
          </li>
          <li>
            <strong>Double braces</strong>: style=&#123;&#123; &#125;&#125;
          </li>
        </ul>
      </div>

      <div style={codeBlockStyle}>
        <div style={codeHeaderStyle}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fbbf24' }}></span>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }}></span>
          <span>Dynamic Inline Styles Example</span>
        </div>
        <pre style={codeBodyStyle}>
          <code style={{ color: colors.text }}>{`// ✅ Dynamic styles based on props
const cardStyle = {
  background: isSelected 
    ? 'rgba(34,211,238,0.1)' 
    : '#1a2234',
  border: isSelected 
    ? '2px solid #22d3ee' 
    : '2px solid #2d3a52',
  transform: isSelected 
    ? 'scale(1.02)' 
    : 'scale(1)',
  transition: 'all 0.2s ease'
};

// ✅ Dynamic badge color
const badgeStyle = {
  background: gradeColors[student.grade],
  color: 'white',
  padding: '4px 12px',
  borderRadius: 20
};`}</code>
        </pre>
      </div>
    </section>
  );
}

// Pros & Cons Section
function ProsConsSection() {
  const prosStyle = {
    background: 'rgba(52,211,153,0.1)',
    border: '1px solid rgba(52,211,153,0.3)',
    borderRadius: 12,
    padding: 20,
  };

  const consStyle = {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: 12,
    padding: 20,
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 24,
    marginTop: 16,
  };

  return (
    <section style={sectionStyle}>
      <h2 style={{ color: colors.primary, marginBottom: 8 }}>
        ✅ Pros & Cons of Inline Styles
      </h2>
      <p style={{ color: colors.muted, marginBottom: 16 }}>
        Best for dynamic values, but has limitations
      </p>

      <div style={gridStyle}>
        <div style={prosStyle}>
          <h4 style={{ color: colors.accent, marginBottom: 12 }}>✅ Advantages</h4>
          <ul style={{ color: colors.muted, paddingLeft: 20, fontSize: 14 }}>
            <li>Fully dynamic with JavaScript</li>
            <li>Scoped to component</li>
            <li>No CSS file needed</li>
            <li>Easy conditional styles</li>
            <li>No class name conflicts</li>
          </ul>
        </div>
        <div style={consStyle}>
          <h4 style={{ color: colors.danger, marginBottom: 12 }}>❌ Disadvantages</h4>
          <ul style={{ color: colors.muted, paddingLeft: 20, fontSize: 14 }}>
            <li>No pseudo-classes (:hover, :focus)</li>
            <li>No media queries</li>
            <li>No animations/keyframes</li>
            <li>Can clutter JSX</li>
            <li>No CSS caching</li>
          </ul>
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
          padding: 16,
          background: 'rgba(251,191,36,0.1)',
          borderLeft: `4px solid ${colors.warning}`,
          borderRadius: '0 12px 12px 0',
        }}
      >
        <div style={{ color: colors.warning, fontWeight: 600, marginBottom: 8 }}>
          💡 When to Use Inline Styles
        </div>
        <p style={{ color: colors.muted, fontSize: 14 }}>
          Use inline styles for: <strong>dynamic values based on props/state</strong>,
          one-off styles, simple style adjustments. <strong>Avoid</strong> for:
          complex layouts, hover/focus states, responsive designs.
        </p>
      </div>
    </section>
  );
}

export default App;

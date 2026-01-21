import { useState } from 'react';
import styles from './App.module.css';
import Header from './components/Header';
import StudentCard from './components/StudentCard';
import StudentForm from './components/StudentForm';
import Button from './components/Button';

// Initial students data
const initialStudents = [
  { id: 1, name: 'Alice Johnson', age: 15, grade: 'A', email: 'alice@school.edu' },
  { id: 2, name: 'Bob Smith', age: 16, grade: 'B', email: 'bob@school.edu' },
  { id: 3, name: 'Carol White', age: 15, grade: 'A', email: 'carol@school.edu' },
  { id: 4, name: 'David Brown', age: 17, grade: 'C', email: 'david@school.edu' },
  { id: 5, name: 'Emma Davis', age: 16, grade: 'B', email: 'emma@school.edu' },
  { id: 6, name: 'Frank Miller', age: 15, grade: 'A', email: 'frank@school.edu' },
];

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [filterGrade, setFilterGrade] = useState('all');
  const [nextId, setNextId] = useState(7);

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

  const deleteSelected = () => {
    setStudents((prev) => prev.filter((s) => !selectedIds.has(s.id)));
    setSelectedIds(new Set());
  };

  const handleAddStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: nextId,
    };
    setStudents((prev) => [...prev, newStudent]);
    setNextId((prev) => prev + 1);
    setShowForm(false);
  };

  const handleEditStudent = (studentData) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === editingStudent.id ? { ...s, ...studentData } : s))
    );
    setEditingStudent(null);
    setShowForm(false);
  };

  const startEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const filteredStudents = filterGrade === 'all'
    ? students
    : students.filter((s) => s.grade === filterGrade);

  const stats = {
    total: students.length,
    gradeA: students.filter((s) => s.grade === 'A').length,
    gradeB: students.filter((s) => s.grade === 'B').length,
    gradeC: students.filter((s) => s.grade === 'C').length,
  };

  return (
    <div className={styles.app}>
      <Header 
        title="Student Management System"
        subtitle="Complete React Styling Demo with CSS Modules"
      />

      <main className={styles.main}>
        {/* Stats Row */}
        <section className={styles.statsSection}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Total Students</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValueSuccess}>{stats.gradeA}</span>
            <span className={styles.statLabel}>Grade A</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValueInfo}>{stats.gradeB}</span>
            <span className={styles.statLabel}>Grade B</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValueWarning}>{stats.gradeC}</span>
            <span className={styles.statLabel}>Grade C</span>
          </div>
        </section>

        {/* Controls */}
        <section className={styles.controlsSection}>
          <div className={styles.controlsLeft}>
            <Button onClick={() => { setEditingStudent(null); setShowForm(true); }}>
              ➕ Add Student
            </Button>
            {selectedIds.size > 0 && (
              <Button variant="danger" onClick={deleteSelected}>
                🗑️ Delete Selected ({selectedIds.size})
              </Button>
            )}
            {selectedIds.size > 0 && (
              <Button variant="ghost" onClick={() => setSelectedIds(new Set())}>
                Clear Selection
              </Button>
            )}
          </div>
          <div className={styles.controlsRight}>
            <label className={styles.filterLabel}>Filter by Grade:</label>
            <select
              className={styles.filterSelect}
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
            >
              <option value="all">All Grades</option>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
            </select>
          </div>
        </section>

        {/* Student Grid */}
        <section className={styles.studentsSection}>
          {filteredStudents.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No students found. Add some students to get started!</p>
            </div>
          ) : (
            <div className={styles.studentGrid}>
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  isSelected={selectedIds.has(student.id)}
                  onToggle={() => toggleSelect(student.id)}
                  onEdit={() => startEdit(student)}
                  onDelete={() => deleteStudent(student.id)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Add/Edit Modal */}
      {showForm && (
        <StudentForm
          student={editingStudent}
          onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
          onCancel={() => { setShowForm(false); setEditingStudent(null); }}
        />
      )}
    </div>
  );
}

export default App;

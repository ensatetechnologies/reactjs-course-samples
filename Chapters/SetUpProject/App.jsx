import { useState } from 'react'
import StudentProfile from './components/StudentProfile'
import './App.css'

// Sample data - Later you'll learn to fetch from API!
const sampleStudents = [
  {
    id: 1,
    name: "Rahul Sharma",
    class: "12-A",
    email: "rahul.sharma@school.com",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    grade: "A"
  },
  {
    id: 2,
    name: "Priya Patel",
    class: "12-B",
    email: "priya.patel@school.com",
    subjects: ["Biology", "Chemistry", "English"],
    grade: "A"
  },
  {
    id: 3,
    name: "Amit Kumar",
    class: "12-A",
    email: "amit.kumar@school.com",
    subjects: ["Computer Science", "Mathematics", "Physics"],
    grade: "B"
  },
  {
    id: 4,
    name: "Sneha Gupta",
    class: "12-C",
    email: "sneha.gupta@school.com",
    subjects: ["Economics", "Accountancy", "Business Studies"],
    grade: "A"
  }
]

function App() {
  // State to hold students - expandable for CRUD operations!
  const [students, setStudents] = useState(sampleStudents)

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 Student Management System</h1>
        <p>A React Learning Project</p>
      </header>

      <main className="student-list">
        {students.map(student => (
          <StudentProfile 
            key={student.id} 
            student={student} 
          />
        ))}
      </main>

      <footer className="app-footer">
        <p>Total Students: {students.length}</p>
        <p className="hint">💡 Click "Show Details" to see more information</p>
      </footer>
    </div>
  )
}

export default App

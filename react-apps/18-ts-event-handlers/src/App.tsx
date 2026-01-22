/**
 * 📚 Typed Event Handlers Demo
 * From: React with TypeScript - Core Concepts
 * 
 * Demonstrates:
 * - ChangeEvent for inputs, selects, textareas
 * - FormEvent for form submission
 * - MouseEvent for clicks
 * - KeyboardEvent for keyboard interactions
 * - FocusEvent for focus/blur
 * - Complete typed form example
 */

import { useState, ChangeEvent, FormEvent, MouseEvent, KeyboardEvent, FocusEvent } from 'react'
import './App.css'

// ====================================
// TYPE DEFINITIONS
// ====================================

// Form data interface
interface ContactFormData {
  name: string
  email: string
  subject: string
  priority: "low" | "medium" | "high"
  message: string
  newsletter: boolean
}

// Event log entry
interface EventLog {
  id: number
  type: string
  details: string
  timestamp: Date
}

// ====================================
// INITIAL VALUES
// ====================================

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  priority: "medium",
  message: "",
  newsletter: false
}

function App(): JSX.Element {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [submitted, setSubmitted] = useState<boolean>(false)
  
  // Event logging
  const [eventLogs, setEventLogs] = useState<EventLog[]>([])
  
  // Demo states
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null)
  const [keyPressed, setKeyPressed] = useState<string>("")
  const [focusedField, setFocusedField] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // ====================================
  // HELPER FUNCTIONS
  // ====================================
  
  const logEvent = (type: string, details: string): void => {
    setEventLogs(prev => [{
      id: Date.now(),
      type,
      details,
      timestamp: new Date()
    }, ...prev.slice(0, 9)])
  }

  // ====================================
  // CHANGE EVENT HANDLERS
  // ====================================
  
  // Input change handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    logEvent("ChangeEvent<HTMLInputElement>", `${name}: ${type === 'checkbox' ? checked : value}`)
  }

  // Select change handler
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    logEvent("ChangeEvent<HTMLSelectElement>", `${name}: ${value}`)
  }

  // Textarea change handler
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    logEvent("ChangeEvent<HTMLTextAreaElement>", `${name}: ${value.length} chars`)
  }

  // ====================================
  // FORM EVENT HANDLER
  // ====================================
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    logEvent("FormEvent<HTMLFormElement>", "Form submitted!")
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  // ====================================
  // MOUSE EVENT HANDLERS
  // ====================================
  
  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    logEvent("MouseEvent<HTMLButtonElement>", `Clicked at (${e.clientX}, ${e.clientY})`)
  }

  const handleDivClick = (e: MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setClickPosition({ x: Math.round(x), y: Math.round(y) })
    logEvent("MouseEvent<HTMLDivElement>", `Position: (${Math.round(x)}, ${Math.round(y)})`)
  }

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>): void => {
    const target = e.currentTarget as HTMLDivElement
    logEvent("onMouseEnter", `Entered: ${target.dataset.name}`)
  }

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>): void => {
    const target = e.currentTarget as HTMLDivElement
    logEvent("onMouseLeave", `Left: ${target.dataset.name}`)
  }

  // ====================================
  // KEYBOARD EVENT HANDLERS
  // ====================================
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    setKeyPressed(e.key)
    logEvent("KeyboardEvent<HTMLInputElement>", `Key: ${e.key}, Code: ${e.code}`)
    
    // Example: Submit on Enter
    if (e.key === 'Enter') {
      logEvent("KeyboardEvent", "Enter pressed - could trigger search!")
    }
    
    // Example: Handle Escape
    if (e.key === 'Escape') {
      setSearchQuery("")
      logEvent("KeyboardEvent", "Escape pressed - cleared input")
    }
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === keyPressed) {
      setTimeout(() => setKeyPressed(""), 500)
    }
  }

  // ====================================
  // FOCUS EVENT HANDLERS
  // ====================================
  
  const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
    setFocusedField(e.target.name || e.target.id)
    logEvent("FocusEvent<HTMLInputElement>", `Focused: ${e.target.name || e.target.id}`)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    setFocusedField("")
    logEvent("onBlur", `Left: ${e.target.name || e.target.id}`)
  }

  // Generic handler for combined inputs
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="app">
      <header className="header">
        <span className="badge event">Events</span>
        <h1>🎪 Typing Event Handlers</h1>
        <p>Type-safe event handling with React.ChangeEvent, MouseEvent, etc.</p>
      </header>

      <div className="main-grid">
        {/* Left Column - Forms & Inputs */}
        <div className="left-column">
          
          {/* Complete Form Example */}
          <section className="section">
            <h2 className="section-title">📋 Complete Typed Form</h2>
            
            {submitted && (
              <div className="success-message">
                ✅ Form submitted successfully!
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter your name"
                    className={focusedField === 'name' ? 'focused' : ''}
                  />
                  <span className="type-tag">ChangeEvent&lt;HTMLInputElement&gt;</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                    className={focusedField === 'email' ? 'focused' : ''}
                  />
                  <span className="type-tag">FocusEvent&lt;HTMLInputElement&gt;</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter subject"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <div className="input-wrapper">
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleSelectChange}
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                  <span className="type-tag">ChangeEvent&lt;HTMLSelectElement&gt;</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <div className="input-wrapper">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleTextareaChange}
                    placeholder="Enter your message"
                    rows={3}
                  />
                  <span className="type-tag">ChangeEvent&lt;HTMLTextAreaElement&gt;</span>
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                  />
                  Subscribe to newsletter
                </label>
              </div>

              <button type="submit" className="submit-btn">
                Submit Form
                <span className="type-tag light">FormEvent&lt;HTMLFormElement&gt;</span>
              </button>
            </form>
          </section>

          {/* Keyboard Events */}
          <section className="section">
            <h2 className="section-title">⌨️ Keyboard Events</h2>
            <div className="code-hint">
              <code>KeyboardEvent&lt;HTMLInputElement&gt;</code>
            </div>
            
            <div className="input-wrapper">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                placeholder="Type something... (Enter to search, Escape to clear)"
              />
            </div>
            
            {keyPressed && (
              <div className="key-display">
                Key pressed: <span className="key-badge">{keyPressed}</span>
              </div>
            )}
          </section>

          {/* Mouse Events */}
          <section className="section">
            <h2 className="section-title">🖱️ Mouse Events</h2>
            <div className="code-hint">
              <code>MouseEvent&lt;HTMLDivElement&gt;</code>
            </div>
            
            <div 
              className="click-area"
              onClick={handleDivClick}
            >
              Click anywhere in this box!
              {clickPosition && (
                <div 
                  className="click-marker"
                  style={{ left: clickPosition.x, top: clickPosition.y }}
                >
                  ({clickPosition.x}, {clickPosition.y})
                </div>
              )}
            </div>

            <div className="hover-boxes">
              <div 
                className="hover-box"
                data-name="Box A"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Hover A
              </div>
              <div 
                className="hover-box"
                data-name="Box B"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Hover B
              </div>
              <div 
                className="hover-box"
                data-name="Box C"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Hover C
              </div>
            </div>

            <button onClick={handleClick} className="click-btn">
              Click Me (Button)
              <span className="type-tag light">MouseEvent&lt;HTMLButtonElement&gt;</span>
            </button>
          </section>
        </div>

        {/* Right Column - Event Log & Reference */}
        <div className="right-column">
          
          {/* Event Log */}
          <section className="section event-log-section">
            <h2 className="section-title">📜 Event Log</h2>
            <div className="event-log">
              {eventLogs.length === 0 ? (
                <p className="empty-log">Interact with the form to see events...</p>
              ) : (
                eventLogs.map(log => (
                  <div key={log.id} className="log-entry">
                    <span className="log-type">{log.type}</span>
                    <span className="log-details">{log.details}</span>
                    <span className="log-time">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Form Data Display */}
          <section className="section">
            <h2 className="section-title">📦 Form State</h2>
            <div className="form-state">
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
          </section>

          {/* Event Types Reference */}
          <section className="section">
            <h2 className="section-title">📊 Event Types Reference</h2>
            <div className="reference-table">
              <div className="ref-row">
                <span className="ref-event">onChange (input)</span>
                <code>ChangeEvent&lt;HTMLInputElement&gt;</code>
              </div>
              <div className="ref-row">
                <span className="ref-event">onChange (select)</span>
                <code>ChangeEvent&lt;HTMLSelectElement&gt;</code>
              </div>
              <div className="ref-row">
                <span className="ref-event">onChange (textarea)</span>
                <code>ChangeEvent&lt;HTMLTextAreaElement&gt;</code>
              </div>
              <div className="ref-row">
                <span className="ref-event">onSubmit</span>
                <code>FormEvent&lt;HTMLFormElement&gt;</code>
              </div>
              <div className="ref-row">
                <span className="ref-event">onClick</span>
                <code>MouseEvent&lt;HTMLElement&gt;</code>
              </div>
              <div className="ref-row">
                <span className="ref-event">onKeyDown/Up</span>
                <code>KeyboardEvent&lt;HTMLElement&gt;</code>
              </div>
              <div className="ref-row">
                <span className="ref-event">onFocus/onBlur</span>
                <code>FocusEvent&lt;HTMLElement&gt;</code>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Summary */}
      <footer className="summary">
        <h3>🎯 Event Handler Patterns</h3>
        <div className="patterns-grid">
          <div className="pattern">
            <code>(e: ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void</code>
            <span>Input/Checkbox handler</span>
          </div>
          <div className="pattern">
            <code>(e: FormEvent&lt;HTMLFormElement&gt;) =&gt; void</code>
            <span>Form submit handler</span>
          </div>
          <div className="pattern">
            <code>(e: MouseEvent&lt;HTMLButtonElement&gt;) =&gt; void</code>
            <span>Click handler</span>
          </div>
          <div className="pattern">
            <code>(e: KeyboardEvent&lt;HTMLInputElement&gt;) =&gt; void</code>
            <span>Keyboard handler</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

/**
 * 📚 Type Definitions
 * From: Chapter 5 - JavaScript vs TypeScript in React
 * 
 * Centralized type definitions for the application.
 * These types are shared across components for consistency.
 */

// User interface - defines the shape of a user object
export interface User {
  id: number
  name: string
  age: number
  email: string
  role: string
}

// Props for UserCard component
export interface UserCardProps {
  user: User
  onUpdate: (user: User) => void
  onDelete: (id: number) => void
}

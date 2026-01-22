/**
 * 📚 Type Definitions
 * From: React with TypeScript - Core Concepts
 * 
 * Centralized type definitions for the Task Manager app
 */

// ====================================
// CORE TYPES
// ====================================

// Task priority type (literal union)
export type Priority = "low" | "medium" | "high"

// Filter type (literal union)
export type FilterType = "all" | "active" | "completed"

// Task interface
export interface Task {
  id: string
  text: string
  completed: boolean
  priority: Priority
  createdAt: Date
  dueDate?: Date
  tags: string[]
}

// ====================================
// COMPONENT PROPS
// ====================================

// Task Item Props
export interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, updates: Partial<Task>) => void
}

// Task List Props
export interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, updates: Partial<Task>) => void
}

// Add Task Form Props
export interface AddTaskFormProps {
  onAdd: (text: string, priority: Priority, tags: string[]) => void
}

// Filter Bar Props
export interface FilterBarProps {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
}

// Stats Props
export interface StatsProps {
  total: number
  active: number
  completed: number
  highPriority: number
}

// ====================================
// UTILITY TYPES
// ====================================

// Sort options
export type SortOption = "createdAt" | "priority" | "alphabetical"

// Task statistics
export interface TaskStats {
  total: number
  active: number
  completed: number
  highPriority: number
  byPriority: Record<Priority, number>
}

// Priority config for rendering
export interface PriorityConfig {
  icon: string
  label: string
  color: string
}

// Priority config mapping
export const PRIORITY_CONFIG: Record<Priority, PriorityConfig> = {
  low: { icon: "🟢", label: "Low", color: "#34d399" },
  medium: { icon: "🟡", label: "Medium", color: "#fbbf24" },
  high: { icon: "🔴", label: "High", color: "#ef4444" }
}

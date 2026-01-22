/**
 * 📚 Type Definitions for Typed Props Demo
 * From: React with TypeScript - Core Concepts
 * 
 * Centralized type definitions demonstrating:
 * - Basic interfaces for objects
 * - Props interfaces for components
 * - Optional properties
 * - Callback function types
 * - Union types for variants
 */

import { ReactNode } from 'react'

// ====================================
// DATA INTERFACES
// ====================================

// Product data type
export interface Product {
  id: number
  name: string
  price: number
  category: string
  inStock: boolean
  rating: number
}

// User data type
export interface User {
  id: number
  name: string
  avatar: string
  role: "admin" | "user" | "guest"
  email?: string
}

// ====================================
// COMPONENT PROPS INTERFACES
// ====================================

// Basic props with required fields
export interface ButtonProps {
  label: string
  onClick: () => void
  variant?: "primary" | "secondary" | "danger"
  size?: "small" | "medium" | "large"
  disabled?: boolean
  icon?: string
}

// Props with children
export interface CardProps {
  title: string
  children: ReactNode
  footer?: ReactNode
  variant?: "default" | "highlighted" | "warning"
}

// Props with callback functions
export interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onFavorite?: (id: number) => void
  showRating?: boolean
}

// Props for list components
export interface UserListItemProps {
  user: User
  onSelect: (user: User) => void
  isSelected?: boolean
  showEmail?: boolean
}

// Props with render prop pattern
export interface ContainerProps {
  className?: string
  padding?: "none" | "small" | "medium" | "large"
  children: ReactNode
}

// Alert component props
export interface AlertProps {
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  onDismiss?: () => void
}

// Badge props
export interface BadgeProps {
  text: string
  color?: "blue" | "green" | "red" | "yellow" | "purple"
}

// Stats card props
export interface StatsCardProps {
  label: string
  value: number | string
  icon: string
  trend?: "up" | "down" | "neutral"
  percentage?: number
}

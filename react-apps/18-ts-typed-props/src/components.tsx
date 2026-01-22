/**
 * 📚 Typed Components
 * From: React with TypeScript - Core Concepts
 * 
 * Components demonstrating proper prop typing
 */

import {
  ButtonProps,
  CardProps,
  ProductCardProps,
  AlertProps,
  BadgeProps,
  StatsCardProps,
  ContainerProps,
  UserListItemProps,
} from './types'

// ====================================
// BUTTON COMPONENT
// ====================================
export function Button({
  label,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  icon,
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  )
}

// ====================================
// CARD COMPONENT (with children)
// ====================================
export function Card({
  title,
  children,
  footer,
  variant = "default",
}: CardProps): JSX.Element {
  return (
    <div className={`card card-${variant}`}>
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

// ====================================
// CONTAINER COMPONENT
// ====================================
export function Container({
  className = "",
  padding = "medium",
  children,
}: ContainerProps): JSX.Element {
  return (
    <div className={`container container-${padding} ${className}`}>
      {children}
    </div>
  )
}

// ====================================
// PRODUCT CARD COMPONENT
// ====================================
export function ProductCard({
  product,
  onAddToCart,
  onFavorite,
  showRating = false,
}: ProductCardProps): JSX.Element {
  return (
    <div className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}>
      <div className="product-header">
        <h4>{product.name}</h4>
        {onFavorite && (
          <button
            className="favorite-btn"
            onClick={() => onFavorite(product.id)}
          >
            ❤️
          </button>
        )}
      </div>
      <p className="product-category">{product.category}</p>
      {showRating && (
        <div className="product-rating">
          ⭐ {product.rating.toFixed(1)}
        </div>
      )}
      <div className="product-footer">
        <span className="product-price">${product.price}</span>
        <button
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          {product.inStock ? '+ Add' : 'Sold Out'}
        </button>
      </div>
    </div>
  )
}

// ====================================
// USER LIST ITEM COMPONENT
// ====================================
export function UserListItem({
  user,
  onSelect,
  isSelected = false,
  showEmail = false,
}: UserListItemProps): JSX.Element {
  return (
    <div
      className={`user-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(user)}
    >
      <span className="user-avatar">{user.avatar}</span>
      <div className="user-info">
        <span className="user-name">{user.name}</span>
        {showEmail && user.email && (
          <span className="user-email">{user.email}</span>
        )}
      </div>
      <span className={`role-badge role-${user.role}`}>{user.role}</span>
    </div>
  )
}

// ====================================
// ALERT COMPONENT
// ====================================
export function Alert({
  type,
  title,
  message,
  onDismiss,
}: AlertProps): JSX.Element {
  const icons = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  }

  return (
    <div className={`alert alert-${type}`}>
      <span className="alert-icon">{icons[type]}</span>
      <div className="alert-content">
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
      {onDismiss && (
        <button className="alert-dismiss" onClick={onDismiss}>
          ×
        </button>
      )}
    </div>
  )
}

// ====================================
// BADGE COMPONENT
// ====================================
export function Badge({
  text,
  color = "blue",
}: BadgeProps): JSX.Element {
  return <span className={`badge badge-${color}`}>{text}</span>
}

// ====================================
// STATS CARD COMPONENT
// ====================================
export function StatsCard({
  label,
  value,
  icon,
  trend,
  percentage,
}: StatsCardProps): JSX.Element {
  return (
    <div className="stats-card">
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <span className="stats-value">{value}</span>
        <span className="stats-label">{label}</span>
      </div>
      {trend && (
        <div className={`stats-trend trend-${trend}`}>
          {trend === "up" && "↑"}
          {trend === "down" && "↓"}
          {trend === "neutral" && "→"}
          {percentage && ` ${percentage}%`}
        </div>
      )}
    </div>
  )
}

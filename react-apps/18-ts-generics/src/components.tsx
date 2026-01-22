/**
 * 📚 Generic Components
 * From: React with TypeScript - Core Concepts
 * 
 * Demonstrates creating reusable generic components
 */

import { ReactNode } from 'react'

// ====================================
// TYPE DEFINITIONS
// ====================================

// Base interface for items with id
interface Identifiable {
  id: string | number
}

// ====================================
// List<T> - Generic List Component
// ====================================

interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor: (item: T) => string | number
  emptyMessage?: string
  className?: string
}

export function List<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = "No items",
  className = ""
}: ListProps<T>): JSX.Element {
  if (items.length === 0) {
    return <div className="empty-list">{emptyMessage}</div>
  }

  return (
    <ul className={`generic-list ${className}`}>
      {items.map((item, index) => (
        <li key={keyExtractor(item)} className="list-item">
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )
}

// ====================================
// Select<T> - Generic Select Component
// ====================================

interface SelectProps<T extends Identifiable> {
  items: T[]
  value: T | null
  onChange: (item: T) => void
  getLabel: (item: T) => string
  placeholder?: string
  className?: string
}

export function Select<T extends Identifiable>({
  items,
  value,
  onChange,
  getLabel,
  placeholder = "Select an option",
  className = ""
}: SelectProps<T>): JSX.Element {
  return (
    <select
      className={`generic-select ${className}`}
      value={value?.id.toString() ?? ""}
      onChange={(e) => {
        const selectedItem = items.find(
          item => item.id.toString() === e.target.value
        )
        if (selectedItem) onChange(selectedItem)
      }}
    >
      <option value="" disabled>{placeholder}</option>
      {items.map(item => (
        <option key={item.id} value={item.id.toString()}>
          {getLabel(item)}
        </option>
      ))}
    </select>
  )
}

// ====================================
// Card<T> - Generic Card Component
// ====================================

interface CardProps<T> {
  item: T
  renderHeader: (item: T) => ReactNode
  renderBody: (item: T) => ReactNode
  renderFooter?: (item: T) => ReactNode
  onClick?: (item: T) => void
  isSelected?: boolean
  className?: string
}

export function Card<T>({
  item,
  renderHeader,
  renderBody,
  renderFooter,
  onClick,
  isSelected = false,
  className = ""
}: CardProps<T>): JSX.Element {
  return (
    <div 
      className={`generic-card ${isSelected ? 'selected' : ''} ${className}`}
      onClick={() => onClick?.(item)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="card-header">{renderHeader(item)}</div>
      <div className="card-body">{renderBody(item)}</div>
      {renderFooter && <div className="card-footer">{renderFooter(item)}</div>}
    </div>
  )
}

// ====================================
// Table<T> - Generic Table Component
// ====================================

interface Column<T> {
  key: string
  header: string
  render: (item: T) => ReactNode
  width?: string
}

interface TableProps<T extends Identifiable> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (item: T) => void
  selectedId?: string | number | null
}

export function Table<T extends Identifiable>({
  data,
  columns,
  onRowClick,
  selectedId
}: TableProps<T>): JSX.Element {
  return (
    <div className="table-wrapper">
      <table className="generic-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{ width: col.width }}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr 
              key={item.id}
              className={selectedId === item.id ? 'selected' : ''}
              onClick={() => onRowClick?.(item)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {columns.map(col => (
                <td key={col.key}>{col.render(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ====================================
// Tabs<T> - Generic Tabs Component
// ====================================

interface Tab<T> {
  id: T
  label: string
  content: ReactNode
}

interface TabsProps<T extends string | number> {
  tabs: Tab<T>[]
  activeTab: T
  onTabChange: (tabId: T) => void
}

export function Tabs<T extends string | number>({
  tabs,
  activeTab,
  onTabChange
}: TabsProps<T>): JSX.Element {
  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className="generic-tabs">
      <div className="tab-headers">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-header ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTabContent}
      </div>
    </div>
  )
}

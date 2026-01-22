/**
 * 📚 FilterBar Component
 * From: React with TypeScript - Core Concepts
 * 
 * Filter and sort controls with typed props
 */

import { FilterBarProps, FilterType, SortOption } from '../types'

export function FilterBar({ 
  filter, 
  onFilterChange, 
  sortBy, 
  onSortChange 
}: FilterBarProps): JSX.Element {
  
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ]

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'createdAt', label: '📅 Date' },
    { value: 'priority', label: '🎯 Priority' },
    { value: 'alphabetical', label: '🔤 A-Z' }
  ]

  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            className={`filter-tab ${filter === value ? 'active' : ''}`}
            onClick={() => onFilterChange(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="sort-options">
        <span className="sort-label">Sort:</span>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          {sortOptions.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

/**
 * 📚 Stats Component
 * From: React with TypeScript - Core Concepts
 * 
 * Task statistics display with typed props
 */

import { StatsProps } from '../types'

export function Stats({ total, active, completed, highPriority }: StatsProps): JSX.Element {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="stats-bar">
      <div className="stat-item">
        <div className="stat-value">{total}</div>
        <div className="stat-label">Total</div>
      </div>
      <div className="stat-item">
        <div className="stat-value active">{active}</div>
        <div className="stat-label">Active</div>
      </div>
      <div className="stat-item">
        <div className="stat-value completed">{completed}</div>
        <div className="stat-label">Done</div>
      </div>
      <div className="stat-item">
        <div className="stat-value high">{highPriority}</div>
        <div className="stat-label">🔴 High</div>
      </div>
      <div className="stat-item progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="stat-label">{completionRate}% Complete</div>
      </div>
    </div>
  )
}

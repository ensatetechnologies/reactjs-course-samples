/**
 * 📚 Generic Custom Hooks
 * From: React with TypeScript - Core Concepts
 * 
 * Demonstrates creating generic hooks that work with any type
 */

import { useState, useEffect, useCallback } from 'react'

// ====================================
// useFetch<T> - Generic Data Fetching Hook
// ====================================

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseFetchResult<T> extends FetchState<T> {
  refetch: () => void
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null
  })

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: T = await response.json()
      setState({ data, loading: false, error: null })
    } catch (err) {
      setState({ 
        data: null, 
        loading: false, 
        error: err instanceof Error ? err.message : 'An error occurred' 
      })
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { ...state, refetch: fetchData }
}

// ====================================
// useLocalStorage<T> - Generic Local Storage Hook
// ====================================

export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Get stored value or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) as T : initialValue
    } catch {
      return initialValue
    }
  })

  // Update local storage when state changes
  const setValue = (value: T | ((prev: T) => T)): void => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue]
}

// ====================================
// useToggle - Simple Toggle Hook
// ====================================

export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue)
  
  const toggle = useCallback(() => setValue(prev => !prev), [])
  const set = useCallback((newValue: boolean) => setValue(newValue), [])
  
  return [value, toggle, set]
}

// ====================================
// useArray<T> - Generic Array Management Hook
// ====================================

interface UseArrayResult<T> {
  array: T[]
  set: (newArray: T[]) => void
  push: (item: T) => void
  remove: (index: number) => void
  filter: (predicate: (item: T) => boolean) => void
  update: (index: number, item: T) => void
  clear: () => void
}

export function useArray<T>(initialValue: T[] = []): UseArrayResult<T> {
  const [array, setArray] = useState<T[]>(initialValue)

  const push = useCallback((item: T) => {
    setArray(prev => [...prev, item])
  }, [])

  const remove = useCallback((index: number) => {
    setArray(prev => prev.filter((_, i) => i !== index))
  }, [])

  const filter = useCallback((predicate: (item: T) => boolean) => {
    setArray(prev => prev.filter(predicate))
  }, [])

  const update = useCallback((index: number, item: T) => {
    setArray(prev => prev.map((v, i) => (i === index ? item : v)))
  }, [])

  const clear = useCallback(() => {
    setArray([])
  }, [])

  return { array, set: setArray, push, remove, filter, update, clear }
}

// ====================================
// useSelection<T> - Generic Selection Hook
// ====================================

interface UseSelectionResult<T> {
  selected: T | null
  select: (item: T) => void
  deselect: () => void
  isSelected: (item: T, compareFn?: (a: T, b: T) => boolean) => boolean
}

export function useSelection<T>(): UseSelectionResult<T> {
  const [selected, setSelected] = useState<T | null>(null)

  const select = useCallback((item: T) => setSelected(item), [])
  const deselect = useCallback(() => setSelected(null), [])
  
  const isSelected = useCallback(
    (item: T, compareFn?: (a: T, b: T) => boolean) => {
      if (selected === null) return false
      if (compareFn) return compareFn(selected, item)
      return selected === item
    },
    [selected]
  )

  return { selected, select, deselect, isSelected }
}

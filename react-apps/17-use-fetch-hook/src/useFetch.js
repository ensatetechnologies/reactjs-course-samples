/**
 * 📚 Custom useFetch Hook
 * From: Chapter 17 - Async/Await Complete Guide
 * 
 * A reusable hook for data fetching with:
 * - Loading state
 * - Error handling
 * - Cleanup to prevent memory leaks
 */

import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // For cleanup - prevent state updates if component unmounts
    let isMounted = true

    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        // Only update state if component is still mounted
        if (isMounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setData(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    // Cleanup function - runs when component unmounts
    // or when url changes
    return () => {
      isMounted = false
    }
  }, [url]) // Re-fetch when URL changes

  return { data, loading, error }
}

export default useFetch

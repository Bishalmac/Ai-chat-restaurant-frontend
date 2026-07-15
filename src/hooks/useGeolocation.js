import { useCallback, useState } from 'react'

/**
 * Wraps the browser Geolocation API. Returns { coords, status, error, request }.
 * status: 'idle' | 'pending' | 'granted' | 'denied' | 'unsupported'
 */
export function useGeolocation() {
  const [coords, setCoords] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const request = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unsupported')
      return
    }
    setStatus('pending')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setStatus('granted')
      },
      (err) => {
        setError(err.message)
        setStatus('denied')
      },
      { enableHighAccuracy: false, timeout: 8000 },
    )
  }, [])

  return { coords, status, error, request }
}

import { useEffect } from 'react'

const VisitorTracker = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await fetch('/api/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch (error) {
        console.error('Error tracking visitor:', error)
      }
    }

    trackVisitor()
  }, [])

  return null // This component doesn't render anything
}

export default VisitorTracker

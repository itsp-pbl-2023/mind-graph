import { useContext, useEffect } from 'react'
import { eventHandler, StreamContext } from './stream.tsx'

export const useOnEvent = (handler: eventHandler) => {
  const stream = useContext(StreamContext)

  useEffect(() => {
    if (!stream) return

    stream.addHandler(handler)
    return () => {
      stream.removeHandler(handler)
    }
  }, [stream, handler])
}

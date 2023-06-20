import { createContext, ReactNode, useEffect, useState } from 'react'
import { client } from '../client.ts'
import { Event } from '../api/api_pb.ts'
import { Code, ConnectError } from '@bufbuild/connect'
import { useName } from './name.ts'

export type eventHandler = (event: Event) => void

export class Stream {
  private handlers: eventHandler[]

  constructor(name: string, signal: AbortSignal) {
    this.handlers = []

    const stream = client.join({ name }, { signal })
    this.loop(stream).catch((err) => {
      const ignore = err instanceof ConnectError && err.code === Code.Canceled
      if (!ignore) {
        console.trace(err)
      }
    })
  }

  private async loop(stream: AsyncIterable<Event>): Promise<void> {
    for await (const event of stream) {
      console.log(`new event received ${event.event.case}: ${JSON.stringify(event.event.value)}`)
      this.handlers.forEach(handler => handler(event))
    }
  }

  addHandler(handler: eventHandler): void {
    this.handlers.push(handler)
  }

  removeHandler(handler: eventHandler): void {
    this.handlers = this.handlers.filter(h => h !== handler)
  }
}

const useStream = (name: string | undefined): Stream | undefined => {
  const [stream, setStream] = useState<Stream>()

  useEffect(() => {
    if (!name) {
      return
    }

    console.log('joining')
    const abort = new AbortController()
    setStream(new Stream(name, abort.signal))
    return () => {
      console.log('leaving')
      abort.abort()
      setStream(undefined)
    }
  }, [name])

  return stream
}

type StreamContextType = Stream | undefined
export const StreamContext = createContext<StreamContextType>(undefined)

export interface StreamProviderProps {
  children: ReactNode
}
export const StreamProvider = ({ children }: StreamProviderProps) => {
  const name = useName()
  const stream = useStream(name)
  return (
    <StreamContext.Provider value={stream}>{children}</StreamContext.Provider>
  )
}

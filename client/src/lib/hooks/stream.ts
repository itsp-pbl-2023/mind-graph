import { useEffect } from "react";
import { client} from "../client.ts";
import { Event } from "../api/api_pb.ts";
import { Code, ConnectError } from "@bufbuild/connect";

const connect = async (name: string, handler: eventHandler, abort: AbortController) => {
  const events = await client.join({ name }, { signal: abort.signal })
  for await (const event of events) {
    handler(event)
  }
}

export type eventHandler = (event: Event) => void
export const useStream = (name: string | undefined, onEvent: eventHandler): void => {
  // TODO: 正常にleaveできていない viteのproxyのせい？
  useEffect(() => {
    if (!name) {
      return
    }

    console.log('joining')
    const abort = new AbortController()
    connect(name, onEvent, abort).catch((err) => {
      const ignore = err instanceof ConnectError && err.code === Code.Canceled
      if (!ignore) {
        console.trace(err)
      }
    })
    return () => {
      console.log('leaving')
      abort.abort()
    }
  }, [name, onEvent])
}

import {useEffect, useState} from "react"
import { hello } from "../lib/api/api-MindGraphService_connectquery"
import viteLogo from '/vite.svg'
import { useQuery } from "@tanstack/react-query";
import reactLogo from '../assets/react.svg'
import { useStream } from "../lib/hooks/stream.ts";

const Home = () => {
  const [count, setCount] = useState(0)
  const { data: helloRes } = useQuery(hello.useQuery({ name: 'Fogrex' }))
  const [name, setName] = useState<string>()
  useStream(name, (event) => {
    console.log(`new event ${event.event.case}`)
    console.log(event)
  })
  // ユーザーの入力を模倣
  useEffect(() => {
    setTimeout(() => setName('Fogrex'), 1000)
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          Hello Response
          <div>
            {helloRes?.message}
          </div>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Home

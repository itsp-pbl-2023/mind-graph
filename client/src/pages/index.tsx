import { useCallback, useEffect, useState } from 'react'
import { hello } from '../lib/api/api-MindGraphService_connectquery'
import viteLogo from '/vite.svg'
import { useQuery } from '@tanstack/react-query'
import reactLogo from '../assets/react.svg'
import { useStream } from "../lib/hooks/stream.ts";
import styled from "styled-components";

const GamingTitle = styled.h1`
  @keyframes gaming-title-animation {
    0% {color: red;}
    20% {color: yellow;}
    40% {color: blue;}
    60% {color: green;}
    80% {color: lime;}
    100% {color: purple;}
  }
  animation: gaming-title-animation 2s linear infinite;
`
const CountCard = styled.div`
  padding: 2em;
`

const Home = () => {
  const [count, setCount] = useState(0)
  const { data: helloRes } = useQuery(hello.useQuery({ name: 'Fogrex' }))
  const [name, setName] = useState<string>()
  useStream(name, useCallback((event) => {
    console.log(`new event ${event.event.case}`)
    console.log(event)
  }, []))
  // ユーザーの入力を模倣
  
  useEffect(() => {
    setTimeout(() => setName('Fogrex'), 1000)
  }, [])
  


  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <GamingTitle>Vite + React</GamingTitle>
      <CountCard>
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
      </CountCard>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Home

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createConnectTransport } from "@bufbuild/connect-web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransportProvider } from "@bufbuild/connect-query";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css'

// for routing
import Home from './pages/index.tsx'

import Title from './pages/title.tsx';
import Waiting from './pages/waiting.tsx';
import Game from './pages/game.tsx';
import Voting from './pages/voting.tsx';
import Result from './pages/result.tsx';

const transport = createConnectTransport({
  baseUrl: "/api",
});
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/title",
    element: <Title />,
  },
  {
    path: "/waiting",
    element: <Waiting />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/voting",
    element: <Voting />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </TransportProvider>
  </React.StrictMode>,
)

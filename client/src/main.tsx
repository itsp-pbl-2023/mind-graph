import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransportProvider } from "@bufbuild/connect-query";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { transport } from "./lib/client.ts";

import './App.css'

// for routing
import Home from './pages/index.tsx'

import Title from './pages/title.tsx';
import Waiting from './pages/waiting.tsx';
import Game from './pages/game.tsx';
import Voting from './pages/voting.tsx';
import Result from './pages/result.tsx';
import { NameProvider } from './lib/hooks/name.tsx'
import { StreamProvider } from './lib/hooks/stream.tsx'
import { ThemeProvider } from './lib/hooks/theme.tsx';
import { UsersProvider } from './lib/hooks/users.tsx';
import { VotedProvider } from './lib/hooks/voted.tsx';
import { GraphProvider } from './lib/hooks/graph.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

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
        <NameProvider>
          <ThemeProvider>
            <StreamProvider>
              <UsersProvider>
                <VotedProvider>
                  <GraphProvider>
                    <RouterProvider router={router} />
                  </GraphProvider>
                </VotedProvider>
              </UsersProvider>
            </StreamProvider>
          </ThemeProvider>
        </NameProvider>
      </QueryClientProvider>
    </TransportProvider>
  </React.StrictMode>,
)

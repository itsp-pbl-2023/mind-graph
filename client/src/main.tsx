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
import About from './pages/about.tsx';

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
    path: "/about",
    element: <About />,
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

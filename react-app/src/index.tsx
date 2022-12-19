import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import { App } from 'App'
import { SomePage } from 'pages/SomePage'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/somepage" element={<SomePage />} />
          <Route path="/" element={<App />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { CssBaseline } from '@mui/material'

import { App } from 'App'
import { SomePage } from 'pages/SomePage'
import CatsStore from 'pages/CatsStore'
import { Theme } from 'providers/theme/Theme'
import MuiDemo from 'pages/MuiDemo'
import { FormsExample } from 'components/FormsExample/FormsExample'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    {/* <CssBaseline /> */}
    <Theme>
      <ToastContainer />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <CatsStore>
            <Routes>
              <Route path="/somepage" element={<SomePage />} />
              <Route path="/muidemo" element={<MuiDemo />} />
              <Route path="/forms-example" element={<FormsExample />} />
              <Route path="/" element={<App />} />
            </Routes>
          </CatsStore>
        </QueryClientProvider>
      </BrowserRouter>
    </Theme>
  </React.StrictMode>
)

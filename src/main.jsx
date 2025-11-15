import { createRoot } from 'react-dom/client'
import './index.css'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from "../src/routes/index.jsx"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

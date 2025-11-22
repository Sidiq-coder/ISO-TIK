import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/auth/context/AuthContext'
import router from "../src/routes/index.jsx"

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App;
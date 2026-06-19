import { createRoot } from 'react-dom/client'
import { router } from './App'
import { RouterProvider } from 'react-router'
import AuthProvider from './context/AuthContext'
import './index.css'

import { register } from 'swiper/element/bundle'

register()
import 'swiper/css'
import "swiper/css/navigation"
import "swiper/css/pagination"

import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position="top-center" reverseOrder={false}/>
    <AuthProvider>
      <ThemeProvider>
      <RouterProvider router={router}/>
      </ThemeProvider>
    </AuthProvider>
  </>
)

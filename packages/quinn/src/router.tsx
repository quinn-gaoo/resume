import { createBrowserRouter } from "react-router-dom";
import HomePage from './pages/home'
import CvPage from './pages/cv'


const router = createBrowserRouter([
  { path: "/cv", element: <CvPage /> },
  { path: "/", element: <HomePage /> },
])

export default router
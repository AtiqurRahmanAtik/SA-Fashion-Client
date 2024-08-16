import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Components/Layout/Main.jsx';
import Home from './Components/Home/Home.jsx';
import ErrorPage from './Components/Pages/ErrorPage.jsx';
import Login from './Components/Pages/Login.jsx';
import Register from './Components/Pages/register.jsx';
import AuthProvider from './Components/Providers/AuthProvider.jsx';
import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query';

const queryClient = new QueryClient();




const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path:'/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      }
   

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>

     <QueryClientProvider client={queryClient}>
     <RouterProvider router={router} />
    </QueryClientProvider>

    </AuthProvider>
  </StrictMode>,
)

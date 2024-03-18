import React from 'react'
import { CssBaseline } from '@mui/material'
import ReactDOM from 'react-dom/client'
import SignIn from './SignIn/SignIn.jsx'
import SignUp from './SignUp/SignUp.jsx'
import "./output.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react'
import theme from './theme.jsx'
import Home from './Home/Home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/signup",
    element: <SignUp />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)

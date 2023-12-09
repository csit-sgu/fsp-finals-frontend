import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { QuizPage } from './pages/QuizPage/QuizPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { CreatingQuizPage } from './pages/CreatingQuiz/CreatingQuizPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

import '@fontsource/ibm-plex-mono/300.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/700.css';
import { LogoutPage } from './pages/Logout/LogoutPage';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: orange[500],
    },
    navbar: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: 'IBM Plex Mono',
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/logout',
    element: <LogoutPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/quizzes/create',
    element: <CreatingQuizPage />,
  },
  {
    path: '/quizzes/:quizId',
    element: <QuizPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);

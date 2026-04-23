import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// HomePage Structure
import Layout from './layouts/Layout';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';


// Auth Pages Structure
import AuthLayout from './layouts/AuthLayout';
import SignInPage from './pages/AuthPages/SigninPage';
import SignUpPage from './pages/AuthPages/SignUpPage';

import NotFoundPage from './pages/NotFoundPage';

const routes = [
    {
     path: '/',
     element: <Layout />,
     // Error element
     errorElement: <NotFoundPage />,
     children: [{
         path: '/',
         element: <HomePage />,
        },
        {
            path: 'about',
            element: <AboutPage />,
        },
        {
            path: 'articles',
            element: <ArticleListPage />,
        },
        {   path: 'articles/:name', // -->articles/learn-react
            element: <ArticlePage />},
      ],
    },

    {
    path: "auth/",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      }
    ],
  },
  ];

  const router = createBrowserRouter(routes);

  function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
  export default App;
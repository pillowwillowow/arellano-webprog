import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// HomePage Structure
import Layout from './layouts/Layout';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';
import DashboardPage from "./pages/DashboardPages/DashboardPage";
import ReportsPage from "./pages/DashboardPages/ReportsPage";
import UsersPage from "./pages/DashboardPages/UsersPage";
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';

// Auth Pages Structure
import AuthLayout from './layouts/AuthLayout';
import SignInPage from './pages/AuthPages/SigninPage';
import SignUpPage from './pages/AuthPages/SignUpPage';

import NotFoundPage from './pages/NotFoundPage';

import DashLayout from './layouts/DashLayout';

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
        {   path: '/articles/:slug', // -->articles/learn-react
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
  {
    path: "dashboard",
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "dasharticles",
        element: <DashArticleListPage />
      }
    ],
  }
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
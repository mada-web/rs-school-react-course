import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import About from './pages/About/About';
import MainPage from './pages/Main/MainPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import { users } from './constants/products.constant';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage users={users} />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/about',
      element: <About />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

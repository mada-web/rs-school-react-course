import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainPage } from './pages/Main';
import { FormsPage } from './pages/Forms';
import { NotFoundPage } from './pages/NotFound';
import { About } from './pages/About';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/forms',
      element: <FormsPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

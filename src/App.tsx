import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { About, FormPage, MainPage, NotFoundPage } from './pages';

export const routerConfig = [
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
    element: <FormPage />,
  },
];

const router = createBrowserRouter(routerConfig);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

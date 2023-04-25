import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { About, FormsPage, MainPage, NotFoundPage } from './pages';

function Router() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/forms" element={<FormsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;

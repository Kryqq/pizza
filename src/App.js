import './scss/app.scss';
import './App.css';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';

import { Routes, Route } from 'react-router-dom';
import React from 'react';
import MainLayout from './layouts/MainLayout';

function App() {
   return (
      <MainLayout>
         <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/Cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route path="/*" element={<NotFound />} />
         </Routes>
      </MainLayout>
   );
}

export default App;

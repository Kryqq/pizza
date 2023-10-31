import './scss/app.scss';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';

import React from 'react';

function App() {
   return (
      <div className="wrapper">
         <Header />

         <div className="container">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/Cart" element={<Cart />} />
               <Route path="/*" element={<NotFound />} />
            </Routes>
         </div>
      </div>
   );
}

export default App;

import './scss/app.scss';
import './App.css';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';

import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

function App() {
   return (
      <Routes>
         <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route path="/*" element={<NotFound />} />
         </Route>
      </Routes>
   );
}

export default App;

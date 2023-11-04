import './scss/app.scss';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slices/filterSlice'
import { Routes, Route } from 'react-router-dom';
import React from 'react';

export const SearchContext = React.createContext();

function App() {
   const [searchValue, setSearchValue] = React.useState('');
   const count = useSelector((state) => state.counter.count);
   const dispatch = useDispatch();
   return (
      <div className="wrapper">
         <button aria-label="Increment value" onClick={() => dispatch(increment())}>
            Increment
         </button>
         <span>{count}</span>
         <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
            Decrement
         </button>
         {/* /<SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <Header />

            <div className="container">
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/*" element={<NotFound />} />
               </Routes>
            </div>
         </SearchContext.Provider> */}
      </div>
   );
}

export default App;

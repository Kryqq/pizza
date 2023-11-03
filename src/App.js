import './scss/app.scss';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import React from 'react';

export const SearchContext = React.createContext();

function App() {
   const [searchValue, setSearchValue] = React.useState('');

   return (
      <div className="wrapper">
         <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <Header />

            <div className="container">
               <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/*" element={<NotFound />} />
               </Routes>
            </div>
         </SearchContext.Provider>
      </div>
   );
}

export default App;

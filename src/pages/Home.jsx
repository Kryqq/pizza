import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';

const Home = () => {
   const [items, setItems] = React.useState([]);
   const [isLoading, setIsloading] = React.useState(true);

   React.useEffect(() => {
      fetch('https://653a70a02e42fd0d54d3e7e7.mockapi.io/Items')
         .then((res) => res.json())
         .then((arr) => {
            setItems(arr);
            setIsloading(false);
         });
   }, []);

   return (
      <>
         <div className="content__top">
            <Categories />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
         </div>
      </>
   );
};

export default Home;

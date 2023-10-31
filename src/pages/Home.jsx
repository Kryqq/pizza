import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';

const Home = () => {
   const [items, setItems] = React.useState([]);
   const [isLoading, setIsloading] = React.useState(true);
   const [categoryId, setCategoryId] = React.useState(0);
   const [sortType, setSortType] = React.useState(0);

   React.useEffect(() => {
	setIsloading(true)
      fetch('https://653a70a02e42fd0d54d3e7e7.mockapi.io/Items?category=' + categoryId)
         .then((res) => res.json())
         .then((arr) => {
            setItems(arr);
            setIsloading(false);
         });
      window.scrollTo(0, 0);
   }, [categoryId]);

   return (
      <div className="content">
         <div className="content__top">
            <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
         </div>
      </div>
   );
};

export default Home;

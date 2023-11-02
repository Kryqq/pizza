import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';

const Home = ({ searchValue }) => {
   const [items, setItems] = React.useState([]);
   const [isLoading, setIsloading] = React.useState(true);
   const [categoryId, setCategoryId] = React.useState(0);
   const [sortType, setSortType] = React.useState({ name: ' популярности', sortProperty: 'rating' });

   React.useEffect(() => {
      setIsloading(true);

      const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
      const sortBy = sortType.sortProperty.replace('-', '');
      const category = categoryId > 0 ? `category=${categoryId}` : '';

      fetch(`https://653a70a02e42fd0d54d3e7e7.mockapi.io/Items?${category}&sortBy=${sortBy}&order=${order}`)
         .then((res) => res.json())
         .then((arr) => {
            setItems(arr);
            setIsloading(false);
         });
      window.scrollTo(0, 0);
   }, [categoryId, sortType]);

   const pizzas = items
      .filter((obj) => {
         return obj.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
   const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

   return (
      <div className="content">
         <div className="content__top">
            <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
            <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      </div>
   );
};

export default Home;

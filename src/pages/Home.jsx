import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Index';

import { SearchContext } from '../App';

const Home = () => {
   const categoryId = useSelector((state) => state.filter.categoryId);
   const sortType = useSelector((state) => state.filter.sort.sortProperty );

   const [items, setItems] = React.useState([]);
   const [isLoading, setIsloading] = React.useState(true);

   const [currentPage, setcurrentPage] = React.useState(1);

   //
   const { searchValue } = React.useContext(SearchContext);

   const dispatch = useDispatch();

   const onChangeCategory = (id) => {
      dispatch(setCategoryId(id));
   };


   React.useEffect(() => {
      setIsloading(true);

      const order = sortType.includes('-') ? 'asc' : 'desc';
      const sortBy = sortType.replace('-', '');
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      fetch(
         `https://653a70a02e42fd0d54d3e7e7.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
         .then((res) => res.json())
         .then((arr) => {
            setItems(arr);
            setIsloading(false);
         });
      window.scrollTo(0, 0);
   }, [categoryId, sortType, searchValue, currentPage]);

   const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
   const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

   return (
      <div className="content">
         <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory} />
            <Sort/>
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">{isLoading ? skeletons : pizzas}</div>
         <Pagination onChangePage={(number) => setcurrentPage(number)} />
      </div>
   );
};

export default Home;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Index';
import { list } from '../components/Sort';
import { SearchContext } from '../App';

const Home = () => {
   const categoryId = useSelector((state) => state.filter.categoryId);
   const sortType = useSelector((state) => state.filter.sort.sortProperty);
   const currentPage = useSelector((state) => state.filter.currentPage);

   const [items, setItems] = React.useState([]);
   const [isLoading, setIsloading] = React.useState(true);
   const { searchValue } = React.useContext(SearchContext);
//    const isSearch = React.useRef(false);
//    const isMounted = React.useRef(false);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onChangeCategory = (id) => {
      dispatch(setCategoryId(id));
   };

   const onChangePage = (number) => {
      dispatch(setCurrentPage(number));
   };

   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1));

         const sort = list.find((obj) => obj.sortProperty === params.sortType);

         dispatch(
            setFilters({
               ...params,
               sort,
            })
         );
     //     isSearch(true);
      }
   }, []);

   React.useEffect(() => {
     //  if (isMounted.current) {
         const queryString = qs.stringify({
            sortType: sortType,
            categoryId,
            currentPage,
         });
         navigate(`?${queryString}`);
     //  }
     //  isMounted.current = true;
   }, [categoryId, sortType, currentPage]);

   const fetchPizzas = () => {
      setIsloading(true);

      const order = sortType.includes('-') ? 'asc' : 'desc';
      const sortBy = sortType.replace('-', '');
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      //  fetch(
      //     `https://653a70a02e42fd0d54d3e7e7.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      //  )
      //     .then((res) => res.json())
      //     .then((arr) => {
      //        setItems(arr);
      //        setIsloading(false);
      //     });

      axios
         .get(
            `https://653a70a02e42fd0d54d3e7e7.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
         )
         .then((res) => {
            setItems(res.data);
            setIsloading(false);
         });
   };

   React.useEffect(() => {
      window.scrollTo(0, 0);
     //  if (!isSearch.current) {
         fetchPizzas();
     //  }
     //  isSearch.current = false;
   }, [categoryId, sortType, searchValue, currentPage]);

   const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
   const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

   return (
      <div className="content">
         <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory} />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">{isLoading ? skeletons : pizzas}</div>
         <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
   );
};

export default Home;

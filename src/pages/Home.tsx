import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { FilterSliceState, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/pizzaBlock/PizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Index';
import { list } from '../components/Sort';
import { useAppDispatch } from '../redux/store';
import { RootState } from '../redux/store';
import { SearchPizzaParams } from '../redux/slices/pizzaSlice';

const Home: React.FC = () => {
   const categoryId = useSelector((state: RootState) => state.filter.categoryId);
   const sortType = useSelector((state: RootState) => state.filter.sort.sortProperty);
   const currentPage = useSelector((state: RootState) => state.filter.currentPage);
   const searchValue = useSelector((state: RootState) => state.filter.searchValue);
   const { items, status } = useSelector(selectPizzaData);

   //    const isSearch = React.useRef(false);
   //    const isMounted = React.useRef(false);

   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const onChangeCategory = (id: number) => {
      dispatch(setCategoryId(id));
   };

   const onChangePage = (number: number) => {
      dispatch(setCurrentPage(number));
   };

   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

         const sort = list.find((obj) => obj.sortProperty === params.sortBy);

         dispatch(
            setFilters({
               searchValue: params.search,
               categoryId: Number(params.category),
               currentPage: Number(params.currentPage),
               sort: sort || list[0],
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

   const getPizzas = async () => {
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

      //  await axios
      //     .get(
      //        `https://653a70a02e42fd0d54d3e7e7.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      //     )
      //     .then((res) => {
      //        setItems(res.data);
      //        setIsloading(false);
      //     });

      dispatch(
         fetchPizzas({
            order,
            sortBy,
            category,
            search,
            currentPage: String(currentPage),
         })
      );
   };

   React.useEffect(() => {
      window.scrollTo(0, 0);
      //  if (!isSearch.current) {
      getPizzas();
      //  }
      //  isSearch.current = false;
   }, [categoryId, sortType, searchValue, currentPage]);

   const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
   const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

   return (
      <div className="content">
         <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory} />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {status === 'error' ? (
            <div className="contnent__error-info">
               <h2>
                  Проишла ошибка <span>😕</span>
               </h2>
               <p>К сожалению не получилось получить пиццы... попробуйте позже.</p>
            </div>
         ) : (
            <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
         )}

         <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
   );
};

export default Home;

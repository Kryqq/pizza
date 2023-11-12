import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from 'axios';

type FetchPizzasArgs = Record<string, string>;

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
   const { order, sortBy, category, search, currentPage } = params;
   const { data } = await axios.get(
      `https://653a70a02e42fd0d54d3e7e7.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
   );
   return data;
});

type Pizza = {
   id: string;
   title: string;
   price: number;
   imageurl: string;
   sizes: number[];
   types: number[];
};

export enum Status {
   LOADING = 'loading',
   SUCCESS = 'success',
   ERROR = 'error',
}

export type SearchPizzaParams = {
   order: string;
   sortBy: String;
   category: string;
   search: string;
   currentPage: string;
};

interface PizzaSliceState {
   items: Pizza[];
   status: Status;
}

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING,
};

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems(state, action: PayloadAction<Pizza[]>) {
         state.items = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
         })
         .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
         })
         .addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
         });
   },
});

export const { setItems } = pizzaSlice.actions;
export const selectPizzaData = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;

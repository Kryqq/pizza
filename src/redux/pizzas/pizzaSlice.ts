import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
   const { order, sortBy, category, search, currentPage } = params;
   const { data } = await axios.get(
      `https://653a70a02e42fd0d54d3e7e7.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
   );
   return data;
});

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


export default pizzaSlice.reducer;

export type Pizza = {
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

export interface PizzaSliceState {
   items: Pizza[];
   status: Status;
}

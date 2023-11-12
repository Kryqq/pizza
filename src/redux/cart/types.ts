export type CartItem = {
   id: string;
   title: string;
   price: number;
   imageurl: string;
   size: number;
   type: string;
   count: number;
};

export interface CartSliceState {
   totalPrice: number;
   items: CartItem[];
}

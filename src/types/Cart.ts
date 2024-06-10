import { Product } from './Product';

export interface CartItem {
  product: Product;
}

export interface Cart {
  items: CartItem[];
  totalPrice: TotalPriceNumber;
}

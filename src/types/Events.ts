import { Product } from './Product';
import { Cart } from './Cart';
import { Order } from './Order';
import { User } from './User';

export interface ProductEvent {
  type: 'PRODUCT_ADDED' | 'PRODUCT_REMOVED';
  payload: Product;
}

export interface CartEvent {
  type: 'CART_UPDATED';
  payload: Cart;
}

export interface OrderEvent {
  type: 'ORDER_PLACED' | 'ORDER_FAILED';
  payload: Order;
}

export interface UserEvent {
  type: 'USER_UPDATED';
  payload: User;
}

export type AppEvent = ProductEvent | CartEvent | OrderEvent | UserEvent;

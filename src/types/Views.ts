import { Product } from './Product';
import { Cart, CartItem } from './Cart';
import { Order } from './Order';
import { User } from './User';

export interface ProductView {
  showProduct(product: Product): void;
  showProductList(products: Product[]): void;
}

export interface CartView {
  showCart(cart: Cart): void;
  updateCart(cart: Cart): void;
}

export interface OrderView {
  showOrderConfirmation(order: Order): void;
  showOrderError(error: string): void;
}

export interface UserView {
  showUserProfile(user: User): void;
}

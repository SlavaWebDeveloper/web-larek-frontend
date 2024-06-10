import { Product } from './Product';
import { Cart, CartItem } from './Cart';
import { Order } from './Order';
import { User } from './User';

export interface ApiClient {
  getProducts(): Promise<Product[]>;
  getProductById(productId: UniqueId): Promise<Product>;
  addToCart(cartItem: CartItem): Promise<Cart>;
  removeFromCart(cartItem: CartItem): Promise<Cart>;
  getCart(): Promise<Cart>;
  placeOrder(order: Order): Promise<Order>;
  getOrderById(orderId: UniqueId): Promise<Order>;
  getUserById(userId: UniqueId): Promise<User>;
}

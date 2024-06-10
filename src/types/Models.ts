import { Product } from './Product';
import { Cart, CartItem } from './Cart';
import { Order } from './Order';
import { User } from './User';

export interface ProductModel {
	getProducts(): Promise<Product[]>;
	getProductById(productId: UniqueId): Promise<Product>;
}

export interface CartModel {
	getCart(): Promise<Cart>;
	addToCart(productId: UniqueId): Promise<Cart>;
	removeFromCart(productId: UniqueId): Promise<Cart>;
}

export interface OrderModel {
	placeOrder(order: Order): Promise<Order>;
	getOrderById(orderId: UniqueId): Promise<Order>;
}

export interface UserModel {
	getUserById(userId: UniqueId): Promise<User>;
}
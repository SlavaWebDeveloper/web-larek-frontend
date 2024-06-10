import { CartItem } from './Cart';

type OrderStatus = 'pending' | 'completed' | 'cancelled';

export interface Order {
	id: UniqueId;
	items: CartItem[];
	totalAmount: TotalPriceNumber;
	paymentMethod: OrderPayment;
	deliveryAddress: AddressString;
	email: Email;
	phone: PhoneString;
	status: OrderStatus;
}
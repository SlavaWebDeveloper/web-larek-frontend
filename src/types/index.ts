
/*
 * Описание товара
 */
interface IProduct {
	id: UniqueId;
	description: TextString;
	imageUrl: ImageUrlString;
	title: TextString;
	category: CategoryType;
	price: PriceCents;
	isSelected: HasCart;
}

/*
 * Описание заказа
 */


interface IPage {
	counter: number;
	store: IProduct[];
}

/*
 * Описание корзины
 */
interface IBasket {
	list: IProduct[];
	price: PriceCents;
}

interface IModalOrder {
	address: AddressString;
	payment: OrderPayment;
}

interface IModalContacts {
	phone: PhoneString;
	email: Email;
}














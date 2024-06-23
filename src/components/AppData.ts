import {
	FormErrors,
	IAppState,
	IOrder,
	IOrderForm,
	IProduct,
	ProductCategory,
} from '../types';

import { Model } from './base/Model';

// Класс, описывающий модель продукта
export class Product extends Model<IProduct> {
	id: UniqueId;
	description: TextString;
	image: ImageUrlString;
	title: TextString;
	category: keyof typeof ProductCategory;
	price: PriceCents;
	selected: HasCart;
}

/*
 * Класс, описывающий состояние приложения
 * */
export class AppState extends Model<IAppState> {
	basket: Product[] = [];

	catalog: Product[];

	order: IOrder = {
		items: [],
		payment: 'cash',
		total: null,
		address: '',
		email: '',
		phone: '',
	};

	formErrors: FormErrors = {};

	addToBasket(value: Product) {
		this.basket.push(value);
	}

	deleteFromBasket(id: UniqueId) {
		this.basket = this.basket.filter((item) => item.id !== id);
	}

	clearBasket() {
		this.basket.length = 0;
	}

	getBasketAmount() {
		return this.basket.length;
	}

	setItems() {
		this.order.items = this.basket.map((item) => item.id);
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;

		if (this.validateContacts()) {
			this.events.emit('contacts:ready', this.order);
		}
		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('contactsFormErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		this.formErrors = errors;
		this.events.emit('orderFormErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	refreshOrder() {
		this.order = {
			items: [],
			total: null,
			address: '',
			email: '',
			phone: '',
			payment: 'cash',
		};
	}

	getTotalBasketPrice() {
		return this.basket.reduce((sum, next) => sum + next.price, 0);
	}

	setStore(items: IProduct[]) {
		this.catalog = items.map(
			(item) => new Product({ ...item, selected: false }, this.events)
		);
		this.emitChanges('items:changed', { store: this.catalog });
	}

	resetSelected() {
		this.catalog.forEach((item) => (item.selected = false));
	}
}

import { Product } from '../components/AppData';

export const ProductCategory = {
	['софт-скил']: 'soft',
	['другое']: 'other',
	['кнопка']: 'button',
	['хард-скил']: 'hard',
	['дополнительное']: 'additional',
};

export const currentCurrency = {
	currency: ' синапсов',
	free: 'Бесценно',
};

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export type ApiListResponse<Type> = {
	total: PriceCents;
	items: Type[];
};

/*
 * Интерфейс, описывающий поля товара в магазине
 * */
export type IProduct = {
	// уникальный ID
	id: UniqueId;

	// описание товара
	description: string;

	// ссылка на картинку
	image: string;

	// название
	title: string;

	// категория товара
	category: keyof typeof ProductCategory;

	// цена товара, может быть null
	price: PriceCents;

	// был данный товар добавлен в корзину или нет
	selected: HasCart;
};

/*
  * Интерфейс описывающий внутренне состояние приложения
    Используется для хранения карточек, корзины, заказа пользователя, ошибок
    при вообще в формах
    Так же имеет методы для работы с карточками и корзиной
  * */
export interface IAppState {
	// Корзина с товарами
	basket: Product[];
	// Массив карточек товара
	store: Product[];
	// Информация о заказе при покупке товара
	order: IOrder;
	// Ошибки при заполнении форм
	formErrors: FormErrors;
	// Метод для добавления товара в корзину
	addToBasket(value: Product): void;
	// Метод для удаления товара из корзины
	deleteFromBasket(id: string): void;
	// Метод для полной очистки корзины
	clearBasket(): void;
	// Метод для получения количества товаров в корзине
	getBasketAmount(): number;
	// Метод для получения суммы цены всех товаров в корзине
	getTotalBasketPrice(): number;
	// Метод для добавления ID товаров в корзине в поле items для order
	setItems(): void;
	// Метод для заполнения полей email, phone, address, payment в order
	setOrderField(field: keyof IOrderForm, value: string): void;
	// Валидация форм для окошка "контакты"
	validateContacts(): boolean;
	// Валидация форм для окошка "заказ"
	validateOrder(): boolean;
	// Очистить order после покупки товаров
	refreshOrder(): boolean;
	// Метод для превращения данных, полученых с сервера в тип данных приложения
	setStore(items: IProduct[]): void;
	// Метод для обновления поля selected во всех товарах после совершения покупки
	resetSelected(): void;
}

/*
 * Интерфейс, описывающий поля заказа товара
 * */
export interface IOrder {
	// Массив ID купленных товаров
	items: string[];

	// Способ оплаты
	payment: string;

	// Сумма заказа
	total: PriceCents;

	// Адрес доставки
	address: AddressString;

	// Электронная почта
	email: EmailString;

	// Телефон
	phone: PhoneString;
}

export interface IOrderResult {
	id: UniqueId[];
	total: PriceCents;
	error?: string;
}

export interface IOrderForm {
	payment: string;
	address: AddressString;
	email: EmailString;
	phone: PhoneString;
}

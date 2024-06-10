# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Базовые классы 

- Product: Описывает товар в магазине, включая его идентификатор, название, категорию, описание, цену, изображение и наличие в корзине.

type CategoryType =
	| 'другое'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export interface Product {
	id: UniqueId;
	name: TextString;
	description: TextString;
	price: PriceCents;
	category: CategoryType;
	imageUrl: ImageUrlString;
	inStock: HasCart;
}

- CartItem и Cart: Описывают структуру корзины и элементов в ней, включая список товаров и общую стоимость.

export interface CartItem {
  product: Product;
}

export interface Cart {
  items: CartItem[];
  totalPrice: TotalPriceNumber;
}

- Order: Описывает структуру заказа, включая идентификатор, список товаров, общую сумму, метод оплаты, адрес доставки, контактные данные покупателя и статус заказа.

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

- User: Описывает структуру пользователя, включая идентификатор, электронную почту и номер телефона.

export interface User {
  id: UniqueId;
  email: Email;
  phone: PhoneString;
}

- ApiClient: Интерфейс для взаимодействия с API, включающий методы для получения продуктов, работы с корзиной, оформления заказов и работы с пользователями.

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


- Models: Интерфейсы для моделей данных, включая методы для работы с продуктами, корзиной, заказами и пользователями.

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

- Views: Интерфейсы для отображения данных пользователю, включая методы для отображения продуктов, корзины, заказов и профиля пользователя.

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

- BaseClasses: Интерфейсы базовых классов для моделей и отображений, включая методы для загрузки и сохранения данных, а также рендеринга и уничтожения отображений.

export interface BaseModel {
  fetch(): Promise<void>;
  save(): Promise<void>;
}

export interface BaseView {
  render(): void;
  destroy(): void;
}

- Events: Интерфейсы событий и их типов, используемые для взаимодействия между компонентами приложения.

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

Все типы данных и интерфейсы определены с использованием предоставленных алиасов для улучшения читаемости кода и ясности его структуры.

type Email = string;
type UniqueId = string;
type DateTimeString = string;
type PriceCents = number | null;
type PhoneString = string;
type AddressString = string;
type TextString = string;
type ImageUrlString = string;
type TotalPriceNumber = number;
type HasCart = true | false;
type OrderPayment = 'card' | 'cash';
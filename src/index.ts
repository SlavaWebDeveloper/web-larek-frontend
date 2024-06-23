import './scss/styles.scss';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import {
	ApiListResponse,
	IOrderForm,
	IProduct,
	ProductCategory,
} from './types';
import { LarekAPI } from './components/LarekAPI';
import { AppState, Product } from './components/AppData';
import { Page } from './components/common/Page';
import {
	CatalogProductBacket,
	StoreItem,
	StoreItemPreview,
} from './components/common/Card';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { Order } from './components/common/Order';
import { Contacts } from './components/ContactsForm';
import { Success } from './components/common/Success';

const api = new LarekAPI(API_URL);
const events = new EventEmitter();

// Все шаблоны
const storeProductTemplate =
	ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые компоненты
const basket = new Basket('basket', cloneTemplate(basketTemplate), events);
const order = new Order('order', cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const success = new Success('order-success', cloneTemplate(successTemplate), {
	onClick: () => {
		events.emit('modal:close');
		modal.close();
	},
});

// Получаем лоты с сервера
api
	.getProductList()
	.then((data) => {
		appData.setStore(data);
	})
	.catch((err) => {
		console.error(err);
	});

// Показать каталог и менять при изменении
events.on('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const product = new StoreItem(cloneTemplate(storeProductTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return product.render({
			id: item.id,
			title: item.title,
			image: item.image,
			category: item.category as keyof typeof ProductCategory,
			price: item.price,
		});
	});
});

// открыть модальное окно с карточкой
events.on('card:select', (item: Product) => {
	page.locked = true;

	const card = new StoreItemPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			events.emit('card:toBasket', item);
		},
	});

	modal.render({
		content: card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			category: item.category as keyof typeof ProductCategory,
			price: item.price,
			description: item.description,
			selected: item.selected,
		}),
	});
});

// Добавление товара в корзину
events.on('card:toBasket', (item: Product) => {
	item.selected = true;
	appData.addToBasket(item);
	page.counter = appData.getBasketAmount();
	modal.close();
});

// Открытие корзины
events.on('basket:open', () => {
	page.locked = true;

	const basketView = appData.basket.map((item, index) => {
		const cardItem = new CatalogProductBacket(
			'card',
			cloneTemplate(cardBasketTemplate),
			{
				onClick: () => events.emit('basket:delete', item),
			}
		);
		return cardItem.render({
			id: item.id,
			title: item.title,
			image: item.image,
			category: item.category as keyof typeof ProductCategory,
			price: item.price,
			index: index + 1,
		});
	});

	basket.setItems(basketView);

	modal.render({
		content: basket.render({
			items: basketView,
			total: appData.getTotalBasketPrice(),
		}),
	});
});

// Удаление товара из корзины
events.on('basket:delete', (item: Product) => {
	appData.deleteFromBasket(item.id);
	item.selected = false;
	page.counter = appData.getBasketAmount();
	basket.refreshIndices();
	basket.total = appData.getTotalBasketPrice();

	if (!appData.basket.length) {
		basket.setItems([]);
		basket.disableButton();
	}
});

// оформить заказ
events.on('basket:order', () => {
	page.locked = true;
	modal.render({
		content: order.render({
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

// Изменилось состояние валидации заказа
events.on('orderFormErrors:change', (errors: Partial<IOrderForm>) => {
	const { payment, address } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

// Изменилось состояние валидации контактов
events.on('contactsFormErrors:change', (errors: Partial<IOrderForm>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

// Изменились введенные данные
events.on(
	'orderInput:change',
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

// Заполнить телефон и почту
events.on('order:submit', () => {
	appData.order.total = appData.getTotalBasketPrice();
	appData.setItems();
	modal.render({
		content: contacts.render({
			valid: false,
			errors: [],
		}),
	});
});

// // Покупка товаров
events.on('contacts:submit', () => {
	api
		.orderProduct(appData.order)
		.then((res) => {
			events.emit('order:success', res);
			appData.clearBasket();
			appData.refreshOrder();
			page.counter = 0;
			appData.resetSelected();
		})
		.catch((err) => {
			console.log(err);
		});
});

// Окно успешной покупки
events.on('order:success', (res: ApiListResponse<string>) => {
	modal.render({
		content: success.render({
			description: res.total,
		}),
	});
});

// Закрытие модального окна
events.on('modal:close', () => {
	page.locked = false;
	appData.refreshOrder();
});

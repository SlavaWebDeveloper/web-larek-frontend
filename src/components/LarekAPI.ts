import { Api } from './base/api';
import { IOrder, IProduct, IOrderResult, ApiListResponse } from '../types';

// Интерфейс, описывающий API
export interface ILarekAPI {
	getProductList: () => Promise<IProduct[]>;
	getProductItem: (id: UniqueId) => Promise<IProduct>;
	orderProduct: (order: IOrder) => Promise<IOrderResult>;
}

// Класс API
export class LarekAPI extends Api implements ILarekAPI {
	constructor(baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
	}

	// Метод для получения списка карточки товаров
	async getProductList(): Promise<IProduct[]> {
		return this.get('/product/').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
			}))
		);
	}

	// Метод для получения карточки товара
	async getProductItem(id: UniqueId): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
		}));
	}

	// Метод для оформления заказа
	async orderProduct(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}

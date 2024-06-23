import { currentCurrency, IProduct, ProductCategory } from '../../types';
import { CDN_URL } from '../../utils/constants';
import { ensureElement, formatNumber } from '../../utils/utils';
import { Component } from '../base/Component';

// Интерфейс, описывающий действие кнопки
interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

// Класс карточки
export class Card extends Component<IProduct> {
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._image = ensureElement<HTMLImageElement>(
			`.${blockName}__image`,
			container
		);
		this._button = container.querySelector(`.${blockName}__button`);
		this._category = container.querySelector(`.${blockName}__category`);
		this._price = container.querySelector(`.${blockName}__price`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	// Сеттер и геттер для уникального ID
	set id(value: UniqueId) {
		this.container.dataset.id = value;
	}

	get id(): UniqueId {
		return this.container.dataset.id || '';
	}

	// Сеттер и гетер для названия
	set title(value: TextString) {
		this.setText(this._title, value);
	}

	get title(): TextString {
		return this._title.textContent || '';
	}

	// Сеттер для кратинки
	set image(value: ImageUrlString) {
		this.setImage(this._image, CDN_URL + value, this.title);
	}

	// Сеттер для определения выбрали товар или нет
	set selected(value: HasCart) {
		if (!this._button.disabled) {
			this.setDisabled(this._button, value);
			this.setText(this._button, value ? 'Уже в корзине' : 'В корзину');
		}
	}

	// Сеттер для цены
	set price(value: PriceCents) {
		this.setText(
			this._price,
			value
				? formatNumber(value) + currentCurrency.currency
				: currentCurrency.free
		);

		if (this._button && !value) {
			this.setDisabled(this._button, true);
		}
	}

	// Сеттер для категории
	set category(value: keyof typeof ProductCategory) {
		this.setText(this._category, value);

		// Стилизация категорий
		const categoryStyle = `card__category_${ProductCategory[value]}`;
		this._category.classList.add(categoryStyle);
	}
}

// Класс карточки для каталога
export class StoreItem extends Card {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);
	}
}

// Класс карточки для предпросмотра
export class StoreItemPreview extends Card {
	protected _description: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);

		this._description = container.querySelector(`.${this.blockName}__text`);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}
}

// Интерфейс карточки корзины
export interface IProductBacket extends IProduct {
	id: UniqueId;
	index: number;
}

// Интерфейс, описывающий действие кнопки
export interface ICatalogProductBacketActions {
	onClick: (event: MouseEvent) => void;
}

// Класс карточки корзины
export class CatalogProductBacket extends Component<IProductBacket> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICatalogProductBacketActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
		this._index = container.querySelector(`.basket__item-index`);
		this._button = container.querySelector(`.${blockName}__button`);

		if (this._button) {
			this._button.addEventListener('click', (evt) => {
				this.container.remove();
				actions?.onClick(evt);
			});
		}
	}

	// Сеттер для заголовка товара в корзине
	set title(value: TextString) {
		this.setText(this._title, value);
	}

	// Сеттер для индекса
	set index(value: number) {
		this.setText(this._index, value.toString());
	}

	// Сеттер для цены
	set price(value: PriceCents) {
		this.setText(this._price, formatNumber(value) + currentCurrency.currency);
	}
}

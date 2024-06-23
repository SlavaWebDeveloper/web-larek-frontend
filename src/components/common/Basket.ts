import { Component } from '../base/Component';
import { createElement, formatNumber } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { currentCurrency } from '../../types';

// Интерфейс, описывающий корзину товаров
interface IBasketView {
	items: HTMLElement[];
	total: PriceCents;
	selected: string[];
}

// Класс корзины
export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		protected events: EventEmitter
	) {
		super(container);

		this._list = container.querySelector(`.${blockName}__list`);
		this._total = container.querySelector(`.${blockName}__price`);
		this._button = container.querySelector(`.${blockName}__button`);

		if (this._button) {
			this._button.addEventListener('click', () => events.emit('basket:order'));
		}

		this.setItems([]);
	}

	// Сеттер для списка товаров
	set list(items: HTMLElement[]) {
		this._list.replaceChildren(...items);
	}

	// Сеттер для общей стоимости
	set total(total: PriceCents) {
		this.setText(this._total, formatNumber(total) + currentCurrency.currency);
	}

	// Метод для обновления индексов таблички при удалении товара из корзины
	refreshIndices() {
		Array.from(this._list.children).forEach(
			(item, index) =>
				(item.querySelector(`.basket__item-index`)!.textContent = (
					index + 1
				).toString())
		);
	}

	// Метод для установки элементов корзины
	setItems(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this.enableButton();
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.disableButton();
		}
	}

	// Метод для дизейблирования кнопки
	disableButton() {
		if (this._button) {
			this._button.disabled = true;
		}
	}

	// Метод для включения кнопки
	enableButton() {
		if (this._button) {
			this._button.disabled = false;
		}
	}
}

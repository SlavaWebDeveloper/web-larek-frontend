import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

// интерфейс страницы
interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

// Класс страницы
export class Page extends Component<IPage> {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	// Сеттер для счётчика
	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	// Сеттер для каталога
	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	// Сеттер для блокировки скролла
	set locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	}
}
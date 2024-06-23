import { IOrder } from '../../types';
import { IEvents } from '../base/events';
import { Form } from './Form';

// Класс формы оформления заказа
export class Order extends Form<IOrder> {
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLFormElement,
		events: IEvents
	) {
		super(container, events);

		this._card = container.elements.namedItem('card') as HTMLButtonElement;
		this._cash = container.elements.namedItem('cash') as HTMLButtonElement;

		this._cash.classList.add('button_alt-active');

		if (this._cash) {
			this._cash.addEventListener('click', () => {
				this._cash.classList.add('button_alt-active');
				this._card.classList.remove('button_alt-active');
				this.onInputChange('payment', 'cash');
			});
		}

		if (this._card) {
			this._card.addEventListener('click', () => {
				this._card.classList.add('button_alt-active');
				this._cash.classList.remove('button_alt-active');
				this.onInputChange('payment', 'card');
			});
		}
	}

	// Сеттер для полей формы
	set phone(value: PhoneString) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: EmailString) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	set address(value: AddressString) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}

import { Component } from '../base/Component';
import { currentCurrency } from '../../types';

// Интерфейс, описывающий конечный итог заказа
export interface ISuccess {
	description: number;
}

// Интерфейс, описывающий действие кнопки
interface ISuccessActions {
	onClick: (event: MouseEvent) => void;
}

// Класс вывода информации о успешном списании
export class Success extends Component<ISuccess> {
	protected _button: HTMLButtonElement;
	protected _description: HTMLElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ISuccessActions
	) {
		super(container);

		this._button = container.querySelector(`.${blockName}__close`);
		this._description = container.querySelector(`.${blockName}__description`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			}
		}
	}

	// Сеттер для цены
	set description(value: string) {
		this.setText(
			this._description,
			'Списано ' + value + currentCurrency.currency
		);
	}
}

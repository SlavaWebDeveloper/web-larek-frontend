import { IEvents } from './base/events';
import { Form } from './common/Form';

/*
 * Интерфейс модального окна контактов
 * */
export interface IContacts {
	phone: PhoneString;
	email: EmailString;
}

/*
 * Класс формы контактов
 * */
export class Contacts extends Form<IContacts> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}
}

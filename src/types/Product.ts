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

import { INVENTORY_ITEM_QUANTITY_CHANGE } from './types';

export const inventoryItemQuantityChange = (item, quantity) => {
	
	return {
		type: INVENTORY_ITEM_QUANTITY_CHANGE,
		item: item,
		quantity: quantity
	}
	
}

import _ from 'underscore';

import { INVENTORY_ITEM_QUANTITY_CHANGE } from '../../actions/types';

import { getOutput } from './output';
import { getRequirements } from './requirements';

// initial state of the calculator
const calculatorInitialState = {
	inventory: {},	// items entered into the calculator
	output: {},	// output of potions created based in inventory input
	requirements: {}	// items required for the potion output that are not in the inventory
}

/**
 * Helper function to format the collection of potion output as well as item requirements
 * Used when reducing both output and requirements to create a consistent format for the item collection
 * Takes the provided items object and returns a new copy with the given item, quantity, and source added/updated
 * If the provided quantity is zero it is filtered out and not added to the collection of items
 * 
 * For example: If the existing item collection looks something like:
 * 		{
 * 			SUPER_ATTACK: {
 * 				quantity: 10,
 * 				sources: [
 * 					{ quantity: 10, source: "Needed to make Extreme Attack Potion" }
 * 				]
 * 			}
 * 		}
 * 
 * This function could be used as: addItemResult(items, SUPER_ATTACK, 100, "Use remaining Irit")
 * This would result in the super attack quantity being incremented to a total of 110 and an additional source added
 * 
 * @param  {object} items  		An items object to return an updated copy of
 * @param  {string} itemID  	Unique item identifier (OVERLOAD, EXTREME_ATTACK, etc.)
 * @param  {integer} quantity 	The quantity of item being output
 * @param  {string} source  	The source of the output ("Needed to make Extreme Attack Potion", etc.)
 * 
 * @return {object}          An updated copy of items
 */
export const addItemResult = (items, itemID, quantity, source) => {
	
	// there's no need to append additional items if no items are being added
	if (quantity <= 0) {
		return items;
	}
	
	let prevOutputQuantity = 0;
	let prevOutputSources = 0;
	
	// if this item exists in the items, save its existing quantity of sources
	if (!_.isUndefined(items[itemID])) {		
		prevOutputQuantity = items[itemID].quantity || 0;
		prevOutputSources = items[itemID].sources || [];
	}
		
	// return an updated copy of the items with quantity incremented and the new items source added
	return {
		...items,
		[itemID]: {
			quantity: prevOutputQuantity + quantity,
			sources: [
				...prevOutputSources,
				{ source: source, quantity: quantity }
			]
		}
	}

}

/**
*/
const inventoryItemQuantityChange = (calculator, item, quantity) => {
	
	// new state of inventory, update the quantity of the item that was changed
	const inventory = {
		...calculator.inventory,
		[item.id]: quantity
	}
	
	// potions that can be created based in the inventory
	const output = getOutput(inventory);
	
	// new state of items required
	const requirements = getRequirements(inventory, output);
	
	return {
		...calculator,
		inventory: inventory,
		output: output,
		requirements: requirements
	}
	
}

/**
*/
const calculatorReducer = (calculator=calculatorInitialState, action) => {
	
	switch (action.type) {
		case INVENTORY_ITEM_QUANTITY_CHANGE:
			return inventoryItemQuantityChange(calculator, action.item, action.quantity);
		default:
			return calculator;
	}

}

export default calculatorReducer;

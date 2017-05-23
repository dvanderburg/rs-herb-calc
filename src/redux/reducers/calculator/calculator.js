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

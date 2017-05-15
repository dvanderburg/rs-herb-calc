import React from 'react';
import _ from 'underscore';

import ItemQuantityInput from '../ItemQuantityInput/ItemQuantityInput';

import './ItemQuantityInputGroup.css';

/**
	Displays props.items as ItemQuantityInput
	Creates a grouping of item quantity input for each item that was passed to the component
	
	Props:
		items		array		Array of item objects to display
		inventory	object		Inventory to use for item quantities, keyed by item ID with a value of the quantity of that item
									Example: { "unique-identifier1": 40, "unique-identifier2": 30 }
	
*/
export default (props) => {
	
	// map item objects into array of ItemQuantityInput components
	const items = props.items.map(item => {
		
		// look up quantity owned in the inventory prop
		//	if the item is not set in the inventory, use a quantity of zero
		const quantity = _.isUndefined(props.inventory[item.id]) ? 0 : props.inventory[item.id];
		
		// component for the specific item
		return <ItemQuantityInput key={item.id} item={item} quantity={quantity} onInputChange={props.onInputChange} />;
	
	});
	
	// return all item quantity input components in a container
	//	there will be one ItemQuantityInput component per item passed as props.items
	return (
		<div className="item-quantity-input-group">
			{items}
		</div>
	);
	
}

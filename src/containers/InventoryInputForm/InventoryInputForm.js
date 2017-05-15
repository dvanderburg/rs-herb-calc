import React from 'react';
import { connect } from 'react-redux';

import { inventoryItemQuantityChange } from '../../redux/actions/inventoryItemQuantityChange';

import Heading from '../../components/Heading/Heading';
import ItemQuantityInputGroup from '../../components/ItemQuantityInputGroup/ItemQuantityInputGroup';

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {

	return {
		onInputChange: (item, quantity) => dispatch(inventoryItemQuantityChange(item, quantity))
	}

}

/**
	User enters the quantity of each herblore item they own
	
*/
const InventoryInputForm = (props) => {
	
	return (
		<div className="inventory-input-form">
			<Heading text={props.heading} subheading={props.subheading} />
			<ItemQuantityInputGroup items={props.items} inventory={props.inventory} onInputChange={props.onInputChange} />
		</div>
	);
	
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryInputForm);

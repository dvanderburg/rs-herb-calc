import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';

import { inventoryItemQuantityChange } from '../../redux/actions/inventoryItemQuantityChange';

import ItemQuantityInput from '../../components/ItemQuantityInput/ItemQuantityInput';

import './InventoryInputForm.css';

/**
 * 
*/
class InventoryInputForm extends React.Component {
	
	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			types: PropTypes.arrayOf(PropTypes.string),
			image: PropTypes.string,
		})),
		inventory: PropTypes.objectOf(PropTypes.number),
	};
	
	render() {
		
		// create an item quantity input for each item passed to the component
		const itemInputs = this.props.items.map(item => {
			
			const quantity = _.isUndefined(this.props.inventory[item.id]) ? 0 : this.props.inventory[item.id];
		
			// component for the specific item
			return <ItemQuantityInput key={item.id} item={item} quantity={quantity} onInputChange={this.props.onInputChange} />
		
		});
	
		// wrap all the item quantity input in a parent
		return (
			<div className="inventory-input-form">
				{itemInputs}
			</div>
		);
		
	}
	
}

function mapDispatchToProps(dispatch) {

	return {
		onInputChange: (item, quantity) => dispatch(inventoryItemQuantityChange(item, quantity))
	}

}

export default connect(Object, mapDispatchToProps)(InventoryInputForm);

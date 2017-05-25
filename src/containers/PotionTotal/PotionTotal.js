import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import ITEMS from '../../redux/data/items';

import ItemQuantity from '../../components/ItemQuantity/ItemQuantity';

/**
*/
const mapStateToProps = (state) => {
	
	return {
		output: state.calculator.output
	}
	
}

/**
	Displays total number of potions which can be created with the provided items
	
*/
const PotionTotal = (props) => {
	
	// create an ItemQuantity component for each item being output
	const itemQuantities = _.map(props.output, (output, itemID) => {
		
		const item = ITEMS.find(item => item.id === itemID);
		return <ItemQuantity key={itemID} item={item} quantity={output.quantity} />;
		
	});
	
	return (
		<div className="potion-total-component">
			{itemQuantities}
		</div>
	);
		
}

export default connect(mapStateToProps)(PotionTotal);

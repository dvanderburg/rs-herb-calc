import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import ITEMS from '../../redux/data/items';

import ItemQuantityWithSource from '../../components/ItemQuantityWithSource/ItemQuantityWithSource';

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
		return <ItemQuantityWithSource key={itemID} item={item} quantity={output.quantity} sources={output.sources} />;
		
	});
	
	return (
		<div className="potion-total">
			{itemQuantities}
		</div>
	);
		
}

export default connect(mapStateToProps)(PotionTotal);

import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import ITEMS from '../../redux/data/items';

import EmptyOutput from '../../components/EmptyOutput/EmptyOutput';
import ItemQuantityWithSource from '../../components/ItemQuantityWithSource/ItemQuantityWithSource';

/**
*/
function mapStateToProps(state) {
	
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
			{
				itemQuantities.length === 0 ?
					<EmptyOutput heading="No Potion Output" body="You have not indicated what herbs you own." d="M29.884 25.14l-9.884-16.47v-6.671h1c0.55 0 1-0.45 1-1s-0.45-1-1-1h-10c-0.55 0-1 0.45-1 1s0.45 1 1 1h1v6.671l-9.884 16.47c-2.264 3.773-0.516 6.86 3.884 6.86h20c4.4 0 6.148-3.087 3.884-6.86zM7.532 20l6.468-10.779v-7.221h4v7.221l6.468 10.779h-16.935z" />
					: itemQuantities
			}
		</div>
	);
		
}

export default connect(mapStateToProps)(PotionTotal);

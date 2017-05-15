import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import ITEMS from '../../redux/data/items';

import Heading from '../../components/Heading/Heading';
import ItemQuantity from '../../components/ItemQuantity/ItemQuantity';

import './PotionTotal.css';

/**
*/
const mapStateToProps = (state) => {
	
	return {
		output: state.matrix.output
	}
	
}

/**
	Displays total number of potions which can be created with the provided items
	
*/
const PotionTotal = (props) => {
	
	// create an array if ItemRequirement components by itterating over the output
	//	output is an object where key is an item ID and value is a quantity
	//	convert the object to key value pairs to create an <ItemQuantity /> for each requirement
	const itemQuantities = _.pairs(props.output).map(output => {
		
		const itemID = output[0];
		const itemQuantity = output[1];
		const item = ITEMS.find(item => item.id === itemID);
		
		return <ItemQuantity key={itemID} item={item} quantity={itemQuantity} />

	});
	
	return (
		<div className="potion-total">
			<Heading text="Potion Output" />
			{itemQuantities}
		</div>
	);
		
}

export default connect(mapStateToProps)(PotionTotal);

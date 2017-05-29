import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import ITEMS from '../../redux/data/items';

import ItemQuantityWithSource from '../../components/ItemQuantityWithSource/ItemQuantityWithSource';

const mapStateToProps = (state) => {

	return {
		requirements: state.calculator.requirements
	}

}

const RequirementTotal = (props) => {
	
	// create an ItemQuantity component for each item being output
	const itemQuantities = _.map(props.requirements, (output, itemID) => {
		
		const item = ITEMS.find(item => item.id === itemID);
		return <ItemQuantityWithSource key={itemID} item={item} quantity={output.quantity} sources={output.sources} />;
		
	});

	return (
		<div className="requirement-total">
			{itemQuantities}
		</div>
	);

}

export default connect(mapStateToProps)(RequirementTotal);

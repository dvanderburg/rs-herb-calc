import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import ITEMS from '../../redux/data/items';

import EmptyOutput from '../../components/EmptyOutput/EmptyOutput';
import ItemQuantityWithSource from '../../components/ItemQuantityWithSource/ItemQuantityWithSource';

function mapStateToProps(state) {

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
			{
				itemQuantities.length === 0 ?
					<EmptyOutput heading="No items required" body="You have everything needed for potions to consume all herbs." d="M27 4l-15 15-7-7-5 5 12 12 20-20z" />
					: itemQuantities
			}
		</div>
	);

}

export default connect(mapStateToProps)(RequirementTotal);

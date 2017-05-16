import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import ITEMS from '../../redux/data/items';

import Heading from '../../components/Heading/Heading';
import ItemQuantity from '../../components/ItemQuantity/ItemQuantity';

import './RequirementTotal.css';

const mapStateToProps = (state) => {

	return {
		requirements: state.matrix.requirements
	}

}

const RequirementTotal = (props) => {

	const itemQuantities = _.pairs(props.requirements).map(requirement => {

		const itemID = requirement[0];
		const itemQuantity = requirement[1];
		const item = ITEMS.find(item => item.id === itemID);

		return <ItemQuantity key={itemID} item={item} quantity={itemQuantity} />

	});

	return (
		<div className="requirement-total">
			<Heading text="Items Needed" />
			{itemQuantities}
		</div>
	);

}

export default connect(mapStateToProps)(RequirementTotal);

import React from 'react';
import { connect } from 'react-redux';

import ITEMS from '../../redux/data/items';
import { ITEM_TYPES } from '../../redux/data/items';

import Button from '../../components/Button/Button';
import InventoryInputForm from './InventoryInputForm';

const mapStateToProps = (state) => {
	
	return {
		inventory: state.matrix.inventory
	}
	
}

const HerbInputForm = (props) => {
	
	const herbs = ITEMS.filter(item => item.types.indexOf(ITEM_TYPES.HERB) !== -1);
	
	const buttonStyle = {
		width: "100px",
		display: "block",
		margin: "18px auto 24px auto"
	};
	
	return (
		<div className="herb-input-form">
			<InventoryInputForm
				heading="Herblore Inventory"
				subheading="How many herbs do you have?"
				items={herbs}
				inventory={props.inventory}
			/>
			<Button style={buttonStyle} href="#/items" text="Next" />
		</div>
	);
	
}

export default connect(mapStateToProps)(HerbInputForm);

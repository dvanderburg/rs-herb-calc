import React from 'react';
import { connect } from 'react-redux';

import ITEMS from '../../redux/data/items';
import { ITEM_TYPES } from '../../redux/data/items';

import Button from '../../components/Button/Button';
import InventoryInputForm from './InventoryInputForm';

import './MiscItemInputForm.css';

const mapStateToProps = (state) => {
	
	return {
		inventory: state.matrix.inventory
	}
	
}

const MiscItemInputForm = (props) => {
	
	const miscItems = ITEMS.filter(item => item.types.indexOf(ITEM_TYPES.SECONDARY) !== -1);
	
	return (
		<div className="misc-item-input-form">
			<InventoryInputForm
				heading="Item Inventory"
				subheading="How many items do you have?"
				items={miscItems}
				inventory={props.inventory}
			/>
			<div className="button-group">
				<Button className="back-button" href="#/herbs" text="Back" />
				<Button className="next-button" href="#/potions" text="Next" />
			</div>
		</div>
	);
	
}

export default connect(mapStateToProps)(MiscItemInputForm);

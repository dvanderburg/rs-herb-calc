import React from 'react';
import { connect } from 'react-redux';

import ITEMS from '../../redux/data/items';
import { ITEM_TYPES } from '../../redux/data/items';

import Heading from '../../components/Heading/Heading';
import InventoryInputForm from '../InventoryInputForm/InventoryInputForm';
import PotionTotal from '../PotionTotal/PotionTotal';
import RequirementTotal from '../RequirementTotal/RequirementTotal';

import './Calculator.css';

/**
 * 
 */
class Calculator extends React.Component {
	
	/**
	 * @return {JSX}
	 */
	render() {
		
		const herbs = ITEMS.filter(item => item.types.indexOf(ITEM_TYPES.HERB) !== -1);
		const secondaries = ITEMS.filter(item => item.types.indexOf(ITEM_TYPES.SECONDARY) !== -1);
		
		return (
			<div className="calculator group">
				<div className="column">
					<Heading text="Herblore Inventory" subheading="How many herbs do you have?" />
					<InventoryInputForm items={herbs} inventory={this.props.inventory} />
				</div>
				<div className="column">
					<Heading text="Item Inventory" subheading="How many items do you have?" />
					<InventoryInputForm items={secondaries} inventory={this.props.inventory} />
				</div>
				<div className="column">
					<Heading text="Potion Output" subheading="Potions to consume all herbs" />
					<PotionTotal />
				</div>
				<div className="column">
					<Heading text="Items Needed" subheading="Items required to make potions" />
					<RequirementTotal />
				</div>
			</div>
		);

	}

}

function mapStateToProps(state) {
	
	return {
		inventory: state.calculator.inventory
	}
	
}

export default connect(mapStateToProps)(Calculator);

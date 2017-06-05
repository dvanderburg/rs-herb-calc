import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ITEMS from '../../redux/data/items';
import { ITEM_TYPES } from '../../redux/data/items';

import Button from '../../components/Button/Button';
import Navigation from '../../components/Navigation/Navigation';
import Heading from '../../components/Heading/Heading';
import InventoryInputForm from '../InventoryInputForm/InventoryInputForm';
import PotionTotal from '../PotionTotal/PotionTotal';
import RequirementTotal from '../RequirementTotal/RequirementTotal';

import './Calculator.css';

/**
 * Displays the potion calculator where a user can input the quantity of herbs and secondaries they own
 * Displays the result of the calculator along with the inventory inputs
 * 
 */
class Calculator extends React.Component {
	
	static SECTION_HERBS = "herbs";
	static SECTION_SECONDARIES = "secondaries";
	static SECTION_OUTPUT = "output";
	static SECTION_REQUIREMENTS = "requirements";
	
	static propTypes = {
		section: PropTypes.oneOf([
			Calculator.SECTION_HERBS,
			Calculator.SECTION_SECONDARIES,
			Calculator.SECTION_OUTPUT,
			Calculator.SECTION_REQUIREMENTS
		]),
		inventory: PropTypes.objectOf(PropTypes.number)
	};
	
	static defaultProps = {
		section: Calculator.SECTION_HERBS
	};
	
	/**
	 * Creates the classname to apply to the element containing a specific section
	 * For example: The "herbs" section may have the class names: column, herbs, visible
	 * Either "visible" or "hidden" will be added depending on the current value of props.activeSection
	 * @param  {string} section The section to create class name for, provide one of the component's section constants
	 * @return {string}         The classname to apply
	 */
	getSectionClassName(section) {
		
		const visibilityClassName = (this.props.section === section) ? "active" : "inactive";

		return cx("column", section, visibilityClassName);
		
	}
	
	/**
	 * @return {JSX}
	 */
	render() {
		
		// populate a collection of herbs and secondaries to display in their appropriate columns
		const herbs = ITEMS.filter(item => item.types.indexOf(ITEM_TYPES.HERB) !== -1);
		const secondaries = ITEMS.filter(item => item.types.indexOf(ITEM_TYPES.SECONDARY) !== -1);
		
		return (
			<div className="calculator group">
				<div className="controls group">
					<div className={this.getSectionClassName(Calculator.SECTION_HERBS)}>
						<Heading text="Herblore Inventory" subheading="How many herbs do you have?" />
						<InventoryInputForm items={herbs} inventory={this.props.inventory} />
						<Button text="Next" to="/secondaries" />
					</div>
					<div className={this.getSectionClassName(Calculator.SECTION_SECONDARIES)}>
						<Heading text="Item Inventory" subheading="How many items do you have?" />
						<InventoryInputForm items={secondaries} inventory={this.props.inventory} />
						<Button text="Back" to="/herbs" />
						<Button text="Next" to="/output" />
					</div>
					<div className={this.getSectionClassName(Calculator.SECTION_OUTPUT)}>
						<Heading text="Potion Output" subheading="Potions to consume all herbs" />
						<PotionTotal />
						<Button text="Back" to="/secondaries" />
						<Button text="Next" to="/requirements" />
					</div>
					<div className={this.getSectionClassName(Calculator.SECTION_REQUIREMENTS)}>
						<Heading text="Items Needed" subheading="Items required to make potions" />
						<RequirementTotal />
						<Button text="Back" to="/secondaries" />
					</div>
				</div>
				<Navigation />
			</div>
		);

	}

}

function mapStateToProps(state, ownProps) {
	
	return {
		inventory: state.calculator.inventory
	}
	
}

export default connect(mapStateToProps)(Calculator);

import React from 'react';
import _ from 'underscore';

import './ItemQuantityInput.css';

/**
	Displays an item thumbnail and name with an input field to enter a quantity
	
	Props
		item			object		Item object from the data directory
		quantity		integer		The quantity of item to display in the input field
		onInputChange	function	Callback function to run when the input field changes, arguments: (item, quantity)
	
*/
export default class extends React.Component {
	
	/**
	*/
	constructor(props) {
		
		super(props);
		
		// value being displayed in the input box
		this._value = this.props.quantity;
		
		this.onInputFocus = this.onInputFocus.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		
	}
	
	/**
		Event hanlder for when the quantity input receives focus
		Clears the input field
		@param {React.SyntheticEvent}	e		The on focus event
		
	*/
	onInputFocus(e) {
		e.target.value = "";
	}
	
	/**
		Event hanlder for when the quantity input is blurred (loses focus)
		Validates the input as an integer
		@param {React.SyntheticEvent}	e		The on focus event
		
	*/
	onInputBlur(e) {
		
		// the quantity entered to be validated
		let quantity = e.target.value;
				
		// ensure the quantity is numeric, otherwise revert to default of zero
		if (_.isNaN(quantity) || quantity === "") {
			quantity = this._value;
			
		}
		
		// ensure quantity is positive
		if (quantity < 0) {
			quantity = Math.abs(quantity);
		}
		
		// ensure quantity is a whole number
		if (quantity % 1 !== 0) {
			quantity = Math.ceil(quantity);
			
		}
		
		// remember the value entered
		//	when the input receives focus the value is cleared
		//	remembering the value allows the previous value to return if the user doesn't enter anything
		this._value = quantity;
		
		// set the validated quantity
		e.target.value = this._value;
		
		// if there is an input change function supplied as a prop, call the function
		if (this.props.onInputChange !== "undefined") {
			this.props.onInputChange(this.props.item, parseInt(quantity, 10));
		}
		
	}
	
	/**
	*/
	render() {
	
		// import the item image
		const image = require('../../assets/'+this.props.item.image);
		
		return (
			<div className="item-quantity-input">
				<img src={image} alt={this.props.item.name} />
				<div className="item-details">
					<div className="item-name">{this.props.item.name}</div>
					<div className="quantity-input">
						<input type="text" key={this.props.quantity} defaultValue={this.props.quantity} onFocus={this.onInputFocus} onBlur={this.onInputBlur} />
					</div>
				</div>
			</div>
		);
		
	}
	
}

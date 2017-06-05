import React from 'react';
import PropTypes from 'prop-types';

import './ItemQuantity.css';

/**
 * Generic component to display a quantity of a specific item with a name and thumbnail image
 */
class ItemQuantity extends React.Component {
	
	static propTypes = {
		item: PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			image: PropTypes.string,
		}),
		quantity: PropTypes.number
	};
	
	render() {
	
		// import the item image
		const image = require('../../assets/'+this.props.item.image);
		
		return (
			<div className="item-quantity">
				<img src={image} alt={this.props.item.name} />
				{this.props.item.name} x{this.props.quantity}
			</div>
		);
		
	}
	
}

export default ItemQuantity;

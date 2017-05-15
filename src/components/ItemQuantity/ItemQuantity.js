import React from 'react';

import './ItemQuantity.css';

export default (props) => {
	
	// import the item image
	const image = require('../../assets/'+props.item.image);
	
	return (
		<div className="item-quantity">
			<img src={image} alt={props.item.name} />
			{props.item.name} x{props.quantity}
		</div>
	);
	
}

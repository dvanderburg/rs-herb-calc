import React from 'react';

import './ItemSource.css';

export default class ItemSource extends React.Component {
	
	render() {
		
		return (
			<div className="item-source">
				{this.props.source} <span className="source-quantity">({this.props.quantity})</span>
			</div>
		);
		
	}
	
}

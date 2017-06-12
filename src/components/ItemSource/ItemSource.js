import React from 'react';

import './ItemSource.css';

export default class ItemSource extends React.Component {
	
	render() {
		
		return (
			<div className="item-source">
				{this.props.quantity} required: <span className="source">{this.props.source}</span>
			</div>
		);
		
	}
	
}

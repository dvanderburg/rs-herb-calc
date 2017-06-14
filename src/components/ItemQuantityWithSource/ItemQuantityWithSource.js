import React from 'react';
import PropTypes from 'prop-types';

import ItemSource from '../ItemSource/ItemSource';

import './ItemQuantityWithSource.css';

/**
 * Component to display a specific output item
 */
class OutputItem extends React.Component {
	
	static propTypes = {
		item: PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			image: PropTypes.string,
		}),
		quantity: PropTypes.number,
		sources: PropTypes.arrayOf(PropTypes.shape({
			quantity: PropTypes.number,
			source: PropTypes.string
		}))
	};
	
	render() {
		
		// import the item image
		const image = require('../../assets/'+this.props.item.image);
		
		const sources = this.props.sources.map((source, index) => {
			return <ItemSource key={index} quantity={source.quantity} source={source.source} />
		});
		
		// <ItemQuantity item={this.props.item} quantity={this.props.quantity} />
		
		return (
			<div className="item-quantity group">
				<img src={image} alt={this.props.item.name} />
				<div className="details group">
					<div className="details-heading">
						<span className="quantity">{this.props.quantity}</span>
						<span className="name">{this.props.item.name}</span>
					</div>
					<div className="sources">{sources}</div>
				</div>
			</div>
		);
		
	}
	
}

export default OutputItem;

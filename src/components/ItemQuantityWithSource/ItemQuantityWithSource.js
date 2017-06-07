import React from 'react';
import PropTypes from 'prop-types';

import ItemQuantity from '../ItemQuantity/ItemQuantity';

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
		
		const sources = this.props.sources.map((source, index) => {
			return <div key={index} className="source">{source.quantity} {source.source}</div>
		});
		
		return (
			<div className="item-quantity-with-source">
				<ItemQuantity item={this.props.item} quantity={this.props.quantity} />
				<div className="sources">
					{sources}
				</div>
			</div>
		);
		
	}
	
}

export default OutputItem;

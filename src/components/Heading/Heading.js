import React from 'react';
import PropTypes from 'prop-types';

import './Heading.css';

class Heading extends React.Component {
	
	static propTypes = {
		text: PropTypes.string
	};
	
	/**
	 * @return {JSX}
	 */
	render() {
		
		return (
			<div className="heading">
				<h1>{this.props.text}</h1>
				<h2>{this.props.subheading}</h2>
			</div>		
		)
		
	}

}

export default Heading;

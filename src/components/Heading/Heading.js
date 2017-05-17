import React from 'react';
import PropTypes from 'prop-types';

import './Heading.css';

class Heading extends React.Component {
	
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

Heading.propTypes = {
	text: PropTypes.string
}

export default Heading;

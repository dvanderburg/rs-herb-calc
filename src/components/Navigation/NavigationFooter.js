import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './NavigationFooter.css';

/**
 * Creates a navigation element with back and/or next button to use as footer navigation
 */
export default class NavigationFooter extends React.Component {
	
	static propTypes = {
		back: PropTypes.string,
		next: PropTypes.string
	};

	render() {
		
		return (
			<div className="navigation-footer">
				{this.props.back ? <Button text="Back" to={this.props.back} /> : "" }
				{this.props.next ? <Button text="Next" to={this.props.next} /> : "" }
			</div>
		);
		
	}
	
}

import React from 'react';
import { PropTypes } from 'prop-types';

import './NavigationIconButton.css';

export default class NavigationIconButton extends React.Component {
	
	static propTypes = {
		onClick: PropTypes.func
	};
	
	render() {
		
		return (
			<div className="navigation-icon-button" onClick={this.props.onClick}>
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
					<title>{this.props.title}</title>
					<path d={this.props.d}></path>
				</svg>
			</div>
		);
		
	}
	
}

import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationLink.css';

export default class NavigationLink extends React.Component {

	render() {
		
		return (
			<div className="navigation-link">
				<NavLink to={this.props.to}>{this.props.text}</NavLink>
			</div>
		);
		
	}
	
}

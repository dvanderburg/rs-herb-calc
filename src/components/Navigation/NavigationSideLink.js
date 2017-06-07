import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationSideLink.css';

export default class NavigationSideLink extends React.Component {

	render() {
		
		return (
			<NavLink to={this.props.to} className="navigation-side-link">{this.props.text}</NavLink>
		);
		
	}
	
}

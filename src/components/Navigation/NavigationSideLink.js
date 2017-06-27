import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationSideLink.css';

export default class NavigationSideLink extends React.Component {

	render() {
		
		return (
			<NavLink {...this.props} className="navigation-side-link" activeClassName="active" />
		);
		
	}
	
}

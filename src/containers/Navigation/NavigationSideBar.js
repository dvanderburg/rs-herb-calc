import React from 'react';

import NavigationSideLink from '../../components/Navigation/NavigationSideLink';

import './NavigationSideBar.css';

class NavigationSideBar extends React.Component {
	
	render () {
		
		return (
			<div className="navigation-side-bar">
				<div className="side-bar-header">RS Herb Calc</div>
				<NavigationSideLink to="/herbs" text="Herbs" />
				<NavigationSideLink to="/secondaries" text="Secondaries" />
				<NavigationSideLink to="/output" text="Output" />
				<NavigationSideLink to="/requirements" text="Requirements" />
			</div>
		);
		
	}
	
}

export default NavigationSideBar;

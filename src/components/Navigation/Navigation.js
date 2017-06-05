import React from 'react';

import NavigationLink from './NavigationLink';

class Navigation extends React.Component {
	
	render () {
		
		return (
			<div className="navigation">
				<NavigationLink to="/herbs" text="Herbs" />
				<NavigationLink to="/secondaries" text="Secondaries" />
				<NavigationLink to="/output" text="Output" />
				<NavigationLink to="/requirements" text="Requirements" />
			</div>
		);
		
	}
	
}

export default Navigation;

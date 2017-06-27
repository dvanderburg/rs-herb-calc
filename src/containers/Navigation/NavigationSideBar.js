import React from 'react';
import { connect } from 'react-redux';

import { clearAll } from '../../redux/actions/clearAll';

import NavigationIconButton from '../../components/Navigation/NavigationIconButton';
import NavigationSideLink from '../../components/Navigation/NavigationSideLink';

import './NavigationSideBar.css';

class NavigationSideBar extends React.Component {
	
	render () {
		
		return (
			<div className="navigation-side-bar">
				<div className="side-bar-header">RS Herb Calc</div>
				<NavigationSideLink to="/herbs">Herbs</NavigationSideLink>
				<NavigationSideLink to="/secondaries">Secondaries</NavigationSideLink>
				<NavigationSideLink to="/output">Output</NavigationSideLink>
				<NavigationSideLink to="/requirements">Requirements</NavigationSideLink>
				<div className="navigation-side-buttons">
					<NavigationIconButton title="Clear" onClick={this.props.onClearClick} d="M6 32h20l2-22h-24zM20 4v-4h-8v4h-10v6l2-2h24l2 2v-6h-10zM18 4h-4v-2h4v2z" />
				</div>
			</div>
		);
		
	}
	
}

function mapStateToProps(state, ownProps) {
	
	return {}
	
}

function mapDispatchToProps(dispatch) {
	
	return {
		onClearClick: () => dispatch(clearAll())
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(NavigationSideBar);

import React from 'react';
import { connect } from 'react-redux';

import { clearAll } from '../../redux/actions/clearAll';

import NavigationIconButton from '../../components/Navigation/NavigationIconButton';

import './NavigationHeader.css';

class NavigationHeader extends React.Component {
	
	render() {
		
		// <NavigationIconButton title="Potions" d="M29.884 25.14l-9.884-16.47v-6.671h1c0.55 0 1-0.45 1-1s-0.45-1-1-1h-10c-0.55 0-1 0.45-1 1s0.45 1 1 1h1v6.671l-9.884 16.47c-2.264 3.773-0.516 6.86 3.884 6.86h20c4.4 0 6.148-3.087 3.884-6.86zM7.532 20l6.468-10.779v-7.221h4v7.221l6.468 10.779h-16.935z" />
		
		return (
			<div className="navigation-header group">
				<div className="navigation-title">R<span className="header-title-suffix">une</span>S<span className="header-title-suffix">scape</span> Overload Calc<span className="header-title-suffix">ulator</span></div>
				<div className="navigation-controls group">
					<NavigationIconButton title="Clear" onClick={this.props.onClearClick} d="M6 32h20l2-22h-24zM20 4v-4h-8v4h-10v6l2-2h24l2 2v-6h-10zM18 4h-4v-2h4v2z" />
				</div>
			</div>
		);
		
	}
	
}

function mapStateToProps(state, ownProps) {

	return {};

}

function mapDispatchToProps(dispatch) {
	
	return {
		onClearClick: () => dispatch(clearAll())
	}
	
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationHeader);

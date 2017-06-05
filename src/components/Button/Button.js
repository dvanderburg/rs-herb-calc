import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import './Button.css';

/**
	Generic button component for consistent styling across app
	
	Props
		style		json		(optional) Style object to apply to the component
		className	string		(optional) Space delimited list of CSS classnames to apply to component, note: the component will always have the class "button"
		text		string		The text to display in the button
		onClick		function	Function to execute when the button is clicked
	
*/
class Button extends React.Component {
	
	static defaultProps = {
		style: {},
		className: "",
		text: "Button",
		onClick: () => {}
	};
	
	static propTypes = {
		style: PropTypes.object,
		className: PropTypes.string,
		to: PropTypes.string,
		text: PropTypes.string
	};
	
	/**
	*/
	render() {
		
		// ensure the component always has the classname "button" in addition to any provided as props
		const className = cx("button ", this.props.className);
		
		return (
			<Link className={className} style={this.props.style} to={this.props.to} onClick={this.props.onClick}>{this.props.text}</Link>
		);

	}
	
}

export default Button;

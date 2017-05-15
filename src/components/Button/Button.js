import React from 'react';

import './Button.css';

/**
	Generic button component for consistent styling across app
	
	Props
		style		json		(optional) Style object to apply to the component
		className	string		(optional) Space delimited list of CSS classnames to apply to component, note: the component will always have the class "button"
		text		string		The text to display in the button
		onClick		function	Function to execute when the button is clicked
	
*/
export default class extends React.Component {
	
	/**
	*/
	static defaultProps = {
		
		style: {},
		className: "",
		text: "Button",
		onClick: () => {}
	
	}
	
	/**
	*/
	render() {
		
		// ensure the component always has the classname "button" in addition to any provided as props
		const className = "button "+this.props.className;
		
		return (
			<a className={className} style={this.props.style} href={this.props.href} onClick={this.props.onClick}>{this.props.text}</a>
		);

	}
	
}

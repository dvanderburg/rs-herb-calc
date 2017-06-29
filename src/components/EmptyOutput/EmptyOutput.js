import React from 'react';

import './EmptyOutput.css';

class EmptyOutput extends React.Component {
	
	render() {
		
		return (
			<div className="empty-output">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
					<title>Potion</title>
					<path d={this.props.d}></path>
				</svg>
				<div className="details">
					<div className="heading">{this.props.heading}</div>
					<div className="body">{this.props.body}</div>
				</div>
			</div>
		);
		
	}
	
}

export default EmptyOutput;

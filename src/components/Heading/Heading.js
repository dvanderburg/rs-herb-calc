import React from 'react';

import './Heading.css';

/**
	Generic component to display a page "heading"
	
*/
export default (props) => {
	
	return (
		<div className="heading">
			<h1>{props.text}</h1>
			<h2>{props.subheading}</h2>
		</div>
	);
	
}

import React from 'react';

import HerbInputForm from '../InventoryInputForm/HerbInputForm';
import MiscItemInputForm from '../InventoryInputForm/MiscItemInputForm';
import PotionTotal from '../PotionTotal/PotionTotal';

const CalculatorTester = (props) => {
	
	const columnStyle = { float: "left", width: "33%" };
	
	return (
		<div>
			<div style={columnStyle}>
				<HerbInputForm />
			</div>
			<div style={columnStyle}>
				<MiscItemInputForm />
			</div>
			<div style={columnStyle}>
				<PotionTotal />
			</div>
		</div>
	);
	
}

export default CalculatorTester;

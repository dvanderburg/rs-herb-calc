import React from 'react';

import HerbInputForm from '../InventoryInputForm/HerbInputForm';
import MiscItemInputForm from '../InventoryInputForm/MiscItemInputForm';
import PotionTotal from '../PotionTotal/PotionTotal';
import RequirementTotal from '../RequirementTotal/RequirementTotal';

const CalculatorTester = (props) => {
	
	const columnStyle = { float: "left", width: "25%" };
	
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
			<div style={columnStyle}>
				<RequirementTotal />
			</div>
		</div>
	);
	
}

export default CalculatorTester;

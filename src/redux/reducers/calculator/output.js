import _ from 'underscore';

import {
	AVANTOE,
	CADANTINE,
	DWARF_WEED,
	FELLSTALK,
	IRIT,
	KWUARM,
	LANTADYME,
	RANARR,
	SNAPDRAGON,
	SPIRIT_WEED,
	TOADFLAX,
	TORSTOL,
	// CRUSHED_NEST,
	// EYE_OF_NEWT,
	EXTREME_ATTACK,
	EXTREME_STRENGTH,
	EXTREME_DEFENCE,
	EXTREME_MAGIC,
	EXTREME_RANGING,
	// GRENWALL_SPIKES,
	// GROUND_MUD_RUNES,
	// LIMPWURT_ROOT,
	// MORCHELLA_MUSHROOM,
	OVERLOAD,
	// POTATO_CACTUS,
	PRAYER_POTION,
	PRAYER_RENEWAL,
	// RED_SPIDER_EGGS,
	SARADOMIN_BREW,
	// SNAPE_GRASS,
	// SUMMONING_EGG,
	SUMMONING_POTION,
	SUPER_ATTACK,
	SUPER_STRENGTH,
	SUPER_DEFENCE,
	SUPER_MAGIC,
	SUPER_RANGING_POTION,
	SUPER_RESTORE,
	// WHITE_BERRIES,
	// WINE_OF_ZAMORAK
} from '../../data/items';

/**
 * Helper function to format output
 * Takes the provided output object and returns a new copy with the given item, quantity, and source added/updated
 * If the provided quantity is zero it is filtered out and not added to the output
 * 
 * For example: If the existing output looks something like:
 * 		{
 * 			SUPER_ATTACK: {
 * 				quantity: 10,
 * 				sources: [
 * 					{ quantity: 10, source: "Needed to make Extreme Attack Potion" }
 * 				]
 * 			}
 * 		}
 * 
 * This function could be used as: outputPush(output, SUPER_ATTACK, 100, "Use remaining Irit")
 * This would result in the super attack quantity being incremented to a total of 110 and an additional source added
 * 
 * @param  {object} output  	An output object to return an updated copy of
 * @param  {string} itemID  	Unique item identifier (OVERLOAD, EXTREME_ATTACK, etc.)
 * @param  {integer} quantity 	The quantity of item being output
 * @param  {string} source  	The source of the output ("Needed to make Extreme Attack Potion", etc.)
 * 
 * @return {object}          An updated copy of output
 */
const outputPush = (output, itemID, quantity, source) => {
	
	// there's no need to append additional output if no items are being output
	if (quantity <= 0) {
		return output;
	}
	
	let prevOutputQuantity = 0;
	let prevOutputSources = 0;
	
	// if this item exists in the output, save its existing quantity of sources
	if (!_.isUndefined(output[itemID])) {		
		prevOutputQuantity = output[itemID].quantity || 0;
		prevOutputSources = output[itemID].sources || [];
	}
		
	// return an updated copy of the output with quantity incremented and the new output source added
	return {
		...output,
		[itemID]: {
			quantity: prevOutputQuantity + quantity,
			sources: [
				...prevOutputSources,
				{ source: source, quantity: quantity }
			]
		}
	}

}

/**
 * Calculates the quantity of overloads to output
 * The quantity is determined by the number of torstol in the inventory
 * @param  {object} inventory Inventory object from application state
 * @return {integer}          Quantity of overload potion to output
 */
const getOverloadOutput = (inventory) => {
	return inventory[TORSTOL] || 0;
}

const getNumExtremeAttackForOverload = (numOverload, inventory) => {
	const numExtremeAttack = inventory[EXTREME_ATTACK] || 0;
	return Math.max(0, numOverload - numExtremeAttack);
}

const getNumExtremeStrengthForOverload = (numOverload, inventory) => {
	const numExtremeStrength = inventory[EXTREME_STRENGTH] || 0;
	return Math.max(0, numOverload - numExtremeStrength);
}

const getNumExtremeDefenceForOverload = (numOverload, inventory) => {
	const numExtremeDefence = inventory[EXTREME_DEFENCE] || 0;
	return Math.max(0, numOverload - numExtremeDefence);
}

const getNumExtremeMagicForOverload = (numOverload, inventory) => {
	const numExtremeMagic = inventory[EXTREME_MAGIC] || 0;
	return Math.max(0, numOverload - numExtremeMagic);
}

const getNumExtremeRangingForOverload = (numOverload, inventory) => {
	const numExtremeRanging = inventory[EXTREME_RANGING] || 0;
	return Math.max(0, numOverload - numExtremeRanging);
}

const getNumSuperAttackForOverload = (numExtremeAttackForOverload, inventory) => {
	const numSuperAttack = inventory[SUPER_ATTACK] || 0 ;
	return Math.max(0, numExtremeAttackForOverload - numSuperAttack);
}

const getNumSuperStrengthForOverload = (numExtremeStrengthForOverload, inventory) => {
	const numSuperStrength = inventory[SUPER_STRENGTH] || 0;
	return Math.max(0, numExtremeStrengthForOverload - numSuperStrength);
}

const getNumSuperDefenceForOverload = (numExtremeDefenceForOverload, inventory) => {
	const numSuperDefence = inventory[SUPER_DEFENCE] || 0;
	return Math.max(0, numExtremeDefenceForOverload - numSuperDefence);
}

const getNumSuperMagicForOverload = (numExtremeMagicForOverload, inventory) => {
	const numSuperMagic = inventory[SUPER_MAGIC] || 0;
	return Math.max(0, numExtremeMagicForOverload - numSuperMagic);
}

const getNumSuperRangingForOverload = (numExtremeRangingForOverload, inventory) => {
	const numSuperRanging = inventory[SUPER_RANGING_POTION] || 0;
	return Math.max(0, numExtremeRangingForOverload - numSuperRanging);
}

/**
 * Determines the quantity of extreme and super potions to create in order to convert all torstol into overloads
 * @param  {object} inventory The inventory object, keyed with item id, value is quantity of item owned
 * @return {object}           The output of potions, keyed with item id, value is the quantity of potion to create
 */
export const getOverloadOutputMatrix = (inventory) => {
	
	// number of torstol owned determines how many overloads are to be made
	const numOverload = getOverloadOutput(inventory);
	
	// extreme potions are required to create overloads, so calculate how many need to be made
	const numExtremeAttackForOverload = getNumExtremeAttackForOverload(numOverload, inventory);
	const numExtremeStrengthForOverload = getNumExtremeStrengthForOverload(numOverload, inventory);
	const numExtremeDefenceForOverload = getNumExtremeDefenceForOverload(numOverload, inventory);
	const numExtremeMagicForOverload = getNumExtremeMagicForOverload(numOverload, inventory);
	const numExtremeRangingForOverload = getNumExtremeRangingForOverload(numOverload, inventory);
	
	// super potions are required to create extreme potions, so calculate how many need to be made
	const numSuperAttackForOverload = getNumSuperAttackForOverload(numExtremeAttackForOverload, inventory); 
	const numSuperStrengthForOverload = getNumSuperStrengthForOverload(numExtremeStrengthForOverload, inventory);
	const numSuperDefenceForOverload = getNumSuperDefenceForOverload(numExtremeDefenceForOverload, inventory);
	const numSuperMagicForOverload = getNumSuperMagicForOverload(numExtremeMagicForOverload, inventory);
	const numSuperRangingForOverload = getNumSuperRangingForOverload(numExtremeRangingForOverload, inventory);
	
	// in order to output the desired number of overloads, some extreme and super potions may need to be made
	// 	build the formatted output object using outputPush to ensure correct format while fitlering out any zero quantities
	let output = {};
	output = outputPush(output, OVERLOAD, numOverload, "Consume Torstol.");
	output = outputPush(output, EXTREME_ATTACK, numExtremeAttackForOverload, "Create number of desired overloads.");
	output = outputPush(output, EXTREME_STRENGTH, numExtremeStrengthForOverload, "Create number of desired overloads.");
	output = outputPush(output, EXTREME_DEFENCE, numExtremeDefenceForOverload, "Create number of desired overloads.");
	output = outputPush(output, EXTREME_MAGIC, numExtremeMagicForOverload, "Create number of desired overloads.");
	output = outputPush(output, EXTREME_RANGING, numExtremeRangingForOverload, "Create number of desired overloads.");
	output = outputPush(output, SUPER_ATTACK, numSuperAttackForOverload, "Create Extreme Attack for the number of desired overloads.");
	output = outputPush(output, SUPER_STRENGTH, numSuperStrengthForOverload, "Create Extreme Strength for the number of desired overloads.");
	output = outputPush(output, SUPER_DEFENCE, numSuperDefenceForOverload, "Create Extreme Defence for the number of desired overloads.");
	output = outputPush(output, SUPER_MAGIC, numSuperMagicForOverload, "Create Extreme Magic for the number of desired overloads.");
	output = outputPush(output, SUPER_RANGING_POTION, numSuperRangingForOverload, "Create Extreme Ranging Potion for the number of desired overloads.");
	
	// the output returned here is formatted correctly and any zero quantity items have been filtered out
	return output;
	
}

/**
*/
export const getOutput = (inventory) => {

	// calculate potion output to consume all torstol and create overloads
	const overloadMatrix = getOverloadOutputMatrix(inventory);
	
	const getInventoryQuantity = (itemID) => inventory[itemID] || 0;
	const getOverloadMatrixQuantity = (itemID) => overloadMatrix[itemID] ? overloadMatrix[itemID].quantity : 0;

	// examine the herbs used in overload creation and determine how many are remaining in the inventory
	const numAvantoeAfterOverloads = Math.max(0, getInventoryQuantity(AVANTOE) - getOverloadMatrixQuantity(EXTREME_ATTACK));
	const numDwarfWeedAfterOverloads = Math.max(0, getInventoryQuantity(DWARF_WEED) - getOverloadMatrixQuantity(EXTREME_STRENGTH) - getOverloadMatrixQuantity(SUPER_RANGING_POTION));
	const numLantadymeAfterOverloads = Math.max(0, getInventoryQuantity(LANTADYME) - getOverloadMatrixQuantity(EXTREME_DEFENCE) - getOverloadMatrixQuantity(SUPER_MAGIC));
	const numIritAfterOverloads = Math.max(0, getInventoryQuantity(IRIT) - getOverloadMatrixQuantity(SUPER_ATTACK));
	const numKwuarmAfterOverloads = Math.max(0, getInventoryQuantity(KWUARM) - getOverloadMatrixQuantity(SUPER_STRENGTH));
	const numCadantineAfterOverloads = Math.max(0, getInventoryQuantity(CADANTINE) - getOverloadMatrixQuantity(SUPER_DEFENCE));

	// determine how many extremes are remaining after the creation of overloads
	const numExtremeStrengthAfterOverloads = Math.max(0, getInventoryQuantity(EXTREME_STRENGTH) - getOverloadMatrixQuantity(OVERLOAD));
	const numExtremeDefenceAfterOverloads = Math.max(0, getInventoryQuantity(EXTREME_DEFENCE) - getOverloadMatrixQuantity(OVERLOAD));
	const numExtremeMagicAfterOverloads = Math.max(0, getInventoryQuantity(EXTREME_MAGIC) - getOverloadMatrixQuantity(OVERLOAD));
	const numExtremeRangingAfterOverloads = Math.max(0, getInventoryQuantity(EXTREME_RANGING) - getOverloadMatrixQuantity(OVERLOAD));

	// determine how many supers are remaining after the creation of overloads
	const numSuperAttackAfterOverloads = Math.max(0, getInventoryQuantity(SUPER_ATTACK) - getOverloadMatrixQuantity(EXTREME_ATTACK));
	const numSuperStrengthAfterOverloads = Math.max(0, getInventoryQuantity(SUPER_STRENGTH) - getOverloadMatrixQuantity(EXTREME_STRENGTH));
	const numSuperDefenceAfterOverloads = Math.max(0, getInventoryQuantity(SUPER_DEFENCE) - getOverloadMatrixQuantity(EXTREME_DEFENCE));
	const numSuperMagicAfterOverloads = Math.max(0, getInventoryQuantity(SUPER_MAGIC) - getOverloadMatrixQuantity(EXTREME_STRENGTH));
	const numSuperRangingAfterOverloads = Math.max(0, getInventoryQuantity(SUPER_RANGING_POTION) - getOverloadMatrixQuantity(EXTREME_RANGING));

	// decide what to use remaining dwarf weed for
	//	it is used for both extreme strength and super ranging
	//	the end goal is to have an equal quantity of extreme strength and extreme ranging
	const numDwarfWeedToBalanceExtremeStrengthWithExtremeRanging = Math.max(0, numExtremeRangingAfterOverloads - numExtremeStrengthAfterOverloads);
	const numDwarfWeedToBalanceRangingWithExtremeStrength = Math.max(0, numExtremeStrengthAfterOverloads - numExtremeRangingAfterOverloads - numSuperRangingAfterOverloads);
	const numDwarfWeedAfterBalancing = Math.max(0, numDwarfWeedAfterOverloads - numDwarfWeedToBalanceExtremeStrengthWithExtremeRanging - numDwarfWeedToBalanceRangingWithExtremeStrength);
	const numExtremeStrengthFromRemainingDwarfWeed = Math.min(numDwarfWeedAfterOverloads, numDwarfWeedToBalanceExtremeStrengthWithExtremeRanging) + Math.floor(numDwarfWeedAfterBalancing / 2);
	const numSuperRangingFromRemainingDwarfWeed = Math.min(numDwarfWeedAfterOverloads, numDwarfWeedToBalanceRangingWithExtremeStrength) + Math.ceil(numDwarfWeedAfterBalancing / 2);

	// decide what to use remaining lantadyme for
	//	it is used for both extreme defence and super magic
	//	the end goal is to have an equal quantity of extreme defence and extreme magic
	const numLantadymeToBalanceExtremeDefenceWithExtremeMagic = Math.max(0, numExtremeMagicAfterOverloads + numSuperMagicAfterOverloads - numExtremeDefenceAfterOverloads);
	const numLantadymeToBalanceMagicWithExtremeDefence = Math.max(0, numExtremeDefenceAfterOverloads - numExtremeMagicAfterOverloads - numSuperMagicAfterOverloads);
	const numLantadymeAfterBalancing = Math.max(0, numLantadymeAfterOverloads - numLantadymeToBalanceExtremeDefenceWithExtremeMagic - numLantadymeToBalanceMagicWithExtremeDefence);
	const numExtremeDefenceFromRemainingLantadyme = Math.min(numLantadymeAfterBalancing, numLantadymeToBalanceExtremeDefenceWithExtremeMagic) + Math.floor(numLantadymeAfterBalancing / 2);
	const numSuperMagicFromRemainingLantadyme = Math.min(numLantadymeAfterBalancing, numLantadymeToBalanceMagicWithExtremeDefence) + Math.ceil(numLantadymeAfterBalancing / 2);

	// turn all remaining irit into super attack
	const numSuperAttackFromRemainingIrit = numIritAfterOverloads;

	// turn all remaining avantoe into extreme attack
	const numExtremeAttackFromRemainingAvantoe = numAvantoeAfterOverloads;

	// if there are not enough super attack to cover the additional extreme attack, add more super attack to the ouput
	const numAdditionalSuperAttackForExtremeAttack = Math.max(0, numExtremeAttackFromRemainingAvantoe - numSuperAttackAfterOverloads - numSuperAttackFromRemainingIrit);

	// turn all remaining kwuarm into super strength
	const numSuperStrengthFromRemainingKwuarm = numKwuarmAfterOverloads;

	// if there are not enough super strength to cover the additional extreme strength, add more super strength to the output
	const numAdditionalSuperStrengthForExtremeStrength = Math.max(0, numExtremeStrengthFromRemainingDwarfWeed - numSuperStrengthAfterOverloads - numSuperStrengthFromRemainingKwuarm);

	// turn all remaining cadantime into super defence
	const numSuperDefenceFromRemainingCadantime = numCadantineAfterOverloads;

	// if there are not enough super defence to cover the additional extreme defence, add more super defence to the ouput
	const numAdditionalSuperDefenceForExtremeDefence = Math.max(0, numExtremeDefenceFromRemainingLantadyme - numSuperDefenceAfterOverloads - numSuperDefenceFromRemainingCadantime);
	
	let output = overloadMatrix;
	output = outputPush(output, EXTREME_ATTACK, numExtremeAttackFromRemainingAvantoe, "Use remaining Avantoe.");
	output = outputPush(output, EXTREME_STRENGTH, numExtremeStrengthFromRemainingDwarfWeed, "Use remaining Dwarf Weed.");
	output = outputPush(output, EXTREME_DEFENCE, numExtremeDefenceFromRemainingLantadyme, "Use remaining Lantadyme.");
	output = outputPush(output, EXTREME_MAGIC, numSuperMagicFromRemainingLantadyme, "Upgrade extra Super Magic into Extreme Magic.");
	output = outputPush(output, EXTREME_RANGING, numSuperRangingFromRemainingDwarfWeed, "Upgrade extra Super Ranging into Extreme Ranging");
	
	output = outputPush(output, SUPER_ATTACK, numAdditionalSuperAttackForExtremeAttack, "Needed to create required Extreme Attack.");
	output = outputPush(output, SUPER_ATTACK, numSuperAttackFromRemainingIrit, "Use up remaining Irit.");
	output = outputPush(output, SUPER_STRENGTH, numAdditionalSuperStrengthForExtremeStrength, "Needed to create required Extreme Strength.");
	output = outputPush(output, SUPER_STRENGTH, numSuperStrengthFromRemainingKwuarm, "Use up remaining Kwuarm.");
	output = outputPush(output, SUPER_DEFENCE, numAdditionalSuperDefenceForExtremeDefence, "Needed to create required Extreme Defence.");
	output = outputPush(output, SUPER_DEFENCE, numSuperDefenceFromRemainingCadantime, "Use up remaining Cadantime.");
	output = outputPush(output, SUPER_MAGIC, numSuperMagicFromRemainingLantadyme, "Use up remaining Lantadyme.");
	output = outputPush(output, SUPER_RANGING_POTION, numSuperRangingFromRemainingDwarfWeed, "Use up remaining Dwarf Weed.");
	
	output = outputPush(output, PRAYER_POTION, getInventoryQuantity(RANARR), "Use up all Ranarr.");
	output = outputPush(output, SARADOMIN_BREW, getInventoryQuantity(TOADFLAX), "Use up all Toadflax.");
	output = outputPush(output, SUMMONING_POTION, getInventoryQuantity(SPIRIT_WEED), "Use up all Spirit Weed.");
	output = outputPush(output, SUPER_RESTORE, getInventoryQuantity(SNAPDRAGON), "Use up all Snapdragon.");
	output = outputPush(output, PRAYER_RENEWAL, getInventoryQuantity(FELLSTALK), "Use up all Fellstalk.");
	
	return output;
	
	// const oldOutput = {
		
	// 	[OVERLOAD]: getOverloadMatrixQuantity(OVERLOAD),
		
	// 	[EXTREME_ATTACK]: getOverloadMatrixQuantity(EXTREME_ATTACK) + numExtremeAttackFromRemainingAvantoe,
	// 	[EXTREME_STRENGTH]: getOverloadMatrixQuantity(EXTREME_STRENGTH) + numExtremeStrengthFromRemainingDwarfWeed,
	// 	[EXTREME_DEFENCE]: getOverloadMatrixQuantity(EXTREME_DEFENCE) + numExtremeDefenceFromRemainingLantadyme,
	// 	[EXTREME_MAGIC]: getOverloadMatrixQuantity(EXTREME_MAGIC) + numSuperMagicFromRemainingLantadyme,	// upgrade any extra super magic made into extreme magic
	// 	[EXTREME_RANGING]: getOverloadMatrixQuantity(EXTREME_RANGING) + numSuperRangingFromRemainingDwarfWeed,	// upgrade any extra super ranging made into extreme ranging
		
	// 	[SUPER_ATTACK]: getOverloadMatrixQuantity(SUPER_ATTACK) + numSuperAttackFromRemainingIrit + numAdditionalSuperAttackForExtremeAttack,
	// 	[SUPER_STRENGTH]: getOverloadMatrixQuantity(SUPER_STRENGTH) + numSuperStrengthFromRemainingKwuarm + numAdditionalSuperStrengthForExtremeStrength,
	// 	[SUPER_DEFENCE]: getOverloadMatrixQuantity(SUPER_DEFENCE) + numSuperDefenceFromRemainingCadantime + numAdditionalSuperDefenceForExtremeDefence,
	// 	[SUPER_MAGIC]: getOverloadMatrixQuantity(SUPER_MAGIC) + numSuperMagicFromRemainingLantadyme,
	// 	[SUPER_RANGING_POTION]: getOverloadMatrixQuantity(SUPER_RANGING_POTION) + numSuperRangingFromRemainingDwarfWeed,

	// 	[PRAYER_POTION]: getInventoryQuantity(RANARR),
	// 	[SARADOMIN_BREW]: getInventoryQuantity(TOADFLAX),
	// 	[SUMMONING_POTION]: getInventoryQuantity(SPIRIT_WEED),
	// 	[SUPER_RESTORE]: getInventoryQuantity(SNAPDRAGON),
	// 	[PRAYER_RENEWAL]: getInventoryQuantity(FELLSTALK),
				
	// }

	// // filter out any less than or equal to zero quantities
	// let filteredOutput = {};
	// for (let key in oldOutput) {
	// 	if (oldOutput[key] > 0) {
	// 		filteredOutput[key] = oldOutput[key];
	// 	}
	// }
	
	// return filteredOutput;

}

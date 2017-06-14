import { addItemResult } from './calculator';

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
const getOverloadOutputMatrix = (inventory) => {
	
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
	// 	build the formatted output object using addItemResult to ensure correct format while fitlering out any zero quantities
	let output = {};
	output = addItemResult(output, OVERLOAD, numOverload, "Torstol");
	output = addItemResult(output, EXTREME_ATTACK, numExtremeAttackForOverload, "Overload");
	output = addItemResult(output, EXTREME_STRENGTH, numExtremeStrengthForOverload, "Overload");
	output = addItemResult(output, EXTREME_DEFENCE, numExtremeDefenceForOverload, "Overload");
	output = addItemResult(output, EXTREME_MAGIC, numExtremeMagicForOverload, "Overload");
	output = addItemResult(output, EXTREME_RANGING, numExtremeRangingForOverload, "Overload");
	output = addItemResult(output, SUPER_ATTACK, numSuperAttackForOverload, "Overload");
	output = addItemResult(output, SUPER_STRENGTH, numSuperStrengthForOverload, "Overload");
	output = addItemResult(output, SUPER_DEFENCE, numSuperDefenceForOverload, "Overload");
	output = addItemResult(output, SUPER_MAGIC, numSuperMagicForOverload, "Overload");
	output = addItemResult(output, SUPER_RANGING_POTION, numSuperRangingForOverload, "Overload");
	
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
	output = addItemResult(output, EXTREME_ATTACK, numExtremeAttackFromRemainingAvantoe, "Avantoe");
	output = addItemResult(output, EXTREME_STRENGTH, numExtremeStrengthFromRemainingDwarfWeed, "Dwarf Weed");
	output = addItemResult(output, EXTREME_DEFENCE, numExtremeDefenceFromRemainingLantadyme, "Lantadyme");
	output = addItemResult(output, EXTREME_MAGIC, numSuperMagicFromRemainingLantadyme, "Upgrade Super Magic");
	output = addItemResult(output, EXTREME_RANGING, numSuperRangingFromRemainingDwarfWeed, "Upgrade Super Ranging");
	
	output = addItemResult(output, SUPER_ATTACK, numAdditionalSuperAttackForExtremeAttack, "Extreme Attack");
	output = addItemResult(output, SUPER_ATTACK, numSuperAttackFromRemainingIrit, "Irit");
	output = addItemResult(output, SUPER_STRENGTH, numAdditionalSuperStrengthForExtremeStrength, "Extreme Strength");
	output = addItemResult(output, SUPER_STRENGTH, numSuperStrengthFromRemainingKwuarm, "Kwuarm");
	output = addItemResult(output, SUPER_DEFENCE, numAdditionalSuperDefenceForExtremeDefence, "Extreme Defence");
	output = addItemResult(output, SUPER_DEFENCE, numSuperDefenceFromRemainingCadantime, "Cadantime");
	output = addItemResult(output, SUPER_MAGIC, numSuperMagicFromRemainingLantadyme, "Lantadyme");
	output = addItemResult(output, SUPER_RANGING_POTION, numSuperRangingFromRemainingDwarfWeed, "Dwarf Weed");
	
	output = addItemResult(output, PRAYER_POTION, getInventoryQuantity(RANARR), "Ranarr");
	output = addItemResult(output, SARADOMIN_BREW, getInventoryQuantity(TOADFLAX), "Toadflax");
	output = addItemResult(output, SUMMONING_POTION, getInventoryQuantity(SPIRIT_WEED), "Spirit Weed");
	output = addItemResult(output, SUPER_RESTORE, getInventoryQuantity(SNAPDRAGON), "Snapdragon");
	output = addItemResult(output, PRAYER_RENEWAL, getInventoryQuantity(FELLSTALK), "Fellstalk");
	
	return output;

}

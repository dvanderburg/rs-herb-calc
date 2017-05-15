import { INVENTORY_ITEM_QUANTITY_CHANGE } from '../actions/types';

import {
	AVANTOE,
	CADANTINE,
	DWARF_WEED,
	FELLSTALK,
// 	HARRALANDER,
// 	IRIT,
	KWUARM,
	LANTADYME,
// 	MARRENTILL,
	RANARR,
	SNAPDRAGON,
	SPIRIT_WEED,
// 	TARROMIN,
	TOADFLAX,
	TORSTOL,
// 	WERGALI,
// 	CRUSHED_NEST,
// 	DRAGON_SCALE_DUST,
// 	EYE_OF_NEWT,
	EXTREME_ATTACK,
	EXTREME_STRENGTH,
	EXTREME_DEFENCE,
	EXTREME_MAGIC,
	EXTREME_RANGING,
// 	GRENWALL_SPIKES,
// 	GROUND_MUD_RUNES,
// 	LIMPWURT_ROOT,
// 	MORCHELLA_MUSHROOM,
// 	PHOENIX_FEATHER,
	OVERLOAD,
// 	POTATO_CACTUS,
	PRAYER_POTION,
	PRAYER_RENEWAL,
// 	RED_SPIDER_EGGS,
	SARADOMIN_BREW,
// 	SNAPE_GRASS,
// 	SUMMONING_EGG,
	SUMMONING_POTION,
	SUPER_ATTACK,
	SUPER_STRENGTH,
	SUPER_DEFENCE,
	SUPER_MAGIC,
	SUPER_RANGING_POTION,
	SUPER_RESTORE,
// 	WHITE_BERRIES,
// 	WINE_OF_ZAMORAK
} from '../data/items';

// initial state of the potions matrix
const matrixInitialState = {
	inventory: {},	// items owned by the user
	output: {},	// output of potions created by the user
	requirements: {}	// items required by the user
}

/**
	Calculates what potions will be produced to consume all torstol in the form of Overloads
	Once all overloads are taken care of, extra herbs are used to create potions in an attempt to have a balanced number of extremes for the future
	Finally, any additional herbs are put into other potions such as prayer renewal, summoning, etc.
	
*/
const getOutput = (inventory) => {
	
	// helper functions to lookup inventory quantity
	const getInventoryQuantity = (itemID) => inventory[itemID] || 0;
	
	// number of torstol owned determines how many overloads are to be made
	const numOverload = getInventoryQuantity(TORSTOL);
	
	// extremes required are a relatively straight forward calculation
	//	subtract the number owned from the number used to find the difference
	//	convert negtives to zero in case they have more than enough
	const numExtremeAttackForOverload = Math.max(0, numOverload - getInventoryQuantity(EXTREME_ATTACK));
	const numExtremeStrengthForOverload = Math.max(0, numOverload - getInventoryQuantity(EXTREME_STRENGTH));
	const numExtremeDefenceForOverload = Math.max(0, numOverload - getInventoryQuantity(EXTREME_DEFENCE));
	const numExtremeMagicForOverload = Math.max(0, numOverload - getInventoryQuantity(EXTREME_MAGIC));
	const numExtremeRangingForOverload = Math.max(0, numOverload - getInventoryQuantity(EXTREME_RANGING));
	
	// supers required are dependant upon the number of extremes
	//	subtract the number of supers owned from the number of extremes being made
	//	convert negatives to zero in case they have more than enough supers to make all the extremes
	const numSuperAttackForExtremeAttack = Math.max(0, numExtremeAttackForOverload - getInventoryQuantity(SUPER_ATTACK));
	const numSuperStrengthForExtremeStrength = Math.max(0, numExtremeStrengthForOverload - getInventoryQuantity(SUPER_STRENGTH));
	const numSuperDefenceForExtremeDefence = Math.max(0, numExtremeDefenceForOverload - getInventoryQuantity(SUPER_DEFENCE));
	const numSuperMagicForExtremeMagic = Math.max(0, numExtremeMagicForOverload - getInventoryQuantity(SUPER_MAGIC));
	const numSuperRangingForExtremeRanging = Math.max(0, numExtremeRangingForOverload - getInventoryQuantity(SUPER_RANGING_POTION));
	
	// create additional extreme attack potions to use up all avantoe
	const numExtremeAttackForExtras = Math.max(0, getInventoryQuantity(AVANTOE) - numExtremeAttackForOverload);

	// determine what to use dwarf weed for, it is used for both extreme strength and super ranging potion
	//	the end result is that we want an equal number of extreme strength and extreme ranging potions
	//	output enough potions to balance the two and then evenly split any remaining dwarf weed between the two
	const numDwarfWeedAfterOverloads = Math.max(0, getInventoryQuantity(DWARF_WEED) - numExtremeStrengthForOverload - numSuperRangingForExtremeRanging);
	const numExtremeStrength = getInventoryQuantity(EXTREME_STRENGTH);
	const numExtremeRanging = getInventoryQuantity(EXTREME_RANGING);
	const numSuperRanging = getInventoryQuantity(SUPER_RANGING_POTION);
	const numSuperRangingToBalanceWithExtremeStrength = Math.max(0, numExtremeStrength - numExtremeRanging - numSuperRanging);
	const numExtremeStrengthToBalanceWithExtremeRanging = Math.max(0, numExtremeRanging + numSuperRanging - numExtremeStrength);
	const numDwarfWeedForExtras = numDwarfWeedAfterOverloads - numSuperRangingToBalanceWithExtremeStrength - numExtremeStrengthToBalanceWithExtremeRanging;
	const numSuperRangingForExtras = Math.floor(numDwarfWeedForExtras / 2);
	const numExtremeStrengthForExtras = Math.ceil(numDwarfWeedForExtras / 2);
	
	// determine what to use lantadyme for, it is used for both extreme defence and super magic
	//	the end result is that we want an equal number of extreme defence and extreme magic
	//	output enough potions to balance the two and then evenly split any remaining lantadyme between the two
	const numLantadymeAfterOverloads = Math.max(0, getInventoryQuantity(LANTADYME) - numExtremeDefenceForOverload - numSuperMagicForExtremeMagic);
	const numExtremeDefence = getInventoryQuantity(EXTREME_DEFENCE);
	const numExtremeMagic = getInventoryQuantity(EXTREME_MAGIC);
	const numSuperMagic = getInventoryQuantity(SUPER_MAGIC);
	const numSuperMagicToBalanceWithExtremeDefence = Math.max(0, numExtremeDefence - numExtremeMagic - numSuperMagic);
	const numExtremeDefenceToBalanceWithExtremeMagic = Math.max(0, numExtremeMagic + numSuperMagic - numExtremeDefence);
	const numLantadymeForExtras = numLantadymeAfterOverloads - numSuperMagicToBalanceWithExtremeDefence - numExtremeDefenceToBalanceWithExtremeMagic;
	const numSuperMagicForExtras = Math.floor(numLantadymeForExtras / 2);
	const numExtremeDefenceForExtras = Math.ceil(numLantadymeForExtras / 2);
		
	// use up any remaining avantoe for super attack potions
	const numSuperAttackPotionsForExtras = Math.max(0, getInventoryQuantity(AVANTOE) - numSuperAttackForExtremeAttack)
	
	// use up any remaining kwuarm for super strength
	const numSuperStrengthForExtras = Math.max(0, getInventoryQuantity(KWUARM) - numSuperStrengthForExtremeStrength);
	
	// use up any remaining cadantine for super defence
	const numSuperDefenceForExtras = Math.max(0, getInventoryQuantity(CADANTINE) - numSuperDefenceForExtremeDefence);
	
	// upgrade all super magic potions into extreme potions
	const numExtremeMagicForExtras = Math.max(0, getInventoryQuantity(SUPER_MAGIC) - numSuperMagicForExtremeMagic);
	
	// upgrade all super ranging potions into extreme ranging potions
	const numExtremeRangingForExtras = Math.max(0, getInventoryQuantity(SUPER_RANGING_POTION) - numExtremeRangingForOverload);
	
	// use all rannar to make prayer potion
	const numPrayerPotion = getInventoryQuantity(RANARR);
	
	// use all toadflax to make saradomin brew
	const numSaradominBrew = getInventoryQuantity(TOADFLAX);
	
	// use all spirit weed to make summoning potion
	const numSummoningPotion = getInventoryQuantity(SPIRIT_WEED);
	
	// use all snapdragon to make super restores
	const numSuperRestore = getInventoryQuantity(SNAPDRAGON);
	
	// use all fellstalk to make prayer renewal
	const numPrayerRenewal = getInventoryQuantity(FELLSTALK);
	
	// object containing the calculated output
	const output = {
		
		[OVERLOAD]: numOverload,
		
		[EXTREME_ATTACK]: numExtremeAttackForOverload + numExtremeAttackForExtras,
		[EXTREME_STRENGTH]: numExtremeStrengthForOverload + numExtremeStrengthToBalanceWithExtremeRanging + numExtremeStrengthForExtras,
		[EXTREME_DEFENCE]: numExtremeDefenceForOverload + numExtremeDefenceToBalanceWithExtremeMagic + numExtremeDefenceForExtras,
		[EXTREME_MAGIC]: numExtremeMagicForOverload + numExtremeMagicForExtras + numSuperMagicToBalanceWithExtremeDefence + numSuperMagicForExtras,
		[EXTREME_RANGING]: numExtremeRangingForOverload + numExtremeRangingForExtras + numSuperRangingToBalanceWithExtremeStrength + numSuperRangingForExtras,
		
		[SUPER_ATTACK]: numSuperAttackForExtremeAttack + numSuperAttackPotionsForExtras,
		[SUPER_STRENGTH]: numSuperStrengthForExtremeStrength + numSuperStrengthForExtras,
		[SUPER_DEFENCE]: numSuperDefenceForExtremeDefence + numSuperDefenceForExtras,
		[SUPER_MAGIC]: numSuperMagicForExtremeMagic + numSuperMagicToBalanceWithExtremeDefence + numSuperMagicForExtras,
		[SUPER_RANGING_POTION]: numSuperRangingForExtremeRanging + numSuperRangingToBalanceWithExtremeStrength + numSuperRangingForExtras,
		
		[PRAYER_POTION]: numPrayerPotion,
		[SARADOMIN_BREW]: numSaradominBrew,
		[SUMMONING_POTION]: numSummoningPotion,
		[SUPER_RESTORE]: numSuperRestore,
		[PRAYER_RENEWAL]: numPrayerRenewal,
				
	}
	
	// filter out any less than or equal to zero quantities
	let filteredOutput = {};
	for (let key in output) {
		if (output[key] > 0) {
			filteredOutput[key] = output[key];
		}
	}
	
	return filteredOutput;
	
}

/**
*/
const getRequirements = (inventory, output) => {
	
	// helper functions to lookup inventory and output quantity, using default of zero if known are owned/output
	const getInventoryQuantity = (itemID) => inventory[itemID] || 0;
	const getOutputQuantity = (itemID) => output[itemID] || 0;
	
	const requiredFellstalk = Math.max(0, getInventoryQuantity(FELLSTALK) - getOutputQuantity(PRAYER_RENEWAL));
	
	const requirements = {
		
		[FELLSTALK]: requiredFellstalk
		
	}
	
	// filter out any zero quantities
	let filteredRequirements = {};
	for (let key in requirements) {
		if (requirements[key] > 0) {
			filteredRequirements[key] = requirements[key];
		}
	}
	
	return filteredRequirements;
	
}

/**
*/
const inventoryItemQuantityChange = (matrix, item, quantity) => {
	
	// new state of inventory, update the quantity of the item that was changed
	const inventory = {
		...matrix.inventory,
		[item.id]: quantity
	}
	
	// potions that can be created based in the inventory
	const output = getOutput(inventory);
	
	// new state of items required
	const requirements = getRequirements(inventory, output);
	
	return {
		...matrix,
		inventory: inventory,
		output: output,
		requirements: requirements
	}
	
}

/**
*/
const matrixReducer = (matrix=matrixInitialState, action) => {
	
	switch (action.type) {
		case INVENTORY_ITEM_QUANTITY_CHANGE:
			return inventoryItemQuantityChange(matrix, action.item, action.quantity);
		default:
			return matrix;
	}

}

export default matrixReducer;

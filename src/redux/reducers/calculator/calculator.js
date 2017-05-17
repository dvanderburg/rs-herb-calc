import { INVENTORY_ITEM_QUANTITY_CHANGE } from '../../actions/types';

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
	CRUSHED_NEST,
	EYE_OF_NEWT,
	EXTREME_ATTACK,
	EXTREME_STRENGTH,
	EXTREME_DEFENCE,
	EXTREME_MAGIC,
	EXTREME_RANGING,
	GRENWALL_SPIKES,
	GROUND_MUD_RUNES,
	LIMPWURT_ROOT,
	MORCHELLA_MUSHROOM,
	OVERLOAD,
	POTATO_CACTUS,
	PRAYER_POTION,
	PRAYER_RENEWAL,
	RED_SPIDER_EGGS,
	SARADOMIN_BREW,
	SNAPE_GRASS,
	SUMMONING_EGG,
	SUMMONING_POTION,
	SUPER_ATTACK,
	SUPER_STRENGTH,
	SUPER_DEFENCE,
	SUPER_MAGIC,
	SUPER_RANGING_POTION,
	SUPER_RESTORE,
	WHITE_BERRIES,
	WINE_OF_ZAMORAK
} from '../../data/items';

// initial state of the calculator
const calculatorInitialState = {
	inventory: {},	// items entered into the calculator
	output: {},	// output of potions created based in inventory input
	requirements: {}	// items required for the potion output that are not in the inventory
}

const getOverloadOutput = (inventory) => {
	
	// helper function to lookup inventory quantity
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

	// object containing the calculated output
	const output = {
		
		[OVERLOAD]: numOverload,
		
		[EXTREME_ATTACK]: numExtremeAttackForOverload,
		[EXTREME_STRENGTH]: numExtremeStrengthForOverload,
		[EXTREME_DEFENCE]: numExtremeDefenceForOverload,
		[EXTREME_MAGIC]: numExtremeMagicForOverload,
		[EXTREME_RANGING]: numExtremeRangingForOverload,
		
		[SUPER_ATTACK]: numSuperAttackForExtremeAttack,
		[SUPER_STRENGTH]: numSuperStrengthForExtremeStrength,
		[SUPER_DEFENCE]: numSuperDefenceForExtremeDefence,
		[SUPER_MAGIC]: numSuperMagicForExtremeMagic,
		[SUPER_RANGING_POTION]: numSuperRangingForExtremeRanging,
				
	}
	
	return output;
	
}

/**
*/
const getOutput = (inventory) => {

	// helper function to lookup inventory quantity
	const getInventoryQuantity = (itemID) => inventory[itemID] || 0;

	// calculate potion output to consume all torstol and create overloads
	const overloadOutput = getOverloadOutput(inventory);

	// examine the herbs used in overload creation and determine how many are remaining in the inventory
	const numAvantoeAfterOverloads = Math.max(0, getInventoryQuantity(AVANTOE) - overloadOutput[EXTREME_ATTACK]);
	const numDwarfWeedAfterOverloads = Math.max(0, getInventoryQuantity(DWARF_WEED) - overloadOutput[EXTREME_STRENGTH] - overloadOutput[SUPER_RANGING_POTION]);
	const numLantadymeAfterOverloads = Math.max(0, getInventoryQuantity(LANTADYME) - overloadOutput[EXTREME_DEFENCE] - overloadOutput[SUPER_MAGIC]);
	const numIritAfterOverloads = Math.max(0, getInventoryQuantity(IRIT) - overloadOutput[SUPER_ATTACK]);
	const numKwuarmAfterOverloads = Math.max(0, getInventoryQuantity(KWUARM) - overloadOutput[SUPER_STRENGTH]);
	const numCadantineAfterOverloads = Math.max(0, getInventoryQuantity(CADANTINE) - overloadOutput[SUPER_DEFENCE]);

	// determine how many extremes are remaining after the creation of overloads
	const numExtremeStrengthAfterOverloads = Math.max(0, getInventoryQuantity(EXTREME_STRENGTH) - overloadOutput[OVERLOAD]);
	const numExtremeDefenceAfterOverloads = Math.max(0, getInventoryQuantity(EXTREME_DEFENCE) - overloadOutput[OVERLOAD]);
	const numExtremeMagicAfterOverloads = Math.max(0, getInventoryQuantity(EXTREME_MAGIC) - overloadOutput[OVERLOAD]);
	const numExtremeRangingAfterOverloads = Math.max(0, getInventoryQuantity(EXTREME_RANGING) - overloadOutput[OVERLOAD]);

	// determine how many supers are remaining after the creation of overloads
	const numSuperAttackAfterOverloads = Math.max(0, getInventoryQuantity(SUPER_ATTACK) - overloadOutput[EXTREME_ATTACK]);
	const numSuperStrengthAfterOverloads = Math.max(0, getInventoryQuantity(SUPER_STRENGTH) - overloadOutput[EXTREME_STRENGTH]);
	const numSuperDefenceAfterOverloads = Math.max(0, getInventoryQuantity(SUPER_DEFENCE) - overloadOutput[EXTREME_DEFENCE]);
	const numSuperMagicAfterOverloads = Math.max(0, getInventoryQuantity(SUPER_MAGIC) - overloadOutput[EXTREME_STRENGTH]);
	const numSuperRangingAfterOverloads = Math.max(0, getInventoryQuantity(SUPER_RANGING_POTION) - overloadOutput[EXTREME_RANGING]);

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
	const numSuperMagicFromRemainingDwarfWeed = Math.min(numLantadymeAfterBalancing, numLantadymeToBalanceMagicWithExtremeDefence) + Math.ceil(numLantadymeAfterBalancing / 2);

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

	const output = {
		
		[OVERLOAD]: overloadOutput[OVERLOAD],
		
		[EXTREME_ATTACK]: overloadOutput[EXTREME_ATTACK] + numExtremeAttackFromRemainingAvantoe,
		[EXTREME_STRENGTH]: overloadOutput[EXTREME_STRENGTH] + numExtremeStrengthFromRemainingDwarfWeed,
		[EXTREME_DEFENCE]: overloadOutput[EXTREME_DEFENCE] + numExtremeDefenceFromRemainingLantadyme,
		[EXTREME_MAGIC]: overloadOutput[EXTREME_MAGIC] + numSuperMagicFromRemainingDwarfWeed,	// upgrade any extra super magic made into extreme magic
		[EXTREME_RANGING]: overloadOutput[EXTREME_RANGING] + numSuperRangingFromRemainingDwarfWeed,	// upgrade any extra super ranging made into extreme ranging
		
		[SUPER_ATTACK]: overloadOutput[SUPER_ATTACK] + numSuperAttackFromRemainingIrit + numAdditionalSuperAttackForExtremeAttack,
		[SUPER_STRENGTH]: overloadOutput[SUPER_STRENGTH] + numSuperStrengthFromRemainingKwuarm + numAdditionalSuperStrengthForExtremeStrength,
		[SUPER_DEFENCE]: overloadOutput[SUPER_DEFENCE] + numSuperDefenceFromRemainingCadantime + numAdditionalSuperDefenceForExtremeDefence,
		[SUPER_MAGIC]: overloadOutput[SUPER_MAGIC] + numSuperMagicFromRemainingDwarfWeed,
		[SUPER_RANGING_POTION]: overloadOutput[SUPER_RANGING_POTION] + numSuperRangingFromRemainingDwarfWeed,

		[PRAYER_POTION]: getInventoryQuantity(RANARR),
		[SARADOMIN_BREW]: getInventoryQuantity(TOADFLAX),
		[SUMMONING_POTION]: getInventoryQuantity(SPIRIT_WEED),
		[SUPER_RESTORE]: getInventoryQuantity(SNAPDRAGON),
		[PRAYER_RENEWAL]: getInventoryQuantity(FELLSTALK),
				
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

	const requiredTorstol = Math.max(0, getOutputQuantity(OVERLOAD) - getInventoryQuantity(TORSTOL));

	const requiredAvantoe = Math.max(0, getOutputQuantity(EXTREME_ATTACK) - getInventoryQuantity(AVANTOE));
	const requiredDwarfWeed = Math.max(0, getOutputQuantity(EXTREME_STRENGTH) + getOutputQuantity(SUPER_RANGING_POTION) - getInventoryQuantity(DWARF_WEED));
	const requiredLantadyme = Math.max(0, getOutputQuantity(EXTREME_DEFENCE) + getOutputQuantity(SUPER_MAGIC) - getInventoryQuantity(LANTADYME));
	const requiredIrit = Math.max(0, getOutputQuantity(SUPER_ATTACK) - getInventoryQuantity(IRIT));
	const requiredKwuarm = Math.max(0, getOutputQuantity(SUPER_STRENGTH) - getInventoryQuantity(KWUARM));
	const requiredCadantine = Math.max(0, getOutputQuantity(SUPER_DEFENCE) - getInventoryQuantity(CADANTINE));
	const requiredRanarr = Math.max(0, getOutputQuantity(PRAYER_POTION) - getInventoryQuantity(RANARR));
	const requiredFellstalk = Math.max(0, getOutputQuantity(FELLSTALK) - getInventoryQuantity(PRAYER_RENEWAL));
	const requiredToadflax = Math.max(0, getOutputQuantity(TOADFLAX) - getInventoryQuantity(SARADOMIN_BREW));
	const requiredSpritWeed = Math.max(0, getOutputQuantity(SPIRIT_WEED) - getInventoryQuantity(SUMMONING_POTION));
	const requiredSnapdragon = Math.max(0, getOutputQuantity(SNAPDRAGON) - getInventoryQuantity(SUPER_RESTORE));

	const requiredGroundMudRunes = Math.max(0, getOutputQuantity(EXTREME_MAGIC) - getInventoryQuantity(GROUND_MUD_RUNES));
	const requiredGrenwallSpikes = Math.max(0, (getOutputQuantity(EXTREME_RANGING) - getInventoryQuantity(GRENWALL_SPIKES)) * 5);	// 5 spikes are needed per potion
	const requiredEyeOfNewt = Math.max(0, getOutputQuantity(SUPER_ATTACK) - getInventoryQuantity(EYE_OF_NEWT));
	const requiredLimpwurtRoot = Math.max(0, getOutputQuantity(SUPER_STRENGTH) - getInventoryQuantity(LIMPWURT_ROOT));
	const requiredWhiteBerries = Math.max(0, getOutputQuantity(SUPER_DEFENCE) - getInventoryQuantity(WHITE_BERRIES));
	const requiredPotatoCactus = Math.max(0, getOutputQuantity(SUPER_MAGIC) - getInventoryQuantity(POTATO_CACTUS));
	const requiredWineOfZamorak = Math.max(0, getOutputQuantity(SUPER_RANGING_POTION) - getInventoryQuantity(WINE_OF_ZAMORAK));	
	const requiredSnapeGrass = Math.max(0, getOutputQuantity(PRAYER_POTION) - getInventoryQuantity(SNAPE_GRASS));
	const requiredCrushedNest = Math.max(0, getOutputQuantity(SARADOMIN_BREW) - getInventoryQuantity(CRUSHED_NEST))
	const requiredSummoningEgg = Math.max(0, getOutputQuantity(SUMMONING_POTION) - getInventoryQuantity(SUMMONING_EGG));
	const requiredRedSpiderEggs = Math.max(0, getOutputQuantity(SUPER_RESTORE) - getInventoryQuantity(RED_SPIDER_EGGS));
	const requiredMorchellaMushroom = Math.max(0, getOutputQuantity(PRAYER_RENEWAL) - getInventoryQuantity(MORCHELLA_MUSHROOM));
	
	const requirements = {
		
		[TORSTOL]: requiredTorstol,

		[AVANTOE]: requiredAvantoe,
		[DWARF_WEED]: requiredDwarfWeed,
		[LANTADYME]: requiredLantadyme,
		[IRIT]: requiredIrit,
		[KWUARM]: requiredKwuarm,
		[CADANTINE]: requiredCadantine,
		[RANARR]: requiredRanarr,
		[TOADFLAX]: requiredToadflax,
		[SPIRIT_WEED]: requiredSpritWeed,
		[SNAPDRAGON]: requiredSnapdragon,
		[FELLSTALK]: requiredFellstalk,

		[GROUND_MUD_RUNES]: requiredGroundMudRunes,
		[GRENWALL_SPIKES]: requiredGrenwallSpikes,
		[EYE_OF_NEWT]: requiredEyeOfNewt,
		[LIMPWURT_ROOT]: requiredLimpwurtRoot,
		[WHITE_BERRIES]: requiredWhiteBerries,
		[POTATO_CACTUS]: requiredPotatoCactus,
		[WINE_OF_ZAMORAK]: requiredWineOfZamorak,
		[SNAPE_GRASS]: requiredSnapeGrass,
		[CRUSHED_NEST]: requiredCrushedNest,
		[SUMMONING_EGG]: requiredSummoningEgg,
		[RED_SPIDER_EGGS]: requiredRedSpiderEggs,
		[MORCHELLA_MUSHROOM]: requiredMorchellaMushroom,
		
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
const inventoryItemQuantityChange = (calculator, item, quantity) => {
	
	// new state of inventory, update the quantity of the item that was changed
	const inventory = {
		...calculator.inventory,
		[item.id]: quantity
	}
	
	// potions that can be created based in the inventory
	const output = getOutput(inventory);
	
	// new state of items required
	const requirements = getRequirements(inventory, output);
	
	return {
		...calculator,
		inventory: inventory,
		output: output,
		requirements: requirements
	}
	
}

/**
*/
const calculatorReducer = (calculator=calculatorInitialState, action) => {
	
	switch (action.type) {
		case INVENTORY_ITEM_QUANTITY_CHANGE:
			return inventoryItemQuantityChange(calculator, action.item, action.quantity);
		default:
			return calculator;
	}

}

export default calculatorReducer;

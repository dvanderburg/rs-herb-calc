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

/**
 * Calculates the items required to generate the provided output given the provided inventory
 * For example: If a Prayer Potion is desired output and the inventory has a Ranaar but no Snape Grass, the grass is returned a a requirement to achieve desired output
 * @param  {object} inventory The user's inventory of items, keyed with item id, value of quantity
 * @param  {object} output    The desired potion output, keyed with item id, value of quantity 
 * @return {object}           The items required to generate the desired output, keyed with item id, value of quantity
 */
export const getRequirements = (inventory, output) => {
	
	// helper functions to lookup inventory and output quantity, using default of zero if known are owned/output
	const getInventoryQuantity = (itemID) => inventory[itemID] || 0;
	const getOutputQuantity = (itemID) => output[itemID] ? output[itemID].quantity : 0;

	const requiredTorstol = Math.max(0, getOutputQuantity(OVERLOAD) - getInventoryQuantity(TORSTOL));
	
	const requiredAvantoe = Math.max(0, getOutputQuantity(EXTREME_ATTACK) - getInventoryQuantity(AVANTOE));	
	
	// deteremining where the dwarf weed is consumed is more complex since it is used in two potions
	// 	the total number of dwarf weed required is simple: it's the quantity of extreme strength and super ranging being made, minus how much dwarf weed is owned
	const inventoryDwarfWeed = getInventoryQuantity(DWARF_WEED);
	const extremeStrengthOutput = getOutputQuantity(EXTREME_STRENGTH);
	const superRangingOutput = getOutputQuantity(SUPER_RANGING_POTION);	
	const requiredDwarfWeed = Math.max(0, extremeStrengthOutput + superRangingOutput - inventoryDwarfWeed);
	const requiredDwarfWeedForExtremeStrength = Math.min(requiredDwarfWeed, extremeStrengthOutput, extremeStrengthOutput - Math.ceil(inventoryDwarfWeed / 2));
	const requiredDwarfWeedForSuperRanging = Math.min(requiredDwarfWeed, superRangingOutput, superRangingOutput - Math.floor(inventoryDwarfWeed / 2));
	
	// similar to dwarf weed, determing where lantadyme is consumed is more complex since it is used in two potions
	const inventoryLantadyme = getInventoryQuantity(LANTADYME);
	const extremeDefenceOutput = getOutputQuantity(EXTREME_DEFENCE);
	const superMagicOutput = getOutputQuantity(SUPER_MAGIC);
	const requiredLantadyme = Math.max(0, extremeDefenceOutput + superMagicOutput - inventoryLantadyme);
	const requiredLantadymeForExtremeDefence = Math.min(requiredLantadyme, extremeDefenceOutput, extremeDefenceOutput - Math.ceil(inventoryLantadyme / 2));
	const requiredLantadymeForSuperMagic = Math.min(requiredLantadyme, superMagicOutput, superMagicOutput - Math.floor(inventoryLantadyme / 2));

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
	
	let requirements = {};
	requirements = addItemResult(requirements, TORSTOL, requiredTorstol, "Create Overloads");
	
	requirements = addItemResult(requirements, AVANTOE, requiredAvantoe, "Create Extreme Attack");
	requirements = addItemResult(requirements, DWARF_WEED, requiredDwarfWeedForExtremeStrength, "Create Extreme Strength");
	requirements = addItemResult(requirements, DWARF_WEED, requiredDwarfWeedForSuperRanging, "Create Super Ranging Potion");
	requirements = addItemResult(requirements, LANTADYME, requiredLantadymeForExtremeDefence, "Create Extreme Defence");
	requirements = addItemResult(requirements, LANTADYME, requiredLantadymeForSuperMagic, "Create Super Magic");
	requirements = addItemResult(requirements, IRIT, requiredIrit, "Create Super Attack");
	requirements = addItemResult(requirements, KWUARM, requiredKwuarm, "Create Super Strength");
	requirements = addItemResult(requirements, CADANTINE, requiredCadantine, "Create Super Defence");
	requirements = addItemResult(requirements, RANARR, requiredRanarr, "Create Prayer Potion");
	requirements = addItemResult(requirements, FELLSTALK, requiredFellstalk, "Create Prayer Renewal");
	requirements = addItemResult(requirements, TOADFLAX, requiredToadflax, "Create Saradomin Brew");
	requirements = addItemResult(requirements, SNAPDRAGON, requiredSnapdragon, "Create Super Restore");
	requirements = addItemResult(requirements, SPIRIT_WEED, requiredSpritWeed, "Create Summoning Potion");
	
	requirements = addItemResult(requirements, GROUND_MUD_RUNES, requiredGroundMudRunes, "Create Extreme Magic");
	requirements = addItemResult(requirements, GRENWALL_SPIKES, requiredGrenwallSpikes, "Create Extreme Ranging");
	requirements = addItemResult(requirements, EYE_OF_NEWT, requiredEyeOfNewt, "Create Super Attack");
	requirements = addItemResult(requirements, LIMPWURT_ROOT, requiredLimpwurtRoot, "Create Super Strength");
	requirements = addItemResult(requirements, WHITE_BERRIES, requiredWhiteBerries, "Create Super Defence");
	requirements = addItemResult(requirements, POTATO_CACTUS, requiredPotatoCactus, "Create Super Magic");
	requirements = addItemResult(requirements, WINE_OF_ZAMORAK, requiredWineOfZamorak, "Create Super Ranging Potion");
	requirements = addItemResult(requirements, SNAPE_GRASS, requiredSnapeGrass, "Create Prayer Potion");
	requirements = addItemResult(requirements, CRUSHED_NEST, requiredCrushedNest, "Create Saradomin Brew");
	requirements = addItemResult(requirements, SUMMONING_EGG, requiredSummoningEgg, "Create Summoning Potion");
	requirements = addItemResult(requirements, RED_SPIDER_EGGS, requiredRedSpiderEggs, "Create Super Restores");
	requirements = addItemResult(requirements, MORCHELLA_MUSHROOM, requiredMorchellaMushroom, "Create Prayer Renewal");
	
	return requirements;
	
}

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

export default getRequirements;

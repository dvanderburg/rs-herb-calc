// herbs
export const AVANTOE = "AVANTOE";
export const CADANTINE = "CADANTINE";
export const DWARF_WEED = "DWARF_WEED";
export const FELLSTALK = "FELLSTALK";
export const HARRALANDER = "HARRALANDER";
export const IRIT = "IRIT";
export const KWUARM = "KWUARM";
export const LANTADYME = "LANTADYME";
export const MARRENTILL = "MARRENTILL";
export const RANARR = "RANARR";
export const SNAPDRAGON = "SNAPDRAGON";
export const SPIRIT_WEED = "SPIRIT_WEED";
export const TARROMIN = "TARROMIN";
export const TOADFLAX = "TOADFLAX";
export const TORSTOL = "TORSTOL";
export const WERGALI = "WERGALI";

// non-herbs
export const CRUSHED_NEST = "CRUSHED_NEST";
export const DRAGON_SCALE_DUST = "DRAGON_SCALE_DUST";
export const EYE_OF_NEWT = "EYE_OF_NEWT";
export const EXTREME_ATTACK = "EXTREME_ATTACK";
export const EXTREME_STRENGTH = "EXTREME_STRENGTH";
export const EXTREME_DEFENCE = "EXTREME_DEFENCE";
export const EXTREME_MAGIC = "EXTREME_MAGIC";
export const EXTREME_RANGING = "EXTREME_RANGING";
export const GRENWALL_SPIKES = "GRENWALL_SPIKES";
export const GROUND_MUD_RUNES = "GROUND_MUD_RUNES";
export const LIMPWURT_ROOT = "LIMPWURT_ROOT";
export const MORCHELLA_MUSHROOM = "MORCHELLA_MUSHROOM";
export const PHOENIX_FEATHER = "PHOENIX_FEATHER";
export const OVERLOAD = "OVERLOAD";
export const POTATO_CACTUS = "POTATO_CACTUS";
export const PRAYER_POTION = "PRAYER_POTION";
export const PRAYER_RENEWAL = "PRAYER_RENEWAL";
export const RED_SPIDER_EGGS = "RED_SPIDER_EGGS";
export const SARADOMIN_BREW = "SARADOMIN_BREW";
export const SNAPE_GRASS = "SNAPE_GRASS";
export const SUMMONING_EGG = "SUMMONING_EGG";
export const SUMMONING_POTION = "SUMMONING_POTION";
export const SUPER_ATTACK = "SUPER_ATTACK";
export const SUPER_STRENGTH = "SUPER_STRENGTH";
export const SUPER_DEFENCE = "SUPER_DEFENCE";
export const SUPER_MAGIC = "SUPER_MAGIC";
export const SUPER_RANGING_POTION = "SUPER_RANGING_POTION";
export const SUPER_RESTORE = "SUPER_RESTORE";
export const WHITE_BERRIES = "WHITE_BERRIES";
export const WINE_OF_ZAMORAK = "WINE_OF_ZAMORAK";

// constants representing different types or categories of items
//	items can have many types, especially for potions which are also used as secondary ingredients in other potions (super potions making extremes, etc.)
export const ITEM_TYPES = {
	HERB: "herb",	// represents the herb required to make a potion
	SECONDARY: "secondary",	// represents an item or items which are combined with an herb to make a potion
	POTION: "potion"	// anything that is itself a potion
}

// array of all items
const ITEMS = [
	
	// herbs
	{
		id: TORSTOL,
		name: "Torstol",
		types: [ ITEM_TYPES.HERB ],
		image: "torstol.png"
	},
	{
		id: AVANTOE,
		name: "Avantoe",
		types: [ ITEM_TYPES.HERB ],
		image: "avantoe.png"
	},
	{
		id: DWARF_WEED,
		name: "Dwarf Weed",
		types: [ ITEM_TYPES.HERB ],
		image: "dwarf_weed.png"
	},
	{
		id: LANTADYME,
		name: "Lantadyme",
		types: [ ITEM_TYPES.HERB ],
		image: "lantadyme.png"
	},
	{
		id: IRIT,
		name: "Irit",
		types: [ ITEM_TYPES.HERB ],
		image: "irit.png"
	},
	{
		id: KWUARM,
		name: "Kwuarm",
		types: [ ITEM_TYPES.HERB ],
		image: "kwuarm.png"
	},
	{
		id: CADANTINE,
		name: "Cadantine",
		types: [ ITEM_TYPES.HERB ],
		image: "cadantine.png"
	},
	{
		id: MARRENTILL,
		name: "Marrentill",
		types: [ ITEM_TYPES.HERB ],
		image: "marrentill.png"
	},
	{
		id: TARROMIN,
		name: "Tarromin",
		types: [ ITEM_TYPES.HERB ],
		image: "tarromin.png"
	},
	{
		id: HARRALANDER,
		name: "Harralander",
		types: [ ITEM_TYPES.HERB ],
		image: "harralander.png"
	},
	{
		id: RANARR,
		name: "Ranarr",
		types: [ ITEM_TYPES.HERB ],
		image: "ranarr.png"
	},
	{
		id: TOADFLAX,
		name: "Toadflax",
		types: [ ITEM_TYPES.HERB ],
		image: "toadflax.png"
	},
	{
		id: SPIRIT_WEED,
		name: "Spirit Weed",
		types: [ ITEM_TYPES.HERB ],
		image: "spirit_weed.png"
	},
	{
		id: WERGALI,
		name: "Wergali",
		types: [ ITEM_TYPES.HERB ],
		image: "wergali.png"
	},
	{
		id: SNAPDRAGON,
		name: "Snapdragon",
		types: [ ITEM_TYPES.HERB ],
		image: "snapdragon.png"
	},
	{
		id: FELLSTALK,
		name: "Fellstalk",
		types: [ ITEM_TYPES.HERB ],
		image: "fellstalk.png"
	},
	
	// non-herb items
	{
		id: SUPER_ATTACK,
		name: "Super Attack",
		types: [ ITEM_TYPES.SECONDARY, ITEM_TYPES.POTION ],
		image: "super_attack.png"
	},
	{
		id: SUPER_STRENGTH,
		name: "Super Strength",
		types: [ ITEM_TYPES.SECONDARY, ITEM_TYPES.POTION ],
		image: "super_strength.png"
	},
	{
		id: SUPER_DEFENCE,
		name: "Super Defence",
		types: [ ITEM_TYPES.SECONDARY, ITEM_TYPES.POTION ],
		image: "super_defence.png"
	},
	{
		id: SUPER_MAGIC,
		name: "Super Magic",
		types: [ ITEM_TYPES.SECONDARY, ITEM_TYPES.POTION ],
		image: "super_magic.png"
	},
	{
		id: SUPER_RANGING_POTION,
		name: "Super Ranging",
		types: [ ITEM_TYPES.SECONDARY, ITEM_TYPES.POTION ],
		image: "super_ranging_potion.png"
	},
	{
		id: SUPER_RESTORE,
		name: "Super Restore",
		types: [ ITEM_TYPES.POTION ],
		image: "super_restore.png"
	},
	{
		id: EXTREME_ATTACK,
		name: "Extreme Attack",
		types: [ ITEM_TYPES.SECONDARY, ITEM_TYPES.POTION ],
		image: "extreme_attack.png"
	},
	{
		id: EXTREME_STRENGTH,
		name: "Extreme Strength",
		types: [ ITEM_TYPES.SECONDARY, ITEM_TYPES.POTION ],
		image: "extreme_strength.png"
	},
	{
		id: EXTREME_DEFENCE,
		name: "Extreme Defence",
		types: [ ITEM_TYPES.SECONDARY, ITEM_TYPES.POTION ],
		image: "extreme_defence.png"
	},
	{
		id: EXTREME_MAGIC,
		name: "Extreme Magic",
		types: [ ITEM_TYPES.SECONDARY, ITEM_TYPES.POTION ],
		image: "extreme_magic.png"
	},
	{
		id: EXTREME_RANGING,
		name: "Extreme Ranging",
		types: [ ITEM_TYPES.SECONDARY, ITEM_TYPES.POTION ],
		image: "extreme_ranging.png"
	},
	{
		id: GROUND_MUD_RUNES,
		name: "Ground Mud Runes",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "ground_mud_runes.png"
	},
	{
		id: GRENWALL_SPIKES,
		name: "Grenwall Spikes",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "grenwall_spikes.png"
	},
	{
		id: EYE_OF_NEWT,
		name: "Eye of Newt",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "eye_of_newt.png"
	},
	{
		id: LIMPWURT_ROOT,
		name: "Limpwurt Root",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "limpwurt_root.png"
	},
	{
		id: WHITE_BERRIES,
		name: "White Berries",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "white_berries.png"
	},
	{
		id: OVERLOAD,
		name: "Overload",
		types: [ ITEM_TYPES.POTION ],
		image: "overload.png"
	},
	{
		id: POTATO_CACTUS,
		name: "Potato Cactus",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "potato_cactus.png"
	},
	{
		id: PRAYER_POTION,
		name: "Prayer Potion",
		types: [ ITEM_TYPES.POTION ],
		image: "prayer_potion.png"
	},
	{
		id: PRAYER_RENEWAL,
		name: "Prayer Renewal",
		types: [ ITEM_TYPES.POTION ],
		image: "prayer_renewal.png"
	},
	{
		id: WINE_OF_ZAMORAK,
		name: "Wine of Zamorak",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "wine_of_zamorak.png"
	},
	{
		id: SNAPE_GRASS,
		name: "Snape Grass",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "snape_grass.png"
	},
	{
		id: CRUSHED_NEST,
		name: "Crushed Nest",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "crushed_nest.png"
	},
	{
		id: SUMMONING_EGG,
		name: "Cockatrice Egg*",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "cockatrice_egg.png"
	},
	{
		id: SUMMONING_POTION,
		name: "Summoning Potion",
		types: [ ITEM_TYPES.POTION ],
		image: "summoning_potion.png"
	},
	{
		id: RED_SPIDER_EGGS,
		name: "Red Spiders' Eggs",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "red_spiders_eggs.png"
	},
	{
		id: SARADOMIN_BREW,
		name: "Saradomin Brew",
		types: [ ITEM_TYPES.POTION ],
		image: "saradomin_brew.png"
	},
	{
		id: MORCHELLA_MUSHROOM,
		name: "Morchella Mushroom",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "morchella_mushroom.png"
	},
	{
		id: DRAGON_SCALE_DUST,
		name: "Dragon Scale Dust",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "dragon_scale_dust.png"
	},
	{
		id: PHOENIX_FEATHER,
		name: "Phoenix Feater",
		types: [ ITEM_TYPES.SECONDARY ],
		image: "phoenix_feather.png"
	}
	
];

export default ITEMS;

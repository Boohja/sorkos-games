export type ChecklistItem = {
	id: string;
	title: string;
	detail: string;
	note?: string;
};

export const regularJobs = [
	{ job: 'Scholar', shrine: 'Shrine of the Sage', location: 'Western Noblecourt Flats', level: '17+' },
	{ job: 'Cleric', shrine: 'Shrine of the Flamebearer', location: 'Western Stillsnow Wilds', level: '20+' },
	{ job: 'Hunter', shrine: 'Shrine of the Huntress', location: 'East Victors Hollow Trail', level: '21+' },
	{ job: 'Thief', shrine: 'Shrine of the Prince of Thieves', location: 'South Quarrycrest Pass', level: '17+' },
	{ job: 'Apothecary', shrine: 'Shrine of the Healer', location: 'East Saintbridge Traverse', level: '20+' },
	{ job: 'Dancer', shrine: 'Shrine of the Lady of Grace', location: 'Northern Wellspring Sands', level: '31+' },
	{ job: 'Warrior', shrine: 'Shrine of the Thunderblade', location: 'North Stonegard Pass', level: '17+' },
	{ job: 'Merchant', shrine: 'Shrine of the Trader', location: 'Moonstruck Coast', level: '23+' }
] as const;

export const secretJobs = [
	{ job: 'Sorcerer', boss: 'Dreisang', location: 'East Duskbarrow Trail' },
	{ job: 'Runelord', boss: 'Balogar', location: 'West Everhold Pass' },
	{ job: 'Warmaster', boss: 'Winnehild', location: 'North Riverford Traverse' },
	{ job: 'Starseer', boss: 'Steorra', location: 'Western Wispermill Flats' }
] as const;

export const milestones = [
	{ label: 'Play time', values: '10 / 50 / 100 hours' },
	{ label: 'Battles', values: '10 / 100 / 200 battles' },
	{ label: 'Leaves', values: '80,000 / 1,000,000 earned' },
	{ label: 'Battle basics', values: 'Use a level 4 Boost and flee once' }
] as const;

export const sections: { id: string; label: string; title: string; intro: string; items: ChecklistItem[] }[] = [
	{
		id: 'story',
		label: 'Natural progress',
		title: 'Finish every traveler story',
		intro: 'Most achievements need no special routing. Each traveler grants four chapter achievements and one path-action achievement.',
		items: [
			{ id: 'all-stories', title: 'Complete all eight four-chapter stories', detail: 'This covers 32 story achievements and is required for the true ending.' },
			{ id: 'all-path-actions', title: 'Use every traveler path action at least once', detail: 'Scrutinize, Guide, Provoke, Steal, Inquire, Allure, Challenge and Purchase each unlock one achievement.' },
			{ id: 'obsidian-garb', title: 'Steal an Obsidian Garb during Primrose Chapter 3', detail: 'During the boss fight, let the summoned adds appear and steal the Garb from them. Killing the boss too quickly can skip the opportunity.', note: 'MISSABLE: make a manual save before the boss.' }
		]
	},
	{
		id: 'jobs',
		label: 'Jobs and skills',
		title: 'Unlock and master every secondary job',
		intro: 'Regular shrines unlock immediately. The four secret shrines are late-game level 50 dungeons with a boss.',
		items: [
			{ id: 'regular-jobs', title: 'Visit all eight regular job shrines', detail: 'Unlock Scholar, Cleric, Hunter, Thief, Apothecary, Dancer, Warrior and Merchant as secondary jobs.' },
			{ id: 'secret-jobs', title: 'Defeat all four secret shrine bosses', detail: 'Unlock Sorcerer, Runelord, Warmaster and Starseer.' },
			{ id: 'all-skills', title: 'Learn every skill and every support skill', detail: 'Master every job with every traveler. Expect this to be one of the longest JP grinds.' },
			{ id: 'max-damage', title: 'Deal 99,999 damage', detail: 'Equip the Warrior support skill Surpassing Power, then stack attack or speed, buffs, defense reduction, break and maximum boost.' }
		]
	},
	{
		id: 'cleanup',
		label: 'Completion cleanup',
		title: 'Clear the exhaustive collections',
		intro: 'These achievements reward systematic exploration. Inquire or Scrutinize NPCs as you enter each town, and open every chest you pass.',
		items: [
			{ id: 'side-quests', title: 'Complete every main and side quest', detail: 'Required for Worth the Detour. Finish every quest chain rather than only accepting each quest.' },
			{ id: 'locations', title: 'Visit every map location', detail: 'Enter every town, route, cave, ruin and optional dungeon for Master of Orsterra.' },
			{ id: 'hidden-items', title: 'Find every hidden item', detail: 'Reveal them through NPC information, then collect every marked item for Eagle-Eyed.' },
			{ id: 'items', title: 'Acquire every item', detail: 'Weapons, armor, accessories, consumables and relevant valuables count. The Obsidian Garb is the known missable.' },
			{ id: 'chests', title: 'Open every treasure chest', detail: 'Revisit optional dungeons and story locations for Treasure Hunter.' },
			{ id: 'weaknesses', title: 'Discover every enemy weakness', detail: 'Reveal every weapon and elemental weakness for Strategist. Analyze unfamiliar enemies before defeating them.' },
			{ id: 'cobbleston', title: 'Challenge every villager in Cobbleston', detail: 'Use Olberic to complete Training.' },
			{ id: 'milestones', title: 'Finish the passive milestones', detail: 'Reach 100 hours, 200 battles and 1,000,000 leaves earned. Use a level 4 Boost and flee from one battle.' }
		]
	},
	{
		id: 'ending',
		label: 'True ending',
		title: 'Open the Gate of Finis',
		intro: 'The final route only opens after every traveler story and two specific side-quest chains.',
		items: [
			{ id: 'dark-god', title: 'Complete Daughter of the Dark God', detail: 'Near Ravus Manor, Challenge or Provoke the guard Alphas to start the chain.' },
			{ id: 'father-one', title: 'Complete In Search of the Father I', detail: 'Find Kit outside the first starting town, then Guide or Allure the Aspiring Actor in Noblecourt.' },
			{ id: 'father-two', title: 'Complete In Search of the Father II', detail: 'Steal or Purchase the Lapis Lazuli from the Traveling Merchant in Grandport, Moonstruck Coast.' },
			{ id: 'impresario', title: 'Help the Impresario on West S’warkii Trail', detail: 'After both quest chains, speak to the Impresario to unlock the Ruins of Hornburg.' },
			{ id: 'galdera', title: 'Clear the boss gauntlet and defeat Galdera', detail: 'Prepare two complete parties before entering. This earns Closure.' }
		]
	},
	{
		id: 'challenge-runs',
		label: 'Separate saves',
		title: 'Do the challenge runs last',
		intro: 'These are cleaner on fresh saves and should not complicate the completionist file.',
		items: [
			{ id: 'lone-traveler', title: 'Lone Traveler', detail: 'Complete all four chapters with one traveler without recruiting any other traveler.' },
			{ id: 'fleetfoot', title: 'Fleetfoot', detail: 'Complete one traveler’s four chapters in a speedrun. Community runs cited by the guide finish in roughly 46 to 55 minutes.' },
			{ id: 'all-achievements', title: 'A Story All Your Own', detail: 'Unlock every other achievement.' }
		]
	}
];

export const totalChecklistItems = sections.reduce((total, section) => total + section.items.length, 0);

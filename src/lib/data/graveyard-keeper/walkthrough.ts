export type Cue = 'missable' | 'tricky' | 'grind';

export type PlatinumStep = {
	id: string;
	title: string;
	detail: string;
	trophies?: string;
	cue?: Cue;
	warning?: string;
};

export type PlatinumPhase = {
	id: string;
	label: string;
	title: string;
	intro: string;
	steps: PlatinumStep[];
};

export const phases: PlatinumPhase[] = [
	{
		id: 'habits',
		label: 'From day one',
		title: 'Start the long jobs early',
		intro: 'A few small habits turn the platinum cleanup from a grind into background progress.',
		steps: [
			{ id: 'teleportstone', title: 'Buy the Teleportstone from the Dead Horse', detail: 'It has unlimited uses and removes a huge amount of walking from the route.' },
			{ id: 'fish-early', title: 'Fish whenever you pass a fishing spot', detail: 'Work toward 15 species and 200 total catches throughout the game.', trophies: 'A fish a day! · Fish collector · Ichthyologist · Brutal fisherman', cue: 'grind' },
			{ id: 'corpse-resources', title: 'Keep corpse resources in rotation', detail: 'Extract at least 25 skulls for quests, 30 pieces of meat for Sashimi master, and burn spare bodies for useful ash. Do not eat the meat; save it for burgers.', trophies: 'Sashimi master' },
			{ id: 'farm-early', title: 'Farm continuously and compost the waste', detail: 'Keep vegetables, peat and maggots moving. Store several pumpkins and improve seed quality with fertilizer.' },
			{ id: 'dungeon-powders', title: 'Keep every powder found in the dungeon', detail: 'The variety makes discovering 20 alchemy recipes much easier later.', trophies: 'Apprentice · Alchemist · Master alchemist' },
			{ id: 'study-bonus', title: 'Study in batches with Circumspect active', detail: 'Eat cake or pie before using the Study Table for extra points, especially blue points.' },
			{ id: 'bury-50', title: 'Work toward 50 burials', detail: 'Normal play contributes. For cleanup, repeatedly exhume and rebury the same body.', trophies: 'Novice gravedigger · Advanced gravedigger · Shovel master', cue: 'grind' }
		]
	},
	{
		id: 'lockouts',
		label: 'Do not miss',
		title: 'Protect the two missable trophies',
		intro: 'These choices cannot be repaired on the same save. Stop and check the warning before advancing the related quest.',
		steps: [
			{ id: 'best-seller', title: 'Give the Astrologer a real gold-star Book', detail: 'When his combined quest asks for a Book, craft one or combine a purchased Hard cover with a gold-star Chapter.', trophies: 'Best seller', cue: 'missable', warning: 'Do not hand over Research Obsidian, the Stranger Sins substitute. It skips the follow-up and permanently locks the trophy.' },
			{ id: 'trusted-you', title: 'Tell the Inquisitor “About Gerry”', detail: 'One week after returning the three dark organs, choose this evidence option when he asks for more.', trophies: 'He trusted you…', cue: 'missable', warning: 'The conversation is a one-time choice. Gerry remains safe, so there is no downside.' }
		]
	},
	{
		id: 'quests',
		label: 'NPC work',
		title: 'Complete the optional quest objectives',
		intro: 'The automatic story trophies are omitted. These are the errands and side objectives that still need deliberate action.',
		steps: [
			{ id: 'snake-ritual', title: 'Bring Snake 5 Bloody nails and a Bucket of blood', detail: 'Bloody nails drop from Iron Maidens. The bucket is in the floor 5 chest and can also be crafted at the Church workbench.', trophies: 'Summon a chicken', cue: 'tricky', warning: 'If the chest reward appears missing, clear one inventory slot; it may have dropped behind the chest.' },
			{ id: 'dark-shrine', title: 'Fully decorate Snake’s Sacrifice Zone', detail: 'Prepare 24 skulls, 8 wooden beams, 4 pumpkins, 10 polished stone bricks, 10 polishing paste, 2 stone repair kits and 20 blood.', trophies: 'Simple but stylish', cue: 'grind' },
			{ id: 'company', title: 'Start the Merchant company', detail: 'Buy Rightful citizen status and the Trade license from the Royal services box, then bring the license to the Merchant.', trophies: 'Graveyard Veggies' },
			{ id: 'gold-dinner', title: 'Make one gold-star dinner', detail: 'A practical combination is onion rings, a high-quality burger and cake. Save before percentage-based crafting.', trophies: 'Dream dinner', cue: 'tricky' },
			{ id: 'fame', title: 'Raise the company to 5 Fame', detail: 'Craft 50 Flyers and redeem them at the Trade Office table in batches of ten.', trophies: 'On every shelf', cue: 'grind' },
			{ id: 'buffet', title: 'Open the Buffet tent during a burning', detail: 'Build it with 5 hemp rope, 15 wooden planks and 20 nails, then supply 5 burgers and 10 beers on the Inquisitor’s day.', trophies: 'Not a hot dog' }
		]
	},
	{
		id: 'estate',
		label: 'Build & craft',
		title: 'Upgrade the graveyard estate',
		intro: 'Most upgrades can wait until their materials are comfortable, but each must be built at least once.',
		steps: [
			{ id: 'garden', title: 'Use the Garden certificate at its blueprint table', detail: 'This repairs and unlocks the garden.', trophies: 'Even here' },
			{ id: 'bridge', title: 'Repair the swamp bridge', detail: 'Bring 6 flitch, 3 wooden planks and 10 nails.', trophies: 'Bridge builder' },
			{ id: 'church-one', title: 'Purchase the first church upgrade', detail: 'Meet the Bishop’s requirements and provide the Building permission. Buy Rightful citizen papers first so preaching remains available.', trophies: 'His house', cue: 'tricky' },
			{ id: 'mill', title: 'Repair the Mill', detail: 'Bring 5 complex parts, 6 wooden planks and the Calculation papers earned through Astrologer quests.', trophies: 'The Mill' },
			{ id: 'marble', title: 'Build the regular Marble quarry', detail: 'At the Quarry, use 12 flitch, 4 simple iron parts and 4 nails.', trophies: 'Marble', cue: 'tricky', warning: 'The Zombie marble quarry does not unlock this trophy.' },
			{ id: 'fence', title: 'Repair, then replace the graveyard fence', detail: 'After gaining access to the west graveyard, repair the fence first and then construct the stone version.', trophies: 'Stone fence' },
			{ id: 'church-two', title: 'Upgrade the church a second time', detail: 'Meet the Bishop’s next requirement and bring 3 carved pieces of marble.', trophies: 'His mansion' },
			{ id: 'gold-crops', title: 'Harvest a gold pumpkin and make gold wine', detail: 'Buy pumpkin and grape seeds, then improve their quality over successive crops with Quality fertilizer.', trophies: 'Golden pumpkin · Winemaker' }
		]
	},
	{
		id: 'cleanup',
		label: 'Late cleanup',
		title: 'Finish the counters and oddities',
		intro: 'Use this pass once the NPC questlines and estate are nearly complete.',
		steps: [
			{ id: 'cook-30', title: 'Cook 30 different dishes or drinks', detail: 'Unlock recipes from the Farmer, Miss Chain, Clotho, Dig, Krezvold, the Woodcutter and Lighthouse Keeper; then make each distinct recipe.', trophies: 'Kitchen boy · Cook · Chef', cue: 'grind' },
			{ id: 'alchemy-20', title: 'Discover 20 alchemy recipes', detail: 'Experiment at both Alchemy Workbench tiers. The base game contains more recipes than the trophy requires.', trophies: 'Apprentice · Alchemist · Master alchemist', cue: 'grind' },
			{ id: 'dungeon-15', title: 'Clear all 15 dungeon floors', detail: 'Snake’s quests remove the blockage beyond floor 10. Upgrade equipment before the final descent.', trophies: 'Not far from the ground · Scary dungeon depths · Nothing underneath' },
			{ id: 'points', title: 'Earn 3,000 points of each color', detail: 'Stone grave fences are a repeatable source of blue points: craft them for 5 blue points and recycle them for one stone back.', trophies: 'All six red, green and blue point trophies', cue: 'tricky', warning: 'Never cross a 3,000-point threshold with a Techbook. Earn the final points through gathering, crafting or studying to avoid a known unlock bug.' },
			{ id: 'potions', title: 'Drink 50 health potions', detail: 'Dungeon loot counts, so drink rather than hoard them.', trophies: 'Health care', cue: 'grind' },
			{ id: 'fish-stick', title: 'Buy and eat a Fish nugget from Horadric', detail: 'It becomes available from the Dead Horse tavern.', trophies: 'Tastes like home' },
			{ id: 'die-ten', title: 'Die ten times', detail: 'Any cause counts; finish the deaths deliberately if normal play leaves the counter short.', trophies: 'MacPlayer' },
			{ id: 'gold-fish', title: 'Catch a Gold fish', detail: 'Use the Excellent fishing rod and a gem lure. Fish at night for a 5% chance; fishing pauses the clock.', trophies: 'Gold fish', cue: 'tricky' }
		]
	}
];

export const totalSteps = phases.reduce((total, phase) => total + phase.steps.length, 0);

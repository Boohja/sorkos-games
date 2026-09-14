export type Fusion = {
	name: string;
	components: readonly [string, string];
	values: readonly [string, string];
};

export type PrismBuild = {
	slug: string;
	legendary: string;
	effect: string;
	enables: string;
	fusions: readonly Fusion[];
	standalone: { name: string; value: string };
	reasoning: string;
};

const fusion = {
	gunfighter: {
		name: 'Gunfighter',
		components: ['Ranged Fire Rate', 'Reload Speed'],
		values: ['10%', '10%']
	},
	meta: {
		name: 'Meta',
		components: ['Weakspot Damage', 'Critical Damage'],
		values: ['15%', '10%']
	},
	munitions: {
		name: 'Munitions',
		components: ['Ranged Critical Chance', 'Ammo Reserves'],
		values: ['7.5%', '30%']
	},
	sniper: {
		name: 'Sniper',
		components: ['Ranged Damage', 'Weapon Ideal Range'],
		values: ['10%', '2m']
	},
	longevity: {
		name: 'Longevity',
		components: ['Mod Duration', 'Skill Duration'],
		values: ['15%', '15%']
	},
	mage: {
		name: 'Mage',
		components: ['Mod Damage', 'Mod Generation'],
		values: ['10%', '10%']
	},
	wizard: {
		name: 'Wizard',
		components: ['Mod Critical Chance', 'Skill Critical Chance'],
		values: ['7.5%', '7.5%']
	},
	revitalize: {
		name: 'Revitalize',
		components: ['Health Regeneration', 'Skill Cooldown'],
		values: ['1 HP/s', '10%']
	},
	flash: {
		name: 'Flash',
		components: ['Cast Speed', 'Use Speed'],
		values: ['20%', '15%']
	},
	sapper: {
		name: 'Sapper',
		components: ['Explosive Damage', 'Damage Reduction'],
		values: ['10%', '5%']
	},
	tank: {
		name: 'Tank',
		components: ['Damage Reduction', 'Armor Bonus'],
		values: ['5%', '10%']
	},
	hulk: {
		name: 'Hulk',
		components: ['Health Bonus', 'Stamina Bonus'],
		values: ['10%', '15%']
	},
	protected: {
		name: 'Protected',
		components: ['Shield Amount', 'Base Armor'],
		values: ['10%', '15']
	},
	athletic: {
		name: 'Athletic',
		components: ['Movement Speed', 'Evade Speed'],
		values: ['10%', '10%']
	}
} as const satisfies Record<string, Fusion>;

const rangedFusions = [fusion.gunfighter, fusion.meta, fusion.munitions, fusion.sniper];
const casterFusions = [fusion.revitalize, fusion.longevity, fusion.wizard, fusion.mage];

export const prismBuilds: PrismBuild[] = [
	{
		slug: 'jack-of-all-trades',
		legendary: 'Jack of All Trades',
		effect: '+40% All Damage',
		enables: 'Flexible hybrid damage across guns, mods, and skills.',
		fusions: [fusion.meta, fusion.mage, fusion.wizard, fusion.gunfighter],
		standalone: { name: 'Skill Damage', value: '10%' },
		reasoning: 'A general-purpose damage Prism that improves every offensive lane without locking the loadout to one weapon family.'
	},
	{
		slug: 'sharpshooter',
		legendary: 'Sharpshooter',
		effect: '+60% Ranged Damage',
		enables: 'High-output firearm builds and sustained gun DPS.',
		fusions: rangedFusions,
		standalone: { name: 'Weapon Spread', value: '15%' },
		reasoning: 'The four established ranged fusions cover damage, crits, weakspots, uptime, ammo, and effective range; spread is the cleanest fifth gun stat.'
	},
	{
		slug: 'master-killer',
		legendary: 'Master Killer',
		effect: 'Weakspot Damage ×1.35',
		enables: 'Precision and charged-weapon weakspot burst.',
		fusions: [fusion.meta, fusion.sniper, fusion.munitions, fusion.gunfighter],
		standalone: { name: 'Firearm Charge Time', value: '10%' },
		reasoning: 'Meta and Sniper concentrate the weakspot package while charge time favors bows, fusion rifles, and Monorail-style precision weapons.'
	},
	{
		slug: 'unbridled',
		legendary: 'Unbridled',
		effect: 'Halves all Skill Cooldowns',
		enables: 'Rapid skill cycling and ability-led builds.',
		fusions: casterFusions,
		standalone: { name: 'Skill Damage', value: '10%' },
		reasoning: 'Revitalize adds another cooldown layer; duration, skill crit, and skill damage turn the extra casts into meaningful output.'
	},
	{
		slug: 'prime-time',
		legendary: 'Prime Time',
		effect: 'Enables the secondary Archetype Prime Perk',
		enables: 'Dual-Prime archetype combinations and unusual synergies.',
		fusions: [fusion.revitalize, fusion.longevity, fusion.wizard, fusion.meta],
		standalone: { name: 'Skill Damage', value: '10%' },
		reasoning: 'Prime Time is archetype-dependent, so this plan stays broadly useful for skill-heavy pairs while retaining crit and weakspot value.'
	},
	{
		slug: 'boundless-energy',
		legendary: 'Boundless Energy',
		effect: 'Infinite N’Erudian Energy',
		enables: 'Engineer heavy carry and Warden drone uptime.',
		fusions: [fusion.wizard, fusion.longevity, fusion.meta, fusion.tank],
		standalone: { name: 'Skill Damage', value: '10%' },
		reasoning: 'Infinite energy removes the main uptime constraint; the Prism then adds skill output, crit scaling, duration, and enough defense to stay deployed.'
	},
	{
		slug: 'power-trip',
		legendary: 'Power Trip',
		effect: 'Doubles Mod Charges',
		enables: 'Stored-charge mod loops and mod-swap burst.',
		fusions: [fusion.mage, fusion.longevity, fusion.wizard, fusion.flash],
		standalone: { name: 'Health Bonus', value: '10%' },
		reasoning: 'Damage, generation, duration, crit chance, and cast speed all serve repeated mod use; Health Bonus is a broadly useful standalone safety slot.'
	},
	{
		slug: 'wrecking-ball',
		legendary: 'Wrecking Ball',
		effect: '+100% Explosive Critical Chance',
		enables: 'Guaranteed explosive crit builds.',
		fusions: [fusion.sapper, fusion.mage, fusion.wizard, fusion.longevity],
		standalone: { name: 'Critical Damage', value: '10%' },
		reasoning: 'Sapper supplies the essential explosive multiplier; the rest boosts explosive mods, their crits, uptime, and the guaranteed-crit payoff.'
	},
	{
		slug: 'sadistic',
		legendary: 'Sadistic',
		effect: '50% chance for status ticks to deal ×2 damage',
		enables: 'Pure damage-over-time and Ritualist builds.',
		fusions: [fusion.mage, fusion.longevity, fusion.revitalize, fusion.flash],
		standalone: { name: 'Status Damage', value: '15%' },
		reasoning: 'Status Damage is the mandatory standalone; the fusions support mod-applied statuses, duration, cast speed, and skill cycling without wasting a slot on gun-only stats.'
	},
	{
		slug: 'immovable',
		legendary: 'Immovable',
		effect: 'Cannot be staggered while Bulwark is active',
		enables: 'Uninterrupted heavy carry, melee, and face-tank setups.',
		fusions: [fusion.tank, fusion.hulk, fusion.protected, fusion.revitalize],
		standalone: { name: 'Skill Damage', value: '10%' },
		reasoning: 'The tenth pick is genuinely build-defining: it changes how Bulwark tanks and carried Engineer weapons can play, while this plan supplies durability and sustain.'
	}
];

export const prismSources = [
	{
		label: 'Gunfire Games — Prism system overview',
		url: 'https://store.steampowered.com/news/app/1282100/view/4676514574283991786'
	},
	{
		label: 'Gunfire Games — Legendary reroll patch',
		url: 'https://gunfiregames.com/blog-five/2024/10/17/remnant-ii-patch-notes-448817-101724'
	},
	{
		label: 'Gunfire Games — Prism balance patch',
		url: 'https://gunfiregames.com/blog-five/2024/11/5/remnant-ii-patch-notes-451008-11052024'
	},
	{
		label: 'Remnant 2 Wiki — current Prism data',
		url: 'https://remnant2.wiki.gg/wiki/Prism'
	}
] as const;

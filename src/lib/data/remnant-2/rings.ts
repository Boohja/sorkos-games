import { decorateRing, type RingStatusId } from './statuses';

export type Ring = {
	id: string;
	name: string;
	effect: string;
	effectHtml: string;
	statuses: RingStatusId[];
	wikiUrl: string;
	image: {
		src: string;
		width: 128;
		height: 128;
	};
};

type RingRecord = Omit<Ring, 'effectHtml' | 'statuses'>;

export const ringSource = {
	"url": "https://remnant2.wiki.gg/wiki/List_of_rings",
	"license": "CC BY-NC-SA 4.0",
	"licenseUrl": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
	"retrievedAt": "2026-08-02T22:18:42.468Z"
} as const;

const ringRecords: RingRecord[] = [
	{
		"id": "a-taerii-booster",
		"name": "A'Taerii Booster",
		"effect": "Heavy Weapons gain 10% additional damage and gain 10% additional Critical Chance in both Carry and Turret Mode.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/A%27Taerii_Booster",
		"image": {
			"src": "/images/remnant-2/rings/a-taerii-booster.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "acid-stone",
		"name": "Acid Stone",
		"effect": "Increases ACID damage by 15% and ACID Resistance by 20%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Acid_Stone",
		"image": {
			"src": "/images/remnant-2/rings/acid-stone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ahanae-crystal",
		"name": "Ahanae Crystal",
		"effect": "Deal 5% additional damage for each unique Status Effect the target is suffering from.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ahanae_Crystal",
		"image": {
			"src": "/images/remnant-2/rings/ahanae-crystal.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "akari-war-band",
		"name": "Akari War Band",
		"effect": "Perfect Dodges increase Critical Chance by 10% and Critical Damage by 10% for 15s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Akari_War_Band",
		"image": {
			"src": "/images/remnant-2/rings/akari-war-band.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "alchemy-stone",
		"name": "Alchemy Stone",
		"effect": "Increases base Lifesteal by 6% while suffering from a negative STATUS or Blight Effect.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Alchemy_Stone",
		"image": {
			"src": "/images/remnant-2/rings/alchemy-stone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "alumni-ring",
		"name": "Alumni Ring",
		"effect": "Increases all Elemental damage dealt by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Alumni_Ring",
		"image": {
			"src": "/images/remnant-2/rings/alumni-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "amber-moonstone",
		"name": "Amber Moonstone",
		"effect": "When Health drops below 35%, all incoming damage is reduced by 25% and wearer becomes immune to Temporary Status Effects.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Amber_Moonstone",
		"image": {
			"src": "/images/remnant-2/rings/amber-moonstone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "anastasija-s-inspiration",
		"name": "Anastasija's Inspiration",
		"effect": "When receiving healing effects, gain HASTE for 10s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Anastasija%27s_Inspiration",
		"image": {
			"src": "/images/remnant-2/rings/anastasija-s-inspiration.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "archer-s-crest",
		"name": "Archer's Crest",
		"effect": "Increases Projectile Speed by 20% and Decreases Weapon Charge Time by 25%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Archer%27s_Crest",
		"image": {
			"src": "/images/remnant-2/rings/archer-s-crest.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "assassin-s-seal",
		"name": "Assassin's Seal",
		"effect": "Reduces enemy Awareness Range by 25%. Increases all damage dealt to enemies not targeting wearer by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Assassin%27s_Seal",
		"image": {
			"src": "/images/remnant-2/rings/assassin-s-seal.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "atonement-fold",
		"name": "Atonement Fold",
		"effect": "Self-inflicts BLEEDING Status upon the wearer, causing 0.275 - 0.55 BLEED damage per second. Increases Critical Chance by 5%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Atonement_Fold",
		"image": {
			"src": "/images/remnant-2/rings/atonement-fold.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "band-band",
		"name": "Band Band",
		"effect": "Increases Speed of Revive and being Revived by 35%. Increases Downed Health and Downed Movement Speed by 100%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Band_Band",
		"image": {
			"src": "/images/remnant-2/rings/band-band.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "band-of-accord",
		"name": "Band of Accord",
		"effect": "Ammo acquired on pickup is increased by 50% per ally also wearing this ring and is shared with other allies.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Band_of_Accord",
		"image": {
			"src": "/images/remnant-2/rings/band-of-accord.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "band-of-the-fanatic",
		"name": "Band of the Fanatic",
		"effect": "Increases Status Effect Damage by 30% and reduces Status Effect Duration by 50%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Band_of_the_Fanatic",
		"image": {
			"src": "/images/remnant-2/rings/band-of-the-fanatic.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "berserker-s-crest",
		"name": "Berserker's Crest",
		"effect": "Increases Melee Speed by 10% and reduces Melee Stamina Cost by 30%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Berserker%27s_Crest",
		"image": {
			"src": "/images/remnant-2/rings/berserker-s-crest.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "bisected-ring",
		"name": "Bisected Ring",
		"effect": "Gain Infinite Stamina. All damage received is increased by 15%",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Bisected_Ring",
		"image": {
			"src": "/images/remnant-2/rings/bisected-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "bitter-memento",
		"name": "Bitter Memento",
		"effect": "Forces 1% of wearer's Max Health to remain as Grey Health. Activating a skill converts 33.5% Max Health into Grey Health. Conversion cannot kill wearer.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Bitter_Memento",
		"image": {
			"src": "/images/remnant-2/rings/bitter-memento.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "black-cat-band",
		"name": "Black Cat Band",
		"effect": "When taking fatal damage, instead of dying, the wearer's Health will drop to 1, and Movement Speed will increase by 25% for 10s. 2m cooldown.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Black_Cat_Band",
		"image": {
			"src": "/images/remnant-2/rings/black-cat-band.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "black-pawn-stamp",
		"name": "Black Pawn Stamp",
		"effect": "Reduces Cooldowns of Skills by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Black_Pawn_Stamp",
		"image": {
			"src": "/images/remnant-2/rings/black-pawn-stamp.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "black-spinel",
		"name": "Black Spinel",
		"effect": "Applying a Negative Status Effect grants 2% Max Health per second for 3s. Applying or refreshing a Negative Status Effect while buff is active will increase the duration by 1.5s. Max 15s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Black_Spinel",
		"image": {
			"src": "/images/remnant-2/rings/black-spinel.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "blackout-ring",
		"name": "Blackout Ring",
		"effect": "Increases Reload Speed by 3% for every 20% of Magazine missing.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Blackout_Ring",
		"image": {
			"src": "/images/remnant-2/rings/blackout-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "blasting-cap-ring",
		"name": "Blasting Cap Ring",
		"effect": "Increases Explosive damage by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Blasting_Cap_Ring",
		"image": {
			"src": "/images/remnant-2/rings/blasting-cap-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "blessed-ring",
		"name": "Blessed Ring",
		"effect": "After receiving a benefit from a Relic, gain 2 Stacks of BULWARK for 30s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Blessed_Ring",
		"image": {
			"src": "/images/remnant-2/rings/blessed-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "blood-jewel",
		"name": "Blood Jewel",
		"effect": "Charged Melee Attacks apply BLEEDING, dealing 620 BLEED damage over 20s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Blood_Jewel",
		"image": {
			"src": "/images/remnant-2/rings/blood-jewel.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "blood-tinged-ring",
		"name": "Blood Tinged Ring",
		"effect": "Gain 2 Health Regeneration per second when within 25m of a BLEEDING entity.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Blood_Tinged_Ring",
		"image": {
			"src": "/images/remnant-2/rings/blood-tinged-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "bloodless-king-s-vow",
		"name": "Bloodless King's Vow",
		"effect": "Gain 4% of base Ranged Damage dealt as Lifesteal.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Bloodless_King%27s_Vow",
		"image": {
			"src": "/images/remnant-2/rings/bloodless-king-s-vow.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "booster-ring",
		"name": "Booster Ring",
		"effect": "Increases all Status Resistances by 25.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Booster_Ring",
		"image": {
			"src": "/images/remnant-2/rings/booster-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "braided-thorns",
		"name": "Braided Thorns",
		"effect": "Increases Critical Chance by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Braided_Thorns",
		"image": {
			"src": "/images/remnant-2/rings/braided-thorns.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "brawler-s-pride",
		"name": "Brawler's Pride",
		"effect": "Increases Melee Attack Speed by 15% and Melee Critical Chance by 5%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Brawler%27s_Pride",
		"image": {
			"src": "/images/remnant-2/rings/brawler-s-pride.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "breach-accelerator",
		"name": "Breach Accelerator",
		"effect": "Increases Movement Speed and Physical Damage by 5%. Bonus is doubled when HASTE is active.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Breach_Accelerator",
		"image": {
			"src": "/images/remnant-2/rings/breach-accelerator.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "bridge-warden-s-crest",
		"name": "Bridge Warden's Crest",
		"effect": "Perfect Dodge increases Melee Damage by 20% for 10s. Perfect Evade Flop also gains 10% Damage Reduction for the duration.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Bridge_Warden%27s_Crest",
		"image": {
			"src": "/images/remnant-2/rings/bridge-warden-s-crest.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-audacious",
		"name": "Burden of the Audacious",
		"effect": "Decreases all healing by 50%. Perfect Dodges heal for 25% of Max Health.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Audacious",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-audacious.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-departed",
		"name": "Burden of the Departed",
		"effect": "Reduces Total Relic Charges by 33%. Increases All Damage dealt by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Departed",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-departed.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-destroyer",
		"name": "Burden of the Destroyer",
		"effect": "Decreases Range of all Firearms by 35%. Increases all damage dealt by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Destroyer",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-destroyer.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-divine",
		"name": "Burden of the Divine",
		"effect": "All damage dealt by the wearer is reduced by 15%. 30% of self healing applies to allies.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Divine",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-divine.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-excavator",
		"name": "Burden of the Excavator",
		"effect": "Explosions cannot Critical Hit. Increases Explosive Damage by 35%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Excavator",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-excavator.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-follower",
		"name": "Burden of the Follower",
		"effect": "Reduces Fire Rate by 15%. Increases Mod Power Generation by 30%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Follower",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-follower.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-gambler",
		"name": "Burden of the Gambler",
		"effect": "Disables Weakspots. Increases Critical Chance by 10% and Critical Damage by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Gambler",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-gambler.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-mariner",
		"name": "Burden of the Mariner",
		"effect": "Increases Skill Cooldowns by 15%. Generate 15% additional Mod Power for each Skill on Cooldown.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Mariner",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-mariner.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-mason",
		"name": "Burden of the Mason",
		"effect": "Decreases Dodge Weight Threshold by 25. Increases Melee damage by 35% of the wearer's total Damage Reduction.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Mason",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-mason.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-mesmer",
		"name": "Burden of the Mesmer",
		"effect": "Reduces Max Health by 20%. Increases All Damage by 1% for every 5% of the wearer's total Damage Reduction.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Mesmer",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-mesmer.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-protector",
		"name": "Burden of the Protector",
		"effect": "Reduces incoming SHIELD Duration by 50%. Increases SHIELD amount by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Protector",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-protector.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-rebel",
		"name": "Burden Of The Rebel",
		"effect": "Reduces Relic Use Speed by 25%. Reduces Skill Cooldowns by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_Of_The_Rebel",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-rebel.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-sciolist",
		"name": "Burden of the Sciolist",
		"effect": "Reduces Ammo Reserves by 20%. Increases Mod and Skill Damage by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Sciolist",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-sciolist.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-stargazer",
		"name": "Burden of the Stargazer",
		"effect": "Reduces Skill Cooldowns by 15%. Activating a Skill costs 15% Health.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Stargazer",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-stargazer.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "burden-of-the-warlock",
		"name": "Burden of the Warlock",
		"effect": "Reduces Mod Power Requirement by 15%. Activating a Mod costs 15% Health as Grey Health. Conversion cannot kill wearer.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Burden_of_the_Warlock",
		"image": {
			"src": "/images/remnant-2/rings/burden-of-the-warlock.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "bypass-primer",
		"name": "Bypass Primer",
		"effect": "On Perfect Dodge, reload current Firearm",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Bypass_Primer",
		"image": {
			"src": "/images/remnant-2/rings/bypass-primer.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "captain-s-insignia",
		"name": "Captain's Insignia",
		"effect": "Increases Revive Speed and Relic Consume Speed by 25% per downed or dead ally. Max 2 stacks.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Captain%27s_Insignia",
		"image": {
			"src": "/images/remnant-2/rings/captain-s-insignia.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "cataloger-s-jewel",
		"name": "Cataloger's Jewel",
		"effect": "Automatically generates 10 Mod Power per second.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Cataloger%27s_Jewel",
		"image": {
			"src": "/images/remnant-2/rings/cataloger-s-jewel.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "celerity-stone",
		"name": "Celerity Stone",
		"effect": "Increases Consumable and Relic Use Speed by 25%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Celerity_Stone",
		"image": {
			"src": "/images/remnant-2/rings/celerity-stone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "clear-halo",
		"name": "Clear Halo",
		"effect": "After 10s of not being damaged, generate a SHIELD for 10% of Max Health over 2s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Clear_Halo",
		"image": {
			"src": "/images/remnant-2/rings/clear-halo.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "closed-loop",
		"name": "Closed Loop",
		"effect": "Gain 5% of Max Health as SHIELD for 10s after a Charged Shot. Accumulation resets after 10s of inaction. Max 25% SHIELD.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Closed_Loop",
		"image": {
			"src": "/images/remnant-2/rings/closed-loop.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "combat-shield-generator",
		"name": "Combat Shield Generator",
		"effect": "While in combat, Crouching or Combat Slide generates a stationary 3m x 1.5m Energy Shield with 700 Health which blocks enemy projectiles. Lasts 10s or until broken by damage.Can only happen once every 10s after expiring.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Combat_Shield_Generator",
		"image": {
			"src": "/images/remnant-2/rings/combat-shield-generator.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "compulsion-loop",
		"name": "Compulsion Loop",
		"effect": "After killing an enemy, gain 5% Fire Rate and Melee Attack Speed for 10s. Stacks 3x.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Compulsion_Loop",
		"image": {
			"src": "/images/remnant-2/rings/compulsion-loop.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "conjurer-s-circle",
		"name": "Conjurer's Circle",
		"effect": "When the wearer's Summon enters the battlefield, conjure a 5m Summoning Circle. Allies in the Summoning Circle have their Stagger Level reduced by 1 and regenerates 5 Grey Health per second. Lasts 10s.Can only happen once every 10s after expiring.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Conjurer%27s_Circle",
		"image": {
			"src": "/images/remnant-2/rings/conjurer-s-circle.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "conservation-seal",
		"name": "Conservation Seal",
		"effect": "For every 10% of Health missing [Max 50%], gain 10% chance to not consume Relic and 5% increased Relic Efficacy on next use.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Conservation_Seal",
		"image": {
			"src": "/images/remnant-2/rings/conservation-seal.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "constant-variable-ring",
		"name": "Constant Variable Ring",
		"effect": "Increases Ranged damage up to 20% based on current Weapon's Overheat value.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Constant_Variable_Ring",
		"image": {
			"src": "/images/remnant-2/rings/constant-variable-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "crimson-dreamstone",
		"name": "Crimson Dreamstone",
		"effect": "Critical Hits increase Skill Damage by 2% for 5s. Max 10 stacks.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Crimson_Dreamstone",
		"image": {
			"src": "/images/remnant-2/rings/crimson-dreamstone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "custodian-s-bastion",
		"name": "Custodian's Bastion",
		"effect": "Increases Armor by 1 per 2% of active SHIELD. Max 100 Bonus Armor.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Custodian%27s_Bastion",
		"image": {
			"src": "/images/remnant-2/rings/custodian-s-bastion.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "dark-sea-armada-crest",
		"name": "Dark Sea Armada Crest",
		"effect": "On Relic Use, increases All Elemental Damage dealt by 15% for 15s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Dark_Sea_Armada_Crest",
		"image": {
			"src": "/images/remnant-2/rings/dark-sea-armada-crest.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "dead-king-s-memento",
		"name": "Dead King's Memento",
		"effect": "Increases Health by 15.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Dead_King%27s_Memento",
		"image": {
			"src": "/images/remnant-2/rings/dead-king-s-memento.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "deceiver-s-band",
		"name": "Deceiver's Band",
		"effect": "After performing a Slide[sic], gain 15% Evade Speed and 10% Movement Speed for 12s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Deceiver%27s_Band",
		"image": {
			"src": "/images/remnant-2/rings/deceiver-s-band.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "deep-pocket-ring",
		"name": "Deep Pocket Ring",
		"effect": "Increases Ammo Reserves by 35%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Deep_Pocket_Ring",
		"image": {
			"src": "/images/remnant-2/rings/deep-pocket-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "defensive-action-loop",
		"name": "Defensive Action Loop",
		"effect": "While reloading, and for 3s after reload completes, incoming damage is reduced by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Defensive_Action_Loop",
		"image": {
			"src": "/images/remnant-2/rings/defensive-action-loop.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "demolition-coil",
		"name": "Demolition Coil",
		"effect": "Unarmed Charged Melee Attacks explode when hitting an enemy, dealing 30% additional explosive damage over 1.5m.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Demolition_Coil",
		"image": {
			"src": "/images/remnant-2/rings/demolition-coil.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "dense-silicon-ring",
		"name": "Dense Silicon Ring",
		"effect": "Gain 200% of Health Regenerated as Mod Power.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Dense_Silicon_Ring",
		"image": {
			"src": "/images/remnant-2/rings/dense-silicon-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "detonating-cord",
		"name": "Detonating Cord",
		"effect": "On Relic Use, increases Explosive Damage by 10% for 15s and casts a 3m Explosive AOE which deals 120 Base Damage.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Detonating_Cord",
		"image": {
			"src": "/images/remnant-2/rings/detonating-cord.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "devoured-loop",
		"name": "Devoured Loop",
		"effect": "Critical Hits have a 1% chance to reset Skill Cooldowns. Can only occur once every 10s. Increases all incoming damage by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Devoured_Loop",
		"image": {
			"src": "/images/remnant-2/rings/devoured-loop.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "digested-hog-lure",
		"name": "Digested Hog Lure",
		"effect": "Reloading increases Mod Damage by 15% for 7s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Digested_Hog_Lure",
		"image": {
			"src": "/images/remnant-2/rings/digested-hog-lure.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "disaster-converter",
		"name": "Disaster Converter",
		"effect": "When wearer's Health drops below 25%, gain a SHIELD for 50% of total current Grey Health for 10s. Max 50% SHIELD. Does not stack with itself.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Disaster_Converter",
		"image": {
			"src": "/images/remnant-2/rings/disaster-converter.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "drakestone-pearl",
		"name": "Drakestone Pearl",
		"effect": "Enables Stamina Regeneration during Melee Attacks at 20% of the normal rate.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Drakestone_Pearl",
		"image": {
			"src": "/images/remnant-2/rings/drakestone-pearl.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "dran-memento",
		"name": "Dran Memento",
		"effect": "Increases Max Stamina by 20 and reduces Encumbrance by 5.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Dran_Memento",
		"image": {
			"src": "/images/remnant-2/rings/dran-memento.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "dran-scavenger-ring",
		"name": "Dran Scavenger Ring",
		"effect": "Collecting Scrap, Iron, and Ammo Pickups regenerates 50% of Max Health and increases all damage dealt by 8% for 30s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Dran_Scavenger_Ring",
		"image": {
			"src": "/images/remnant-2/rings/dran-scavenger-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "dread-font",
		"name": "Dread Font",
		"effect": "Increases Grey Health Regeneration rate by 2 per second.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Dread_Font",
		"image": {
			"src": "/images/remnant-2/rings/dread-font.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "dried-clay-ring",
		"name": "Dried Clay Ring",
		"effect": "Grants 1 stack of BULWARK. Increases All Damage by 50% of the Total Damage Reduction granted by BULWARK stacks.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Dried_Clay_Ring",
		"image": {
			"src": "/images/remnant-2/rings/dried-clay-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "drzyr-sniper-sigil",
		"name": "Drzyr Sniper Sigil",
		"effect": "Increases the minimum damage at Max Falloff Range from 20% to 40%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Drzyr_Sniper_Sigil",
		"image": {
			"src": "/images/remnant-2/rings/drzyr-sniper-sigil.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "dull-steel-ring",
		"name": "Dull Steel Ring",
		"effect": "Reduces Dodge Weight Threshold by 1 Level.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Dull_Steel_Ring",
		"image": {
			"src": "/images/remnant-2/rings/dull-steel-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "dying-ember",
		"name": "Dying Ember",
		"effect": "Gain 6% of base Melee damage dealt as Lifesteal.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Dying_Ember",
		"image": {
			"src": "/images/remnant-2/rings/dying-ember.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "elevated-ring",
		"name": "Elevated Ring",
		"effect": "Increases Dodge Weight Threshold by 10. Reduces Encumbrance by 10.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Elevated_Ring",
		"image": {
			"src": "/images/remnant-2/rings/elevated-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "embrace-of-sha-hala",
		"name": "Embrace of Sha'Hala",
		"effect": "Wearer gains 7.5% incoming Damage Reduction when suffering from a unique Negative Status Effect or BLIGHT. Max 2 stacks.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Embrace_of_Sha%27Hala",
		"image": {
			"src": "/images/remnant-2/rings/embrace-of-sha-hala.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "empowering-loop",
		"name": "Empowering Loop",
		"effect": "Increases Ranged Damage by 15%. Slows Firearm Charge Time by 10% and reduces Fire Rate by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Empowering_Loop",
		"image": {
			"src": "/images/remnant-2/rings/empowering-loop.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "encrypted-ring",
		"name": "Encrypted Ring",
		"effect": "Using a Mod regenerates 20% of Max Health over 10s. Can stack up to 30s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Encrypted_Ring",
		"image": {
			"src": "/images/remnant-2/rings/encrypted-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "endaira-s-endless-loop",
		"name": "Endaira's Endless Loop",
		"effect": "After Sprinting for 1s, the wearer gains 2 Health Regeneration per second until they stop Sprinting.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Endaira%27s_Endless_Loop",
		"image": {
			"src": "/images/remnant-2/rings/endaira-s-endless-loop.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "excess-coil",
		"name": "Excess Coil",
		"effect": "Activating a Skill grants a SHIELD for 25% of Max Health. Cannot stack with itself. Lasts 15s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Excess_Coil",
		"image": {
			"src": "/images/remnant-2/rings/excess-coil.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "fae-bruiser-ring",
		"name": "Fae Bruiser Ring",
		"effect": "Dealing Melee damage grants 2 Stacks of BULWARK for 15s. Does not stack with itself.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Fae_Bruiser_Ring",
		"image": {
			"src": "/images/remnant-2/rings/fae-bruiser-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "fae-hunter-ring",
		"name": "Fae Hunter Ring",
		"effect": "Increases Range of Firearms by 35%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Fae_Hunter_Ring",
		"image": {
			"src": "/images/remnant-2/rings/fae-hunter-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "fae-protector-signet",
		"name": "Fae Protector Signet",
		"effect": "Increases Max Health and Stamina by 10 and Reduces Encumbrance by 5.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Fae_Protector_Signet",
		"image": {
			"src": "/images/remnant-2/rings/fae-protector-signet.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "fae-shaman-ring",
		"name": "Fae Shaman Ring",
		"effect": "Increases Health Regeneration by 0.35 and Relic Use Speed by 25%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Fae_Shaman_Ring",
		"image": {
			"src": "/images/remnant-2/rings/fae-shaman-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "fae-warrior-ring",
		"name": "Fae Warrior Ring",
		"effect": "Increases Melee Damage by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Fae_Warrior_Ring",
		"image": {
			"src": "/images/remnant-2/rings/fae-warrior-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "faelin-s-sigil",
		"name": "Faelin's Sigil",
		"effect": "Melee Damage generates 15% additional Mod Power.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Faelin%27s_Sigil",
		"image": {
			"src": "/images/remnant-2/rings/faelin-s-sigil.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "faerin-s-sigil",
		"name": "Faerin's Sigil",
		"effect": "Critical and Weakspot Hits generate 12.5% additional Mod Power.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Faerin%27s_Sigil",
		"image": {
			"src": "/images/remnant-2/rings/faerin-s-sigil.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "feastmaster-s-signet",
		"name": "Feastmaster's Signet",
		"effect": "Increases active Concoction Limit by 1.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Feastmaster%27s_Signet",
		"image": {
			"src": "/images/remnant-2/rings/feastmaster-s-signet.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "feathery-binding",
		"name": "Feathery Binding",
		"effect": "Increases Projectile Speed by 15% and Decreases Weapon Charge Time by 10%. Bonus is doubled when HASTE is active.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Feathery_Binding",
		"image": {
			"src": "/images/remnant-2/rings/feathery-binding.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "feedback-loop",
		"name": "Feedback Loop",
		"effect": "Perfect Dodge triggers a 3m AOE blast that deals 55 - 155 SHOCK Damage and applies OVERLOADED which deals 55 - 155 SHOCK damage every 5s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Feedback_Loop",
		"image": {
			"src": "/images/remnant-2/rings/feedback-loop.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "feeding-tube",
		"name": "Feeding Tube",
		"effect": "While in combat, auto-consume the compatible item in the first quick-slot every 30s. Increases Consumable and Relic Use Speed by 10%.Not compatible with Concoctions, Grenades and some Unique Consumables.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Feeding_Tube",
		"image": {
			"src": "/images/remnant-2/rings/feeding-tube.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "fire-stone",
		"name": "Fire Stone",
		"effect": "Increases FIRE damage by 15% and FIRE Resistance by 20.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Fire_Stone",
		"image": {
			"src": "/images/remnant-2/rings/fire-stone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "floodlit-diamond",
		"name": "Floodlit Diamond",
		"effect": "Increases Weakspot Damage by 12%. Bonus is doubled against EXPOSED targets.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Floodlit_Diamond",
		"image": {
			"src": "/images/remnant-2/rings/floodlit-diamond.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "flyweight-s-sting",
		"name": "Flyweight's Sting",
		"effect": "Increases Melee damage while Armor Encumbrance is below 50. Damage bonus increases with lower Encumbrance, up to 25% at 0 Weight.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Flyweight%27s_Sting",
		"image": {
			"src": "/images/remnant-2/rings/flyweight-s-sting.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "focusing-shard",
		"name": "Focusing Shard",
		"effect": "Aiming Down Sights gradually reduces Spread by 70% over 4s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Focusing_Shard",
		"image": {
			"src": "/images/remnant-2/rings/focusing-shard.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "force-multiplier",
		"name": "Force Multiplier",
		"effect": "Overcharging Charge Weapons grants 1.05x Weapon Damage Per 0.5s while Charge is held beyond Perfect Release Window. Max 1.3x.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Force_Multiplier",
		"image": {
			"src": "/images/remnant-2/rings/force-multiplier.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "frivolous-band",
		"name": "Frivolous Band",
		"effect": "Increases Evade Speed by 10%. Perfect Evades increase Fire Rate by 10% and Melee Speed by 10% for 7s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Frivolous_Band",
		"image": {
			"src": "/images/remnant-2/rings/frivolous-band.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "galvanized-resupply-band",
		"name": "Galvanized Resupply Band",
		"effect": "Increases Ammo Pickups by 100%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Galvanized_Resupply_Band",
		"image": {
			"src": "/images/remnant-2/rings/galvanized-resupply-band.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "game-master-s-pride",
		"name": "Game Master's Pride",
		"effect": "Reduces all healing by 50%. Splits all damage and remaining healing evenly among all allies wearing this ring.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Game_Master%27s_Pride",
		"image": {
			"src": "/images/remnant-2/rings/game-master-s-pride.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "generating-band",
		"name": "Generating Band",
		"effect": "Regenerate 3% of Max Health per second while a SHIELD is active.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Generating_Band",
		"image": {
			"src": "/images/remnant-2/rings/generating-band.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "grounding-stone",
		"name": "Grounding Stone",
		"effect": "Increases SHOCK damage by 15% and SHOCK Resistance by 20.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Grounding_Stone",
		"image": {
			"src": "/images/remnant-2/rings/grounding-stone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "guardian-s-ring",
		"name": "Guardian's Ring",
		"effect": "Adds 1 Stack of BULWARK when within 15m of an enemy. Increases to 2 Stacks for 15s after taking Melee damage.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Guardian%27s_Ring",
		"image": {
			"src": "/images/remnant-2/rings/guardian-s-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "gul-signet",
		"name": "Gul Signet",
		"effect": "Increases Damage Reduction by 10%. Each Weight Class above LIGHT reduces Damage Reduction bonus by 2.5% (up to 3x).",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Gul_Signet",
		"image": {
			"src": "/images/remnant-2/rings/gul-signet.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "gunslinger-s-ring",
		"name": "Gunslinger's Ring",
		"effect": "Increases Firearm Swap Speed by 30% and Reload Speed by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Gunslinger%27s_Ring",
		"image": {
			"src": "/images/remnant-2/rings/gunslinger-s-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "hardcore-metal-band",
		"name": "Hardcore Metal Band",
		"effect": "Taking damage adds 1 stack of BULWARK for 10s. Max 3 stacks.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Hardcore_Metal_Band",
		"image": {
			"src": "/images/remnant-2/rings/hardcore-metal-band.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "hardened-coil",
		"name": "Hardened Coil",
		"effect": "Reduces all incoming damage by 3% for each 10% of missing Health. Max 15% reduction.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Hardened_Coil",
		"image": {
			"src": "/images/remnant-2/rings/hardened-coil.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "haymaker-s-ring",
		"name": "Haymaker's Ring",
		"effect": "Increase Melee damage by 0.2% for every 1 point of Armor Encumbrance.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Haymaker%27s_Ring",
		"image": {
			"src": "/images/remnant-2/rings/haymaker-s-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "heart-of-the-wolf",
		"name": "Heart Of The Wolf",
		"effect": "Increases Max Stamina by 25 and Movement Speed by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Heart_Of_The_Wolf",
		"image": {
			"src": "/images/remnant-2/rings/heart-of-the-wolf.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "hex-ward",
		"name": "Hex Ward",
		"effect": "Prevents CURSE.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Hex_Ward",
		"image": {
			"src": "/images/remnant-2/rings/hex-ward.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "impact-augment",
		"name": "Impact Augment",
		"effect": "When a single source of Enemy Damage exceeds 15% of Max Health, increase All Damage dealt by 3% for 10s. Max 5 Stacks.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Impact_Augment",
		"image": {
			"src": "/images/remnant-2/rings/impact-augment.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "infinity-pocket",
		"name": "Infinity Pocket",
		"effect": "Reloading an Empty Magazine refills 10% of the stowed weapon's Max Ammo. When stowed weapon is full, the refill amount applies to the primary weapon instead.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Infinity_Pocket",
		"image": {
			"src": "/images/remnant-2/rings/infinity-pocket.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "jewel-of-the-beholden",
		"name": "Jewel of the Beholden",
		"effect": "On Relic Use, increase Mod Damage by 15% for 15s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Jewel_of_the_Beholden",
		"image": {
			"src": "/images/remnant-2/rings/jewel-of-the-beholden.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "kinetic-cycle-stone",
		"name": "Kinetic Cycle Stone",
		"effect": "Increases Mod and Skill Cast Speed by 20%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Kinetic_Cycle_Stone",
		"image": {
			"src": "/images/remnant-2/rings/kinetic-cycle-stone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "kolket-eyelet",
		"name": "Kolket Eyelet",
		"effect": "Grants 1 stack of BULWARK. Increases Health Regeneration by 0.3 per second for each stack of BULWARK.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Kolket_Eyelet",
		"image": {
			"src": "/images/remnant-2/rings/kolket-eyelet.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "leaking-gemstone",
		"name": "Leaking Gemstone",
		"effect": "Allows 20% of Mod Power Generation to continue during an active mod.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Leaking_Gemstone",
		"image": {
			"src": "/images/remnant-2/rings/leaking-gemstone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "lighthouse-keeper-s-ring",
		"name": "Lighthouse Keeper's Ring",
		"effect": "Automatically generate 4 Mod Power per second for each entity within 15m suffering from a Negative Status Effect. Max 5 stacks.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Lighthouse_Keeper%27s_Ring",
		"image": {
			"src": "/images/remnant-2/rings/lighthouse-keeper-s-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "lithic-signet",
		"name": "Lithic Signet",
		"effect": "Reduces all incoming damage by 7%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Lithic_Signet",
		"image": {
			"src": "/images/remnant-2/rings/lithic-signet.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "lodestone-ring",
		"name": "Lodestone Ring",
		"effect": "Increases all damage dealt against illuminated enemies by 5%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Lodestone_Ring",
		"image": {
			"src": "/images/remnant-2/rings/lodestone-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "low-yield-recovery-ring",
		"name": "Low Yield Recovery Ring",
		"effect": "Killing an enemy regenerates 6% Max Health over 6s. Additional kills increase duration by 6s. Max 30s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Low_Yield_Recovery_Ring",
		"image": {
			"src": "/images/remnant-2/rings/low-yield-recovery-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "mark-of-the-destroyer",
		"name": "Mark of the Destroyer",
		"effect": "Perfect Dodge triggers a 3m AOE blast that deals 110 - 310 Explosive Damage.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Mark_of_the_Destroyer",
		"image": {
			"src": "/images/remnant-2/rings/mark-of-the-destroyer.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "matriarch-s-ring",
		"name": "Matriarch's Ring",
		"effect": "Perfect Dodge reduces Charge Melee Stamina Cost by 100% for 7s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Matriarch%27s_Ring",
		"image": {
			"src": "/images/remnant-2/rings/matriarch-s-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "mechanic-s-cog",
		"name": "Mechanic's Cog",
		"effect": "While carrying an Engineer Heavy Weapon, gain 15% Movement Speed and 1 Stack of BULWARK.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Mechanic%27s_Cog",
		"image": {
			"src": "/images/remnant-2/rings/mechanic-s-cog.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "metal-driver",
		"name": "Metal Driver",
		"effect": "Killing Blows increase Reload Speed by 10% for 15s. Stacks 3x.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Metal_Driver",
		"image": {
			"src": "/images/remnant-2/rings/metal-driver.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "meteorite-shard-ring",
		"name": "Meteorite Shard Ring",
		"effect": "Increases Encumbrance by 50. Increases Unarmed damage by 50%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Meteorite_Shard_Ring",
		"image": {
			"src": "/images/remnant-2/rings/meteorite-shard-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "microcompressor",
		"name": "Microcompressor",
		"effect": "Reduces Heat Generation per round when firing Weapons that Overheat by 30%. Increases Heat decay Rate by 30%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Microcompressor",
		"image": {
			"src": "/images/remnant-2/rings/microcompressor.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "momentum-driver",
		"name": "Momentum Driver",
		"effect": "After Sprinting for 1.5s, Movement Speed is increased by 15% and Stagger Level reduced by 1.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Momentum_Driver",
		"image": {
			"src": "/images/remnant-2/rings/momentum-driver.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "mortal-coil",
		"name": "Mortal Coil",
		"effect": "Increases All Damage dealt by 1% for every 2% of the wearer's total Lifesteal. Max 20% All Damage.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Mortal_Coil",
		"image": {
			"src": "/images/remnant-2/rings/mortal-coil.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "nanofiber-strand",
		"name": "Nanofiber Strand",
		"effect": "Increases SHIELD Amount by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Nanofiber_Strand",
		"image": {
			"src": "/images/remnant-2/rings/nanofiber-strand.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "nightmare-sigil",
		"name": "Nightmare Sigil",
		"effect": "On Perfect Dodge, increases base Lifesteal by 5% for 10s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Nightmare_Sigil",
		"image": {
			"src": "/images/remnant-2/rings/nightmare-sigil.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "offering-stone",
		"name": "Offering Stone",
		"effect": "Dealing Ranged Damage increases all Damage by 1% for 1s. Stacks 15x. After killing an enemy, extends the duration to 10s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Offering_Stone",
		"image": {
			"src": "/images/remnant-2/rings/offering-stone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "outcast-ring",
		"name": "Outcast Ring",
		"effect": "Increases Reload Speed by 5% for 10s after reloading. Stacks 5x.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Outcast_Ring",
		"image": {
			"src": "/images/remnant-2/rings/outcast-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "painless-obsidian",
		"name": "Painless Obsidian",
		"effect": "When Grey Health is present gain HASTE and 1 stack of BULWARK.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Painless_Obsidian",
		"image": {
			"src": "/images/remnant-2/rings/painless-obsidian.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "pan-war-band",
		"name": "Pan War Band",
		"effect": "Increases Movement Speed and Reload Speed by 3% and Fire Rate by 2% for each ally wearing this ring.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Pan_War_Band",
		"image": {
			"src": "/images/remnant-2/rings/pan-war-band.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "point-focus-ring",
		"name": "Point Focus Ring",
		"effect": "Reduces Weapon Spread and Recoil by 30%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Point_Focus_Ring",
		"image": {
			"src": "/images/remnant-2/rings/point-focus-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "power-complex",
		"name": "Power Complex",
		"effect": "Increases All Damage dealt by 1% per second to a maximum of 15%. Dodging resets Power Complex to 0%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Power_Complex",
		"image": {
			"src": "/images/remnant-2/rings/power-complex.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "power-saver",
		"name": "Power Saver",
		"effect": "At Max Health, gain a 35% chance to not use a Relic charge.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Power_Saver",
		"image": {
			"src": "/images/remnant-2/rings/power-saver.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "probability-cord",
		"name": "Probability Cord",
		"effect": "Increases Crit Damage by 20%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Probability_Cord",
		"image": {
			"src": "/images/remnant-2/rings/probability-cord.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "propulsion-loop",
		"name": "Propulsion Loop",
		"effect": "After killing an enemy, increases Movement Speed by 5% and Consumable Use Speed by 10% for 10s. Stacks 3x.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Propulsion_Loop",
		"image": {
			"src": "/images/remnant-2/rings/propulsion-loop.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "provisioner-ring",
		"name": "Provisioner Ring",
		"effect": "Firearms reload over time while stowed.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Provisioner_Ring",
		"image": {
			"src": "/images/remnant-2/rings/provisioner-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "rally-band",
		"name": "Rally Band",
		"effect": "Melee Strikes convert Grey Health into Health. Each melee strike converts up to 10% of Max Health",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Rally_Band",
		"image": {
			"src": "/images/remnant-2/rings/rally-band.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ravager-s-bargain",
		"name": "Ravager's Bargain",
		"effect": "Increases All Damage and All Critical Chance by 5% while BLEEDING.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ravager%27s_Bargain",
		"image": {
			"src": "/images/remnant-2/rings/ravager-s-bargain.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "reaping-stone",
		"name": "Reaping Stone",
		"effect": "After an Elemental Status Effect is removed from wearer, they become immune to all Elemental Status Effects and gain 5% of base damage dealt as Lifesteal for 10s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Reaping_Stone",
		"image": {
			"src": "/images/remnant-2/rings/reaping-stone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "red-ring-of-death",
		"name": "Red Ring of Death",
		"effect": "Duplicates the last damaging Negative Status applied to the target. Reduces outgoing Status Effect Damage by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Red_Ring_of_Death",
		"image": {
			"src": "/images/remnant-2/rings/red-ring-of-death.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "rerouting-cable",
		"name": "Rerouting Cable",
		"effect": "Gain 5% of Max Health as a SHIELD for 5s after spending 20 Stamina. Accumulation resets after 5s of inaction. Max 50% SHIELD.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Rerouting_Cable",
		"image": {
			"src": "/images/remnant-2/rings/rerouting-cable.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "reserve-boosting-gem",
		"name": "Reserve Boosting Gem",
		"effect": "Increases Health Regeneration by 0.5 per second. 1s after going below 50% Health, increases regeneration value to 2.5 per second until 50% Health is reached.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Reserve_Boosting_Gem",
		"image": {
			"src": "/images/remnant-2/rings/reserve-boosting-gem.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "restriction-cord",
		"name": "Restriction Cord",
		"effect": "Restricts the wearer from Healing above 50% of their Max Health and reduces all incoming damage by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Restriction_Cord",
		"image": {
			"src": "/images/remnant-2/rings/restriction-cord.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-ashes",
		"name": "Ring of Ashes",
		"effect": "Stowed weapons generate 15 Mod Power per second.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_Ashes",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-ashes.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-bones",
		"name": "Ring Of Bones",
		"effect": "On Relic Use, increase All Damage by 10% for 15s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_Of_Bones",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-bones.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-crisis",
		"name": "Ring of Crisis",
		"effect": "When wearer's Health drops below 25%, gain a SHIELD for 25% of Max Health. Lasts 10s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_Crisis",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-crisis.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-deflection",
		"name": "Ring of Deflection",
		"effect": "Direct damage against wearer has a 50% chance to be converted entirely to Grey Health.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_Deflection",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-deflection.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-diversion",
		"name": "Ring of Diversion",
		"effect": "Increases invulnerability window while evading and sliding.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_Diversion",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-diversion.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-flawed-beauty",
		"name": "Ring of Flawed Beauty",
		"effect": "Ranged Weakspot damage is increased by 25%. Ranged damage is reduced by 15% when failing to hit a Weakspot.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_Flawed_Beauty",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-flawed-beauty.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-grace",
		"name": "Ring of Grace",
		"effect": "Taking enemy damage causes 15% of Maximum Health to regenerate over 10s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_Grace",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-grace.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-infinite-damage",
		"name": "Ring of Infinite Damage",
		"effect": "Increases fire rate by 8. [sic]",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_Infinite_Damage",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-infinite-damage.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-omens",
		"name": "Ring of Omens",
		"effect": "Evades cost 15% Max Health as Grey Health instead of Stamina.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_Omens",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-omens.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-ordnance",
		"name": "Ring Of Ordnance",
		"effect": "Allows N'Erudian Tech to gradually regenerate while both Deployed or Stowed. While Deployed, Tech will regenerate at 75% of the normal value. While Stowed, Tech regeneration rate is doubled.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_Of_Ordnance",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-ordnance.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-phantom-pain",
		"name": "Ring Of Phantom Pain",
		"effect": "Missing Health is converted to 10 Grey Health per second. Reduces Grey Health Regeneration by 90%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_Of_Phantom_Pain",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-phantom-pain.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-restocking",
		"name": "Ring of Restocking",
		"effect": "Reloads within 5s of a Critical Kill or Weakspot Kill are 20% faster.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_Restocking",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-restocking.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-retribution",
		"name": "Ring of Retribution",
		"effect": "Incoming enemy damage increases Reload Speed and all outgoing damage by 15%. Lasts 15s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_Retribution",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-retribution.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-spirits",
		"name": "Ring of Spirits",
		"effect": "Increases Mod Generation by 3% for each active consumable. Max 5 stacks.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_Spirits",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-spirits.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-the-castaway",
		"name": "Ring of the Castaway",
		"effect": "Increases base Consumable Duration by 50%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_the_Castaway",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-the-castaway.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-the-damned",
		"name": "Ring of the Damned",
		"effect": "Increases All Damage by 0.4% for each 1% of Grey Health. Increase Critical Chance by 5% if at least 50% of Max Health is Grey.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_the_Damned",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-the-damned.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-the-forest-spirit",
		"name": "Ring of the Forest Spirit",
		"effect": "Relic Healing Effectiveness is increased by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_the_Forest_Spirit",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-the-forest-spirit.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-the-robust",
		"name": "Ring Of The Robust",
		"effect": "Increases Max Health by 10 and Armor by 20.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_Of_The_Robust",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-the-robust.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "ring-of-the-vain",
		"name": "Ring of the Vain",
		"effect": "Reduces Invulnerability Window on Evade and Combat Slide by 35%. Increases Movement Speed while aiming by 35%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Ring_of_the_Vain",
		"image": {
			"src": "/images/remnant-2/rings/ring-of-the-vain.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "rock-of-anguish",
		"name": "Rock of Anguish",
		"effect": "Gain 5% Movement Speed and 7.5% Reload Speed for every 25% of Max Health missing.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Rock_of_Anguish",
		"image": {
			"src": "/images/remnant-2/rings/rock-of-anguish.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "rotward",
		"name": "Rotward",
		"effect": "Prevents ROOT ROT Blight.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Rotward",
		"image": {
			"src": "/images/remnant-2/rings/rotward.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "rusted-heirloom",
		"name": "Rusted Heirloom",
		"effect": "Grants 2 Stacks of BULWARK below 50% Max HP.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Rusted_Heirloom",
		"image": {
			"src": "/images/remnant-2/rings/rusted-heirloom.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "sagestone",
		"name": "Sagestone",
		"effect": "Increases earned Experience by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Sagestone",
		"image": {
			"src": "/images/remnant-2/rings/sagestone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "sapphire-dreamstone",
		"name": "Sapphire Dreamstone",
		"effect": "Critical Hits reduce Skill Cooldowns by 4%. Can only happen once every 2s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Sapphire_Dreamstone",
		"image": {
			"src": "/images/remnant-2/rings/sapphire-dreamstone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "seal-of-the-empress",
		"name": "Seal of the Empress",
		"effect": "Increases Max Health by 20. Reduces Max Stamina by 5.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Seal_of_the_Empress",
		"image": {
			"src": "/images/remnant-2/rings/seal-of-the-empress.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "sealed-resin-loop",
		"name": "Sealed Resin Loop",
		"effect": "Melee Attacks can be cancelled mid action by Dodging.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Sealed_Resin_Loop",
		"image": {
			"src": "/images/remnant-2/rings/sealed-resin-loop.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "security-half-measure",
		"name": "Security Half-Measure",
		"effect": "On Relic Use, sacrifices 15% of Max Health and grants a SHIELD for 10% of the wearer's Max Health to allies within 8m. Conversion cannot kill wearer. Lasts 15s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Security_Half-Measure",
		"image": {
			"src": "/images/remnant-2/rings/security-half-measure.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "shadow-of-misery",
		"name": "Shadow of Misery",
		"effect": "Increase Status Effect Damage by 20%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Shadow_of_Misery",
		"image": {
			"src": "/images/remnant-2/rings/shadow-of-misery.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "shaed-stone",
		"name": "Shaed Stone",
		"effect": "Increase Skill Damage by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Shaed_Stone",
		"image": {
			"src": "/images/remnant-2/rings/shaed-stone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "shard-banded-ring",
		"name": "Shard Banded Ring",
		"effect": "Increases Mod damage by 12%",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Shard_Banded_Ring",
		"image": {
			"src": "/images/remnant-2/rings/shard-banded-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "shield-alternator",
		"name": "Shield Alternator",
		"effect": "Activating a Mod that costs 100 Mod Power or greater, generates a SHIELD for 20% of Max Health. Lasts 15s. Cannot stack with itself.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Shield_Alternator",
		"image": {
			"src": "/images/remnant-2/rings/shield-alternator.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "shiny-hog-lure",
		"name": "Shiny Hog Lure",
		"effect": "Reloading grants 25-50 Mod Power to both weapons based on percentage of Magazine reloaded.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Shiny_Hog_Lure",
		"image": {
			"src": "/images/remnant-2/rings/shiny-hog-lure.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "singed-ring",
		"name": "Singed Ring",
		"effect": "Increases all damage dealt to BURNING enemies by 12%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Singed_Ring",
		"image": {
			"src": "/images/remnant-2/rings/singed-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "siphon-filter",
		"name": "Siphon Filter",
		"effect": "Increases All Damage dealt by an amount equal to an active HASTE bonus. Grants HASTE when within 15m of an entity suffering from SLOW",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Siphon_Filter",
		"image": {
			"src": "/images/remnant-2/rings/siphon-filter.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "slayer-s-crest",
		"name": "Slayer's Crest",
		"effect": "Increases Melee damage by 25% when attacking enemies from behind.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Slayer%27s_Crest",
		"image": {
			"src": "/images/remnant-2/rings/slayer-s-crest.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "soul-feast",
		"name": "Soul Feast",
		"effect": "When a Human, Companion, or Minion is downed or killed, reduce Skill Cooldowns by 8%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Soul_Feast",
		"image": {
			"src": "/images/remnant-2/rings/soul-feast.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "soul-guard",
		"name": "Soul Guard",
		"effect": "Gain a stack of BULWARK for each active Summon.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Soul_Guard",
		"image": {
			"src": "/images/remnant-2/rings/soul-guard.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "soul-link",
		"name": "Soul Link",
		"effect": "Summons Lifesteal 5% of base damage dealt which returns to the wearer as Health.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Soul_Link",
		"image": {
			"src": "/images/remnant-2/rings/soul-link.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "soul-shard",
		"name": "Soul Shard",
		"effect": "Increases All Damage dealt by 5% for each active Summon. Max 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Soul_Shard",
		"image": {
			"src": "/images/remnant-2/rings/soul-shard.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "spirit-alternator",
		"name": "Spirit Alternator",
		"effect": "Incoming SHIELD grants 150% of the SHIELD generated as Mod Power.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Spirit_Alternator",
		"image": {
			"src": "/images/remnant-2/rings/spirit-alternator.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "spirit-stone",
		"name": "Spirit Stone",
		"effect": "Increases Mod Power generation by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Spirit_Stone",
		"image": {
			"src": "/images/remnant-2/rings/spirit-stone.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "stockpile-charger",
		"name": "Stockpile Charger",
		"effect": "After picking up ammo, increases the damage of that Ammo Type by 15% for 20s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Stockpile_Charger",
		"image": {
			"src": "/images/remnant-2/rings/stockpile-charger.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "stone-of-balance",
		"name": "Stone of Balance",
		"effect": "Increases all damage by 7%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Stone_of_Balance",
		"image": {
			"src": "/images/remnant-2/rings/stone-of-balance.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "stone-of-continuance",
		"name": "Stone of Continuance",
		"effect": "Increases Skill Duration by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Stone_of_Continuance",
		"image": {
			"src": "/images/remnant-2/rings/stone-of-continuance.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "stone-of-expanse",
		"name": "Stone of Expanse",
		"effect": "Increases Ranged damage by 12%. Reduces all other damage dealt by 5%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Stone_of_Expanse",
		"image": {
			"src": "/images/remnant-2/rings/stone-of-expanse.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "stone-of-malevolence",
		"name": "Stone Of Malevolence",
		"effect": "Elemental damage generates 15% additional Mod Power.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Stone_Of_Malevolence",
		"image": {
			"src": "/images/remnant-2/rings/stone-of-malevolence.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "stone-of-revelation",
		"name": "Stone of Revelation",
		"effect": "Increases Mod Generation and Mod Damage by 5%. Bonus is doubled against EXPOSED targets.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Stone_of_Revelation",
		"image": {
			"src": "/images/remnant-2/rings/stone-of-revelation.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "strand-of-sinew",
		"name": "Strand of Sinew",
		"effect": "Slows Firearm Charge Time by 30% and increases Ranged Charge Damage by 20%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Strand_of_Sinew",
		"image": {
			"src": "/images/remnant-2/rings/strand-of-sinew.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "stream-coupler",
		"name": "Stream Coupler",
		"effect": "Using a Skill regenerates 25% of Max Health over 10s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Stream_Coupler",
		"image": {
			"src": "/images/remnant-2/rings/stream-coupler.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "subterfuge-link",
		"name": "Subterfuge Link",
		"effect": "After killing an enemy, increases the Cast Speed of the next Mod or Skill Cast by 35%. Lasts 15s or until consumed.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Subterfuge_Link",
		"image": {
			"src": "/images/remnant-2/rings/subterfuge-link.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "suppression-ward",
		"name": "Suppression Ward",
		"effect": "Prevents SUPPRESSION Blight.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Suppression_Ward",
		"image": {
			"src": "/images/remnant-2/rings/suppression-ward.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "symbol-of-royalty",
		"name": "Symbol of Royalty",
		"effect": "On Perfect Dodge, grants 1 stack of BULWARK for 10s. Max 3 stacks.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Symbol_of_Royalty",
		"image": {
			"src": "/images/remnant-2/rings/symbol-of-royalty.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "targeting-jewel",
		"name": "Targeting Jewel",
		"effect": "Increases Range on all Firearms by 4m. Reduces Spread by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Targeting_Jewel",
		"image": {
			"src": "/images/remnant-2/rings/targeting-jewel.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "tarnished-ring",
		"name": "Tarnished Ring",
		"effect": "Increases damage of Unarmed Attacks by 30%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Tarnished_Ring",
		"image": {
			"src": "/images/remnant-2/rings/tarnished-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "tear-of-kaeula",
		"name": "Tear of Kaeula",
		"effect": "Increases Relic capacity by 2 while equipped.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Tear_of_Kaeula",
		"image": {
			"src": "/images/remnant-2/rings/tear-of-kaeula.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "tear-of-lydusa",
		"name": "Tear of Lydusa",
		"effect": "Increases Healing and Lifesteal Efficacy by 20%. Reduces Healing Efficacy bonus by 1.5% for each 10% of missing Relic Capacity.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Tear_of_Lydusa",
		"image": {
			"src": "/images/remnant-2/rings/tear-of-lydusa.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "tempest-conduit",
		"name": "Tempest Conduit",
		"effect": "After receiving Elemental Damage, increases all damage dealt by 15% and Resistance to the received Element by 20 for 15s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Tempest_Conduit",
		"image": {
			"src": "/images/remnant-2/rings/tempest-conduit.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "thalos-eyelet",
		"name": "Thalos Eyelet",
		"effect": "Grants 1 stack of BULWARK and 2 Stamina Regen per second for each BULWARK stack. Increases BULWARK maximum stacks to 6.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Thalos_Eyelet",
		"image": {
			"src": "/images/remnant-2/rings/thalos-eyelet.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "tightly-wound-coil",
		"name": "Tightly Wound Coil",
		"effect": "When spending 75% or more of current magazine, gain a SHIELD for 15% of Max Health for 5s. Does not stack with itself.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Tightly_Wound_Coil",
		"image": {
			"src": "/images/remnant-2/rings/tightly-wound-coil.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "timekeeper-s-jewel",
		"name": "Timekeeper's Jewel",
		"effect": "Increases the duration of all Status Effects applied by the wearer. Duration varies per Status.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Timekeeper%27s_Jewel",
		"image": {
			"src": "/images/remnant-2/rings/timekeeper-s-jewel.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "token-of-favor",
		"name": "Token of Favor",
		"effect": "Increases All Damage by 5%. Gain 10% Critical Chance against EXPOSED targets.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Token_of_Favor",
		"image": {
			"src": "/images/remnant-2/rings/token-of-favor.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "tolerance-band",
		"name": "Tolerance Band",
		"effect": "Decreases Firearm Charge Time by 10% and increases Perfect Charge Window for applicable ranged weaponry.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Tolerance_Band",
		"image": {
			"src": "/images/remnant-2/rings/tolerance-band.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "tomb-dweller-s-ring",
		"name": "Tomb Dweller's Ring",
		"effect": "Increases Movement Speed by 10% for 15s after Vaulting, Climbing, Leaping, and entering Water, stacks 3x. Reduces Fall Damage by 50%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Tomb_Dweller%27s_Ring",
		"image": {
			"src": "/images/remnant-2/rings/tomb-dweller-s-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "transient-cord",
		"name": "Transient Cord",
		"effect": "On Relic Use, increases Critical Chance by 10% and Critical Damage by 10% for 15s. Reduce bonus by 1% once every 1.5s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Transient_Cord",
		"image": {
			"src": "/images/remnant-2/rings/transient-cord.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "vacuum-seal",
		"name": "Vacuum Seal",
		"effect": "Increases Automatic Pickup Range for Scrap by 150%. Picking up Scrap, Iron, or Ammo grants a SHIELD for 15% of Max Health for 15s. Does not stack.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Vacuum_Seal",
		"image": {
			"src": "/images/remnant-2/rings/vacuum-seal.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "vestige-of-power",
		"name": "Vestige of Power",
		"effect": "After 5s of not being damaged, increases Ranged and Melee Damage by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Vestige_of_Power",
		"image": {
			"src": "/images/remnant-2/rings/vestige-of-power.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "wax-sealed-ring",
		"name": "Wax Sealed Ring",
		"effect": "Killing blows increase Ranged and Melee Damage by 4% for 15s. Stacks 3x",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Wax_Sealed_Ring",
		"image": {
			"src": "/images/remnant-2/rings/wax-sealed-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "white-glass-bead",
		"name": "White Glass Bead",
		"effect": "Perfect Dodge applies a SHIELD for 15% of Max Health. Lasts 10s. Cannot stack with itself.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/White_Glass_Bead",
		"image": {
			"src": "/images/remnant-2/rings/white-glass-bead.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "white-pawn-stamp",
		"name": "White Pawn Stamp",
		"effect": "Reduces Mod Power Requirement by 10%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/White_Pawn_Stamp",
		"image": {
			"src": "/images/remnant-2/rings/white-pawn-stamp.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "wind-hollow-circlet",
		"name": "Wind Hollow Circlet",
		"effect": "Increases Reload Speed by 12%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Wind_Hollow_Circlet",
		"image": {
			"src": "/images/remnant-2/rings/wind-hollow-circlet.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "wired-inhibitor",
		"name": "Wired Inhibitor",
		"effect": "Applying a Negative Status Effect on an enemy also applies SLOW for 1s. Applying or refreshing additional Negative Statuses will increase the duration by 1s. Max 5s.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Wired_Inhibitor",
		"image": {
			"src": "/images/remnant-2/rings/wired-inhibitor.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "wood-ring",
		"name": "Wood Ring",
		"effect": "Increases Stagger Damage by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Wood_Ring",
		"image": {
			"src": "/images/remnant-2/rings/wood-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "worn-admiral-s-ring",
		"name": "Worn Admiral's Ring",
		"effect": "All damage received is increased by 200%. All damage dealt is increased by 15%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Worn_Admiral%27s_Ring",
		"image": {
			"src": "/images/remnant-2/rings/worn-admiral-s-ring.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "zania-s-malice",
		"name": "Zania's Malice",
		"effect": "Dealing Weakspot damage increases Weakspot damage by 5% for 5s. Stacks 4x",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Zania%27s_Malice",
		"image": {
			"src": "/images/remnant-2/rings/zania-s-malice.webp",
			"width": 128,
			"height": 128
		}
	},
	{
		"id": "zohee-s-ring",
		"name": "Zohee's Ring",
		"effect": "Increases Mod Duration by 20%.",
		"wikiUrl": "https://remnant2.wiki.gg/wiki/Zohee%27s_Ring",
		"image": {
			"src": "/images/remnant-2/rings/zohee-s-ring.webp",
			"width": 128,
			"height": 128
		}
	}
];

export const rings: Ring[] = ringRecords.map(decorateRing);

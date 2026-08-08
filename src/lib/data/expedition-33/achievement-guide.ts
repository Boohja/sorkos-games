export type GuideKind = 'achievement' | 'collectible' | 'quest' | 'checkpoint';

export type GuideStep = {
	id: string;
	kind: GuideKind;
	title: string;
	detail: string;
	achievement?: string;
	missable?: boolean;
	warning?: string;
};

export type GuideAct = {
	id: string;
	label: string;
	title: string;
	intro: string;
	steps: GuideStep[];
};

const achievement = (id: number, title: string, detail: string, extra: Partial<GuideStep> = {}): GuideStep => ({
	id: `achievement-${id}`,
	kind: 'achievement',
	title: `${String(id).padStart(2, '0')} — ${title}`,
	detail,
	achievement: title,
	...extra
});

export const acts: GuideAct[] = [
	{
		id: 'prologue',
		label: 'Prologue',
		title: 'Lumière, before departure',
		intro: 'Clear the city and festival before boarding. The Mime is the only achievement here that forces another run if skipped.',
		steps: [
			{
				id: 'prologue-city-extras', kind: 'checkpoint', title: 'Sweep the route to the harbour',
				detail: 'Inspect the donated furniture; speak to Richard, Eloise and Nicholas; knock on the Life Enjoyers’ door 33 times; and keep talking to the Trash Can Man.',
				missable: true, warning: 'These scenes and rewards disappear after the Prologue. Speaking to Richard enables Gustave’s Crimson Uniform at the festival; the Trash Can Man also enables a Perfect Chroma Catalyst in Act 3.'
			},
			achievement(1, 'A Peculiar Encounter', 'Near the harbour, take the right-hand path past the performers and defeat the Mime.', { missable: true, warning: 'Do this before leaving Lumière. Missing the Mime requires New Game Plus or a new save. It also drops the Lumière music record.' }),
			achievement(2, 'Time to Spill Some Ink', 'Break any enemy. The Prologue Mime is a convenient first target.'),
			achievement(3, 'Overcharge', 'With Gustave, land a fully charged Overcharge that also Breaks the target.', { warning: 'Finish this no later than the end of Act 1; it becomes unavailable when Gustave leaves the party.' }),
			{
				id: 'prologue-festival', kind: 'collectible', title: 'Win all three festival tokens and buy the Old Key',
				detail: 'Win Maelle’s duel, answer Antoine’s quiz (67 years ago; Expedition Zero; abilities internalised from Pictos), then redeem the three booths. Prioritise the Old Key.',
				missable: true, warning: 'The Old Key opens the Fracture Survivor journal in Old Lumière during Act 2. Also give Richard’s uniform to Jules for Gustave’s Crimson Uniform.'
			},
			achievement(4, 'Lumière', 'Continue the story and embark on Expedition 33.')
		]
	},
	{
		id: 'act-1',
		label: 'Act 1',
		title: 'First steps on the Continent',
		intro: 'Complete every Gustave-only objective and secure the one-time Gestral rewards before Stone Wave Cliffs ends the act.',
		steps: [
			achievement(5, 'Professional', 'Defeat a boss without taking damage. Évêque or the Chromatic Lancelier in Spring Meadows are good early attempts.'),
			achievement(6, 'Spring Meadows', 'Defeat Évêque and reach the World Map.'),
			{ id: 'act1-spring-collectibles', kind: 'collectible', title: 'Spring Meadows', detail: 'Collect Journal — Expedition 81 during the Jar Nevron scene.' },
			achievement(7, 'Paint Cage', 'In Flying Waters, shoot all three locks on the first Paint Cage and open it.'),
			{ id: 'act1-flying-waters', kind: 'checkpoint', title: 'Buy from Noco before he moves on', detail: 'After Maelle joins, purchase Noco’s unique stock in Flying Waters.', missable: true, warning: 'Noco eventually leaves this location; his current stock cannot be recovered here.' },
			{ id: 'act1-flying-collectibles', kind: 'collectible', title: 'Flying Waters and the Manor', detail: 'Collect Journal — Expedition 68. In the Manor dining-room/piano area, flip the four wall fixtures and take the Nocturne pour un masque de tristesse record.' },
			achievement(8, 'Weapon Upgrade', 'After recruiting Maelle, camp and ask the Curator to upgrade one weapon.'),
			achievement(9, 'Lumina', 'At camp after the Manor, consume one Lumina point.'),
			achievement(10, 'Flying Waters', 'Defeat Goblu and leave Flying Waters.'),
			achievement(11, 'Curious', 'At camp after Flying Waters, choose “Check up on the others.”'),
			achievement(12, 'Perfect Flow', 'With Lune, consume Stains on four consecutive turns. Trebuchim plus a durable enemy makes the sequence easier.'),
			achievement(13, 'Synergy', 'With Maelle in Virtuose Stance, use Percée on a Marked enemy.'),
			achievement(14, 'Ancient Sanctuary', 'Defeat the Ultimate Sakapatate.'),
			{ id: 'act1-sanctuary-collectibles', kind: 'collectible', title: 'Ancient Sanctuary', detail: 'Take Journal — Expedition 63 just off the brick path leading to the area’s end.' },
			achievement(15, 'Gestral Village', 'Speak with Golgra and win the Arena Tournament.', { missable: true, warning: 'Win the tournament with Maelle to receive Medalum now. The only later route is a much harder Act 3 duel with Golgra.' }),
			{ id: 'act1-gestral-quest', kind: 'quest', title: 'Finish Karatom’s Ultimate Sakapatate request', detail: 'Pick up the Mushroom beside the Mime in Esquie’s Nest, return it to Karatom in western Gestral Village, then win the duel.', missable: true, warning: 'This quest cannot be completed after Act 1. Rewards include Gustave’s Pure outfit.' },
			{ id: 'act1-gestral-collectibles', kind: 'collectible', title: 'Gestral Village and nearby World Map', detail: 'Collect Journal — Expedition 52; Lost Gestrals #1 (outside Esquie’s Nest) and #2 (east of Stone Wave Cliffs); and finish Gestral Beach #1 west of the village.' },
			achievement(16, 'Maximization', 'With Sciel in Twilight, consume 20 Foretell on one target.'),
			achievement(17, 'Legend', 'Defeat François and unlock Esquie.'),
			achievement(18, 'Esquie’s Nest', 'Complete Esquie’s Nest.'),
			{ id: 'act1-esquie-collectibles', kind: 'collectible', title: 'Esquie’s Nest and optional Act 1 areas', detail: 'Collect Journal — Expedition 66. Also gather Expedition 53 (Small Bourgeon), 38/44/59 (Yellow Harvest), 62 (north of Gestral Village), and the Goblu, Lights of the Past, Un 33 Décembre à Lumière and Aline’s Glasshouse records.' },
			achievement(19, 'Stone Wave Cliffs', 'Defeat the Lampmaster and finish Stone Wave Cliffs.', { missable: true, warning: 'Before the act-ending sequence, complete Overcharge and every Gustave-only outfit/quest. Collect Journals — Expedition 78, 56 and 50 in this area.' })
		]
	},
	{
		id: 'act-2',
		label: 'Act 2',
		title: 'Across the reefs to the Monolith',
		intro: 'The Axons can be tackled in either order. Treat the first Axon, each Visages side path, and the Monolith barrier as explicit checkpoints.',
		steps: [
			achievement(20, 'Perfection', 'With Verso, reach Rank S in combat. Repeatedly dodge or parry while building Perfection.'),
			{ id: 'act2-gustave-record', kind: 'collectible', title: 'Return to Stone Wave Cliffs', detail: 'Use the rear entrance and collect the Gustave record where the Lampmaster was fought.' },
			achievement(21, 'Forgotten Battlefield', 'Defeat the Dualliste and leave by the far side.'),
			{ id: 'act2-battlefield-collectibles', kind: 'collectible', title: 'Forgotten Battlefield', detail: 'Collect Journals — Expedition 41 and 57; buy the Lost Voice record from Strabami north of the exit.' },
			achievement(22, 'Expedition 33', 'Recruit Monoco, the final playable character.'),
			achievement(23, 'Monoco’s Station', 'Complete Monoco’s tutorial and Grandis Station.'),
			{ id: 'act2-monoco-collectibles', kind: 'collectible', title: 'Monoco’s Station and western routes', detail: 'Collect Journal — Expedition 65 near the east exit, Expedition 47 west of the northwest exit, Lost Gestral #4 east of the south entrance, and finish Gestral Beach #3 west of the station.' },
			achievement(24, 'Expeditioner', 'Reach level 33.'),
			achievement(25, 'Old Lumière', 'Defeat Renoir at the end of Old Lumière.'),
			{ id: 'act2-old-lumiere-collectibles', kind: 'collectible', title: 'Old Lumière', detail: 'Use the Prologue Old Key for the Fracture Survivor journal. Also collect Journals — Expedition 58, Expedition 42 and Renoir, plus the Renoir record.' },
			achievement(26, 'Wheel Control', 'With Monoco, cast an Upgraded Skill on four consecutive turns. Keep him active so he learns enemy skills.'),
			{ id: 'act2-barrier-scene', kind: 'checkpoint', title: 'Approach the Monolith barrier before defeating both Axons', detail: 'Attempt to cross the barrier while it still stands to see the expeditioners test it.', missable: true, warning: 'This optional scene disappears once both Axons are defeated.' },
			{ id: 'act2-visages', kind: 'checkpoint', title: 'Clear all three Visages side valleys first', detail: 'Complete Joyful, Sadness and Anger Vale and defeat their Masks before taking the direct route to the Axon.', missable: true, warning: 'Defeating the Axon first removes the Mask fights and their Clierum, Chapelim and Boucharo weapon rewards.' },
			achievement(27, 'First Axon', 'Defeat either Visages or Sirène’s Axon.', { missable: true, warning: 'Immediately camp and choose “Check up on the others” for the piano scene and Lettre à Maelle record.' }),
			achievement(28, 'Second Axon', 'Defeat the remaining Axon. In Sirène, defeat Tisseur first and learn Anti-Charm.'),
			{ id: 'act2-axon-collectibles', kind: 'collectible', title: 'Visages, Sirène and the open sea', detail: 'Visages: Journals 69, 39 and Unknown (1), plus Verso record. Sirène: Journals 55 and 67. Also collect Lost Gestrals #3, #5 and #6; finish Gestral Beaches #2 and #4; and pick up Lettre à Maelle at camp.' },
			achievement(29, 'Monolith', 'Forge the Axon weapon, breach the barrier and enter the Monolith.'),
			{ id: 'act2-monolith-collectibles', kind: 'collectible', title: 'The Monolith and remaining Act 2 collection', detail: 'Collect the L’Amour d’une M’ère record and Journals — Aline and Expedition 70. Sweep optional areas for Expedition 54, 45, 36, 48, 35, 49, 34 and 51, plus their associated records.' },
			achievement(30, 'Paintress', 'Defeat all three phases of the Paintress at the top of the Monolith.')
		]
	},
	{
		id: 'act-3',
		label: 'Act 3',
		title: 'The open world and final canvas',
		intro: 'Most cleanup is safe after the story, but one dialogue choice can permanently lock an achievement. Finish the relationship and collection routes before the final sweep.',
		steps: [
			achievement(31, 'Back to Lumière', 'Return to Lumière as the story enters Act 3.'),
			achievement(32, 'Sciel', 'Reach relationship level 7 with Sciel.'),
			achievement(33, 'Plane, Train, and Submarine', 'Reach relationship level 6 with Esquie to unlock underwater travel.'),
			achievement(34, 'Esquie', 'Reach relationship level 7 with Esquie.'),
			achievement(35, 'Lost Gestrals', 'Find all nine Lost Gestrals. Act 3 adds one near Endless Night Sanctuary, one north of The Reacher, and one above Endless Tower.'),
			achievement(36, 'Chroma Proficiency', 'After any relationship reaches level 7, use its level 3 Gradient Attack.'),
			achievement(37, 'Aiding the Enemy', 'Complete every friendly Nevron quest.', { missable: true, warning: 'At Floating Cemetery, grant Chalier’s request after the fight. Refusing permanently loses Auto Powerful and can compromise the all-quests route.' }),
			achievement(38, 'Trailbreaker', 'Reach level 66 through Act 3 exploration.'),
			achievement(39, 'Maelle', 'Complete The Reacher and reach relationship level 7 with Maelle.', { missable: true, warning: 'At the level 6 camp scene, tell Maelle the truth. Lying permanently locks this achievement.' }),
			achievement(40, 'Sprong', 'Defeat Sprong on the ocean south of Blades’ Graveyard and claim the Cheater Pictos.'),
			achievement(41, 'Lune', 'At relationship level 5, clear Sirène’s Dress, take Expedition 46, then return to camp and reach level 7.'),
			achievement(42, 'Monoco', 'At relationship level 5, visit Sacred River, complete the Noco quest and defeat Golgra with Verso and Monoco.'),
			achievement(43, 'Gestral Games', 'Finish all five Gestral Beaches; the final Wall Climb beach requires flight in Act 3.'),
			achievement(44, 'Weapon Mastery', 'Use a Perfect Chroma Catalyst to upgrade any weapon to level 33. Flying Manor supplies several.'),
			achievement(45, 'À On', 'Defeat Serpenphare above White Sands.'),
			achievement(46, 'Carreau Parfait', 'Chase and defeat the Chromatic Pétank in the southeastern landlocked area.'),
			achievement(47, 'Noir et Blanc', 'Collect all three Beast parts from the Painting Workshops, place them on the lower statue, then defeat the Lampmaster.'),
			{ id: 'act3-choices', kind: 'checkpoint', title: 'Protect the remaining one-time rewards', detail: 'Accept and win the Golgra fight for the Dark Gestral Arena, revisit the Lumière Trash Can Man, and speak to the Young Boy after Clea.', missable: true, warning: 'Refusing or losing at the arena loses Maelle’s Gestral White Haircut. The Trash Can reward depends on the Prologue conversation. Clea’s outfit choice is limited to one character.' },
			achievement(48, 'Clea', 'Defeat the four Flying Manor rematches, then defeat Clea.'),
			achievement(49, 'Feet Collection', 'Acquire every Monoco skill by defeating the required Nevrons with Monoco active.'),
			achievement(50, '“Endless”', 'Complete all 33 fights in the Endless Tower.'),
			achievement(51, 'Peace At Last', 'Defeat Simon in The Abyss. Prepare both active and reserve parties for his second phase.'),
			achievement(52, 'Follow The Trail', 'Collect all 49 journals. Simon’s journal is awarded after Peace At Last; check hidden Manor journals even if the menu looks complete.'),
			achievement(53, 'Survivor', 'Reach level 99. Farm the groups around the Golden Tree rest point in Renoir’s Drafts.'),
			achievement(54, 'The End', 'Defeat Renoir in Lumière and choose either final fate. Reloading after the credits returns you before the ending.'),
			achievement(55, 'Connoisseur', 'Collect all 33 music records. Our Drafts Collide is awarded after The End; Lumière has a second copy in the Opera House.'),
			{ id: 'act3-collectibles', kind: 'collectible', title: 'Act 3 collection sweep', detail: 'Lumière: Expedition 60 and the Lumière/Our Drafts Collide records. Optional routes: Expedition 84, 46, Unknown (2/3), 61, Simon, 37, Julie Search and Rescue and Verso; records Rêveries dans Paris, Aline, Clea, Endless Light, Forlorn, Children of Lumière, Linen and Cotton, plus Sciel/Lune/Monoco at relationship level 6.' }
		]
	}
];

export const totalSteps = acts.reduce((total, act) => total + act.steps.length, 0);
export const missableSteps = acts.flatMap((act) => act.steps).filter((step) => step.missable).length;

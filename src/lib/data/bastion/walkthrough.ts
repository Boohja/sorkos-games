export type BastionStep = {
	id: string;
	title: string;
	detail: string;
	achievements?: string;
	warning?: string;
};

export const routeSections: {
	id: string;
	label: string;
	title: string;
	intro: string;
	steps: BastionStep[];
}[] = [
	{
		id: 'protect-the-run',
		label: 'Do these on time',
		title: 'Protect the first run',
		intro: 'Only two actions can truly force a fresh save. Handle them before settling into the story.',
		steps: [
			{
				id: 'ride-the-wind',
				title: 'Carry the Wharf District Core to the Skyway without falling',
				detail: 'Falls before collecting the Core are harmless. After collecting it, reach the Skyway Bridge without leaving the platform.',
				achievements: 'Ride the Wind',
				warning: 'First level only. Restart immediately if you fall while carrying the Core.'
			},
			{
				id: 'claim-pyth',
				title: 'Claim the Pyth before visiting The Wild Outskirts',
				detail: 'Find or buy the Plush Pyth, then speak to Zulf while he is still in the Bastion.',
				warning: 'This is the point-of-no-return condition for Pet Sitter.'
			},
			{
				id: 'four-pets',
				title: 'Bring four different creatures to the Bastion',
				detail: 'Use Ragged Hood with Rucks, Plush Pyth with Zulf, and both Anklegator Egg and Pecker Nest with Zia.',
				achievements: 'Pet Sitter'
			},
			{
				id: 'both-endings',
				title: 'Choose both endings on the same file',
				detail: 'After Tazal Terminals, choose Evacuation for The Beginning. After the credits, select Continue, replay Tazal Terminals and choose Restoration for The End, or reverse the order.',
				achievements: 'The Beginning · The End'
			}
		]
	},
	{
		id: 'first-journey',
		label: 'First journey',
		title: 'Build the useful foundation',
		intro: 'Let the story achievements arrive naturally while preparing the systems that make later challenges easier.',
		steps: [
			{
				id: 'story-beats',
				title: 'Complete the main story locations',
				detail: 'Wharf District, Hanging Gardens, Prosper Bluff and the Bastion siege cover the automatic story achievements.',
				achievements: 'The Stranger · The Survivor · The Singer · The Ura'
			},
			{
				id: 'memorial',
				title: 'Construct the Memorial',
				detail: 'Spend a Core on the Memorial as soon as the building order permits.',
				achievements: 'The Valediction'
			},
			{
				id: 'mementos',
				title: 'Collect 15 mementos',
				detail: 'Pick them up in levels whenever possible. Missed mementos appear in the Lost and Found after visiting their region.',
				achievements: 'The Culture'
			},
			{
				id: 'one-upgrade-each',
				title: 'Apply one Forge upgrade to every weapon',
				detail: 'There are 11 upgradeable weapons. Invest heavily only in your preferred pair and the weapons needed for Proving Grounds.',
				achievements: 'Kid-at-Arms'
			},
			{
				id: 'seven-proving-grounds',
				title: 'Earn first prize in seven Proving Grounds',
				detail: 'Most become comfortable at three or four upgrades. Favor speed and reload bonuses for timed grounds, and damage for target-clearing grounds.',
				achievements: 'The Dynasty'
			}
		]
	},
	{
		id: 'dreams',
		label: 'Dream cleanup',
		title: 'Turn the dreams into your training ground',
		intro: 'Dreams can be repeated, so use them for XP and money before adding Shrine pressure.',
		steps: [
			{
				id: 'three-dreams',
				title: 'Complete the Kid, Singer and Survivor dreams',
				detail: 'Activate the Smoking Pipe, Stock Pot and Bedroll, then clear every wave in each dream.',
				achievements: 'Mind Voyager'
			},
			{
				id: 'kid-five-idols',
				title: 'Clear the Kid’s Dream with at least five idols',
				detail: 'Wait until level 10 and use your strongest, fully familiar loadout.',
				achievements: "Whatever's Out There"
			},
			{
				id: 'singer-five-idols',
				title: 'Clear the Singer’s Dream with at least five idols',
				detail: 'Tune the invoked idols around the threats your build handles best.',
				achievements: 'Lock Yourself In'
			},
			{
				id: 'survivor-five-idols',
				title: 'Clear the Survivor’s Dream with at least five idols',
				detail: 'Complete this before moving to the ten-idol versions in NG+.',
				achievements: 'A Lasting Peace'
			}
		]
	},
	{
		id: 'new-game-plus',
		label: 'New Game Plus',
		title: 'Use the inherited power',
		intro: 'NG+ keeps levels, money, weapons and upgrades. It adds two idols, the Stranger’s Dream and the Gel Cannister.',
		steps: [
			{
				id: 'build-shrine',
				title: 'Build the Shrine first',
				detail: 'All buildings are available from the first Core. Early idol bonuses accelerate the money and XP cleanup.'
			},
			{
				id: 'full-weapon-upgrades',
				title: 'Finish all five upgrades on every weapon',
				detail: 'Use inherited upgrades and naturally found components before spending heavily at the Lost and Found.',
				achievements: 'Man-at-Arms'
			},
			{
				id: 'turret-opera',
				title: 'Kill 20 enemies with one turret',
				detail: 'Build the Bastion Arsenal, equip the NG+ Gel Cannister, place one turret in the Kid’s Dream and protect it while luring enemies into its firing line.',
				achievements: 'Turret Opera'
			},
			{
				id: 'ten-idol-original-dreams',
				title: 'Clear all three original dreams with all ten idols',
				detail: 'Complete the Kid, Singer and Survivor dreams at maximum Shrine difficulty.',
				achievements: 'Just Like That · Calamity All Around · Ashes in the Sky'
			},
			{
				id: 'stranger-dream',
				title: 'Clear the Stranger’s Dream with five, then ten idols',
				detail: 'Use the pile of history books that appears in NG+. A ten-idol clear also satisfies the five-idol requirement if it is your first success.',
				achievements: 'All in the Mind · About the Author'
			},
			{
				id: 'finish-ng-plus',
				title: 'Complete the NG+ story',
				detail: 'Either ending choice counts on this run.',
				achievements: 'Calamity Kid'
			}
		]
	},
	{
		id: 'score-attack',
		label: 'Separate mode',
		title: 'Finish with Score Attack',
		intro: 'Score Attack unlocks after the first clear but starts from level 1 with no weapons, upgrades or buildings.',
		steps: [
			{
				id: 'score-attack-setup',
				title: 'Build the Shrine first and establish a scoring build',
				detail: 'All idols are immediately available and completed locations remain replayable, so use idol bonuses and repeat a productive level to rebuild power.'
			},
			{
				id: 'million-points',
				title: 'Score 1,000,000 points on one level',
				detail: 'Zulten’s Hollow is the guide’s strongest recommendation, with the Melting Pot as another productive option.',
				achievements: 'Hard Bargain'
			}
		]
	}
];

export const totalSteps = routeSections.reduce((total, section) => total + section.steps.length, 0);

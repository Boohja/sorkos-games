export type WalkthroughStep = {
	id: string;
	title: string;
	detail: string;
	achievement?: string;
	warning?: string;
};

export type WalkthroughPhase = {
	id: string;
	range: string;
	title: string;
	intro: string;
	steps: WalkthroughStep[];
};

export const phases: WalkthroughPhase[] = [
	{
		id: 'opening',
		range: 'Opening',
		title: 'Set up the run',
		intro: 'Do the cheap, easy actions now and establish the income you will need later.',
		steps: [
			{
				id: 'loan',
				title: 'Take the bank\'s first interest-free loan',
				detail: 'The extra gold makes the early wedding, business and upgrade spending much easier.'
			},
			{
				id: 'dusty',
				title: 'Pet Dusty three times',
				detail: 'All three pets can be done during the first scene in which the cat is available.',
				achievement: "Ooof, what's that smell?"
			},
			{
				id: 'cedani-name',
				title: 'Choose any nickname for Cedani',
				detail: 'Every nickname works.',
				achievement: 'Hey there, little one.'
			},
			{
				id: 'asalia-sword',
				title: 'Practice sword fighting with Asalia',
				detail: 'The dialogue choices only change the flavor of the scene.',
				achievement: "Just don't hurt yourself!"
			},
			{
				id: 'week-2-radovian',
				title: 'Week 2: spare the first Radovian',
				detail: 'This begins the helpful Radovian route used by this primary run.',
				achievement: 'Got to help where we can.',
				warning: 'Executing them belongs to the conflicting refusal and Mad King routes.'
			}
		]
	},
	{
		id: 'business',
		range: 'Weeks 3 to 7',
		title: 'Build income and help Stefan',
		intro: 'The tavern choices are easy to miss and affect your economy for the rest of the game.',
		steps: [
			{
				id: 'tavern-start',
				title: 'Week 3: invest 12 gold in the tavern',
				detail: 'Fund the visitor who wants to start the business.',
				achievement: 'I have a business.'
			},
			{
				id: 'stefan-boots',
				title: 'Give Stefan 1 gold for boots',
				detail: 'Help the drunk man on his first visit.'
			},
			{
				id: 'tavern-income',
				title: 'Week 5: ask the tavern for 3 gold per week',
				detail: 'Accepting 1 gold wastes income. Asking for 4 gold closes the business after a few weeks.',
				warning: 'Choose exactly 3 gold per week.'
			},
			{
				id: 'stefan-clothes',
				title: 'Give Stefan 7 gold for clothes',
				detail: 'He returns a couple of weeks after the boots request.',
				achievement: 'Little help goes a long way.'
			},
			{
				id: 'public-house',
				title: 'Later: protect the tavern with hired guards',
				detail: 'When thugs take over, say the owner should enjoy the extra money, then spend 28 gold on guards.',
				achievement: "I'm an... entrepreneur!"
			}
		]
	},
	{
		id: 'wedding',
		range: 'Before the wedding',
		title: 'Prepare the castle and wedding',
		intro: 'Finish these before the story advances. Keep enough gold for every wedding extra.',
		steps: [
			{
				id: 'cold-heart',
				title: 'Tell Lorsulia she will be fine',
				detail: 'Choose this instead of saying that you love her.',
				achievement: 'Cold heart.'
			},
			{
				id: 'wedding-upgrades',
				title: 'Buy flowers, fabric decorations and a band',
				detail: 'Buy every wedding upgrade. The expensive dress is the safest dress choice. Clearing the barbarian camps before the wedding may also be required.',
				achievement: "Let's throw a party!"
			},
			{
				id: 'rooster',
				title: 'Buy the merchant\'s magic rooster',
				detail: 'After buying it, visit Cedani and give it to her as a pet.',
				achievement: 'A fine saddle for a hedgehog.'
			},
			{
				id: 'paintings',
				title: 'Sell all four paintings to Lord Grego',
				detail: 'Take two from the bed chamber and the tapestry from the council chamber. Later, buy the artist\'s 12-gold painting and resell it too.',
				achievement: 'Empty walls.'
			},
			{
				id: 'etton',
				title: 'Support Lord Etton over Lord Lurs',
				detail: 'This resolves the Dust trade in Etton\'s favor.',
				achievement: 'Fandustic!'
			}
		]
	},
	{
		id: 'trial',
		range: 'Wedding to trial',
		title: 'Investigate every clue immediately',
		intro: 'Agents need one or two weeks per clue, so dispatch them as soon as each item appears.',
		steps: [
			{
				id: 'tooth',
				title: 'Animal tooth: dungeon guard, then Hunter',
				detail: 'Talk to the dungeon guard to obtain it. Give it to the Hunter once he is available; the investigation takes one week.'
			},
			{
				id: 'letter',
				title: 'Letter: needles in the garden, then General',
				detail: 'Take Aurelea\'s sewing needles from the bed chamber and use them on the cracked garden path. Give the letter to the General; he needs two weeks.'
			},
			{
				id: 'vial',
				title: 'Week 17: send an agent to the Hidden Hut',
				detail: 'The new map location yields the glass vial. After the Witch returns from the Stabber case, give it to her for a two-week investigation.'
			},
			{
				id: 'question-lords',
				title: 'Question every available lord about all three clues',
				detail: 'Do this before the Royal Trial once the tooth, letter and vial investigations are complete.',
				achievement: "I'm a King and a detective!"
			},
			{
				id: 'audry',
				title: 'At the trial, declare no suspect guilty',
				detail: 'Audry will take the blame.',
				achievement: 'Thank you, old friend.'
			},
			{
				id: 'ivo',
				title: 'Confront Ivo about Lorsulia\'s bruises',
				detail: 'Choose the confrontation during the final conversation with Lorsulia after the trial.',
				achievement: 'I will show him!'
			}
		]
	},
	{
		id: 'radovia',
		range: 'Radovian battle',
		title: 'Overprepare, then remain merciful',
		intro: 'The battle outcome is fixed, but the preparation and Radovian decisions unlock separate achievements.',
		steps: [
			{
				id: 'battle-upgrades',
				title: 'Buy every Radovian battle upgrade',
				detail: 'Prepare all three agents and reach at least 1,000 troops.',
				achievement: "I've got this."
			},
			{
				id: 'radovian-woman',
				title: 'Help the black-and-silver Radovian',
				detail: 'After the battle, accept the recurring cost of 5 gold and supplies per week.'
			},
			{
				id: 'beyran',
				title: 'Spare King Beyran',
				detail: 'Do not execute him when the guards bring him to you.'
			},
			{
				id: 'wall-radovians',
				title: 'Spare the three Radovians at the wall',
				detail: 'Together with the earlier mercy choices, this completes the helpful route.',
				achievement: 'Got to help where we can.'
			}
		]
	},
	{
		id: 'late-game',
		range: 'Weeks 41 to 47',
		title: 'Collect the expensive and family achievements',
		intro: 'Make a save before spending heavily or choosing Asalia\'s future.',
		steps: [
			{
				id: 'gift-parts',
				title: 'Assemble Aurelea\'s gift',
				detail: 'Combine the bed-chamber needles, yarn from the right side of the council chamber and old fabric from the supply-shed roof.',
				achievement: 'The one I love.'
			},
			{
				id: 'banker-41',
				title: 'Week 41: invite the Banker if funds are low',
				detail: 'Make a save before taking the loan so you can reload after the gemstone achievement.'
			},
			{
				id: 'gems',
				title: 'Week 42 or 43: buy all four gemstones',
				detail: 'The fortune teller returns even if you refused the early reading. Buy every stone, then reload if you want the gold back.',
				achievement: 'I believe in magic.'
			},
			{
				id: 'asalia-maya',
				title: 'Week 47: support Asalia and Maya',
				detail: 'Let Asalia run away. Do not lock her up.',
				achievement: 'Nothing can stop love.',
				warning: 'Save first. Marrying Asalia to Varid is a conflicting achievement.'
			}
		]
	},
	{
		id: 'finale',
		range: 'Finale',
		title: 'Protect the family and finish the ritual',
		intro: 'Collect every ritual ingredient before starting, then follow the spell exactly.',
		steps: [
			{
				id: 'bear',
				title: 'Let Cedani keep the bear',
				detail: 'Do not kill it. The bear protects Cedani during the final battle.',
				achievement: 'Arrrgghh!'
			},
			{
				id: 'ritual-found',
				title: 'Find the three ritual items',
				detail: 'Collect the glowing mushroom in the dungeon, the spell book in the council chamber and rue from one of the three agent map locations.'
			},
			{
				id: 'ritual-buy',
				title: 'Buy five ritual ingredients for 25 gold',
				detail: 'You need 2 Betony Oil, 1 Mugwort Oil and 2 Basilisk Eggs.'
			},
			{
				id: 'ritual-lines',
				title: 'Repeat all three ritual lines correctly',
				detail: 'Nerg va, futaos ferre! / For ive as tuo me! / Ring de chiole das err see!',
				achievement: 'Master of Dark Magic.'
			},
			{
				id: 'family',
				title: 'Keep both Aurelea and Cedani alive',
				detail: 'A correct ritual protects Aurelea and the bear protects Cedani.',
				achievement: 'Family matters.'
			},
			{
				id: 'siege',
				title: 'Buy every siege upgrade',
				detail: 'Stockpile all required supplies before the final fight.',
				achievement: 'Prepared for the worst.'
			}
		]
	}
];

export const alternateRuns = [
	{
		title: 'Radovian refusal run',
		achievement: "They're nothing but barbarians.",
		steps: [
			'Execute the first Radovian in week 2.',
			'Refuse the black-and-silver Radovian after the battle.',
			'Execute King Beyran.',
			'Kill the three Radovians at the wall.'
		]
	},
	{
		title: 'Varid branch',
		achievement: 'Whatever it takes.',
		steps: ['Arrange for Asalia to marry King Varid in exchange for troops.']
	},
	{
		title: 'Quick failure saves',
		achievement: 'Three short achievements',
		steps: [
			'Run out of gold by overspending on the wedding, businesses and repairs.',
			'Run out of supplies by skipping the pantry repair and funding every supply request.',
			'Refuse requests and skip the theatre until contentment reaches zero, then refuse the angry crowd.'
		]
	},
	{
		title: 'Mad King run',
		achievement: 'Mad King',
		steps: [
			'Kill the deserter in the tutorial and execute the first Radovian.',
			'Invite Jovan, then Sir Fredrick, then warn Noaksey about Fredrick. Execute Jovan after the murder.',
			'Declare no trial suspect guilty so Audry dies.',
			'Marry Asalia to Varid.',
			'Kill the Radovian woman, Beyran and the Radovians at the wall.',
			'Do not let Cedani keep the bear.',
			'Fail the ritual instructions so Aurelea dies.',
			'Have the Hunter ignite the trenches, kill the later deserter and finally kill Ivo.'
		]
	}
];

export const totalSteps = phases.reduce((total, phase) => total + phase.steps.length, 0);

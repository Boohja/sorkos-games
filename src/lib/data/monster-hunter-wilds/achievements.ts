export type Achievement = {
    id: string;
    name: string;
    goal: string;
    tip?: string;
    guide?: { label: string; url: string };
};
export type AchievementGroup = { id: string; title: string; note?: string; achievements: Achievement[] };

const source = 'https://steamcommunity.com/sharedfiles/filedetails/?id=3435493260';
const fishing = 'https://steamcommunity.com/sharedfiles/filedetails/?id=3438935955';
const entry = (id: string, name: string, goal: string, tip?: string, guide?: Achievement['guide']): Achievement => ({ id, name, goal, tip, guide });

export const achievementGroups: AchievementGroup[] = [
    {
        id: 'story', title: 'Story & Hunter Rank', note: 'Follow the campaign; continue hunting after HR 40.',
        achievements: [
            entry('windward-lands', 'Windward Lands', 'Finish Desert Trotters.'),
            entry('shadow-downpour', 'Shadow in the Downpour', 'Finish Beyond the Deluge.'),
            entry('guardians-forge', 'Guardians of the Forge', 'Finish Long-forgotten Flame.'),
            entry('bringer-harmony', 'Bringer of Harmony', 'Finish Monster Hunter.'),
            entry('new-ecosystems', 'New Ecosystems', 'Finish New Ecosystems.'),
            entry('bitter-environment', 'A Bitter Environment', 'Finish Wyvern Sparks and Rose Thorns.'),
            entry('corner-world', 'One Corner of the World', 'Finish A World Turned Upside Down.'),
            entry('black-wings', 'Beyond the Black Wings', 'Finish What Lies Ahead.'),
            entry('established-hunter', 'Established Hunter', 'Reach HR 100.'),
        ],
    },
    {
        id: 'hunting', title: 'Hunting & quests',
        achievements: [
            entry('hunt-on', 'The Hunt Is On!', 'Clear a Field Survey.'),
            entry('investigations', 'Let the Investigations Begin!', 'Clear an Investigation.', 'Available in Chapter 4; save a monster encounter as an Investigation.'),
            entry('hunter-assassin', 'Hunter-Assassin', 'Land a Sneak Attack.', 'Approach unseen; the Ghillie Mantle helps.'),
            entry('bigger-they-are', 'The Bigger They Are...', 'Mount a monster successfully.'),
            entry('hit-where-hurts', "Hit 'Em Where It Hurts!", 'Hit wounds or weak points 50 times in Focus Mode.'),
            entry('capture-pro', 'Capture Pro', 'Capture 50 monsters.', 'Weaken a capturable monster, then use a trap and two tranquilizers.'),
            entry('seasoned-hunter', 'Seasoned Hunter', 'Hunt 50 tempered monsters.', 'Frenzied alone does not count as tempered.'),
            entry('food-chain', 'Top of the Food Chain', 'Hunt 50 apex predators.', 'Rey Dau, Uth Duna, Nu Udra, and Jin Dahaad count.'),
            entry('monster-slayer', 'Monster Slayer', 'Hunt 100 large monsters.'),
            entry('never-satisfied', 'A True Hunter Is Never Satisfied', 'Clear 50 quests.'),
            entry('worth-following', 'Someone Worth Following', 'Clear 100 quests with your Palico.', 'Solo or two-player hunts keep your Palico available.'),
            entry('bourgeois', 'Bourgeois Hunter', 'Hold 1,000,000 zenny at once.'),
        ],
    },
    {
        id: 'equipment', title: 'Weapons & armor',
        achievements: [
            entry('power-everything', 'Power Is Everything', 'Craft five different Rarity 7+ weapons.'),
            entry('impregnable-defense', 'Impregnable Defense', 'Craft five different Rarity 7+ armor pieces.'),
            entry('legacy-restored', 'A Legacy Restored', 'Obtain a Rarity 8 Artian weapon.'),
        ],
    },
    {
        id: 'exploration', title: 'Exploration & side missions',
        achievements: [
            entry('meal-remember', 'Was It a Meal to Remember?', 'Cook a BBQ meal.'),
            entry('so-tasty', 'Mmm, So Tasty!', 'Cook a well-done steak.'),
            entry('campmaster', 'Campmaster', 'Establish camps at 10 different spots.'),
            entry('glamper', 'Glamper', 'Customize a pop-up camp.'),
            entry('ride-or-die', 'Ride-or-die Companion', 'Customize your Seikret or its decorations.'),
            entry('mutual-understanding', 'A Step Toward Mutual Understanding', 'Finish a side mission.'),
            entry('east-west', 'East to West, A Hunter Never Rests', 'Finish 30 different side missions.', 'NPC requests count; Optional Quests are a separate category.'),
            entry('angling', 'Angling for a Bite', 'Catch a fish with the fishing rod.'),
            entry('fish-ionado', 'A-fish-ionado', 'Reel in 30 whoppers.', 'Follow Kanya’s fishing missions for bait and tutorials.', { label: 'Fishing guide', url: fishing }),
            entry('squid-hunter', 'Monster (Squid) Hunter', 'Reel in a giant squid.', 'Fish in Scarlet Forest, Area 17.', { label: 'Fishing guide', url: fishing }),
            entry('prize-held-high', 'A Prize Held High', 'Net a coin-bearing Curioshell Crab.', undefined, { label: 'Curioshell Crab locations', url: 'https://game8.co/games/Monster-Hunter-Wilds/archives/503425' }),
            entry('shooting-star', 'I Caught a Shooting Star!', 'Net a Sandstar.', 'Search Windward Plains, Area 11, at night.', { label: 'Sandstar capture tips', url: source }),
            entry('eastlands', 'Explorer of the Eastlands', 'Collect 10 distinct Rarity 6 special trade items.', 'Check Emergence events; this means trade items, not monster materials.', { label: 'Item list & gathering locations', url: source }),
        ],
    },
    {
        id: 'crowns', title: 'Monster research & crowns',
        note: 'Use binoculars before hunting; save crown-sized encounters as Investigations. Check current Event Quests for easier crown hunts.',
        achievements: [
            entry('keen-eyed', 'A Keen-eyed Observation', 'Spot a gold-crown monster with binoculars.', 'Alpha Doshaguma is a convenient first target.'),
            entry('monster-phd', 'Monster Ph.D.', 'Hunt every launch large-monster species.', undefined, { label: 'Required monsters & exclusions', url: source }),
            entry('miniature-crown', 'Miniature Crown', 'Record a first miniature crown.'),
            entry('giant-crown', 'Giant Crown', 'Record a first silver or gold large crown.'),
            entry('miniature-collector', 'Miniature Crown Collector', 'Record miniature crowns for 10 species.'),
            entry('giant-collector', 'Giant Crown Collector', 'Record gold large crowns for 10 species.'),
            entry('miniature-master', 'Miniature Crown Master', 'Record miniature crowns for every eligible launch species.', undefined, { label: 'Crown requirements & farming', url: source }),
            entry('giant-master', 'Giant Crown Master', 'Record gold large crowns for every eligible launch species.', undefined, { label: 'Crown requirements & farming', url: source }),
        ],
    },
    {
        id: 'multiplayer', title: 'Multiplayer', note: 'Requires real players; NPC Support Hunters do not count.',
        achievements: [
            entry('new-bonds', 'Newly Forged Bonds', 'Follow another player.'),
            entry('gossip-hunter', 'Gossip Hunter', 'View 30 different Hunter Profiles.'),
            entry('hunters-united', 'Hunters United', 'Clear a multiplayer quest.'),
            entry('united-forever', 'Hunters United Forever', 'Clear 100 multiplayer quests.'),
        ],
    },
    {
        id: 'completion', title: 'Final award',
        achievements: [
            entry('eastward-wings', 'Eastward Wings', 'Earn the other 49 awards on one hunter.'),
        ],
    },
];

export const achievements = achievementGroups.flatMap((group) => group.achievements);
export const achievementIds = new Set(achievements.map((achievement) => achievement.id));

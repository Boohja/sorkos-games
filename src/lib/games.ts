export const games = [
    { slug: 'bastion', title: 'Bastion' },
    { slug: 'monster-hunter-wilds', title: 'Monster Hunter Wilds' },
    { slug: 'octopath-traveler', title: 'Octopath Traveler' },
    { slug: 'remnant-2', title: 'Remnant II' },
    { slug: 'yes-your-grace', title: 'Yes, Your Grace' },
    { slug: 'graveyard-keeper', title: 'Graveyard Keeper' },
    { slug: 'expedition-33', title: 'Clair Obscur: Expedition 33' },
] as const;
export type GameSlug = typeof games[number]['slug'];

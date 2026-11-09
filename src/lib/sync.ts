import { games } from './games.ts';

export type SyncPageMetadata = {
	game: string;
	page: string;
	storageKey: string;
	route: string;
	syncable: true;
    format?: 'markdown';
};

export const syncPages = {
    wildsAchievements: {
        game: 'monster-hunter-wilds',
        page: 'achievements',
        storageKey: 'games.sorkos.net:monster-hunter-wilds:achievements',
        route: '/monster-hunter-wilds/achievements',
        syncable: true
    },
	remnantRings: {
		game: 'remnant-2',
		page: 'rings',
		storageKey: 'games.sorkos.net:remnant-2:owned-rings',
		route: '/remnant-2/rings',
		syncable: true
	},
	bastionWalkthrough: {
		game: 'bastion',
		page: 'walkthrough',
		storageKey: 'games.sorkos.net:bastion:achievement-walkthrough',
		route: '/bastion/walkthrough',
		syncable: true
	},
	yesYourGraceWalkthrough: {
		game: 'yes-your-grace',
		page: 'walkthrough',
		storageKey: 'yes-your-grace-walkthrough-progress',
		route: '/yes-your-grace/walkthrough',
		syncable: true
	},
	octopathWalkthrough: {
		game: 'octopath-traveler',
		page: 'walkthrough',
		storageKey: 'games.sorkos.net:octopath-traveler:walkthrough',
		route: '/octopath-traveler/walkthrough',
		syncable: true
	},
	graveyardWalkthrough: {
		game: 'graveyard-keeper',
		page: 'platinum-walkthrough',
		storageKey: 'games.sorkos.net:graveyard-keeper:platinum-walkthrough',
		route: '/graveyard-keeper/platinum-walkthrough',
		syncable: true
	},
	expeditionAchievementGuide: {
		game: 'expedition-33',
		page: 'achievement-guide',
		storageKey: 'games.sorkos.net:expedition-33:achievement-guide',
		route: '/expedition-33/achievement-guide',
		syncable: true
	}
} as const satisfies Record<string, SyncPageMetadata>;

export const notesSyncPages: readonly SyncPageMetadata[] = games.map((game) => ({
    game: game.slug, page: 'notes', storageKey: `games.sorkos.net:${game.slug}:notes`,
    route: `/${game.slug}/notes`, syncable: true, format: 'markdown'
}));
export const syncPageList: readonly SyncPageMetadata[] = [...Object.values(syncPages), ...notesSyncPages];
export function notesSyncPage(game: string) {
    const page = notesSyncPages.find((entry) => entry.game === game);
    if (!page) throw new Error('Unknown notes game');
    return page;
}

export function findSyncPage(route: string, storageKey: string) {
	return syncPageList.find((page) => page.route === route && page.storageKey === storageKey);
}

export function isSyncValue(value: unknown): value is string[] {
	return (
		Array.isArray(value) &&
		value.length <= 5000 &&
		value.every((item) => typeof item === 'string' && item.length <= 512)
	);
}

export type SyncValue = string[] | string;
export function isSyncPageValue(route: string, key: string, value: unknown): value is SyncValue {
    const page = findSyncPage(route, key);
    if (!page) return false;
    return page.format === 'markdown' ? typeof value === 'string' : isSyncValue(value);
}

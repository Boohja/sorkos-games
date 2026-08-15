import { del, list } from '@vercel/blob';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { blobAuth, SYNC_LIFETIME_MS } from '$lib/server/sync';

export const prerender = false;

const MAX_PAGES_PER_RUN = 10;
const PAGE_SIZE = 1000;
const DELETE_BATCH_SIZE = 100;

export const GET: RequestHandler = async ({ request }) => {
	if (!env.CRON_SECRET || request.headers.get('authorization') !== `Bearer ${env.CRON_SECRET}`) {
		return json({ error: 'Unauthorized.' }, { status: 401 });
	}

	const cutoff = Date.now() - SYNC_LIFETIME_MS;
	let cursor: string | undefined;
	let scanned = 0;
	let deleted = 0;
	let hasMore = false;

	try {
		for (let page = 0; page < MAX_PAGES_PER_RUN; page += 1) {
			const result = await list({
				...blobAuth(),
				prefix: 'sync/',
				limit: PAGE_SIZE,
				cursor
			});
			scanned += result.blobs.length;

			const expired = result.blobs
				.filter(
					(blob) => blob.pathname.startsWith('sync/') && blob.uploadedAt.getTime() <= cutoff
				)
				.map((blob) => blob.pathname);

			for (let index = 0; index < expired.length; index += DELETE_BATCH_SIZE) {
				const batch = expired.slice(index, index + DELETE_BATCH_SIZE);
				await del(batch, blobAuth());
				deleted += batch.length;
			}

			hasMore = result.hasMore;
			cursor = result.cursor;
			if (!hasMore || !cursor) break;
		}
	} catch (error) {
		console.error('Unable to clean expired sync transfers', error);
		return json(
			{ error: 'Cleanup failed.', scanned, deleted },
			{ status: 503, headers: { 'cache-control': 'no-store' } }
		);
	}

	return json(
		{ ok: true, scanned, deleted, hasMore },
		{ headers: { 'cache-control': 'no-store' } }
	);
};

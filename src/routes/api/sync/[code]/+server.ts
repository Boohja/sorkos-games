import { BlobNotFoundError, del, get } from '@vercel/blob';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	blobAuth,
	isSyncPayload,
	MAX_SYNC_BYTES,
	normalizeSyncCode,
	syncPath,
	type SyncPayload
} from '$lib/server/sync';

export const prerender = false;

const noStore = { 'cache-control': 'no-store' };

function invalidCode() {
	return json({ error: 'Enter a valid 8-character transfer code.' }, { status: 400, headers: noStore });
}

export const GET: RequestHandler = async ({ params }) => {
	const code = normalizeSyncCode(params.code);
	if (!code) return invalidCode();

	let payload: SyncPayload;
	try {
		const result = await get(syncPath(code), {
			...blobAuth(),
			access: 'private',
			useCache: false
		});
		if (!result) {
			return json(
				{ error: 'That code was not found or has already been imported.' },
				{ status: 404, headers: noStore }
			);
		}
		if (result.statusCode !== 200 || result.blob.size === null || result.blob.size > MAX_SYNC_BYTES) {
			return json({ error: 'This transfer is invalid.' }, { status: 422, headers: noStore });
		}

		const raw = await new Response(result.stream).text();
		let parsed: unknown;
		try {
			parsed = JSON.parse(raw);
		} catch {
			return json({ error: 'This transfer is invalid.' }, { status: 422, headers: noStore });
		}
		if (!isSyncPayload(parsed)) {
			return json({ error: 'This transfer is invalid.' }, { status: 422, headers: noStore });
		}
		payload = parsed;
	} catch (error) {
		if (error instanceof BlobNotFoundError) {
			return json(
				{ error: 'That code was not found or has already been imported.' },
				{ status: 404, headers: noStore }
			);
		}
		console.error('Unable to read sync transfer', error);
		return json({ error: 'The transfer could not be read. Please try again.' }, { status: 503, headers: noStore });
	}

	if (Date.parse(payload.expiresAt) <= Date.now()) {
		try {
			await del(syncPath(code), blobAuth());
		} catch (error) {
			console.error('Unable to delete expired sync transfer', error);
		}
		return json({ error: 'That transfer code has expired.' }, { status: 410, headers: noStore });
	}

	return json(payload, { headers: noStore });
};

export const DELETE: RequestHandler = async ({ params }) => {
	const code = normalizeSyncCode(params.code);
	if (!code) return invalidCode();

	try {
		await del(syncPath(code), blobAuth());
	} catch (error) {
		if (!(error instanceof BlobNotFoundError)) {
			console.error('Unable to delete sync transfer', error);
			return json({ error: 'The transfer was saved but could not be retired.' }, { status: 503, headers: noStore });
		}
	}

	return json({ ok: true }, { headers: noStore });
};

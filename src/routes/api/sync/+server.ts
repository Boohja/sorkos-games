import { put } from '@vercel/blob';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { findSyncPage, isSyncValue } from '$lib/sync';
import {
	blobAuth,
	generateSyncCode,
	MAX_SYNC_BYTES,
	SYNC_LIFETIME_MS,
	syncPath,
	type SyncPayload
} from '$lib/server/sync';

export const prerender = false;

export const POST: RequestHandler = async ({ request }) => {
	const contentLength = Number(request.headers.get('content-length') ?? 0);
	if (contentLength > MAX_SYNC_BYTES) {
		return json({ error: 'The saved data is too large to transfer.' }, { status: 413 });
	}

	let rawBody: string;
	try {
		rawBody = await request.text();
	} catch {
		return json({ error: 'The request body could not be read.' }, { status: 400 });
	}

	if (new TextEncoder().encode(rawBody).byteLength > MAX_SYNC_BYTES) {
		return json({ error: 'The saved data is too large to transfer.' }, { status: 413 });
	}

	let body: unknown;
	try {
		body = JSON.parse(rawBody);
	} catch {
		return json({ error: 'The request body must be valid JSON.' }, { status: 400 });
	}

	if (!body || typeof body !== 'object') {
		return json({ error: 'The sync request is invalid.' }, { status: 400 });
	}

	const { key, route, value } = body as { key?: unknown; route?: unknown; value?: unknown };
	if (
		typeof key !== 'string' ||
		typeof route !== 'string' ||
		!findSyncPage(route, key) ||
		!isSyncValue(value)
	) {
		return json({ error: 'This page cannot be transferred.' }, { status: 400 });
	}

	const createdAt = new Date();
	const expiresAt = new Date(createdAt.getTime() + SYNC_LIFETIME_MS);
	const payload: SyncPayload = {
		version: 1,
		key,
		route,
		value,
		createdAt: createdAt.toISOString(),
		expiresAt: expiresAt.toISOString()
	};
	const serialized = JSON.stringify(payload);

	if (new TextEncoder().encode(serialized).byteLength > MAX_SYNC_BYTES) {
		return json({ error: 'The saved data is too large to transfer.' }, { status: 413 });
	}

	const code = generateSyncCode();
	try {
		await put(syncPath(code), serialized, {
			...blobAuth(),
			access: 'private',
			addRandomSuffix: false,
			allowOverwrite: false,
			contentType: 'application/json'
		});
	} catch (error) {
		console.error('Unable to create sync transfer', error);
		return json({ error: 'The transfer could not be created. Please try again.' }, { status: 503 });
	}

	return json(
		{ code, expiresAt: payload.expiresAt },
		{ status: 201, headers: { 'cache-control': 'no-store' } }
	);
};

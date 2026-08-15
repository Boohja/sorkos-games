import { env } from '$env/dynamic/private';
import { findSyncPage, isSyncValue } from '$lib/sync';

const CODE_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const CODE_PATTERN = /^[2-9A-HJ-NP-Z]{8}$/;

export const MAX_SYNC_BYTES = 64 * 1024;
export const SYNC_LIFETIME_MS = 24 * 60 * 60 * 1000;

export function blobAuth() {
	return {
		storeId: env.BLOB_STORE_ID,
		oidcToken: env.VERCEL_OIDC_TOKEN
	};
}

export type SyncPayload = {
	version: 1;
	key: string;
	route: string;
	value: string[];
	createdAt: string;
	expiresAt: string;
};

export function generateSyncCode() {
	const bytes = crypto.getRandomValues(new Uint8Array(8));
	let code = '';

	for (const byte of bytes) {
		code += CODE_ALPHABET[byte & 31];
	}

	return `${code.slice(0, 4)}-${code.slice(4)}`;
}

export function normalizeSyncCode(input: string) {
	const compact = input.toUpperCase().replace(/[\s-]/g, '');
	return CODE_PATTERN.test(compact) ? `${compact.slice(0, 4)}-${compact.slice(4)}` : null;
}

export function syncPath(code: string) {
	return `sync/${code}.json`;
}

export function isSyncPayload(value: unknown): value is SyncPayload {
	if (!value || typeof value !== 'object') return false;

	const payload = value as Partial<SyncPayload>;
	if (
		payload.version !== 1 ||
		typeof payload.key !== 'string' ||
		typeof payload.route !== 'string' ||
		typeof payload.createdAt !== 'string' ||
		typeof payload.expiresAt !== 'string' ||
		!isSyncValue(payload.value)
	) {
		return false;
	}

	const createdAt = Date.parse(payload.createdAt);
	const expiresAt = Date.parse(payload.expiresAt);
	return (
		Boolean(findSyncPage(payload.route, payload.key)) &&
		Number.isFinite(createdAt) &&
		Number.isFinite(expiresAt) &&
		expiresAt > createdAt &&
		expiresAt - createdAt <= SYNC_LIFETIME_MS
	);
}

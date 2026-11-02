import { redirect } from '@sveltejs/kit';

export function load({ url }) {
    redirect(308, `/monster-hunter-wilds/database/${url.search}${url.hash}`);
}

import { redirect } from '@sveltejs/kit';

export function load({ url }) {
    redirect(308, `/monster-hunter-wilds/builds/insect-glaive/${url.search}${url.hash}`);
}

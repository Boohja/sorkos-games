import { notesSyncPage } from '$lib/sync';

export const load = () => ({ sync: notesSyncPage('bastion') });

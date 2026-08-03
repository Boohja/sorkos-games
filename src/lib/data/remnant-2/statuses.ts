export const statusEffects = [
	{ id: 'bleed', label: 'BLEED', terms: ['BLEEDING', 'BLEED'] },
	{ id: 'fire', label: 'FIRE', terms: ['BURNING', 'FIRE'] },
	{ id: 'acid', label: 'ACID', terms: ['CORRODED', 'ACID'] },
	{ id: 'exposed', label: 'EXPOSED', terms: ['EXPOSED'] },
	{ id: 'madness', label: 'MADNESS', terms: ['MADNESS'] },
	{ id: 'shock', label: 'SHOCK', terms: ['OVERLOADED', 'SHOCK'] },
	{ id: 'slow', label: 'SLOW', terms: ['SLOW'] },
	{ id: 'bulwark', label: 'BULWARK', terms: ['BULWARK'] },
	{ id: 'haste', label: 'HASTE', terms: ['HASTE'] },
	{ id: 'root-rot', label: 'ROOT ROT', terms: ['ROOT ROT'] },
	{ id: 'contamination', label: 'CONTAMINATION', terms: ['CONTAMINATION'] },
	{
		id: 'fog-contamination',
		label: 'FOG CONTAMINATION',
		terms: ['FOG CONTAMINATION']
	},
	{ id: 'curse', label: 'CURSE', terms: ['CURSE'] },
	{ id: 'fragmented', label: 'FRAGMENTED', terms: ['FRAGMENTED'] },
	{ id: 'suppression', label: 'SUPPRESSION', terms: ['SUPPRESSION'] },
	{ id: 'shield', label: 'SHIELD', terms: ['SHIELD'] },
	{ id: 'data-corruption', label: 'DATA CORRUPTION', terms: ['DATA CORRUPTION'] },
	{ id: 'root-fog', label: 'ROOT FOG', terms: ['ROOT FOG'] }
] as const;

export type RingStatusId = (typeof statusEffects)[number]['id'];

type RingWithEffect = { effect: string };

const termToStatus = new Map<string, RingStatusId>();

for (const status of statusEffects) {
	for (const term of status.terms) {
		termToStatus.set(term, status.id);
	}
}

const statusTerms = [...termToStatus.keys()].sort((left, right) => right.length - left.length);
const statusPattern = new RegExp(
	`\\b(${statusTerms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
	'g'
);
const numericValuePattern = /\d+(?:\.\d+)?(?:%|s)?/g;

function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export function decorateRing<T extends RingWithEffect>(ring: T) {
	const statuses = new Set<RingStatusId>();

	for (const match of ring.effect.matchAll(statusPattern)) {
		const status = termToStatus.get(match[0].toUpperCase());
		if (status) statuses.add(status);
	}

	const effectHtml = escapeHtml(ring.effect)
		.replace(statusPattern, (match) => {
			const status = termToStatus.get(match);
			return status ? `<span class="status status--${status}">${match}</span>` : match;
		})
		.replace(numericValuePattern, (match) => `<strong>${match}</strong>`);

	return {
		...ring,
		statuses: [...statuses],
		effectHtml
	};
}

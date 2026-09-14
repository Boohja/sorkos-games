<script lang="ts">
	import { onMount } from 'svelte';
	import { prismBuilds, prismSources, type PrismBuild } from '$lib/data/remnant-2/prisms';

	const storagePrefix = 'games-sorkos:remnant-2:prism-guide:';
	let completed = $state<Record<string, number[]>>({});
	let planCompleted = $state<Record<string, string[]>>({});
	let ready = $state(false);
	let storageUnavailable = $state(false);

	const concepts = [
		['Prism slots', 'Each Prism has five slots for stat bonuses.'],
		['XP & rolls', 'Earn XP with the equipped Prism; each level-up offers three choices and locks the roll once opened.'],
		['Feeding', 'You can keep feeding, but roll influence caps per stat: one Mythic fills the bar, lower tiers stack to the same cap, and extras only add a little XP; weighting persists until invalid or level 50.'],
		['Core bonuses', 'A Prism bonus can reach +10, matching the current Mythic Relic Fragment value.'],
		['Fusions', 'Raise both valid component bonuses to at least +5; their fusion can then appear and replaces them with one +1 two-stat slot.'],
		['Target shape', 'Four fusions plus one standalone bonus fits nine stats into the five slots.'],
		['Level 50', 'Max all four fusions and the standalone bonus to +10 to reach Prism level 50.'],
		['Legendary at 51', 'Earn 50,000 more XP for a choice of three Legendary Bonuses at level 51.'],
		['Legendary reroll', 'Reroll only the Legendary segment to return to level 50; keep the finished Prism, earn 50,000 XP, and roll three new choices.']
	] as const;

	onMount(() => {
		const next: Record<string, number[]> = {};
		const nextPlan: Record<string, string[]> = {};
		for (const build of prismBuilds) {
			try {
				const saved = localStorage.getItem(`${storagePrefix}${build.slug}`);
				next[build.slug] = saved ? JSON.parse(saved) : [];
				const savedPlan = localStorage.getItem(`${storagePrefix}${build.slug}:plan`);
				nextPlan[build.slug] = savedPlan ? JSON.parse(savedPlan) : [];
			} catch {
				next[build.slug] = [];
				nextPlan[build.slug] = [];
			}
		}
		completed = next;
		planCompleted = nextPlan;
		ready = true;
	});

	function initialFeeds(build: PrismBuild) {
		return [
			...build.fusions[0].components,
			build.fusions[1].components[0],
			build.fusions[2].components[0],
			build.fusions[3].components[0]
		];
	}

	function steps(build: PrismBuild) {
		const [first, second, third, fourth] = build.fusions;
		return [
			`Start with a blank Prism and collect Mythic copies of all nine planned fragments.`,
			`While it is blank, feed ${initialFeeds(build).join(', ')}. Do not pre-feed the other components.`,
			`Fill the five slots with only those five bonuses. If a forced roll bricks the plan, cleanse and restart before investing more XP.`,
			`Raise ${first.components.join(' + ')} to +5 or higher, stop spending on them, then take ${first.name} when it appears.`,
			`Feed and add ${second.components[1]}; raise both ${second.name} components to +5, then take the fusion.`,
			`Feed and add ${third.components[1]}; raise both ${third.name} components to +5, then take the fusion.`,
			`Feed and add ${fourth.components[1]}; raise both ${fourth.name} components to +5, then take the fusion.`,
			`Feed and add ${build.standalone.name}. Level all four fusions and this bonus to +10 for level 50.`,
			`Earn 50,000 XP and take ${build.legendary} if offered. If not, reroll only the Legendary segment, return to 50, and repeat.`
		];
	}

	function isChecked(slug: string, index: number) {
		return completed[slug]?.includes(index) ?? false;
	}

	function toggleStep(slug: string, index: number) {
		const current = completed[slug] ?? [];
		const next = current.includes(index)
			? current.filter((item) => item !== index)
			: [...current, index].sort((a, b) => a - b);
		completed = { ...completed, [slug]: next };
		try {
			localStorage.setItem(`${storagePrefix}${slug}`, JSON.stringify(next));
		} catch {
			storageUnavailable = true;
		}
	}

	function isPlanChecked(slug: string, item: string) {
		return planCompleted[slug]?.includes(item) ?? false;
	}

	function togglePlanItem(slug: string, item: string) {
		const current = planCompleted[slug] ?? [];
		const next = current.includes(item)
			? current.filter((entry) => entry !== item)
			: [...current, item];
		planCompleted = { ...planCompleted, [slug]: next };
		try {
			localStorage.setItem(`${storagePrefix}${slug}:plan`, JSON.stringify(next));
		} catch {
			storageUnavailable = true;
		}
	}

	function resetProgress(slug: string) {
		completed = { ...completed, [slug]: [] };
		planCompleted = { ...planCompleted, [slug]: [] };
		try {
			localStorage.removeItem(`${storagePrefix}${slug}`);
			localStorage.removeItem(`${storagePrefix}${slug}:plan`);
		} catch {
			storageUnavailable = true;
		}
	}
</script>

<svelte:head>
	<title>Prism Guide | Remnant II</title>
	<meta
		name="description"
		content="Compact Remnant II Prism plans with verified fusions, Legendary targets, and locally saved build checklists."
	/>
</svelte:head>

<div class="shell prism-page">
	<header class="prism-header">
		<h1>Prism Guide</h1>
		<p>Pick a Legendary target, seed the right fragments, and follow one fusion at a time.</p>
	</header>

	<section class="how-it-works" aria-labelledby="how-heading">
		<div class="section-heading">
			<h2 id="how-heading">How Prisms Work</h2>
			<p>Current system, condensed.</p>
		</div>
		<dl class="concept-list">
			{#each concepts as concept}
				<div>
					<dt>{concept[0]}</dt>
					<dd>{concept[1]}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<section class="builds" aria-labelledby="builds-heading">
		<div class="section-heading">
			<h2 id="builds-heading">Recommended Legendary Builds</h2>
			<p>One practical level-50 plan per target. Values shown are the completed +10 bonuses.</p>
		</div>
		{#if storageUnavailable}
			<p class="storage-note" role="status">Progress changed for this visit, but browser storage is unavailable.</p>
		{/if}

		<div class="build-list">
			{#each prismBuilds as build, buildIndex (build.slug)}
				<details class="build-panel" open={buildIndex === 0}>
					<summary>
						<span class="summary-copy">
							<strong>{build.legendary}</strong>
							<span>{build.enables}</span>
						</span>
						<span class="summary-meta">
							<span class="legendary-effect">{build.effect}</span>
							{#if ready}
								<span class="step-count">{planCompleted[build.slug]?.length ?? 0}/5</span>
							{/if}
							<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 6 5 5 5-5" /></svg>
						</span>
					</summary>

					<div class="build-content">
						<p class="mobile-legendary-effect"><strong>{build.legendary}:</strong> {build.effect}</p>
						<div class="plan-column">
							<h3>Level-50 plan</h3>
							<ul class="fusion-list">
								{#each build.fusions as item}
									<li>
										<label class="plan-choice">
											<input
												type="checkbox"
												checked={isPlanChecked(build.slug, item.name)}
												onchange={() => togglePlanItem(build.slug, item.name)}
											/>
											<strong>{item.name}</strong>
											<span class="fusion-components">
												<span>{item.components[0]} <em>{item.values[0]}</em></span>
												<span aria-hidden="true">+</span>
												<span>{item.components[1]} <em>{item.values[1]}</em></span>
											</span>
										</label>
									</li>
								{/each}
								<li>
									<label class="plan-choice">
										<input
											type="checkbox"
											checked={isPlanChecked(build.slug, 'standalone')}
											onchange={() => togglePlanItem(build.slug, 'standalone')}
										/>
										<strong>Standalone</strong>
										<span class="standalone-fragment">
											<span>{build.standalone.name}</span>
											<em>{build.standalone.value}</em>
										</span>
									</label>
								</li>
							</ul>
							<p class="reasoning">{build.reasoning}</p>
						</div>

						<div class="checklist-column">
							<div class="checklist-heading">
								<h3>Follow along</h3>
								<button type="button" onclick={() => resetProgress(build.slug)}>Reset progress</button>
							</div>
							<ol class="build-checklist">
								{#each steps(build) as step, index}
									<li class:completed={isChecked(build.slug, index)}>
										<label>
											<input
												type="checkbox"
												checked={isChecked(build.slug, index)}
												onchange={() => toggleStep(build.slug, index)}
											/>
											<span>{step}</span>
										</label>
									</li>
								{/each}
							</ol>
						</div>
					</div>
				</details>
			{/each}
		</div>
	</section>

	<footer class="source-note">
		<p>Verified against current game data and official balance changes on 14 September 2026.</p>
		<ul>
			{#each prismSources as source}
				<li><a class="link link--subtle" href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>
			{/each}
		</ul>
	</footer>
</div>

<style>
	.prism-page {
		padding-block: clamp(2.5rem, 6vw, 5rem);
	}

	.prism-header {
		margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
	}

	.prism-header h1 {
		margin-bottom: 0.75rem;
		font-size: clamp(2.5rem, 6vw, 4.25rem);
		line-height: 0.95;
	}

	.prism-header p,
	.section-heading p {
		margin: 0;
		color: var(--muted);
	}

	.how-it-works,
	.builds {
		margin-top: clamp(3rem, 7vw, 5rem);
	}

	.section-heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.section-heading h2 {
		margin: 0;
		font-size: clamp(1.35rem, 3vw, 1.8rem);
	}

	.section-heading p {
		font-size: 0.82rem;
		text-align: right;
	}

	.concept-list {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin: 0;
		border-top: 1px solid var(--border);
		border-left: 1px solid var(--border);
		background: var(--game-panel-surface);
	}

	.concept-list div {
		min-width: 0;
		padding: 0.9rem 1rem;
		border-right: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}

	.concept-list dt {
		margin-bottom: 0.3rem;
		color: var(--ink);
		font-size: 0.78rem;
		font-weight: 750;
		letter-spacing: 0.045em;
		text-transform: uppercase;
	}

	.concept-list dd {
		margin: 0;
		color: var(--muted);
		font-size: 0.84rem;
		line-height: 1.5;
	}

	.build-list {
		border-top: 1px solid var(--border);
	}

	.build-panel {
		border-bottom: 1px solid var(--border);
		background: color-mix(in oklch, var(--surface) 72%, transparent);
	}

	.build-panel summary {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 1rem;
		align-items: center;
		min-height: 5rem;
		padding: 0.9rem 1rem;
		cursor: pointer;
		list-style: none;
		transition: background var(--transition-fast);
	}

	.build-panel summary::-webkit-details-marker {
		display: none;
	}

	.build-panel summary:hover {
		background: color-mix(in oklch, var(--ink) 5%, transparent);
	}

	.build-panel summary:focus-visible {
		outline: 2px solid var(--focus);
		outline-offset: -3px;
	}

	.summary-copy {
		display: grid;
		gap: 0.25rem;
		min-width: 0;
	}

	.summary-copy strong {
		font-size: 1.08rem;
	}

	.summary-copy span,
	.legendary-effect {
		color: var(--muted);
		font-size: 0.82rem;
	}

	.summary-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.legendary-effect {
		max-width: 16rem;
		text-align: right;
	}

	.step-count {
		min-width: 2.75rem;
		color: var(--ink);
		font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
		font-size: 0.75rem;
		font-variant-numeric: tabular-nums;
		text-align: right;
	}

	.summary-meta svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-linecap: square;
		stroke-width: 1.5;
		transition: transform var(--transition-fast);
	}

	.build-panel[open] .summary-meta svg {
		transform: rotate(180deg);
	}

	.build-content {
		display: grid;
		grid-template-columns: minmax(17rem, 0.8fr) minmax(0, 1.2fr);
		border-top: 1px solid var(--border);
		background: color-mix(in oklch, var(--canvas) 84%, transparent);
	}

	.mobile-legendary-effect {
		display: none;
	}

	.plan-column,
	.checklist-column {
		padding: clamp(1rem, 3vw, 1.5rem);
	}

	.plan-column {
		border-right: 1px solid var(--border);
	}

	.build-content h3 {
		margin: 0 0 1rem;
		font-size: 0.82rem;
		letter-spacing: 0.045em;
		text-transform: uppercase;
	}

	.fusion-list,
	.build-checklist {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.fusion-list {
		display: grid;
		gap: 0;
	}

	.fusion-list li {
		border-bottom: 1px solid color-mix(in oklch, var(--border) 68%, transparent);
	}

	.plan-choice {
		display: grid;
		grid-template-columns: 1rem minmax(6.75rem, 0.42fr) minmax(0, 1fr);
		align-items: center;
		gap: 0.75rem;
		min-height: 3rem;
		padding-block: 0.45rem;
		cursor: pointer;
	}

	.plan-choice input {
		width: 1rem;
		height: 1rem;
		margin: 0;
		accent-color: var(--accent);
	}

	.plan-choice:hover strong,
	.plan-choice:hover .fusion-components,
	.plan-choice:hover .standalone-fragment {
		color: var(--accent);
	}

	.plan-choice:has(input:focus-visible) {
		outline: 2px solid var(--focus);
		outline-offset: -2px;
	}

	.fusion-components {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		align-items: center;
		gap: 0.5rem;
		color: var(--ink);
		font-size: 0.78rem;
	}

	.fusion-components span:first-child {
		text-align: right;
	}

	.fusion-components em,
	.standalone-fragment em {
		color: var(--muted);
		font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
		font-size: 0.72rem;
		font-style: normal;
		font-variant-numeric: tabular-nums;
	}

	.fusion-components em {
		display: block;
		margin-top: 0.15rem;
	}

	.standalone-fragment {
		display: grid;
		justify-items: center;
		color: var(--ink);
		font-size: 0.78rem;
		text-align: center;
	}

	.standalone-fragment em {
		margin-top: 0.15rem;
	}

	.reasoning {
		margin: 1rem 0 0;
		color: var(--muted);
		font-size: 0.8rem;
		line-height: 1.55;
	}

	.checklist-heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
	}

	.checklist-heading button {
		min-height: 2.25rem;
		padding: 0.4rem 0.25rem;
		border: 0;
		background: transparent;
		color: var(--muted);
		cursor: pointer;
		font: inherit;
		font-size: 0.72rem;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.2em;
	}

	.checklist-heading button:hover,
	.checklist-heading button:focus-visible {
		color: var(--ink);
	}

	.build-checklist {
		display: grid;
		gap: 0.15rem;
		counter-reset: step;
	}

	.build-checklist li {
		counter-increment: step;
	}

	.build-checklist label {
		display: grid;
		grid-template-columns: 1rem minmax(0, 1fr);
		gap: 0.65rem;
		padding: 0.45rem 0;
		color: var(--muted);
		cursor: pointer;
		font-size: 0.8rem;
		line-height: 1.45;
	}

	.build-checklist label:hover {
		color: var(--ink);
	}

	.build-checklist input {
		width: 1rem;
		height: 1rem;
		margin: 0.08rem 0 0;
		accent-color: var(--accent);
	}

	.build-checklist label span::before {
		margin-right: 0.45rem;
		color: var(--ink);
		content: counter(step) '.';
		font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
		font-size: 0.72rem;
	}

	.build-checklist .completed label span {
		color: var(--muted);
		text-decoration: line-through;
	}

	.storage-note {
		margin: -0.35rem 0 1rem;
		padding: 0.65rem 0.75rem;
		border: 1px solid var(--border);
		background: var(--game-panel-surface);
		color: var(--muted);
		font-size: 0.78rem;
	}

	.source-note {
		margin-top: 2.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border);
		color: var(--muted);
		font-size: 0.75rem;
	}

	.source-note p {
		margin: 0 0 0.5rem;
	}

	.source-note ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.source-note .link {
		font-size: inherit;
	}

	@media (max-width: 56rem) {
		.concept-list {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.build-content {
			grid-template-columns: 1fr;
		}

		.plan-column {
			border-right: 0;
			border-bottom: 1px solid var(--border);
		}
	}

	@media (max-width: 40rem) {
		.section-heading {
			display: block;
		}

		.section-heading p {
			margin-top: 0.35rem;
			text-align: left;
		}

		.concept-list {
			grid-template-columns: 1fr;
		}

		.build-panel summary {
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: start;
		}

		.legendary-effect {
			display: none;
		}

		.mobile-legendary-effect {
			display: block;
			grid-column: 1 / -1;
			margin: 0;
			padding: 0.7rem 1rem;
			border-bottom: 1px solid var(--border);
			color: var(--muted);
			font-size: 0.78rem;
		}

		.mobile-legendary-effect strong {
			color: var(--ink);
		}

		.summary-meta {
			gap: 0.6rem;
		}

		.plan-choice {
			grid-template-columns: 1rem minmax(0, 1fr);
			grid-template-areas:
				'check name'
				'check components';
			align-items: start;
			gap: 0.35rem 0.65rem;
			padding-block: 0.65rem;
		}

		.plan-choice input {
			grid-area: check;
			margin-top: 0.1rem;
		}

		.plan-choice > strong {
			grid-area: name;
		}

		.fusion-components,
		.standalone-fragment {
			grid-area: components;
		}

		.fusion-components {
			grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		}

		.checklist-heading button {
			min-height: 2.75rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.summary-meta svg {
			transition: none;
		}
	}
</style>

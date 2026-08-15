<script lang="ts">
	import { onMount } from 'svelte';
	import { routeSections, totalSteps } from '$lib/data/bastion/walkthrough';

	let { data } = $props();
	const storageKey = $derived(data.sync.storageKey);
	let completed = $state<string[]>([]);
	let ready = $state(false);
	const progress = $derived(Math.round((completed.length / totalSteps) * 100));

	onMount(() => {
		try {
			const saved = localStorage.getItem(storageKey);
			completed = saved ? JSON.parse(saved) : [];
		} catch {
			completed = [];
		}
		ready = true;
	});

	function toggleStep(id: string) {
		completed = completed.includes(id)
			? completed.filter((stepId) => stepId !== id)
			: [...completed, id];
		localStorage.setItem(storageKey, JSON.stringify(completed));
	}

	function resetProgress() {
		completed = [];
		localStorage.removeItem(storageKey);
	}
</script>

<svelte:head>
	<title>Achievement Walkthrough | Bastion</title>
	<meta
		name="description"
		content="A practical Bastion achievement route for the first journey, New Game Plus and Score Attack."
	/>
</svelte:head>

<div class="shell bastion-guide">
	<header class="guide-hero">
		<div>
			<h1>Achievement Walkthrough</h1>
		</div>
		<div class="progress-seal" aria-label="Walkthrough progress">
			<span>{ready ? completed.length : 0} of {totalSteps}</span>
			<strong>{ready ? progress : 0}%</strong>
			<div aria-hidden="true"><i style:width={`${ready ? progress : 0}%`}></i></div>
			<button type="button" onclick={resetProgress}>Reset checks</button>
		</div>
	</header>

	<section class="run-warning" aria-labelledby="warning-title">
		<strong id="warning-title">Two missable checkpoints</strong>
		<div>
			<p><b>Wharf District, opening level:</b> after picking up the Core, reach the Skyway Bridge without falling. If you already missed it, replay this first level on a new file.</p>
			<p><b>Pyth Orchard, before The Wild Outskirts:</b> find or buy the Plush Pyth, then give it to Zulf at the Bastion.</p>
		</div>
	</section>

	<div class="guide-layout">
		<aside class="route-index" aria-label="Walkthrough route">
			<ul>
				{#each routeSections as section}
					<li><a href={`#${section.id}`}>{section.label}</a></li>
				{/each}
			</ul>
		</aside>

		<div class="field-journal">
			<header class="journal-intro">
				<div>
					<p>
						Complete both ending choices by using Continue after the first credits. Carry that
						file into NG+ for the inherited grind, then start Score Attack only for Hard Bargain.
					</p>
				</div>
			</header>

			{#each routeSections as section}
				<section class="route-section" id={section.id} aria-label={section.label}>
					<header>
						<p>{section.intro}</p>
					</header>

					<ul class="step-list">
						{#each section.steps as step}
							<li class:complete={completed.includes(step.id)}>
								<label>
									<input
										type="checkbox"
										checked={completed.includes(step.id)}
										onchange={() => toggleStep(step.id)}
									/>
									<i aria-hidden="true"></i>
									<span class="step-copy">
										<strong>{step.title}</strong>
										<small>{step.detail}</small>
										{#if step.warning}<em>{step.warning}</em>{/if}
										{#if step.achievements}<b>{step.achievements}</b>{/if}
									</span>
								</label>
							</li>
						{/each}
					</ul>
				</section>
			{/each}

			<footer class="source-note">
				Credits to: LawfulGoodness ·
				<a
					href="https://steamcommunity.com/sharedfiles/filedetails/?id=2584710379"
					target="_blank"
					rel="noreferrer">Achievement guide</a
				>
			</footer>
		</div>
	</div>
</div>

<style>
	.bastion-guide {
		padding-block: clamp(2.5rem, 6vw, 5rem);
	}

	.guide-hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 11rem;
		gap: clamp(2rem, 7vw, 6rem);
		align-items: end;
		margin-bottom: 2rem;
	}

	.guide-hero h1 {
		max-width: 14ch;
		margin-bottom: 0;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(3.25rem, 7.5vw, 6rem);
		font-weight: 600;
		letter-spacing: -.035em;
	}

	.progress-seal {
		padding: 1rem;
		border: 1px solid var(--border);
		background: var(--game-panel-surface);
	}

	.progress-seal > span,
	.progress-seal button {
		color: var(--muted);
		font-size: .75rem;
	}

	.progress-seal > strong {
		display: block;
		margin: .3rem 0 .8rem;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 2rem;
	}

	.progress-seal > div {
		height: 3px;
		background: var(--border);
	}

	.progress-seal i {
		display: block;
		height: 100%;
		background: var(--focus);
		transition: width var(--transition-fast);
	}

	.progress-seal button {
		margin-top: .8rem;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
	}

	.progress-seal button:hover {
		color: var(--ink);
	}

	.run-warning {
		margin-bottom: 2rem;
		padding: 1.25rem clamp(1.25rem, 4vw, 2rem);
		border: 1px solid oklch(0.68 0.12 55);
		background: oklch(0.22 0.065 45 / .9);
	}

	.run-warning strong,
	.run-warning p {
		display: block;
	}

	.run-warning strong {
		margin-bottom: .35rem;
		color: oklch(0.88 0.1 75);
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 1.15rem;
	}

	.run-warning p {
		max-width: 64rem;
		margin: 0;
		color: oklch(0.83 0.045 70);
		line-height: 1.55;
	}

	.run-warning div {
		display: grid;
		gap: .35rem;
	}

	.run-warning b {
		color: oklch(0.9 0.075 75);
	}

	.guide-layout {
		display: grid;
		grid-template-columns: 10rem minmax(0, 1fr);
		gap: clamp(2rem, 6vw, 5rem);
		align-items: start;
	}

	.route-index {
		position: sticky;
		top: calc(var(--site-header-height) + 2rem);
	}

	.route-index ul {
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--border);
		list-style: none;
	}

	.route-index li {
		border-bottom: 1px solid var(--border);
	}

	.route-index a {
		display: block;
		padding: .75rem 0;
		color: var(--muted);
		font-size: .78rem;
		line-height: 1.35;
		text-decoration: none;
	}

	.route-index a:hover {
		color: var(--ink);
	}

	.field-journal {
		min-width: 0;
		background: linear-gradient(
			color-mix(in oklch, var(--bastion-paper) var(--game-panel-strong-opacity), transparent),
			color-mix(in oklch, var(--bastion-paper-deep) var(--game-panel-strong-opacity), transparent)
		);
		color: var(--bastion-paper-ink);
		box-shadow: 0 6px 8px oklch(0.08 0.025 190 / .42);
	}

	.journal-intro,
	.route-section {
		padding: clamp(2rem, 6vw, 4.5rem) clamp(1.25rem, 6vw, 4rem);
		border-bottom: 1px solid var(--bastion-paper-line);
	}

	.journal-intro p,
	.route-section header p {
		max-width: 45rem;
		margin: 0;
		color: var(--bastion-paper-muted);
		line-height: 1.6;
		text-wrap: pretty;
	}

	.route-section {
		scroll-margin-top: calc(var(--site-header-height) + 1rem);
	}

	.route-section > header {
		margin-bottom: 1.5rem;
	}

	.step-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.step-list li {
		border-top: 1px solid color-mix(in oklch, var(--bastion-paper-line) 70%, transparent);
	}

	.step-list label {
		display: grid;
		grid-template-columns: 1.05rem minmax(0, 1fr);
		gap: 1rem;
		padding: 1.15rem 0;
		cursor: pointer;
	}

	.step-list input {
		position: absolute;
		opacity: 0;
	}

	.step-list label > i {
		position: relative;
		width: 1.05rem;
		height: 1.05rem;
		margin-top: .15rem;
		border: 1px solid var(--bastion-paper-muted);
	}

	.step-list input:focus-visible + i {
		outline: 3px solid oklch(0.56 0.16 310);
		outline-offset: 3px;
	}

	.step-list .complete label > i {
		border-color: oklch(0.42 0.1 185);
		background: oklch(0.42 0.1 185);
	}

	.step-list .complete label > i::after {
		position: absolute;
		top: .07rem;
		left: .29rem;
		width: .26rem;
		height: .54rem;
		border: solid var(--bastion-paper);
		border-width: 0 2px 2px 0;
		content: '';
		transform: rotate(45deg);
	}

	.step-copy,
	.step-copy small,
	.step-copy em,
	.step-copy b {
		display: block;
	}

	.step-copy > strong {
		font-size: .98rem;
	}

	.step-copy small {
		max-width: 54rem;
		margin-top: .3rem;
		color: var(--bastion-paper-muted);
		font-size: .84rem;
		line-height: 1.55;
	}

	.step-copy em {
		margin-top: .45rem;
		color: oklch(0.4 0.13 38);
		font-size: .76rem;
		font-style: normal;
		font-weight: 750;
	}

	.step-copy b {
		margin-top: .45rem;
		color: oklch(0.36 0.09 185);
		font-size: .72rem;
		font-weight: 750;
	}

	.step-list .complete .step-copy > strong,
	.step-list .complete .step-copy small {
		opacity: .58;
		text-decoration: line-through;
	}

	.source-note {
		padding: 1rem clamp(1.25rem, 6vw, 4rem);
		color: var(--bastion-paper-muted);
		font-size: .72rem;
	}

	.source-note a {
		color: var(--bastion-paper-ink);
		font-weight: 700;
		text-underline-offset: .2em;
	}

	@media (max-width: 54rem) {
		.guide-layout {
			grid-template-columns: 1fr;
		}

		.route-index {
			display: none;
		}
	}

	@media (max-width: 40rem) {
		.guide-hero {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.progress-seal {
			width: 100%;
		}
	}
</style>

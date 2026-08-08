<script lang="ts">
	import { onMount } from 'svelte';
	import { alternateRuns, phases, totalSteps } from '$lib/data/yes-your-grace/walkthrough';

	const storageKey = 'yes-your-grace-walkthrough-progress';
	let completed = $state<string[]>([]);
	let ready = $state(false);

	const completedCount = $derived(completed.length);
	const progress = $derived(Math.round((completedCount / totalSteps) * 100));

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
			? completed.filter((completedId) => completedId !== id)
			: [...completed, id];
		localStorage.setItem(storageKey, JSON.stringify(completed));
	}

	function resetProgress() {
		completed = [];
		localStorage.removeItem(storageKey);
	}
</script>

<svelte:head>
	<title>Walkthrough | Yes, Your Grace</title>
	<meta
		name="description"
		content="A week-by-week, achievement-focused walkthrough for Yes, Your Grace."
	/>
</svelte:head>

<div class="walkthrough-shell">
	<header class="walkthrough-hero shell">
		<div class="walkthrough-hero__copy">
			<h1>Achievement Walkthrough</h1>
		</div>

		<div class="royal-summary" aria-label="Walkthrough progress">
			<p>Royal record</p>
			<strong>{ready ? completedCount : 0}<span> / {totalSteps}</span></strong>
			<div class="progress-track" aria-hidden="true">
				<span style:width={`${ready ? progress : 0}%`}></span>
			</div>
			<small>{ready ? progress : 0}% complete</small>
		</div>
	</header>

	<div class="walkthrough-layout shell">
		<aside class="route-index" aria-label="Walkthrough sections">
			<p class="route-index__title">Run order</p>
			<ol>
				{#each phases as phase}
					<li><a href={`#${phase.id}`}>{phase.range}</a></li>
				{/each}
			</ol>
			<a class="alternate-link" href="#alternate-runs">Alternate runs</a>
		</aside>

		<main class="ledger">
			<section class="route-note" aria-labelledby="route-note-title">
				<div>
					<h2 id="route-note-title">Use this as a completionist run</h2>
					<p>
						It favors mercy, Asalia and Maya, a successful ritual and a surviving family. Save
						before the week 47 choice and before expensive purchases.
					</p>
				</div>
				<button class="reset-button" type="button" onclick={resetProgress}>Reset checks</button>
			</section>

			{#each phases as phase, phaseIndex}
				<section class="phase" id={phase.id} aria-labelledby={`${phase.id}-title`}>
					<header class="phase__header">
						<p>{phase.range}</p>
						<div>
							<h2 id={`${phase.id}-title`}>{phase.title}</h2>
							<p>{phase.intro}</p>
						</div>
					</header>

					<ol class="step-list" start={phaseIndex + 1}>
						{#each phase.steps as step}
							<li class:step--done={completed.includes(step.id)}>
								<label>
									<input
										type="checkbox"
										checked={completed.includes(step.id)}
										onchange={() => toggleStep(step.id)}
									/>
									<span class="checkmark" aria-hidden="true"></span>
									<span class="step-copy">
										<strong>{step.title}</strong>
										<span>{step.detail}</span>
										{#if step.warning}
											<em>{step.warning}</em>
										{/if}
										{#if step.achievement}
											<small>Achievement: {step.achievement}</small>
										{/if}
									</span>
								</label>
							</li>
						{/each}
					</ol>
				</section>
			{/each}

			<section class="alternate-runs" id="alternate-runs" aria-labelledby="alternate-title">
				<header>
					<p>Separate saves</p>
					<h2 id="alternate-title">Conflicting and destructive routes</h2>
					<span>Do these after the main run. They intentionally undo its key choices.</span>
				</header>

				<div class="alternate-list">
					{#each alternateRuns as run}
						<details>
							<summary>
								<span>
									<strong>{run.title}</strong>
									<small>{run.achievement}</small>
								</span>
								<span aria-hidden="true">+</span>
							</summary>
							<ol>
								{#each run.steps as step}
									<li>{step}</li>
								{/each}
							</ol>
						</details>
					{/each}
				</div>
			</section>

			<footer class="source-note">
				<p>
					Adapted and reorganized from Vesuvius00's
					<a
						href="https://steamcommunity.com/sharedfiles/filedetails/?id=2951436059"
						target="_blank"
						rel="noreferrer">Steam achievement guide</a
					>. Community corrections about the fortune teller and wedding preparation are included.
				</p>
			</footer>
		</main>
	</div>
</div>

<style>
	.walkthrough-shell {
		padding-block: clamp(2.5rem, 6vw, 5.5rem);
	}

	.walkthrough-hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: clamp(2rem, 8vw, 7rem);
		align-items: end;
		padding-bottom: clamp(2.5rem, 5vw, 4rem);
	}

	.walkthrough-hero h1 {
		max-width: 10ch;
		margin-bottom: 0;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(3.5rem, 9vw, 7.5rem);
		font-weight: 500;
		letter-spacing: -0.055em;
	}

	.royal-summary {
		width: 11rem;
		padding: 1.1rem;
		border: 1px solid var(--paper-line);
		box-shadow: inset 0 0 0 4px var(--canvas), inset 0 0 0 5px var(--paper-line);
		text-align: center;
	}

	.royal-summary p,
	.royal-summary small {
		margin: 0;
		color: var(--muted);
		font-size: 0.72rem;
		letter-spacing: 0.07em;
		text-transform: uppercase;
	}

	.royal-summary strong {
		display: block;
		margin-block: 0.45rem;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 2.25rem;
		font-weight: 500;
	}

	.royal-summary strong span {
		color: var(--muted);
		font-size: 1rem;
	}

	.progress-track {
		height: 3px;
		margin: 0.75rem 0;
		background: var(--border);
	}

	.progress-track span {
		display: block;
		height: 100%;
		background: var(--accent);
		transition: width var(--transition-fast);
	}

	.walkthrough-layout {
		display: grid;
		grid-template-columns: 11rem minmax(0, 1fr);
		gap: clamp(2rem, 6vw, 5rem);
		align-items: start;
	}

	.route-index {
		position: sticky;
		top: calc(var(--site-header-height) + 2rem);
		padding-top: 1rem;
		border-top: 1px solid var(--border);
	}

	.route-index__title {
		margin: 0 0 0.75rem;
		color: var(--muted);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.07em;
		text-transform: uppercase;
	}

	.route-index ol {
		display: grid;
		gap: 0.15rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.route-index a {
		display: block;
		padding: 0.35rem 0;
		color: var(--muted);
		font-size: 0.82rem;
		text-decoration: none;
	}

	.route-index a:hover {
		color: var(--ink);
	}

	.route-index .alternate-link {
		margin-top: 1rem;
		padding-top: 0.85rem;
		border-top: 1px solid var(--border);
		color: var(--ink);
	}

	.ledger {
		min-width: 0;
		background:
			linear-gradient(90deg, oklch(0.77 0.055 76 / 0.28) 1px, transparent 1px) 3rem 0 / 100% 100%,
			linear-gradient(
				color-mix(in oklch, var(--paper) var(--game-panel-strong-opacity), transparent) 0%,
				color-mix(in oklch, var(--paper-deep) var(--game-panel-strong-opacity), transparent) 100%
			);
		color: var(--paper-ink);
		box-shadow: 0 1.5rem 4rem oklch(0.08 0.02 155 / 0.38);
	}

	.route-note {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 2rem;
		align-items: center;
		padding: clamp(1.5rem, 4vw, 2.25rem) clamp(1.5rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.25rem) clamp(4.25rem, 8vw, 6rem);
		border-bottom: 1px solid var(--paper-line);
	}

	.route-note h2 {
		margin-bottom: 0.4rem;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 1.4rem;
		font-weight: 600;
	}

	.route-note p {
		max-width: 52rem;
		margin: 0;
		color: var(--paper-muted);
		font-size: 0.9rem;
		line-height: 1.55;
	}

	.reset-button {
		padding: 0.6rem 0;
		border: 0;
		border-bottom: 1px solid currentColor;
		background: transparent;
		color: var(--paper-muted);
		cursor: pointer;
		font: inherit;
		font-size: 0.78rem;
		white-space: nowrap;
	}

	.reset-button:hover {
		color: var(--paper-ink);
	}

	.reset-button:active {
		transform: translateY(1px);
	}

	.phase {
		scroll-margin-top: calc(var(--site-header-height) + 1rem);
		padding: clamp(2.5rem, 7vw, 5rem) clamp(1.5rem, 5vw, 3rem) clamp(2.5rem, 7vw, 5rem) clamp(4.25rem, 8vw, 6rem);
		border-bottom: 1px solid var(--paper-line);
	}

	.phase__header {
		display: grid;
		grid-template-columns: 7.5rem minmax(0, 1fr);
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.phase__header > p,
	.alternate-runs header > p {
		margin: 0.35rem 0 0;
		color: var(--paper-muted);
		font-size: 0.7rem;
		font-weight: 750;
		letter-spacing: 0.07em;
		text-transform: uppercase;
	}

	.phase__header h2,
	.alternate-runs h2 {
		margin-bottom: 0.5rem;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(1.8rem, 4vw, 2.8rem);
		font-weight: 500;
		letter-spacing: -0.025em;
	}

	.phase__header div > p,
	.alternate-runs header > span {
		display: block;
		max-width: 44rem;
		margin: 0;
		color: var(--paper-muted);
		line-height: 1.6;
	}

	.step-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.step-list li {
		border-top: 1px solid color-mix(in oklch, var(--paper-line) 65%, transparent);
	}

	.step-list label {
		display: grid;
		grid-template-columns: 1.25rem minmax(0, 1fr);
		gap: 1rem;
		padding: 1.25rem 0;
		cursor: pointer;
	}

	.step-list input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.checkmark {
		position: relative;
		display: block;
		width: 1.15rem;
		height: 1.15rem;
		margin-top: 0.15rem;
		border: 1px solid var(--paper-muted);
		background: transparent;
	}

	.step-list input:focus-visible + .checkmark {
		outline: 3px solid var(--accent);
		outline-offset: 3px;
	}

	.step--done .checkmark {
		border-color: oklch(0.38 0.09 154);
		background: oklch(0.38 0.09 154);
	}

	.step--done .checkmark::after {
		position: absolute;
		top: 0.08rem;
		left: 0.31rem;
		width: 0.28rem;
		height: 0.58rem;
		border: solid var(--paper);
		border-width: 0 2px 2px 0;
		content: '';
		transform: rotate(45deg);
	}

	.step-copy,
	.step-copy > span,
	.step-copy em,
	.step-copy small {
		display: block;
	}

	.step-copy strong {
		font-size: 1rem;
	}

	.step-copy > span {
		max-width: 54rem;
		margin-top: 0.35rem;
		color: var(--paper-muted);
		font-size: 0.9rem;
		line-height: 1.55;
	}

	.step-copy em {
		margin-top: 0.5rem;
		color: oklch(0.39 0.12 30);
		font-size: 0.82rem;
		font-style: normal;
		font-weight: 700;
	}

	.step-copy small {
		margin-top: 0.55rem;
		color: oklch(0.36 0.09 154);
		font-size: 0.72rem;
		font-weight: 750;
		letter-spacing: 0.025em;
	}

	.step--done .step-copy strong,
	.step--done .step-copy > span {
		text-decoration: line-through;
		text-decoration-color: var(--paper-line);
	}

	.alternate-runs {
		scroll-margin-top: calc(var(--site-header-height) + 1rem);
		padding: clamp(3rem, 7vw, 5rem) clamp(1.5rem, 5vw, 3rem) clamp(3rem, 7vw, 5rem) clamp(4.25rem, 8vw, 6rem);
	}

	.alternate-runs header {
		margin-bottom: 2.25rem;
	}

	.alternate-runs header > p {
		margin-bottom: 0.5rem;
	}

	.alternate-list details {
		border-top: 1px solid var(--paper-line);
	}

	.alternate-list details:last-child {
		border-bottom: 1px solid var(--paper-line);
	}

	.alternate-list summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.2rem 0;
		cursor: pointer;
		list-style: none;
	}

	.alternate-list summary::-webkit-details-marker {
		display: none;
	}

	.alternate-list summary strong,
	.alternate-list summary small {
		display: block;
	}

	.alternate-list summary small {
		margin-top: 0.25rem;
		color: var(--paper-muted);
	}

	.alternate-list summary > span:last-child {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 1.5rem;
		transition: transform var(--transition-fast);
	}

	.alternate-list details[open] summary > span:last-child {
		transform: rotate(45deg);
	}

	.alternate-list ol {
		margin: 0 0 1.5rem 1.1rem;
		padding-left: 1rem;
		color: var(--paper-muted);
	}

	.alternate-list li {
		padding: 0.25rem 0 0.25rem 0.35rem;
		line-height: 1.55;
	}

	.source-note {
		padding: 1.5rem clamp(1.5rem, 5vw, 3rem) 1.5rem clamp(4.25rem, 8vw, 6rem);
		border-top: 1px solid var(--paper-line);
		background: color-mix(in oklch, var(--paper-deep) 65%, var(--paper));
	}

	.source-note p {
		max-width: 60rem;
		margin: 0;
		color: var(--paper-muted);
		font-size: 0.75rem;
		line-height: 1.55;
	}

	.source-note a {
		color: var(--paper-ink);
		font-weight: 700;
		text-underline-offset: 0.2em;
	}

	@media (max-width: 54rem) {
		.walkthrough-layout {
			grid-template-columns: 1fr;
		}

		.route-index {
			position: static;
			display: none;
		}
	}

	@media (max-width: 40rem) {
		.walkthrough-hero {
			grid-template-columns: 1fr;
		}

		.royal-summary {
			width: 100%;
			text-align: left;
		}

		.progress-track {
			max-width: 12rem;
		}

		.route-note,
		.phase,
		.alternate-runs,
		.source-note {
			padding-inline: 1.25rem;
		}

		.ledger {
			background: linear-gradient(
				color-mix(in oklch, var(--paper) var(--game-panel-strong-opacity), transparent) 0%,
				color-mix(in oklch, var(--paper-deep) var(--game-panel-strong-opacity), transparent) 100%
			);
		}

		.route-note {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.reset-button {
			justify-self: start;
		}

		.phase__header {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
	}
</style>

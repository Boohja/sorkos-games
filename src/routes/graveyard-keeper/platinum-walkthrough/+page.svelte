<script lang="ts">
	import { onMount } from 'svelte';
	import { phases, totalSteps, type Cue } from '$lib/data/graveyard-keeper/walkthrough';

	const storageKey = 'games.sorkos.net:graveyard-keeper:platinum-walkthrough';
	let completed = $state<string[]>([]);
	let ready = $state(false);
	const completedCount = $derived(completed.length);
	const progress = $derived(Math.round((completedCount / totalSteps) * 100));

	const cueLabels: Record<Cue, string> = {
		missable: 'Missable',
		tricky: 'Tricky',
		grind: 'Long haul'
	};

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
	<title>Platinum Walkthrough | Graveyard Keeper</title>
	<meta name="description" content="A base-game-only Graveyard Keeper platinum route with persistent checklists and clear missable warnings." />
</svelte:head>

<div class="keeper-guide shell">
	<header class="guide-hero">
		<div>
			<h1>Platinum Walkthrough</h1>
			<p>Base game only · automatic story trophies omitted</p>
		</div>

		<div class="progress-window" aria-label="Walkthrough progress">
			<div class="window-title"><span>Platinum progress</span></div>
			<div class="progress-body">
				<strong>{ready ? progress : 0}%</strong>
				<span>{ready ? completedCount : 0} / {totalSteps} tasks</span>
				<div class="progress-track" aria-hidden="true"><i style:width={`${ready ? progress : 0}%`}></i></div>
				<button type="button" onclick={resetProgress}>Reset checks</button>
			</div>
		</div>
	</header>

	<section class="danger-window" aria-labelledby="danger-title">
		<div class="window-title"><span id="danger-title">Two missables — read before advancing quests</span><b aria-hidden="true">!</b></div>
		<div class="danger-grid">
			<div><strong>Astrologer</strong><span>Give him a real gold-star Book. Never substitute Research Obsidian.</span></div>
			<div><strong>Inquisitor</strong><span>When he asks for more evidence, choose “About Gerry.”</span></div>
		</div>
	</section>

	<div class="guide-layout">
		<aside class="route-index" aria-label="Walkthrough sections">
			<p>Guide index</p>
			{#each phases as phase}
				<a href={`#${phase.id}`}><span aria-hidden="true">›</span>{phase.label}</a>
			{/each}
			<div class="cue-key">
				<span><i class="cue-dot cue-dot--missable"></i> Missable</span>
				<span><i class="cue-dot cue-dot--tricky"></i> Tricky</span>
				<span><i class="cue-dot cue-dot--grind"></i> Long haul</span>
			</div>
		</aside>

		<main class="guide-content">
			{#each phases as phase}
				<section class="quest-window" id={phase.id} aria-labelledby={`${phase.id}-title`}>
					<header class="window-title phase-title">
						<span>{phase.label}</span>
					</header>
					<div class="phase-intro">
						<h2 id={`${phase.id}-title`}>{phase.title}</h2>
						<p>{phase.intro}</p>
					</div>

					<ul class="task-list">
						{#each phase.steps as step}
							<li class:task--done={completed.includes(step.id)} class:task--alert={step.cue === 'missable'}>
								<label>
									<input type="checkbox" checked={completed.includes(step.id)} onchange={() => toggleStep(step.id)} />
									<span class="inventory-slot" aria-hidden="true"><i></i></span>
									<span class="task-copy">
										<span class="task-heading">
											<strong>{step.title}</strong>
											{#if step.cue}<em class={`cue cue--${step.cue}`}>{cueLabels[step.cue]}</em>{/if}
										</span>
										<span>{step.detail}</span>
										{#if step.warning}<mark><b aria-hidden="true">!</b>{step.warning}</mark>{/if}
										{#if step.trophies}<small>Trophy: {step.trophies}</small>{/if}
									</span>
								</label>
							</li>
						{/each}
					</ul>
				</section>
			{/each}

			<footer class="source-note">
				Base-game route distilled from Dens’
				<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2525303394" target="_blank" rel="noreferrer">100% achievement guide</a>.
				DLC objectives and unmissable story trophies are intentionally not listed.
			</footer>
		</main>
	</div>
</div>

<style>
	.keeper-guide { padding-block: clamp(2.5rem, 6vw, 5rem); }
	.guide-hero { display: grid; grid-template-columns: minmax(0, 1fr) 15rem; gap: clamp(2rem, 7vw, 6rem); align-items: end; margin-bottom: 1.5rem; }
	.guide-hero h1 { max-width: 12ch; margin-bottom: .65rem; color: oklch(0.94 0.05 78); font-family: Georgia, 'Times New Roman', serif; font-size: clamp(3rem, 7vw, 5.75rem); font-weight: 700; line-height: .94; letter-spacing: -.035em; text-shadow: 2px 3px 0 oklch(0.08 0.02 250); }
	.guide-hero > div > p { margin: 0; color: var(--muted); font-size: .82rem; }
	.progress-window, .danger-window, .quest-window { border: 2px solid oklch(0.09 0.018 50); outline: 1px solid oklch(0.43 0.035 65); background: var(--game-panel-surface); box-shadow: inset 0 0 0 2px oklch(0.23 0.025 60); }
	.window-title { display: flex; min-height: 2.25rem; align-items: center; justify-content: space-between; gap: 1rem; padding: .45rem .8rem; border-bottom: 2px solid oklch(0.08 0.015 50); background: linear-gradient(180deg, oklch(0.28 0.045 57), oklch(0.19 0.027 52)); color: oklch(0.93 0.055 78); font-family: Georgia, 'Times New Roman', serif; font-size: .78rem; font-weight: 700; text-align: center; text-shadow: 1px 1px 0 oklch(0.08 0.01 50); }
	.window-title span { flex: 1; }
	.progress-body { padding: 1rem; text-align: center; }
	.progress-body strong, .progress-body > span { display: block; }
	.progress-body strong { color: var(--grave-gold); font-family: Georgia, 'Times New Roman', serif; font-size: 2.4rem; }
	.progress-body > span { color: var(--muted); font-size: .72rem; }
	.progress-track { height: .45rem; margin: .9rem 0; border: 1px solid oklch(0.08 0.015 50); background: oklch(0.09 0.012 50); box-shadow: inset 0 1px 2px oklch(0.03 0 0 / .8); }
	.progress-track i { display: block; height: 100%; background: linear-gradient(180deg, oklch(0.81 0.13 83), oklch(0.61 0.12 72)); transition: width var(--transition-fast); }
	.progress-body button { min-width: 7rem; padding: .35rem .6rem; border: 1px solid oklch(0.66 0.16 29); background: linear-gradient(oklch(0.45 0.16 27), oklch(0.28 0.1 27)); color: oklch(0.94 0.04 75); cursor: pointer; font-size: .7rem; }
	.danger-window { margin-bottom: clamp(2rem, 5vw, 3.5rem); border-color: oklch(0.28 0.08 28); outline-color: oklch(0.65 0.15 30); }
	.danger-window .window-title { background: linear-gradient(180deg, oklch(0.45 0.16 28), oklch(0.27 0.09 28)); }
	.danger-window .window-title b { display: grid; width: 1.15rem; height: 1.15rem; place-items: center; border: 1px solid oklch(0.86 0.12 75); color: oklch(0.93 0.12 77); font: 800 .7rem ui-sans-serif, system-ui, sans-serif; }
	.danger-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
	.danger-grid div { padding: 1rem 1.25rem; }
	.danger-grid div + div { border-left: 1px solid var(--border); }
	.danger-grid strong, .danger-grid span { display: block; }
	.danger-grid strong { margin-bottom: .3rem; color: oklch(0.86 0.12 72); font-size: .84rem; }
	.danger-grid span { color: var(--muted); font-size: .78rem; line-height: 1.5; }
	.guide-layout { display: grid; grid-template-columns: 11rem minmax(0, 1fr); gap: clamp(2rem, 6vw, 5rem); align-items: start; }
	.route-index { position: sticky; top: calc(var(--site-header-height) + 1.5rem); }
	.route-index > p { margin: 0 0 .6rem; color: var(--grave-gold); font-family: Georgia, 'Times New Roman', serif; font-size: .8rem; font-weight: 700; }
	.route-index > a { display: flex; gap: .45rem; padding: .45rem 0; border-bottom: 1px solid color-mix(in oklch, var(--border) 60%, transparent); color: var(--muted); font-size: .76rem; text-decoration: none; }
	.route-index > a span { color: var(--grave-gold); }
	.route-index > a:hover { color: var(--ink); }
	.cue-key { display: grid; gap: .4rem; margin-top: 1.25rem; color: var(--muted); font-size: .68rem; }
	.cue-key span { display: flex; align-items: center; gap: .45rem; }
	.cue-dot { width: .55rem; height: .55rem; border: 1px solid currentColor; }
	.cue-dot--missable { color: oklch(0.66 0.18 29); background: oklch(0.42 0.14 28); }
	.cue-dot--tricky { color: oklch(0.72 0.13 76); background: oklch(0.46 0.1 75); }
	.cue-dot--grind { color: oklch(0.63 0.13 251); background: oklch(0.37 0.11 251); }
	.guide-content { display: grid; min-width: 0; gap: 1.5rem; }
	.quest-window { scroll-margin-top: calc(var(--site-header-height) + 1rem); }
	.phase-title { font-size: .82rem; }
	.phase-intro { padding: clamp(1.35rem, 4vw, 2rem); border-bottom: 1px solid var(--border); background: var(--game-panel-strong-surface); }
	.phase-intro h2 { margin-bottom: .45rem; color: oklch(0.93 0.05 77); font-family: Georgia, 'Times New Roman', serif; font-size: clamp(1.65rem, 4vw, 2.4rem); letter-spacing: -.025em; }
	.phase-intro p { max-width: 58rem; margin: 0; color: var(--muted); font-size: .84rem; line-height: 1.6; }
	.task-list { margin: 0; padding: .75rem clamp(.8rem, 3vw, 1.4rem); list-style: none; }
	.task-list li { border-bottom: 1px solid color-mix(in oklch, var(--border) 70%, transparent); }
	.task-list li:last-child { border-bottom: 0; }
	.task-list label { display: grid; grid-template-columns: 2.4rem minmax(0, 1fr); gap: 1rem; padding: 1rem .35rem; cursor: pointer; }
	.task-list input { position: absolute; opacity: 0; }
	.inventory-slot { position: relative; width: 2.35rem; height: 2.35rem; border: 2px solid oklch(0.08 0.015 250); outline: 1px solid oklch(0.39 0.035 250); background: linear-gradient(135deg, oklch(0.18 0.025 250), oklch(0.11 0.018 250)); box-shadow: inset 0 0 0 2px oklch(0.24 0.03 250); }
	.task-list input:focus-visible + .inventory-slot { outline: 3px solid var(--focus); outline-offset: 3px; }
	.inventory-slot i { position: absolute; inset: .5rem; border: 1px solid oklch(0.54 0.035 75); opacity: .65; }
	.task--done .inventory-slot { background: linear-gradient(135deg, oklch(0.47 0.12 153), oklch(0.27 0.08 153)); }
	.task--done .inventory-slot i { inset: .38rem .7rem .6rem .72rem; border: solid oklch(0.96 0.03 80); border-width: 0 3px 3px 0; opacity: 1; transform: rotate(45deg); }
	.task-copy, .task-copy > span, .task-copy mark, .task-copy small { display: block; }
	.task-heading { display: flex !important; flex-wrap: wrap; gap: .5rem; align-items: center; }
	.task-heading strong { color: oklch(0.92 0.045 77); font-size: .95rem; }
	.task-copy > span:nth-child(2) { max-width: 62rem; margin-top: .3rem; color: var(--muted); font-size: .8rem; line-height: 1.55; }
	.cue { padding: .15rem .35rem; border: 1px solid currentColor; font-size: .6rem; font-style: normal; font-weight: 750; text-transform: uppercase; }
	.cue--missable { color: oklch(0.78 0.16 31); background: oklch(0.3 0.08 28); }
	.cue--tricky { color: oklch(0.82 0.13 78); background: oklch(0.29 0.065 72); }
	.cue--grind { color: oklch(0.73 0.12 250); background: oklch(0.25 0.075 250); }
	.task-copy mark { max-width: 58rem; margin-top: .65rem; padding: .55rem .65rem; border: 1px solid oklch(0.48 0.11 29); background: oklch(0.25 0.07 28); color: oklch(0.87 0.08 61); font-size: .73rem; line-height: 1.5; }
	.task-copy mark b { display: inline-grid; width: 1rem; height: 1rem; place-items: center; margin-right: .45rem; border: 1px solid currentColor; font-size: .62rem; }
	.task-copy small { margin-top: .55rem; color: var(--grave-gold); font-size: .67rem; font-weight: 650; }
	.task--done .task-copy strong, .task--done .task-copy > span:nth-child(2) { opacity: .5; text-decoration: line-through; }
	.source-note { padding: 1rem; color: var(--muted); font-size: .7rem; line-height: 1.55; }
	.source-note a { color: var(--grave-gold); text-underline-offset: .2em; }
	@media (max-width: 54rem) { .guide-layout { grid-template-columns: 1fr; } .route-index { display: none; } }
	@media (max-width: 40rem) { .guide-hero, .danger-grid { grid-template-columns: 1fr; } .progress-window { width: 100%; } .danger-grid div + div { border-top: 1px solid var(--border); border-left: 0; } .task-list label { grid-template-columns: 2.25rem minmax(0, 1fr); gap: .8rem; } }
</style>

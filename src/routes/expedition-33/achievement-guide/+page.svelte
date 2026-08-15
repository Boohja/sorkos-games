<script lang="ts">
	import { onMount } from 'svelte';
	import { acts, missableSteps, totalSteps, type GuideKind } from '$lib/data/expedition-33/achievement-guide';

	let { data } = $props();
	const storageKey = $derived(data.sync.storageKey);
	let completed = $state<string[]>([]);
	let ready = $state(false);
	const completedCount = $derived(completed.length);
	const progress = $derived(Math.round((completedCount / totalSteps) * 100));
	const kindLabels: Record<GuideKind, string> = {
		achievement: 'Achievement',
		collectible: 'Collection',
		quest: 'Quest',
		checkpoint: 'Checkpoint'
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
	<title>Achievement Guide | Clair Obscur: Expedition 33</title>
	<meta name="description" content="An act-ordered Clair Obscur: Expedition 33 achievement guide with persistent checklists, collectibles and prominent missable warnings." />
</svelte:head>

<div class="expedition-guide shell">
	<header class="guide-hero">
		<div class="guide-heading">
			<p>Expedition records</p>
			<h1>Achievement Guide</h1>
			<span>55 achievements · Prologue through Act 3</span>
		</div>

		<div class="progress-panel" aria-label="Guide progress">
			<div class="progress-panel__heading"><span>Completion</span><b>{ready ? progress : 0}%</b></div>
			<div class="progress-track" aria-hidden="true"><i style:width={`${ready ? progress : 0}%`}></i></div>
			<div class="progress-panel__footer">
				<span>{ready ? completedCount : 0} / {totalSteps} checks</span>
				<button type="button" onclick={resetProgress}>Reset</button>
			</div>
		</div>
	</header>

	<section class="missable-notice" aria-labelledby="missable-title">
		<div class="warning-mark" aria-hidden="true">!</div>
		<div>
			<h2 id="missable-title">Missables are marked at the moment they matter</h2>
			<p>{missableSteps} progression-sensitive checks are called out below. Read each red warning before finishing its act or named boss sequence.</p>
		</div>
	</section>

	<div class="guide-layout">
		<aside class="act-index" aria-label="Guide acts">
			<p>Journey</p>
			<nav>
				{#each acts as act}
					<a href={`#${act.id}`}><span>{act.label}</span><b>{act.steps.length}</b></a>
				{/each}
			</nav>
			<div class="index-key">
				<span><i></i> Missable</span>
				<span><i></i> Achievement</span>
				<span><i></i> Collection / quest</span>
			</div>
		</aside>

		<main class="act-content">
			{#each acts as act}
				<section class="act-section" id={act.id} aria-labelledby={`${act.id}-title`}>
					<header class="act-header">
						<span>{act.label}</span>
						<h2 id={`${act.id}-title`}>{act.title}</h2>
						<p>{act.intro}</p>
					</header>

					<ul class="guide-list">
						{#each act.steps as step}
							<li class:step--complete={completed.includes(step.id)} class:step--missable={step.missable}>
								<label>
									<input type="checkbox" checked={completed.includes(step.id)} onchange={() => toggleStep(step.id)} />
									<span class="check-mark" aria-hidden="true"><i></i></span>
									<span class="step-copy">
										<span class="step-meta">
											<em class={`kind kind--${step.kind}`}>{kindLabels[step.kind]}</em>
											{#if step.missable}<em class="missable-tag">Missable</em>{/if}
										</span>
										<strong>{step.title}</strong>
										<span class="step-detail">{step.detail}</span>
										{#if step.warning}
											<mark><b aria-hidden="true">!</b><span>{step.warning}</span></mark>
										{/if}
									</span>
								</label>
							</li>
						{/each}
					</ul>
				</section>
			{/each}

			<footer class="source-note">
				Route and details condensed from Llamakazi’s
				<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3469875590" target="_blank" rel="noreferrer">100% achievement and missables guide</a>.
			</footer>
		</main>
	</div>
</div>

<style>
	.expedition-guide { padding-block: clamp(2.25rem, 5vw, 4.5rem); }
	.guide-hero { display: grid; grid-template-columns: minmax(0, 1fr) 17rem; gap: clamp(2rem, 7vw, 6rem); align-items: end; margin-bottom: 1.5rem; }
	.guide-heading > p { margin-bottom: .45rem; color: var(--expedition-gold); font-family: Georgia, 'Times New Roman', serif; font-size: 1rem; }
	.guide-heading h1 { max-width: 12ch; margin-bottom: .6rem; color: oklch(0.95 0.035 78); font-family: Georgia, 'Times New Roman', serif; font-size: clamp(3.1rem, 7vw, 5.75rem); font-weight: 500; line-height: .96; letter-spacing: -.035em; text-shadow: 0 2px 1px oklch(0.03 0 0); }
	.guide-heading > span { color: var(--muted); font-size: .78rem; }
	.progress-panel { position: relative; padding: 1rem 1.1rem; background: var(--game-panel-surface); clip-path: polygon(.85rem 0, 100% 0, 100% calc(100% - .85rem), calc(100% - .85rem) 100%, 0 100%, 0 .85rem); }
	.progress-panel::before { position: absolute; inset: .35rem; pointer-events: none; background: linear-gradient(90deg, var(--border) 0 63%, transparent 63%) top / 100% 1px no-repeat, linear-gradient(90deg, transparent 0 22%, var(--border) 22%) bottom / 100% 1px no-repeat; content: ''; }
	.progress-panel__heading, .progress-panel__footer { position: relative; display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; }
	.progress-panel__heading span { color: var(--expedition-gold); font-family: Georgia, 'Times New Roman', serif; }
	.progress-panel__heading b { color: var(--ink); font: 500 2rem Georgia, 'Times New Roman', serif; }
	.progress-track { position: relative; height: .34rem; margin: .85rem 0; background: oklch(0.22 0.035 315); }
	.progress-track i { display: block; height: 100%; background: var(--expedition-purple); transition: width var(--transition-fast); }
	.progress-panel__footer { color: var(--muted); font-size: .7rem; }
	.progress-panel button { padding: .25rem .5rem; border: 0; background: transparent; color: var(--muted); cursor: pointer; }
	.progress-panel button:hover { color: var(--ink); }
	.missable-notice { display: grid; grid-template-columns: 2.5rem minmax(0, 1fr); gap: 1rem; align-items: center; margin-bottom: clamp(2rem, 5vw, 3.5rem); padding: 1rem 1.25rem; background: color-mix(in oklch, oklch(0.16 0.055 25) var(--game-panel-strong-opacity), transparent); clip-path: polygon(.85rem 0, 100% 0, 100% calc(100% - .85rem), calc(100% - .85rem) 100%, 0 100%, 0 .85rem); }
	.warning-mark { display: grid; width: 2.15rem; height: 2.15rem; place-items: center; border: 1px solid oklch(0.78 0.16 48); color: oklch(0.9 0.12 70); font-weight: 800; transform: rotate(45deg); }
	.warning-mark::first-letter { display: block; transform: rotate(-45deg); }
	.missable-notice h2 { margin-bottom: .2rem; color: oklch(0.9 0.1 70); font-family: Georgia, 'Times New Roman', serif; font-size: 1.05rem; font-weight: 500; }
	.missable-notice p { max-width: 65rem; margin: 0; color: oklch(0.78 0.055 60); font-size: .76rem; line-height: 1.5; }
	.guide-layout { display: grid; grid-template-columns: 11rem minmax(0, 1fr); gap: clamp(2rem, 6vw, 5rem); align-items: start; }
	.act-index { position: sticky; top: calc(var(--site-header-height) + 1.5rem); }
	.act-index > p { margin: 0 0 .55rem; color: var(--expedition-gold); font: 500 .9rem Georgia, 'Times New Roman', serif; }
	.act-index nav { border-top: 1px solid var(--border); }
	.act-index a { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .7rem .15rem; border-bottom: 1px solid color-mix(in oklch, var(--border) 62%, transparent); color: var(--muted); font-size: .75rem; text-decoration: none; }
	.act-index a:hover { color: var(--ink); }
	.act-index a b { color: var(--expedition-gold); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .65rem; }
	.index-key { display: grid; gap: .5rem; margin-top: 1.25rem; color: var(--muted); font-size: .65rem; }
	.index-key span { display: flex; align-items: center; gap: .5rem; }
	.index-key i { width: .55rem; height: .55rem; background: var(--expedition-danger); transform: rotate(45deg); }
	.index-key span:nth-child(2) i { background: var(--expedition-purple); }
	.index-key span:nth-child(3) i { background: var(--expedition-gold); }
	.act-content { display: grid; min-width: 0; gap: 1.5rem; }
	.act-section { scroll-margin-top: calc(var(--site-header-height) + 1rem); background: var(--game-panel-surface); clip-path: polygon(.85rem 0, 100% 0, 100% calc(100% - .85rem), calc(100% - .85rem) 100%, 0 100%, 0 .85rem); }
	.act-header { position: relative; padding: clamp(1.4rem, 4vw, 2.2rem); background: linear-gradient(100deg, color-mix(in oklch, oklch(0.2 0.058 315) var(--game-panel-strong-opacity), transparent), color-mix(in oklch, oklch(0.11 0.025 308) var(--game-panel-strong-opacity), transparent)); }
	.act-header::after { position: absolute; right: 1.25rem; bottom: 0; left: 1.25rem; height: 1px; background: linear-gradient(90deg, var(--border) 0 42%, transparent 42% 49%, var(--border) 49% 88%, transparent 88%); content: ''; }
	.act-header > span { color: var(--expedition-gold); font: 500 .82rem Georgia, 'Times New Roman', serif; }
	.act-header h2 { margin: .25rem 0 .55rem; color: oklch(0.94 0.035 78); font: 500 clamp(1.65rem, 4vw, 2.35rem) Georgia, 'Times New Roman', serif; letter-spacing: -.02em; }
	.act-header p { max-width: 65rem; margin: 0; color: var(--muted); font-size: .8rem; line-height: 1.58; }
	.guide-list { margin: 0; padding: .65rem clamp(.8rem, 3vw, 1.4rem) 1rem; list-style: none; }
	.guide-list li { position: relative; border-bottom: 1px solid color-mix(in oklch, var(--border) 42%, transparent); }
	.guide-list li:last-child { border-bottom: 0; }
	.guide-list .step--missable { margin-inline: -.35rem; padding-inline: .35rem; background: linear-gradient(90deg, oklch(0.23 0.075 25 / .7), transparent 72%); }
	.guide-list label { display: grid; grid-template-columns: 2.1rem minmax(0, 1fr); gap: .9rem; padding: 1rem .2rem; cursor: pointer; }
	.guide-list input { position: absolute; opacity: 0; }
	.check-mark { position: relative; width: 1.65rem; height: 1.65rem; margin: .25rem; background: oklch(0.15 0.025 310); outline: 1px solid var(--border); transform: rotate(45deg); }
	.check-mark::after { position: absolute; inset: .22rem; border: 1px solid color-mix(in oklch, var(--border) 58%, transparent); content: ''; }
	.guide-list input:focus-visible + .check-mark { outline: 3px solid var(--focus); outline-offset: 3px; }
	.step--complete .check-mark { background: var(--expedition-purple); }
	.step--complete .check-mark i { position: absolute; z-index: 1; top: .3rem; left: .54rem; width: .35rem; height: .7rem; border: solid var(--ink); border-width: 0 2px 2px 0; transform: rotate(0deg); }
	.step-copy, .step-detail, .step-copy mark { display: block; }
	.step-meta { display: flex; flex-wrap: wrap; gap: .35rem; margin-bottom: .38rem; }
	.kind, .missable-tag { padding: .12rem .35rem; font-size: .58rem; font-style: normal; font-weight: 760; letter-spacing: .035em; text-transform: uppercase; }
	.kind { color: oklch(0.82 0.05 320); background: oklch(0.25 0.07 320); }
	.kind--collectible, .kind--quest { color: oklch(0.88 0.08 78); background: oklch(0.25 0.055 75); }
	.kind--checkpoint { color: oklch(0.81 0.04 210); background: oklch(0.23 0.045 220); }
	.missable-tag { color: oklch(0.92 0.1 65); background: oklch(0.4 0.13 25); }
	.step-copy > strong { display: block; color: oklch(0.93 0.035 78); font-family: Georgia, 'Times New Roman', serif; font-size: 1.02rem; font-weight: 500; }
	.step-detail { max-width: 65rem; margin-top: .3rem; color: var(--muted); font-size: .79rem; line-height: 1.55; }
	.step-copy mark { display: grid; grid-template-columns: 1.25rem minmax(0, 1fr); gap: .55rem; max-width: 62rem; margin-top: .65rem; padding: .6rem .7rem; background: color-mix(in oklch, oklch(0.22 0.07 25) var(--game-panel-strong-opacity), transparent); color: oklch(0.84 0.065 60); font-size: .72rem; line-height: 1.48; }
	.step-copy mark b { display: grid; width: 1.05rem; height: 1.05rem; place-items: center; border: 1px solid currentColor; font-size: .65rem; }
	.step--complete .step-copy > strong, .step--complete .step-detail { opacity: .48; text-decoration: line-through; }
	.source-note { padding: 1rem; color: var(--muted); font-size: .7rem; line-height: 1.55; }
	.source-note a { color: var(--expedition-gold); text-underline-offset: .2em; }
	@media (max-width: 54rem) { .guide-layout { grid-template-columns: 1fr; } .act-index { display: none; } }
	@media (max-width: 40rem) { .guide-hero { grid-template-columns: 1fr; gap: 1.4rem; } .progress-panel { width: 100%; } .missable-notice { grid-template-columns: 1fr; } .guide-list label { grid-template-columns: 1.9rem minmax(0, 1fr); gap: .7rem; } }
</style>

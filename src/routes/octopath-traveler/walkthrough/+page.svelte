<script lang="ts">
	import { onMount } from 'svelte';
	import { milestones, regularJobs, secretJobs, sections, totalChecklistItems } from '$lib/data/octopath-traveler/walkthrough';

	let { data } = $props();
	const storageKey = $derived(data.sync.storageKey);
	let completed = $state<string[]>([]);
	let ready = $state(false);
	const progress = $derived(Math.round((completed.length / totalChecklistItems) * 100));

	onMount(() => {
		try {
			const saved = localStorage.getItem(storageKey);
			completed = saved ? JSON.parse(saved) : [];
		} catch {
			completed = [];
		}
		ready = true;
	});

	function toggleItem(id: string) {
		completed = completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id];
		localStorage.setItem(storageKey, JSON.stringify(completed));
	}

	function resetProgress() {
		completed = [];
		localStorage.removeItem(storageKey);
	}
</script>

<svelte:head>
	<title>Achievement Walkthrough | Octopath Traveler</title>
	<meta name="description" content="A concise achievement route for Octopath Traveler, with missables, jobs, cleanup and the true ending." />
</svelte:head>

<div class="shell octopath-guide">
	<header class="guide-hero">
		<div>
			<h1>Achievement Walkthrough</h1>
		</div>
		<div class="guide-progress" aria-label="Walkthrough progress">
			<span>{ready ? completed.length : 0} / {totalChecklistItems}</span>
			<strong>{ready ? progress : 0}%</strong>
			<div aria-hidden="true"><i style:width={`${ready ? progress : 0}%`}></i></div>
			<button type="button" onclick={resetProgress}>Reset</button>
		</div>
	</header>

	<section class="missable" aria-labelledby="missable-title">
		<p>One known missable</p>
		<h2 id="missable-title">Take the Obsidian Garb before Primrose Chapter 3 ends.</h2>
		<span>Let the boss summon adds, then Steal the Garb from them. Save before the fight and do not burst the boss down first.</span>
	</section>

	<div class="guide-layout">
		<aside class="guide-index" aria-label="Achievement sections">
			<p>Route</p>
			{#each sections as section}
				<a href={`#${section.id}`}>{section.label}</a>
			{/each}
		</aside>

		<div class="guide-content">
			{#each sections as section}
				<section class="guide-section" id={section.id} aria-labelledby={`${section.id}-title`}>
					<header>
						<p>{section.label}</p>
						<h2 id={`${section.id}-title`}>{section.title}</h2>
						<span>{section.intro}</span>
					</header>

					{#if section.id === 'jobs'}
						<details class="reference-panel">
							<summary><span>Regular shrine locations</span><b aria-hidden="true">+</b></summary>
							<div class="reference-table">
								{#each regularJobs as job}
									<div><strong>{job.job}</strong><span>{job.shrine}<br />{job.location}</span><small>Lv. {job.level}</small></div>
								{/each}
							</div>
						</details>
						<details class="reference-panel">
							<summary><span>Secret job bosses</span><b aria-hidden="true">+</b></summary>
							<div class="reference-table">
								{#each secretJobs as job}
									<div><strong>{job.job}</strong><span>{job.location}</span><small>{job.boss} · Lv. 50</small></div>
								{/each}
							</div>
						</details>
					{/if}

					{#if section.id === 'cleanup'}
						<div class="milestone-strip">
							{#each milestones as milestone}
								<div><span>{milestone.label}</span><strong>{milestone.values}</strong></div>
							{/each}
						</div>
					{/if}

					<ul class="task-list">
						{#each section.items as item}
							<li class:complete={completed.includes(item.id)}>
								<label>
									<input type="checkbox" checked={completed.includes(item.id)} onchange={() => toggleItem(item.id)} />
									<i aria-hidden="true"></i>
									<span><strong>{item.title}</strong><small>{item.detail}</small>{#if item.note}<em>{item.note}</em>{/if}</span>
								</label>
							</li>
						{/each}
					</ul>
				</section>
			{/each}

			<footer class="source-note">
				Credits to: Kommissar K · <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=1777426443" target="_blank" rel="noreferrer">Achievement guide</a>
			</footer>
		</div>
	</div>
</div>

<style>
	.octopath-guide { padding-block: clamp(2.5rem, 6vw, 5rem); }
	.guide-hero { display: grid; grid-template-columns: minmax(0, 1fr) 12rem; gap: 3rem; align-items: end; margin-bottom: 2rem; }
	.guide-section header > p, .guide-index > p, .missable > p { margin: 0 0 .6rem; color: var(--accent); font-size: .7rem; font-weight: 750; letter-spacing: .12em; text-transform: uppercase; }
	.guide-hero h1 { max-width: 14ch; margin-bottom: 0; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(3.25rem, 7.5vw, 6rem); font-weight: 400; letter-spacing: -.04em; }
	.guide-progress { padding: 1rem; border: 1px solid var(--border); background: var(--game-panel-surface); backdrop-filter: blur(12px); }
	.guide-progress > span { color: var(--muted); font-size: .76rem; }
	.guide-progress > strong { display: block; margin: .25rem 0 .75rem; font-size: 2rem; font-weight: 500; }
	.guide-progress > div { height: 2px; background: var(--border); }
	.guide-progress i { display: block; height: 100%; background: var(--accent); transition: width var(--transition-fast); }
	.guide-progress button { margin-top: .8rem; padding: 0; border: 0; background: none; color: var(--muted); cursor: pointer; font-size: .75rem; }
	.missable { margin-bottom: 2rem; padding: clamp(1.25rem, 4vw, 2rem); border: 1px solid oklch(0.67 0.14 65); background: color-mix(in oklch, oklch(0.18 0.05 50) var(--game-panel-strong-opacity), transparent); backdrop-filter: blur(12px); }
	.missable > p { color: oklch(0.82 0.13 75); }
	.missable h2 { margin-bottom: .45rem; font-family: Georgia, 'Times New Roman', serif; font-weight: 500; }
	.missable span { color: oklch(0.83 0.04 75); line-height: 1.55; }
	.guide-layout { display: grid; grid-template-columns: 10rem minmax(0, 1fr); gap: clamp(2rem, 6vw, 5rem); align-items: start; }
	.guide-index { position: sticky; top: calc(var(--site-header-height) + 2rem); padding-top: 1rem; border-top: 1px solid var(--border); }
	.guide-index a { display: block; padding: .4rem 0; color: var(--muted); font-size: .8rem; text-decoration: none; }
	.guide-index a:hover { color: var(--accent); }
	.guide-content { display: grid; min-width: 0; gap: 1.25rem; }
	.guide-section { border: 1px solid var(--border); background: var(--game-panel-surface); box-shadow: 0 1.5rem 4rem oklch(0.06 0.02 250 / .3); backdrop-filter: blur(14px); }
	.guide-section > header { padding: clamp(1.25rem, 4vw, 2rem); border-bottom: 1px solid var(--border); }
	.guide-section h2 { margin-bottom: .45rem; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(1.8rem, 4vw, 2.7rem); font-weight: 400; }
	.guide-section { scroll-margin-top: calc(var(--site-header-height) + 1rem); }
	.guide-section header > span { display: block; max-width: 48rem; color: var(--muted); line-height: 1.6; }
	.task-list { margin: 0; padding: 0 clamp(1.25rem, 4vw, 2rem); list-style: none; }
	.task-list li { border-bottom: 1px solid var(--border); }
	.task-list li:last-child { border-bottom: 0; }
	.task-list label { display: grid; grid-template-columns: 1rem minmax(0, 1fr); gap: 1rem; padding: 1.15rem 0; cursor: pointer; }
	.task-list input { position: absolute; opacity: 0; }
	.task-list label > i { position: relative; width: 1rem; height: 1rem; margin-top: .15rem; border: 1px solid var(--muted); }
	.task-list input:focus-visible + i { outline: 3px solid var(--focus); outline-offset: 3px; }
	.task-list .complete label > i { border-color: var(--accent); background: var(--accent); }
	.task-list .complete label > i::after { position: absolute; top: .06rem; left: .28rem; width: .25rem; height: .52rem; border: solid var(--accent-ink); border-width: 0 2px 2px 0; content: ''; transform: rotate(45deg); }
	.task-list label > span, .task-list small, .task-list em { display: block; }
	.task-list small { max-width: 52rem; margin-top: .3rem; color: var(--muted); font-size: .82rem; line-height: 1.55; }
	.task-list em { margin-top: .45rem; color: oklch(0.82 0.13 75); font-size: .75rem; font-style: normal; font-weight: 700; }
	.task-list .complete strong, .task-list .complete small { opacity: .55; text-decoration: line-through; }
	.reference-panel { border-bottom: 1px solid var(--border); }
	.reference-panel summary { display: flex; align-items: center; justify-content: space-between; padding: 1rem clamp(1.25rem, 4vw, 2rem); background: color-mix(in oklch, var(--game-panel-strong-color) var(--game-navigation-hover-opacity), transparent); cursor: pointer; list-style: none; }
	.reference-panel summary::-webkit-details-marker { display: none; }
	.reference-panel summary b { color: var(--accent); font-size: 1.25rem; font-weight: 400; transition: transform var(--transition-fast); }
	.reference-panel[open] summary b { transform: rotate(45deg); }
	.reference-table > div { display: grid; grid-template-columns: minmax(7rem, .45fr) minmax(0, 1fr) auto; gap: 1rem; padding: .8rem clamp(1.25rem, 4vw, 2rem); border-top: 1px solid var(--border); align-items: center; }
	.reference-table span, .reference-table small { color: var(--muted); font-size: .76rem; line-height: 1.45; }
	.milestone-strip { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-bottom: 1px solid var(--border); }
	.milestone-strip div { padding: 1rem clamp(1.25rem, 4vw, 2rem); border-right: 1px solid var(--border); border-top: 1px solid var(--border); }
	.milestone-strip div:nth-child(2n) { border-right: 0; }
	.milestone-strip span, .milestone-strip strong { display: block; }
	.milestone-strip span { margin-bottom: .25rem; color: var(--accent); font-size: .68rem; text-transform: uppercase; }
	.milestone-strip strong { font-size: .82rem; }
	.source-note { padding: 1rem; color: var(--muted); font-size: .72rem; line-height: 1.55; }
	.source-note a { color: var(--ink); text-underline-offset: .2em; }
	@media (max-width: 54rem) { .guide-layout { grid-template-columns: 1fr; } .guide-index { display: none; } }
	@media (max-width: 40rem) { .guide-hero { grid-template-columns: 1fr; gap: 1.5rem; } .guide-progress { width: 100%; } .reference-table > div { grid-template-columns: 1fr auto; } .reference-table span { grid-column: 1 / -1; grid-row: 2; } .milestone-strip { grid-template-columns: 1fr; } .milestone-strip div { border-right: 0; } }
</style>

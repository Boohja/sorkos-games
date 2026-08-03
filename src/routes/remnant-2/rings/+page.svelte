<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { rings, ringSource } from '$lib/data/remnant-2/rings';
	import { statusEffects, type RingStatusId } from '$lib/data/remnant-2/statuses';

	const storageKey = 'games.sorkos.net:remnant-2:owned-rings';
	const presetFilters = [
		'Heavy Weapon',
		'Dodge',
		'Lifesteal',
		'Health',
		'Critical Chance',
		'Critical Damage',
		'Revive',
		'Melee',
		'Stamina',
		'Max Health',
		'Grey Health',
		'Cooldown',
		'Skills',
		'Reload Speed',
		'Explosive',
		'Relic',
		'Charged Melee',
		'Health Regeneration',
		'Ranged Damage',
		'Resistance',
		'Fire Rate',
		'Ammo Reserves',
		'Consumable',
		'Max Stamina',
		'Endurance',
		'Damage Reduction',
		'Encumbrance',
		'Weakspot',
		'Ammo',
		'Stacks',
		'Mod Power'
	].sort((left, right) => left.localeCompare(right));
	let search = $state('');
	let collectionFilter = $state<'all' | 'owned' | 'missing'>('all');
	let viewMode = $state<'grid' | 'table'>('grid');
	let selectedStatuses = $state<RingStatusId[]>([]);
	let owned = $state<string[]>([]);
	let hasLoadedOwnership = $state(false);
	let facetsExpanded = $state(true);
	const availableStatusEffects = statusEffects.filter((status) =>
		rings.some((ring) => ring.statuses.includes(status.id))
	);

	const filteredRings = $derived(
		rings.filter((ring) => {
			const query = search.trim().toLocaleLowerCase();
			const matchesSearch =
				query.length === 0 ||
				ring.name.toLocaleLowerCase().includes(query) ||
				ring.effect.toLocaleLowerCase().includes(query);
			const isOwned = owned.includes(ring.id);
			const matchesCollection =
				collectionFilter === 'all' ||
				(collectionFilter === 'owned' && isOwned) ||
				(collectionFilter === 'missing' && !isOwned);
			const matchesStatus =
				selectedStatuses.length === 0 ||
				selectedStatuses.some((status) => ring.statuses.includes(status));
			return matchesSearch && matchesCollection && matchesStatus;
		})
	);

	const ownedCount = $derived(rings.filter((ring) => owned.includes(ring.id)).length);

	onMount(() => {
		facetsExpanded = window.matchMedia('(min-width: 48.01rem)').matches;

		try {
			const saved = localStorage.getItem(storageKey);
			owned = saved ? JSON.parse(saved) : [];
		} catch {
			owned = [];
		} finally {
			hasLoadedOwnership = true;
		}
	});

	$effect(() => {
		if (browser && hasLoadedOwnership) {
			localStorage.setItem(storageKey, JSON.stringify(owned));
		}
	});

	function toggleOwned(id: string) {
		owned = owned.includes(id) ? owned.filter((item) => item !== id) : [...owned, id];
	}

	function scrollToPageTop() {
		if (!browser) return;

		window.scrollTo({
			top: 0,
			behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
		});
	}

	function resetFilters() {
		search = '';
		collectionFilter = 'all';
		selectedStatuses = [];
		scrollToPageTop();
	}

	function setCollectionFilter(filter: 'all' | 'owned' | 'missing') {
		collectionFilter = filter;
		scrollToPageTop();
	}

	function toggleStatus(status: RingStatusId) {
		selectedStatuses = selectedStatuses.includes(status)
			? selectedStatuses.filter((item) => item !== status)
			: [...selectedStatuses, status];
		scrollToPageTop();
	}

	function toggleTextFilter(filter: string) {
		search = search.toLocaleLowerCase() === filter.toLocaleLowerCase() ? '' : filter;
		scrollToPageTop();
	}
</script>

<svelte:head>
	<title>Rings | Remnant II</title>
	<meta
		name="description"
		content="Search and filter Remnant II rings and track the ones you own locally."
	/>
</svelte:head>

<div class="shell rings-page">
	<header class="rings-header">
		<div class="rings-title">
			<h1>Rings</h1>
			<p class="collection-count" aria-live="polite">
				<strong>{ownedCount}</strong>
				<span>of {rings.length} owned</span>
			</p>
		</div>
	</header>

	<section class="text-card filters" aria-labelledby="filter-title">
		<div class="field filter-search">
			<label class="field__label" id="filter-title" for="ring-search"
				>Search by name or effect</label
			>
			<input
				class="input"
				id="ring-search"
				type="search"
				bind:value={search}
				oninput={scrollToPageTop}
			/>
			<button
				class="filter-toggle"
				type="button"
				aria-controls="additional-ring-filters"
				aria-expanded={facetsExpanded}
				onclick={() => (facetsExpanded = !facetsExpanded)}
			>
				{facetsExpanded ? 'Hide filters' : 'Show filters'}
				<span aria-hidden="true">{facetsExpanded ? '\u2212' : '+'}</span>
			</button>
		</div>

		<div id="additional-ring-filters" class="additional-filters" hidden={!facetsExpanded}>
			<fieldset class="status-filter-group">
				<legend class="visually-hidden">Status effects</legend>
				<div class="status-filter-list">
					{#each availableStatusEffects as status}
						<button
							class={`facet-filter status-filter status--${status.id}`}
							type="button"
							aria-pressed={selectedStatuses.includes(status.id)}
							onclick={() => toggleStatus(status.id)}>{status.label}</button
						>
					{/each}
				</div>
			</fieldset>

			<fieldset class="text-filter-group">
				<legend class="visually-hidden">Effect keywords</legend>
				<div class="text-filter-list">
					{#each presetFilters as filter}
						<button
							class="facet-filter text-filter"
							type="button"
							aria-pressed={search.toLocaleLowerCase() === filter.toLocaleLowerCase()}
							onclick={() => toggleTextFilter(filter)}>{filter}</button
						>
					{/each}
				</div>
			</fieldset>
		</div>
	</section>

	<div class="results-heading">
		<p class="visually-hidden" aria-live="polite">
			{filteredRings.length} {filteredRings.length === 1 ? 'ring' : 'rings'}
		</p>
		<fieldset class="results-collection-filter">
			<legend class="visually-hidden">Collection</legend>
			<div class="tabs collection-filters">
				<button
					class="tabs__button"
					type="button"
					aria-pressed={collectionFilter === 'all'}
					onclick={() => setCollectionFilter('all')}>All</button
				>
				<button
					class="tabs__button"
					type="button"
					aria-pressed={collectionFilter === 'owned'}
					onclick={() => setCollectionFilter('owned')}>Owned</button
				>
				<button
					class="tabs__button"
					type="button"
					aria-pressed={collectionFilter === 'missing'}
					onclick={() => setCollectionFilter('missing')}>Missing</button
				>
			</div>
		</fieldset>
		<div class="results-actions">
			{#if search || collectionFilter !== 'all' || selectedStatuses.length}
				<button class="button button--text button--small" type="button" onclick={resetFilters}
					>Clear filters</button
				>
			{/if}
			<div class="tabs view-tabs" aria-label="Ring view">
				<button
					class="tabs__button"
					type="button"
					aria-pressed={viewMode === 'grid'}
					onclick={() => (viewMode = 'grid')}>Grid</button
				>
				<button
					class="tabs__button"
					type="button"
					aria-pressed={viewMode === 'table'}
					onclick={() => (viewMode = 'table')}>Table</button
				>
			</div>
		</div>
	</div>

	{#if filteredRings.length}
		{#if viewMode === 'grid'}
			<ul class="ring-grid">
				{#each filteredRings as ring (ring.id)}
					<li class="item-card ring-card" data-selected={owned.includes(ring.id)}>
						<a
							class="ring-card__link"
							href={ring.wikiUrl}
							target="_blank"
							rel="noreferrer"
						>
							<header class="item-card__header">
								<h2>{ring.name}</h2>
							</header>
							<div class="item-card__media">
								<img
									class="ring-image"
									src={ring.image.src}
									alt=""
									width={ring.image.width}
									height={ring.image.height}
									loading="lazy"
									decoding="async"
								/>
							</div>
							<div class="item-card__content">
								<!-- Generated from escaped ring text plus controlled status span classes. -->
								<p>{@html ring.effectHtml}</p>
							</div>
						</a>
						<footer class="item-card__footer">
							<label class="choice ownership">
								<input
									type="checkbox"
									checked={owned.includes(ring.id)}
									onchange={() => toggleOwned(ring.id)}
								/>
								<span>{owned.includes(ring.id) ? 'Owned' : 'Not owned'}</span>
							</label>
						</footer>
					</li>
				{/each}
			</ul>
		{:else}
			<div class="ring-table-scroll">
				<ul class="ring-table">
					{#each filteredRings as ring (ring.id)}
						<li class="ring-table__row" data-selected={owned.includes(ring.id)}>
							<label class="choice ring-table__ownership">
								<input
									type="checkbox"
									checked={owned.includes(ring.id)}
									onchange={() => toggleOwned(ring.id)}
								/>
								<span class="visually-hidden"
									>{owned.includes(ring.id) ? `Mark ${ring.name} as not owned` : `Mark ${ring.name} as owned`}</span
								>
							</label>
							<a
								class="ring-table__link"
								href={ring.wikiUrl}
								target="_blank"
								rel="noreferrer"
							>
								<img
									class="ring-table__image"
									src={ring.image.src}
									alt=""
									width={ring.image.width}
									height={ring.image.height}
									loading="lazy"
									decoding="async"
								/>
								<strong class="ring-table__name">{ring.name}</strong>
								<p class="ring-table__effect">{@html ring.effectHtml}</p>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	{:else}
		<div class="text-card empty-state">
			<h2>No rings match those filters.</h2>
			<p>Try removing an effect or searching for a broader term.</p>
			<button class="button button--primary" type="button" onclick={resetFilters}
				>Reset filters</button
			>
		</div>
	{/if}

	<p class="data-note">
		Ring names, effects, and images are sourced from
		<a class="link" href={ringSource.url} target="_blank" rel="noreferrer">Remnant 2 Wiki</a>
		under
		<a class="link" href={ringSource.licenseUrl} target="_blank" rel="noreferrer"
			>{ringSource.license}</a
		>.
		Retrieved {ringSource.retrievedAt.slice(0, 10)}.
	</p>
</div>

<style>
	.rings-page {
		padding-block: clamp(2.5rem, 6vw, 5rem);
	}

	.rings-header {
		margin-bottom: 2.5rem;
	}

	.rings-title {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 2rem;
		align-items: end;
	}

	.rings-title h1 {
		max-width: none;
		margin-bottom: 0;
		font-size: clamp(2.25rem, 5vw, 3.75rem);
		line-height: 1;
	}

	.collection-count {
		display: grid;
		margin: 0;
		text-align: right;
	}

	.collection-count strong {
		color: var(--accent);
		font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
		font-size: 2rem;
	}

	.collection-count span {
		color: var(--muted);
		font-size: 0.82rem;
	}

	.filters {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1.5rem;
		position: sticky;
		z-index: 5;
		top: 1rem;
	}

	.filter-search,
	fieldset {
		min-width: 0;
	}

	fieldset {
		margin: 0;
		padding: 0;
		border: 0;
	}

	.filter-search {
		max-width: 32rem;
	}

	.filter-toggle {
		display: inline-flex;
		width: fit-content;
		align-items: center;
		gap: 0.45rem;
		padding: 0.15rem 0;
		border: 0;
		background: transparent;
		color: var(--muted);
		cursor: pointer;
		font-size: 0.78rem;
		font-weight: 650;
		transition: color var(--transition-fast);
	}

	.filter-toggle:hover {
		color: var(--ink);
	}

	.filter-toggle span {
		color: var(--accent);
		font-size: 1rem;
		line-height: 1;
	}

	.additional-filters {
		display: grid;
		gap: 1.5rem;
	}

	.additional-filters[hidden] {
		display: none;
	}

	.status-filter-list,
	.text-filter-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: 0;
	}

	.results-heading {
		display: flex;
		min-height: 4.5rem;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
		border-bottom: 1px solid var(--border);
	}

	.results-collection-filter {
		align-self: stretch;
	}

	.collection-filters {
		height: 100%;
		gap: 1.5rem;
		border-bottom: 0;
	}

	.results-actions {
		display: flex;
		flex: 1;
		align-items: flex-end;
		align-self: stretch;
		gap: 1.25rem;
		min-width: 0;
	}

	.view-tabs {
		flex: 1;
		align-self: stretch;
		gap: 1.5rem;
		justify-content: flex-end;
		border-bottom: 0;
	}

	.view-tabs .tabs__button {
		min-height: 2.5rem;
	}

	.ring-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.75rem;
		margin: 1rem 0 0;
		padding: 0;
		list-style: none;
	}

	.ring-card {
		display: grid;
		grid-template-rows: 1fr auto;
		min-height: 22rem;
	}

	.ring-card__link {
		display: grid;
		grid-template-rows: auto 9rem 1fr;
		min-width: 0;
		color: inherit;
		text-decoration: none;
	}

	.ring-card__link:focus-visible {
		outline: 2px solid var(--focus);
		outline-offset: -4px;
	}

	.ring-image {
		width: 6.5rem;
		height: 6.5rem;
		object-fit: contain;
	}

	.ring-card .item-card__content p {
		margin: 0;
		color: var(--muted);
		font-size: 0.9rem;
		line-height: 1.55;
	}

	.ring-table-scroll {
		overflow-x: auto;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}

	.ring-table {
		min-width: 42rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.ring-table__row {
		display: grid;
		grid-template-columns: 2.75rem minmax(0, 1fr);
		align-items: stretch;
		border-bottom: 1px solid var(--border);
		background: var(--card-surface, var(--surface));
	}

	.ring-table__row:last-child {
		border-bottom: 0;
	}

	.ring-table__row[data-selected='true'] {
		background: color-mix(in oklch, var(--ink) 6%, var(--card-surface, var(--surface)));
	}

	.ring-table__ownership {
		justify-content: center;
		border-right: 1px solid var(--border);
	}

	.ring-table__link {
		display: grid;
		grid-template-columns: 4.5rem minmax(10rem, 0.65fr) minmax(18rem, 1.6fr);
		align-items: center;
		min-width: 0;
		color: inherit;
		text-decoration: none;
	}

	.ring-table__link:hover {
		background: color-mix(in oklch, var(--ink) 4%, transparent);
	}

	.ring-table__link:focus-visible {
		outline: 2px solid var(--focus);
		outline-offset: -3px;
	}

	.ring-table__image {
		width: 3.25rem;
		height: 3.25rem;
		margin-inline: auto;
		object-fit: contain;
	}

	.ring-table__name,
	.ring-table__effect {
		padding: 0.85rem 1rem;
	}

	.ring-table__name {
		color: var(--ink);
		font-size: 0.9rem;
	}

	.ring-table__effect {
		margin: 0;
		border-left: 1px solid var(--border);
		color: var(--muted);
		font-size: 0.86rem;
		line-height: 1.5;
	}

	.empty-state {
		padding: clamp(2rem, 8vw, 5rem);
		text-align: center;
	}

	.empty-state h2 {
		margin-bottom: 0.5rem;
	}

	.empty-state p {
		color: var(--muted);
	}

	.data-note {
		width: 100%;
		max-width: none;
		margin: 2rem 0 0;
		color: var(--muted);
		font-size: 0.78rem;
		line-height: 1.5;
	}

	.data-note .link {
		font-size: inherit;
	}

	@media (max-width: 48rem) {
		.rings-title,
		.filters {
			grid-template-columns: 1fr;
			position: static;
		}

		.collection-count {
			grid-template-columns: auto 1fr;
			align-items: baseline;
			gap: 0.5rem;
			text-align: left;
		}

		.results-heading {
			flex-wrap: wrap;
		}

		.results-actions {
			width: 100%;
			justify-content: space-between;
		}
	}

	@media (max-width: 64rem) {
		.ring-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media (max-width: 48rem) {
		.ring-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 36rem) {
		.ring-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

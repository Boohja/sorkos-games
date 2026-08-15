<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import SyncControl from '$lib/components/SyncControl.svelte';
	import '../app.css';

	let { children } = $props();
	const currentYear = new Date().getFullYear();
	const isRemnantRoute = $derived(page.url.pathname.startsWith('/remnant-2'));
	const isRemnantLanding = $derived(page.url.pathname.replace(/\/$/, '') === '/remnant-2');
	const isGraceRoute = $derived(page.url.pathname.startsWith('/yes-your-grace'));
	const isGraceLanding = $derived(page.url.pathname.replace(/\/$/, '') === '/yes-your-grace');
	const isOctopathRoute = $derived(page.url.pathname.startsWith('/octopath-traveler'));
	const isOctopathLanding = $derived(
		page.url.pathname.replace(/\/$/, '') === '/octopath-traveler'
	);
	const isBastionRoute = $derived(page.url.pathname.startsWith('/bastion'));
	const isBastionLanding = $derived(page.url.pathname.replace(/\/$/, '') === '/bastion');
	const isGraveyardRoute = $derived(page.url.pathname.startsWith('/graveyard-keeper'));
	const isGraveyardLanding = $derived(
		page.url.pathname.replace(/\/$/, '') === '/graveyard-keeper'
	);
	const isExpeditionRoute = $derived(page.url.pathname.startsWith('/expedition-33'));
	const isExpeditionLanding = $derived(
		page.url.pathname.replace(/\/$/, '') === '/expedition-33'
	);

	onNavigate((navigation) => {
		if (
			!document.startViewTransition ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
	<link rel="manifest" href="/images/favicon/site.webmanifest" />
	<meta name="theme-color" content="#ec4899" />
	<meta
		name="description"
		content="Focused, practical reference tools for the games you play."
	/>
</svelte:head>

<div class="site-shell">
	<header class="site-header">
		<div class="shell site-header__inner">
			<nav class="site-breadcrumb" aria-label="Breadcrumb">
				<a class="brand" href="/" aria-label="Games library, home">
					<img src="/images/logo/landscape_dark_small.svg" alt="Games" width="114" height="34" />
				</a>
				{#if isRemnantRoute}
					<span class="site-breadcrumb__separator" aria-hidden="true">/</span>
					<a
						class="site-breadcrumb__game"
						href="/remnant-2/"
						aria-current={isRemnantLanding ? 'page' : undefined}>Remnant II</a
					>
				{:else if isGraceRoute}
					<span class="site-breadcrumb__separator" aria-hidden="true">/</span>
					<a
						class="site-breadcrumb__game"
						href="/yes-your-grace/"
						aria-current={isGraceLanding ? 'page' : undefined}>Yes, Your Grace</a
					>
				{:else if isOctopathRoute}
					<span class="site-breadcrumb__separator" aria-hidden="true">/</span>
					<a
						class="site-breadcrumb__game"
						href="/octopath-traveler/"
						aria-current={isOctopathLanding ? 'page' : undefined}>Octopath Traveler</a
					>
				{:else if isBastionRoute}
					<span class="site-breadcrumb__separator" aria-hidden="true">/</span>
					<a
						class="site-breadcrumb__game"
						href="/bastion/"
						aria-current={isBastionLanding ? 'page' : undefined}>Bastion</a
					>
				{:else if isGraveyardRoute}
					<span class="site-breadcrumb__separator" aria-hidden="true">/</span>
					<a
						class="site-breadcrumb__game"
						href="/graveyard-keeper/"
						aria-current={isGraveyardLanding ? 'page' : undefined}>Graveyard Keeper</a
					>
				{:else if isExpeditionRoute}
					<span class="site-breadcrumb__separator" aria-hidden="true">/</span>
					<a
						class="site-breadcrumb__game"
						href="/expedition-33/"
						aria-current={isExpeditionLanding ? 'page' : undefined}>Clair Obscur: Expedition 33</a
					>
				{/if}
			</nav>
			<div class="site-header__actions">
				<SyncControl />
			</div>
		</div>
	</header>

	<main class="site-main">{@render children()}</main>

	<footer
		class:site-footer--remnant={isRemnantRoute}
		class:site-footer--grace={isGraceRoute}
		class:site-footer--octopath={isOctopathRoute}
		class:site-footer--bastion={isBastionRoute}
		class:site-footer--graveyard={isGraveyardRoute}
		class:site-footer--expedition={isExpeditionRoute}
		class="site-footer"
	>
		<div class="shell site-footer__inner">
			<p>&copy; {currentYear} by <a href="https://sorkos.net">sorkos.net</a></p>
		</div>
	</footer>
</div>

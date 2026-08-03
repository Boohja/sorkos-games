<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import '../app.css';

	let { children } = $props();
	const currentYear = new Date().getFullYear();
	const isRemnantRoute = $derived(page.url.pathname.startsWith('/remnant-2'));
	const isRemnantLanding = $derived(page.url.pathname.replace(/\/$/, '') === '/remnant-2');

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
				{/if}
			</nav>
		</div>
	</header>

	<main class="site-main">{@render children()}</main>

	<footer class:site-footer--remnant={isRemnantRoute} class="site-footer">
		<div class="shell site-footer__inner">
			<p>&copy; {currentYear} by <a href="https://sorkos.net">sorkos.net</a></p>
		</div>
	</footer>
</div>

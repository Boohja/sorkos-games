<svelte:head>
	<title>Remnant II</title>
	<meta
		name="description"
		content="Reference tools and collection trackers for Remnant II."
	/>
</svelte:head>

<div class="shell page game-landing">
	<section class="game-identity" aria-labelledby="remnant-title">
		<h1 class="game-logo" id="remnant-title">
			<img
				src="/images/remnant-2/logo.webp"
				alt="Remnant II"
				width="750"
				height="632"
			/>
		</h1>
		<blockquote class="game-quote">
			<p>&ldquo;I can tell you right now, you won't be disappointamatated!&rdquo;</p>
			<cite>&mdash; Mudtooth</cite>
		</blockquote>
	</section>

	<nav class="subpage-nav" aria-label="Remnant II pages">
		<ul>
			<li>
				<a href="/remnant-2/rings/">
					<span>Rings</span>
					<span aria-hidden="true">&rarr;</span>
				</a>
			</li>
		</ul>
	</nav>
</div>

<style>
	.game-landing {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(17rem, 0.85fr);
		gap: clamp(3rem, 8vw, 7rem);
		align-items: center;
		min-height: 100%;
		padding-block: clamp(1.5rem, 4vh, 3rem);
	}

	.game-identity {
		min-width: 0;
	}

	.game-logo {
		max-width: 32rem;
		margin-bottom: 1.5rem;
	}

	.game-logo img {
		display: block;
		width: 100%;
		height: auto;
	}

	.game-quote {
		max-width: 31rem;
		margin: 0;
		color: var(--muted);
	}

	.game-quote p {
		margin-bottom: 0.45rem;
		font-size: 1.05rem;
		line-height: 1.6;
		text-wrap: pretty;
	}

	.game-quote cite {
		color: var(--ink);
		font-size: 0.875rem;
		font-style: normal;
	}

	.subpage-nav ul {
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--border);
		list-style: none;
	}

	.subpage-nav a {
		display: flex;
		min-height: 5rem;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 0;
		border-bottom: 1px solid var(--border);
		color: var(--ink);
		font-size: 1.45rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		text-decoration: none;
		transition:
			color var(--transition-fast),
			padding var(--transition-fast);
	}

	.subpage-nav a span:last-child {
		color: var(--muted);
		font-size: 1.15rem;
		font-weight: 400;
	}

	.subpage-nav a:hover {
		padding-inline: 0.75rem;
		color: var(--accent);
	}

	@media (max-width: 48rem) {
		.game-landing {
			grid-template-columns: 1fr;
			gap: 2.5rem;
			align-content: center;
		}

		.game-logo {
			max-width: 26rem;
		}
	}
</style>

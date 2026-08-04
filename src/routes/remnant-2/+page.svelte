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
			<cite>Mudtooth</cite>
		</blockquote>
	</section>

	<nav class="game-page-list subpage-nav" aria-label="Remnant II pages">
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
	.subpage-nav a {
		font-size: 1.45rem;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.subpage-nav a span:last-child {
		color: var(--muted);
		font-size: 1.15rem;
		font-weight: 400;
	}

</style>

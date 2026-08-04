<svelte:head>
	<title>Octopath Traveler</title>
	<meta name="description" content="Practical achievement guides for Octopath Traveler." />
</svelte:head>

<div class="shell page game-landing">
	<section class="game-identity" aria-labelledby="octopath-title">
		<h1 class="game-logo" id="octopath-title">
			<img
				src="/images/octopath-traveler/logo.webp"
				alt="Octopath Traveler"
				width="668"
				height="262"
			/>
		</h1>
		<blockquote class="game-quote">
			<p>&ldquo;Your coffers may be overflowing, but you're still morally bankrupt.&rdquo;</p>
			<cite>Tressa Colzione</cite>
		</blockquote>
	</section>

	<nav class="game-page-list octopath-pages" aria-label="Octopath Traveler pages">
		<ul>
			<li>
				<a href="/octopath-traveler/walkthrough/">
					<span>
						<strong>Achievement walkthrough</strong>
						<small>Missables, milestones and final cleanup</small>
					</span>
					<span aria-hidden="true">&rarr;</span>
				</a>
			</li>
		</ul>
	</nav>
</div>

<style>
	.octopath-pages strong,
	.octopath-pages small {
		display: block;
	}

	.octopath-pages strong {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 1.35rem;
		font-weight: 500;
	}

	.octopath-pages small {
		margin-top: 0.3rem;
		color: var(--muted);
		font-size: 0.78rem;
	}
</style>

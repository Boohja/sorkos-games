<svelte:head>
	<title>Graveyard Keeper</title>
	<meta name="description" content="A focused base-game platinum guide for Graveyard Keeper." />
</svelte:head>

<div class="shell page game-landing">
	<section class="game-identity" aria-labelledby="graveyard-title">
		<h1 class="game-logo" id="graveyard-title">
			<img
				src="/images/graveyard-keeper/logo.webp"
				alt="Graveyard Keeper"
				width="299"
				height="301"
			/>
		</h1>
		<blockquote class="game-quote">
			<p>&ldquo;Everything is ready. I should start building a graveyard.&rdquo;</p>
			<cite>The Keeper</cite>
		</blockquote>
	</section>

	<nav class="game-page-list graveyard-pages" aria-label="Graveyard Keeper pages">
		<ul>
			<li>
				<a href="/graveyard-keeper/platinum-walkthrough/">
					<span>
						<strong>Platinum Walkthrough</strong>
						<small>Base game route, missables and cleanup</small>
					</span>
					<span aria-hidden="true">›</span>
				</a>
			</li>
		</ul>
	</nav>
</div>

<style>
	.game-logo { max-width: 19rem; filter: drop-shadow(0 .8rem .6rem oklch(0.04 0.02 250 / .62)); }
	.graveyard-pages strong, .graveyard-pages small { display: block; }
	.graveyard-pages strong { color: oklch(0.93 0.055 78); font-family: Georgia, 'Times New Roman', serif; font-size: 1.2rem; text-shadow: 1px 2px 0 oklch(0.08 0.02 250); }
	.graveyard-pages small { margin-top: .3rem; color: oklch(0.72 0.035 76); font-size: .78rem; }
	.graveyard-pages a > span:last-child { color: var(--grave-gold); font-size: 1.75rem; }
</style>

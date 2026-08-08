<svelte:head>
	<title>Clair Obscur: Expedition 33</title>
	<meta name="description" content="An act-ordered achievement guide for Clair Obscur: Expedition 33." />
</svelte:head>

<div class="shell page game-landing">
	<section class="game-identity" aria-labelledby="expedition-title">
		<h1 class="game-logo" id="expedition-title">
			<img src="/images/expedition-33/logo.webp" alt="Clair Obscur: Expedition 33" width="750" height="450" />
		</h1>
		<blockquote class="game-quote">
			<p>&ldquo;Tomorrow comes.&rdquo;</p>
		</blockquote>
	</section>

	<nav class="game-page-list expedition-pages" aria-label="Clair Obscur: Expedition 33 pages">
		<ul>
			<li>
				<a href="/expedition-33/achievement-guide/">
					<span>
						<strong>Achievement Guide</strong>
						<small>Prologue through Act 3, with missable warnings</small>
					</span>
					<span aria-hidden="true">›</span>
				</a>
			</li>
		</ul>
	</nav>
</div>

<style>
	.game-logo { max-width: 35rem; filter: drop-shadow(0 .65rem .45rem oklch(0.03 0.02 310 / .68)); }
	.expedition-pages ul { border-top: 0; }
	.expedition-pages strong, .expedition-pages small { position: relative; z-index: 1; display: block; }
	.expedition-pages strong { color: var(--expedition-gold); font-family: Georgia, 'Times New Roman', serif; font-size: 1.25rem; font-weight: 500; }
	.expedition-pages small { margin-top: .28rem; color: var(--muted); font-size: .76rem; }
	.expedition-pages a > span:last-child { position: relative; z-index: 1; color: var(--expedition-gold); font-size: 1.6rem; }
</style>

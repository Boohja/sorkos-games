<svelte:head>
	<title>Games library</title>
</svelte:head>

<div class="shell games-page">
	<section class="library-hero">
		<div class="library-hero__copy">
			<h1>Just some tools for games I like.</h1>
		</div>
		<img
			class="library-hero__image"
			src="/images/gamepad.webp"
			alt=""
			width="500"
			height="300"
		/>
	</section>

	<div class="game-grid">
		<a class="game-card" href="/bastion/">
			<img
				class="game-card__cover"
				src="/images/bastion/cover.webp"
				alt=""
				width="250"
				height="304"
			/>
			<h2>Bastion</h2>
		</a>
		<a class="game-card" href="/octopath-traveler/">
			<img
				class="game-card__cover"
				src="/images/octopath-traveler/cover.webp"
				alt=""
				width="250"
				height="304"
			/>
			<h2>Octopath Traveler</h2>
		</a>
		<a class="game-card" href="/remnant-2/">
			<img
				class="game-card__cover"
				src="/images/remnant-2/cover.webp"
				alt=""
				width="250"
				height="304"
			/>
			<h2>Remnant II</h2>
		</a>
		<a class="game-card game-card--pending" href="/yes-your-grace/">
			<img
				class="game-card__cover"
				src="/images/yes-your-grace/cover.webp"
				alt=""
				width="250"
				height="304"
			/>
			<h2>Yes, Your Grace</h2>
		</a>
		<a class="game-card" href="/graveyard-keeper/">
			<img
				class="game-card__cover"
				src="/images/graveyard-keeper/cover.webp"
				alt=""
				width="250"
				height="304"
			/>
			<h2>Graveyard Keeper</h2>
		</a>
		<a class="game-card" href="/expedition-33/">
			<img
				class="game-card__cover"
				src="/images/expedition-33/cover.webp"
				alt=""
				width="250"
				height="304"
			/>
			<h2>Clair Obscur: Expedition 33</h2>
		</a>
	</div>
</div>

<style>
	.games-page {
		padding-block: clamp(2rem, 6vw, 4rem);
	}

	.library-hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(16rem, 0.8fr);
		gap: clamp(2rem, 8vw, 7rem);
		align-items: center;
		margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
		padding-bottom: clamp(2.5rem, 6vw, 4.5rem);
		border-bottom: 1px solid var(--border);
	}

	.library-hero__copy {
		max-width: 38rem;
	}

	.library-hero h1 {
		max-width: 11ch;
		margin-bottom: 0;
		font-size: clamp(2.75rem, 6vw, 5rem);
	}

	.library-hero__image {
		display: block;
		width: min(100%, 31.25rem);
		height: auto;
		justify-self: end;
	}

	.game-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 14rem), 14rem));
		gap: 1rem;
	}

	.game-card {
		display: grid;
		grid-template-rows: auto minmax(3.35rem, auto);
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: var(--radius-card);
		background: var(--surface);
		text-decoration: none;
		transition:
			background var(--transition-fast),
			border-color var(--transition-fast),
			transform var(--transition-fast);
	}

	.game-card:hover {
		border-color: var(--accent);
		background: var(--surface-raised);
		transform: translateY(-2px);
	}

	.game-card:active {
		transform: translateY(0);
	}

	.game-card__cover {
		display: block;
		width: 100%;
		aspect-ratio: 250 / 304;
		object-fit: cover;
	}

	.game-card h2 {
		display: flex;
		align-items: center;
		margin: 0;
		padding: 0.85rem 1rem;
		border-top: 1px solid var(--border);
		font-size: 1rem;
		letter-spacing: -0.01em;
	}

	@media (max-width: 30rem) {
		.game-grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (max-width: 48rem) {
		.library-hero {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.library-hero__image {
			width: min(82%, 26rem);
			justify-self: center;
		}
	}
</style>

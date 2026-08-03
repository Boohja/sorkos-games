<svelte:head>
	<title>Games library</title>
</svelte:head>

<div class="shell games-page">
	<h1 class="visually-hidden">Games library</h1>
	<div class="game-grid">
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
	</div>
</div>

<style>
	.games-page {
		padding-block: clamp(2rem, 6vw, 4rem);
	}

	.game-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 14rem), 14rem));
		gap: 1rem;
	}

	.game-card {
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
</style>

<svelte:head>
	<title>Yes, Your Grace</title>
	<meta name="description" content="Practical guides for Yes, Your Grace." />
</svelte:head>

<div class="shell page game-landing">
	<section class="game-identity" aria-labelledby="grace-title">
		<h1 class="game-logo" id="grace-title">
			<img
				src="/images/yes-your-grace/logo.webp"
				alt="Yes, Your Grace"
				width="508"
				height="158"
			/>
		</h1>
		<blockquote class="game-quote">
			<p>&ldquo;There is little less trouble in governing a family, than a whole kingdom.&rdquo;</p>
			<cite>Michel de Montaigne</cite>
		</blockquote>
	</section>

	<nav class="game-page-list grace-pages" aria-label="Yes, Your Grace pages">
		<ul>
			<li>
				<a href="/yes-your-grace/walkthrough/">
					<span>
						<strong>Walkthrough</strong>
						<small>Achievement-focused next steps</small>
					</span>
					<span aria-hidden="true">&rarr;</span>
				</a>
			</li>
		</ul>
	</nav>
</div>

<style>
	.grace-pages strong,
	.grace-pages small {
		display: block;
	}

	.grace-pages strong {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 1.55rem;
		font-weight: 500;
	}

	.grace-pages small {
		margin-top: 0.25rem;
		color: var(--muted);
		font-size: 0.82rem;
	}

</style>

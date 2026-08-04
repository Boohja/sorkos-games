<svelte:head>
	<title>Bastion</title>
	<meta name="description" content="Practical guides for Bastion." />
</svelte:head>

<div class="shell page game-landing">
	<section class="game-identity" aria-labelledby="bastion-title">
		<h1 class="game-logo" id="bastion-title">
			<img src="/images/bastion/logo.webp" alt="Bastion" width="500" height="166" />
		</h1>
		<blockquote class="game-quote">
			<p>&ldquo;Proper story's supposed to start at the beginning. Ain't so simple with this one.&rdquo;</p>
		</blockquote>
	</section>

	<nav class="game-page-list bastion-pages" aria-label="Bastion pages">
		<ul>
			<li>
				<a href="/bastion/walkthrough/">
					<span>
						<strong>Achievement Walkthrough</strong>
						<small>First journey, NG+ and Score Attack</small>
					</span>
					<span aria-hidden="true">&rarr;</span>
				</a>
			</li>
		</ul>
	</nav>
</div>

<style>
	.bastion-pages strong,
	.bastion-pages small {
		display: block;
	}

	.bastion-pages strong {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 1.35rem;
		font-weight: 600;
	}

	.bastion-pages small {
		margin-top: .25rem;
		color: var(--muted);
		font-size: .78rem;
	}
</style>

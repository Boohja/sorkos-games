<script lang="ts">
    import { lowRankGlaiveBuilds } from '$lib/data/monster-hunter-wilds/builds';
    const armorSlots = ['Head', 'Chest', 'Arms', 'Waist', 'Legs'];
</script>
<svelte:head>
    <title>Insect Glaive Low Ranks | Monster Hunter Wilds</title>
    <meta name="description" content="Three compact Insect Glaive builds for HR 1–8: equipment, alternatives, jewels, and key skills." />
</svelte:head>
<div class="shell page build-guide">
    <header class="page-heading">
        <a class="link link--subtle" href="/monster-hunter-wilds/builds/">All builds</a>
        <h1>Insect Glaive Low Ranks</h1>
        <p>Pick your rank, then forge what you need. Equipment names match the English game UI.</p>
    </header>
    <nav class="build-ranks" aria-label="Jump to Hunter Rank">
        {#each lowRankGlaiveBuilds as build}<a class="button button--outline-primary" href={'#' + build.id}>{build.rank}</a>{/each}
    </nav>
    <p class="build-hint">HR ranges are checkpoints, not unlock guarantees. Switch once the required monsters are available; keep your current set while it still works.</p>
    <div class="build-progression">
        {#each lowRankGlaiveBuilds as build}
            <section class="text-card build-loadout" id={build.id} aria-labelledby={build.id + '-title'}>
                <header class="build-loadout__heading"><h2 id={build.id + '-title'}><span>{build.rank}</span> {build.name}</h2><p>{build.purpose}</p></header>
                <div class="build-loadout__columns">
                    <div><h3>Equipment</h3><dl class="build-equipment">
                        <div class="build-equipment__weapon"><dt>Weapon</dt><dd>{build.weapon}</dd></div>
                        {#each build.armor as piece, i}<div><dt>{armorSlots[i]}</dt><dd>{piece}</dd></div>{/each}
                        <div><dt>Charm</dt><dd>{build.charm}</dd></div><div><dt>Kinsect</dt><dd>{build.kinsect}</dd></div>
                    </dl></div>
                    <div class="build-details">
                        <div><h3>Key skills</h3><ul class="build-skills">{#each build.skills as skill}<li>{skill}</li>{/each}</ul><p class="build-bonus">{build.bonus}</p></div>
                        <div><h3>Weapon alternative</h3><p>{build.alternative}</p></div>
                        <div><h3>Jewels</h3><p>{build.jewels}</p>
                            {#if build.id === 'hr-6-8'}<small>Physique goes in the helm, arms, and waist. Dragon jewels apply to the main weapon; reassess them when switching to fire. Missing jewels? Use the set and add them as you find them.</small>{/if}
                        </div>
                    </div>
                </div>
            </section>
        {/each}
    </div>
    <footer class="build-source">
        <p>Adapted from <a class="link" href="https://game8.co/games/Monster-Hunter-Wilds/archives/500777" target="_blank" rel="noreferrer">Game8’s Low Rank Insect Glaive guide</a> (source updated July 21, 2025).</p>
        <small>The late-rank jewel list follows the source’s decoration summary and Constitution 5 target; its helm icon is inconsistent. Key skills above assume the main weapon and listed jewels.</small>
    </footer>
</div>

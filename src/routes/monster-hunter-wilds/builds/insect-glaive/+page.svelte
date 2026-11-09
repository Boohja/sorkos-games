<script lang="ts">
    import { glaiveBuilds, glaiveSkillPriorities } from '$lib/data/monster-hunter-wilds/builds';
    const armorSlots = ['Head', 'Chest', 'Arms', 'Waist', 'Legs'];
</script>
<svelte:head>
    <title>Insect Glaive | Monster Hunter Wilds</title>
    <meta name="description" content="Compact Insect Glaive builds for Low Rank, HR 50+ and HR 100+: equipment, alternatives, jewels, and key skills." />
</svelte:head>
<div class="shell page build-guide">
    <header class="page-heading">
        <a class="link link--subtle page-heading__back" href="/monster-hunter-wilds/builds/">All builds</a>
        <h1>Insect Glaive</h1>
        <p>Pick your rank, then forge what you need. Low Rank, HR 50+ and HR 100+ setups; equipment names match the English game UI.</p>
    </header>
    <nav class="build-ranks" aria-label="Jump to Hunter Rank">
        {#each glaiveBuilds as build}<a class="button button--outline-primary" href={'#' + build.id}>{build.navLabel ?? build.rank}</a>{/each}
    </nav>
    <p class="build-hint">HR ranges are checkpoints, not unlock guarantees. Switch once the required monsters are available; keep your current set while it still works.</p>
    <div class="build-progression">
        {#each glaiveBuilds as build}
            <section class="text-card build-loadout" id={build.id} aria-labelledby={build.id + '-title'}>
                <header class="build-loadout__heading"><h2 id={build.id + '-title'}><span>{build.rank}</span> {build.name}</h2><p>{build.purpose}</p></header>
                {#if build.note}<p class="build-loadout__note">{build.note}</p>{/if}
                <div class="build-loadout__columns">
                    <div><h3>Equipment</h3><dl class="build-equipment">
                        <div class="build-equipment__weapon"><dt>Weapon</dt><dd>{build.weapon}</dd></div>
                        {#each build.armor as piece, i}<div><dt>{armorSlots[i]}</dt><dd>{piece}</dd></div>{/each}
                        <div><dt>Charm</dt><dd>{build.charm}</dd></div><div><dt>Kinsect</dt><dd>{build.kinsect}</dd></div>
                    </dl></div>
                    <div class="build-details">
                        <div><h3>Key skills</h3><ul class="build-skills">{#each build.skills as skill}<li>{skill}</li>{/each}</ul><p class="build-bonus">{build.bonus}</p></div>
                        <div><h3>{build.id.startsWith('hr-100') ? 'Alternative setup' : 'Weapon alternative'}</h3><p>{build.alternative}</p></div>
                        <div><h3>Jewels</h3><p>{build.jewels}</p>
                            {#if build.armorJewels}<p class="build-armor-jewels">Armor: {build.armorJewels}</p>{/if}
                            {#if build.jewelNote}<small>{build.jewelNote}</small>{/if}
                            {#if build.id === 'hr-6-8'}<small>Physique goes in the helm, arms, and waist. Dragon jewels apply to the main weapon; reassess them when switching to fire. Missing jewels? Use the set and add them as you find them.</small>{/if}
                        </div>
                    </div>
                </div>
            </section>
        {/each}
    </div>
    <section class="text-card build-loadout" id="gogma-artian" aria-labelledby="gogma-artian-title">
        <header class="build-loadout__heading"><h2 id="gogma-artian-title">Gogma Artian weapons</h2><p>Limbo Llor · HR 100+</p></header>
        <div class="build-loadout__columns">
            <dl class="build-equipment">
                <div><dt>Infusions</dt><dd>3 × Attack, matching element</dd></div>
                <div><dt>Focus</dt><dd>Element</dd></div>
                <div><dt>Upgrades</dt><dd>1 × EX Sharpness, 2 × EX Attack, 2 × Attack III</dd></div>
                <div><dt>Bonuses</dt><dd>Set-dependent + Lord’s Soul</dd></div>
                <div><dt>Jewels</dt><dd>Critical III, Critical II, Flight/Handicraft or Flight/Attack</dd></div>
            </dl>
            <p>Start with fire; match other elements later. Blast or poison suits general use. Aim for 50+ hits of white sharpness. Existing Attack Focus weapons remain close alternatives.</p>
        </div>
    </section>
    <section class="text-card build-loadout build-priorities" aria-labelledby="glaive-priorities-title">
        <header class="build-loadout__heading"><h2 id="glaive-priorities-title">Skill priorities</h2><p>Lower numbers take priority; ties are equally important.</p></header>
        {#each glaiveSkillPriorities as group}
            <h3>{group.title}</h3>
            <div class="ingredients-table-scroll"><table class="build-priority-table"><thead><tr><th scope="col">Priority</th><th scope="col">Skill</th><th scope="col">Why / when</th></tr></thead>
                <tbody>{#each group.rows as row}<tr><td>{row[0]}</td><th scope="row">{row[1]}</th><td>{row[2]}</td></tr>{/each}</tbody>
            </table></div>
        {/each}
    </section>
    <footer class="build-source">
        <p>Adapted from <a class="link" href="https://game8.co/games/Monster-Hunter-Wilds/archives/500777" target="_blank" rel="noreferrer">Game8’s Low Rank Insect Glaive guide</a> (source updated July 21, 2025).</p>
        <p>HR 50+ sets: <a class="link" href="https://game8.co/games/Monster-Hunter-Wilds/archives/502439" target="_blank" rel="noreferrer">Game8’s High Rank Insect Glaive guide</a>. Uses the craftable HR 50 charm variants; skill lists exclude bonuses from HR 100 appraised talismans.</p>
        <p>HR 100+, Gogma Artian and priorities: <a class="link" href="https://mhwssets.wordpress.com/ig/#artian" target="_blank" rel="noreferrer">MHWS Sets — TU4.5 Insect Glaive</a>. Set references: <a class="link" href="https://mhwssets.wordpress.com/wp-content/uploads/2026/02/ig_rathagore_tu5.png" target="_blank" rel="noreferrer">Rathagore</a> · <a class="link" href="https://mhwssets.wordpress.com/wp-content/uploads/2026/02/ig_arkgore.png" target="_blank" rel="noreferrer">Poverty Arkgore</a>.</p>
        <small>The HR 6–8 jewel list follows the source’s decoration summary and Constitution 5 target; its helm icon is inconsistent. Key skills above assume the main weapon and listed jewels.</small>
    </footer>
</div>

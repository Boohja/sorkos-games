<script lang="ts">
    import { tick } from 'svelte';
    import EffectIcon from '$lib/components/EffectIcon.svelte';
    import icons from '$lib/data/monster-hunter-wilds/icons.json';
    import type { MonsterDetails } from '$lib/data/monster-hunter-wilds/monster-details';
    import { ingredients, equipmentById, kindLabels, searchIngredients, groupSources, type SearchKind } from '$lib/data/monster-hunter-wilds/ingredients';

    let query = $state('');
    let kind = $state<SearchKind>('all');
    let selectedId = $state('');
    let trail = $state<string[]>([]);
    let shown = $state(40);
    let detail: HTMLElement;
    let monsterData = $state<Record<string, MonsterDetails>>({});
    let monsterModule = $state<typeof import('$lib/data/monster-hunter-wilds/monster-details')>();
    let monsterLoading = $state(false);
    let monsterError = $state('');
    const monsterIcon = $derived((icons.monsters as Record<string, string>)[selectedId]);
    const monsterReference = $derived(ingredients.monsters[selectedId]);
    const monster = $derived(monsterData[selectedId]);
    const drops = $derived(monster && monsterModule ? monsterModule.monsterDrops(monster) : []);
    const monsterCount = Object.values(ingredients.monsters).filter((entry) => entry.name !== 'INVALID' && entry.name !== '???').length;
    async function loadMonster() {
        if (!selectedId.startsWith('monster:') || monsterModule) return;
        monsterLoading = true;
        monsterError = '';
        try {
            const loaded = await import('$lib/data/monster-hunter-wilds/monster-details');
            monsterData = loaded.monstersById;
            monsterModule = loaded;
        } catch {
            monsterError = 'Monster details could not be loaded. Try again.';
        } finally { monsterLoading = false; }
    }
    const matches = $derived(searchIngredients(query, kind));
    const equipment = $derived(equipmentById.get(selectedId));
    const material = $derived(ingredients.materials[selectedId]);
    const sources = $derived(material ? groupSources(material) : []);
    const usedBy = $derived(material ? ingredients.equipment.filter((item) => item.recipes.some((recipe) => recipe.materials.some((cost) => cost.id === material.id))) : []);
    const previousId = $derived(trail.at(-1));
    const previousName = $derived(previousId ? equipmentById.get(previousId)?.name ?? ingredients.materials[previousId]?.name ?? ingredients.monsters[previousId]?.name : '');
    const resultCount = $derived(matches.length);
    const sourceDate = new Date(ingredients.metadata.importedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
    const weaponCount = ingredients.equipment.filter((item) => item.type === 'weapon').length;
    const armorCount = ingredients.equipment.length - weaponCount;

    async function select(id: string, follow = false) {
        if (id === selectedId) return;
        trail = follow && selectedId ? [...trail, selectedId] : [];
        selectedId = id;
        await loadMonster();
        await tick();
        if (window.matchMedia('(max-width: 48rem)').matches) detail?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    async function back() {
        if (!previousId) return;
        selectedId = previousId;
        trail = trail.slice(0, -1);
        await loadMonster();
    }
    function example(value: string) {
        query = value;
        kind = 'all';
        shown = 40;
    }
</script>

<svelte:head>
    <title>Database | Monster Hunter Wilds</title>
    <meta name="description" content="Fast High Rank equipment, material, and monster search. Find crafting recipes, regular monster drop rates, part breaks, and gathering sources." />
</svelte:head>

<div class="shell page ingredients-guide">
    <header class="ingredients-heading">
        <h1>Database</h1>
    </header>
    <form class="ingredients-search" role="search" onsubmit={(event) => event.preventDefault()}>
        <label class="field"><span class="field__label">Search equipment, materials, or monsters</span>
            <input class="input" type="search" bind:value={query} oninput={() => (shown = 40)} autocomplete="off" spellcheck="false" />
        </label>
        <label class="field"><span class="field__label">Search in</span><select class="select" bind:value={kind} onchange={() => (shown = 40)}>
            <option value="all">Everything</option><option value="weapon">Weapons</option><option value="armor">Armor</option><option value="material">Materials</option><option value="monster">Monsters</option>
        </select></label>
    </form>

    <div class="ingredients-layout">
        <section class="ingredients-results" aria-labelledby="ingredients-results-title">
            <h2 id="ingredients-results-title">{query.trim() ? `${resultCount} ${resultCount === 1 ? 'match' : 'matches'}` : 'Search by name'}</h2>
            <span class="sr-only" role="status">{query.trim() ? `${resultCount} ${resultCount === 1 ? 'result' : 'results'}` : 'Enter a name to search'}</span>
            {#if !query.trim()}
                <p>Part of a name is enough. Search equipment, ingredients, and monsters together, or narrow the list above.</p>
                <div class="ingredients-examples"><span>Try:</span>{#each ['Smiting Fulg', 'Thunder Sac', 'Gypceros'] as value}<button class="button button--text" type="button" onclick={() => example(value)}>{value}</button>{/each}</div>
            {:else if !matches.length}
                <p>No matching entries. Try a shorter name or search in Everything.</p>
            {:else}
                <ul class="ingredients-result-list">
                    {#each matches.slice(0, shown) as item (item.id)}
                        <li><button class:ingredients-result--selected={selectedId === item.id} aria-pressed={selectedId === item.id} onclick={() => select(item.id, item.type === 'monster')}>
                            <strong>{item.name}</strong><span>{item.label}{#if item.rarity !== undefined} · Rarity {item.rarity}{/if}</span>
                        </button></li>
                    {/each}
                </ul>
                {#if matches.length > shown}<button class="button button--outline-secondary button--small ingredients-more" onclick={() => (shown += 40)}>Show more ({matches.length - shown} remaining)</button>{/if}
            {/if}
        </section>

        <section class="ingredients-detail" bind:this={detail} aria-labelledby="ingredients-detail-title">
            {#if previousId}<button class="button button--text ingredients-back" onclick={back}>Back to {previousName}</button>{/if}
            {#if equipment}
                <header class="ingredients-detail-heading"><h2 id="ingredients-detail-title">{equipment.name}</h2><p>{kindLabels[equipment.kind] ?? equipment.kind} · High Rank · Rarity {equipment.rarity}</p></header>
                {#each equipment.recipes as recipe}
                    <section class="ingredients-recipe" aria-label={recipe.kind === 'forge' ? 'Forge recipe' : 'Upgrade recipe'}>
                        <h3>{recipe.kind === 'forge' ? 'Forge' : 'Upgrade'}{#if recipe.from}{' '}<span>from {recipe.from.name}</span>{/if}</h3>
                        <ul class="ingredients-costs">
                            {#each recipe.materials as cost}<li><button class="link" onclick={() => select(cost.id, true)}>{ingredients.materials[cost.id].name}</button><strong>×{cost.quantity}</strong></li>{/each}
                        </ul>
                        {#if recipe.cost}<p class="ingredients-zenny">{recipe.cost.toLocaleString('en-US')} zenny</p>{/if}
                    </section>
                {/each}
            {:else if material}
                <header class="ingredients-detail-heading"><h2 id="ingredients-detail-title">{material.name}</h2><p>Material · Rarity {material.rarity}</p></header>
                {#if sources.length}
                    {#each sources as group}
                        <section class="ingredients-source-group" aria-label={group.name}>
                            <h3>{#if group.kind === 'monster' && ingredients.monsters[group.id]}<button class="link ingredients-monster-link" onclick={() => select(group.id, true)}>{group.name}</button>{:else}{group.name}{/if}{' '}<span>· High Rank</span></h3>
                            <div class="ingredients-section-body ingredients-table-scroll"><table>
                                <thead><tr><th scope="col">{group.kind === 'monster' ? 'Method' : 'Gathering point'}</th><th scope="col">Chance</th><th scope="col">Qty</th></tr></thead>
                                <tbody>{#each group.sources as source}<tr><td>{source.method}{#if source.part}{' '}<span class="ingredients-part">({source.part})</span>{/if}{#if source.conditions}<small>{source.conditions}</small>{/if}</td><td>{source.chance === undefined ? '—' : `${source.chance}%`}</td><td>×{source.quantity}</td></tr>{/each}</tbody>
                            </table></div>
                        </section>
                    {/each}
                {:else}
                    <p class="ingredients-unavailable">No non-quest High Rank source is recorded for this material in the current snapshot.</p>
                    <a class="link" href={material.sourceUrl} target="_blank" rel="noreferrer">Check material reference</a>
                {/if}
                <details class="ingredients-used"><summary>Used by {usedBy.length} equipment {usedBy.length === 1 ? 'entry' : 'entries'}</summary><ul>{#each usedBy as item}<li><button class="link" onclick={() => select(item.id, true)}>{item.name}</button><span>{kindLabels[item.kind] ?? item.kind}</span></li>{/each}</ul></details>
            {:else if monsterReference}
                <header class="ingredients-detail-heading database-monster-identity">
                    <div><h2 id="ingredients-detail-title">{monsterReference.name}</h2><p>{monsterReference.kind === 'large' ? 'Large monster' : 'Small monster'} · High Rank{#if monster?.species} · {monsterModule?.readableName(monster.species)}{/if}</p>
                    {#if monster?.locations.length}<p class="ingredients-monster-locations">{monster.locations.join(' · ')}</p>{/if}</div>
                    {#if monsterIcon}<img class="database-monster-icon" src={monsterIcon} alt="" width="128" height="128" />{/if}
                </header>
                {#if monsterLoading}<p role="status">Loading monster details…</p>
                {:else if monsterError}<p role="alert">{monsterError}</p><button class="button button--outline-primary" onclick={loadMonster}>Retry</button>
                {:else if monster && monsterModule}
                    <section class="database-affinities" aria-label="Weaknesses and resistances">
                        <div><h3>Weaknesses</h3><ul class="database-effect-list">
                            {#each monster.weaknesses ?? [] as effect}<li><EffectIcon name={effect.element ?? effect.status ?? effect.effect ?? effect.kind} condition={effect.condition} /></li>{:else}<li class="muted">None recorded</li>{/each}
                        </ul></div>
                        <div><h3>Resistances</h3><ul class="database-effect-list">
                            {#each monster.resistances ?? [] as effect}<li><EffectIcon name={effect.element ?? effect.status ?? effect.effect ?? effect.kind} condition={effect.condition} /></li>{:else}<li class="muted">None recorded</li>{/each}
                        </ul></div>
                    </section>
                    {#if monster.parts?.length}
                        <section class="ingredients-monster-section" aria-labelledby="monster-hitzones-title">
                            <h3 id="monster-hitzones-title">Body part effectiveness</h3>
                            <div class="ingredients-section-body">
                                <!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard users need to scroll the wide hitzone table.) -->
                                <div class="ingredients-table-scroll" role="region" aria-label="Body part hitzones, scroll horizontally" tabindex="0"><table class="ingredients-hitzones">
                                    <thead><tr><th scope="col">Body part</th>{#each monsterModule.damageTypes as damage}<th scope="col"><EffectIcon name={damage} /></th>{/each}</tr></thead>
                                    <tbody>{#each monster.parts as part}<tr><th scope="row">{monsterModule.readableName(part.kind)}</th>{#each monsterModule.damageTypes as damage}<td class:ingredients-hitzone-best={monsterModule.isBestHitzone(part, damage)} class:ingredients-hitzone-zero={monsterModule.hitzone(part, damage) === 0}>{monsterModule.hitzone(part, damage) ?? '—'}</td>{/each}</tr>{/each}</tbody>
                                </table></div>
                                <p class="ingredients-hitzone-note">Base hitzone values: higher means more damage gets through. Bold values mark the best physical damage and element per part; 0 means no damage of that type.</p>
                            </div>
                        </section>
                    {:else}<p class="ingredients-unavailable">Body-part effectiveness is not recorded for this monster yet.</p>{/if}
                    <section class="ingredients-monster-section" aria-labelledby="monster-drops-title"><h3 id="monster-drops-title">High Rank drops</h3><div class="ingredients-section-body">
                        {#if drops.length}<div class="ingredients-table-scroll"><table class="ingredients-monster-drops"><thead><tr><th scope="col">Material / method</th><th scope="col">Chance</th><th scope="col">Qty</th></tr></thead><tbody>
                            {#each drops as drop}<tr><td><button class="link" onclick={() => select(drop.materialId, true)}>{ingredients.materials[drop.materialId].name}</button><small>{drop.method}{drop.part ? ` (${drop.part})` : ''}{drop.conditions ? ` · ${drop.conditions}` : ''}</small></td><td>{drop.chance === undefined ? '—' : `${drop.chance}%`}</td><td>×{drop.quantity}</td></tr>{/each}
                        </tbody></table></div>{:else}<p>No non-quest High Rank drops are recorded in the current snapshot.</p>{/if}
                    </div></section>
                {/if}
            {:else}
                <h2 id="ingredients-detail-title">Recipe & sources</h2>
                <p>Select a weapon, armor piece, material, or monster from the search results. Recipes and sources open here.</p>
            {/if}
        </section>
    </div>

    <p class="ingredients-scope">High Rank · {weaponCount} weapons · {armorCount} armor pieces · {Object.keys(ingredients.materials).length} materials · {monsterCount} monsters. Regular rewards only; special Investigation and quest rewards are excluded.</p>

    <details class="ingredients-provenance"><summary>Data sources & coverage</summary>
        <p>Recipes: <a class="link" href="https://docs.wilds.mhdb.io/" target="_blank" rel="noreferrer">MHDB Wilds</a>. Acquisition tables: <a class="link" href="https://www.phantombrawlers.com/mhwilds/Monsters" target="_blank" rel="noreferrer">Phantom Brawlers</a>. Icons: <a class="link" href="https://monsterhunterwiki.org/wiki/Category:MHWilds_Monster_Icons" target="_blank" rel="noreferrer">Monster Hunter Wiki</a> and Phantom Brawlers. Snapshot: {sourceDate}.</p>
        <p>Includes High Rank recipes from all 14 weapon types and armor, with both Forge and Upgrade recipes where available. Items without a recorded non-quest source remain searchable. Special reward tables and quest rewards are omitted. Rates are per listed reward roll, not the chance of getting at least one item over an entire hunt.</p>
    </details>
</div>

<script lang="ts">
    import { onMount } from 'svelte';
    import { isSyncValue } from '$lib/sync';
    import { achievementGroups, achievements, achievementIds } from '$lib/data/monster-hunter-wilds/achievements';

    let { data } = $props();
    const storageKey = $derived(data.sync.storageKey);
    let completed = $state<string[]>([]);
    let ready = $state(false);
    let query = $state('');
    let view = $state('all');
    let error = $state('');
    let resetPending = $state(false);
    const visibleGroups = $derived(achievementGroups.map((group) => ({
        ...group,
        achievements: group.achievements.filter((item) =>
            (view === 'all' || (view === 'remaining' ? !completed.includes(item.id) : completed.includes(item.id))) &&
            (item.name + ' ' + item.goal + ' ' + (item.tip ?? '') + ' ' + group.title).toLowerCase().includes(query.toLowerCase().trim())
        )
    })).filter((group) => group.achievements.length));
    const visibleCount = $derived(visibleGroups.reduce((count, group) => count + group.achievements.length, 0));

    function normalize(value: unknown) {
        if (!isSyncValue(value)) throw new Error('The checklist data is invalid.');
        return [...new Set(value.filter((id) => achievementIds.has(id)))];
    }

    function readSaved() {
        try {
            const saved = localStorage.getItem(storageKey);
            completed = saved === null ? [] : normalize(JSON.parse(saved));
            error = '';
        } catch {
            error = 'Saved progress could not be read. Enable browser storage or import your saved values using Sync.';
        }
    }

    onMount(() => {
        readSaved();
        ready = true;
        const onStorage = (event: StorageEvent) => {
            if (event.key === storageKey || event.key === null) readSaved();
        };
        const onImport = (event: Event) => {
            if ((event as CustomEvent<{ key: string }>).detail.key === storageKey) readSaved();
        };
        window.addEventListener('storage', onStorage);
        window.addEventListener('games:sync-imported', onImport);
        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('games:sync-imported', onImport);
        };
    });

    function save(next: string[]) {
        completed = next;
        resetPending = false;
        try {
            localStorage.setItem(storageKey, JSON.stringify(next));
            error = '';
        } catch {
            error = 'Progress is only kept for this visit. Browser storage is unavailable; enable it to save and use Sync.';
        }
    }

    function toggle(id: string) {
        save(completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id]);
    }

</script>

<svelte:head>
    <title>Achievements | Monster Hunter Wilds</title>
    <meta name="description" content="A compact checklist for all 50 Monster Hunter Wilds achievements, with local progress and the shared code-based sync." />
</svelte:head>

<div class="shell page achievement-guide">
    <header class="page-heading">
        <h1>Achievements</h1>
        <p>50 achievements. Tick them off as you earn them on the same hunter.</p>
    </header>
    <div class="text-card achievement-controls">
        <div class="achievement-controls__summary">
            <strong aria-live="polite">{completed.length} / {achievements.length} completed</strong>
            <div class="achievement-actions">
                {#if resetPending}
                    <button class="button button--secondary button--small" onclick={() => save([])}>Confirm reset</button>
                    <button class="button button--text" onclick={() => (resetPending = false)}>Cancel</button>
                {:else}
                    <button class="button button--text" disabled={!ready || !completed.length} onclick={() => (resetPending = true)}>Reset</button>
                {/if}
            </div>
        </div>
        <p class="achievement-storage-note">Saved in this browser. Use Sync in the header to transfer this checklist to another browser.</p>
        <div class="achievement-filters">
            <label class="field"><span class="field__label">Find an achievement</span><input class="input" type="search" bind:value={query} placeholder="Name, objective, or tip…" /></label>
            <label class="field"><span class="field__label">Show</span><select class="select" bind:value={view}><option value="all">All achievements</option><option value="remaining">Remaining</option><option value="completed">Completed</option></select></label>
        </div>
        {#if error}<p class="achievement-feedback" role="alert">{error}</p>{/if}
    </div>
    <p class="achievement-notice">No missables. Four multiplayer achievements need other players. Story objectives below contain spoilers.</p>
    <nav class="guide-section-index" aria-label="Achievement categories">
        {#each visibleGroups as group}<a class="button button--outline-primary button--small" href={'#' + group.id}>{group.title}</a>{/each}
    </nav>
    <p class="achievement-result-count">{visibleCount} {visibleCount === 1 ? 'achievement' : 'achievements'} shown</p>

    <div class="achievement-groups">
        {#each visibleGroups as group}
            <section class="achievement-group" id={group.id} aria-labelledby={group.id + '-title'}>
                <header><h2 id={group.id + '-title'}>{group.title}</h2>{#if group.note}<p>{group.note}</p>{/if}</header>
                <ul class="achievement-list">
                    {#each group.achievements as item}
                        <li class:achievement-complete={completed.includes(item.id)}>
                            <label>
                                <input type="checkbox" disabled={!ready} checked={completed.includes(item.id)} onchange={() => toggle(item.id)} />
                                <span><strong>{item.name}</strong><span class="achievement-goal">{item.goal}</span></span>
                            </label>
                            {#if item.tip || item.guide}<div class="achievement-extra">
                                {#if item.tip}<p>{item.tip}</p>{/if}
                                {#if item.guide}<a class="link" href={item.guide.url} target="_blank" rel="noreferrer">{item.guide.label} ↗</a>{/if}
                            </div>{/if}
                        </li>
                    {/each}
                </ul>
            </section>
        {/each}
    </div>
    {#if !visibleCount}<div class="text-card"><h2>No matching achievements</h2><p>Try a different search or switch the status filter.</p><button class="button button--secondary" onclick={() => { query = ''; view = 'all'; }}>Show all achievements</button></div>{/if}
    <footer class="guide-source">
        <p>Checklist and tips based on <a class="link" href="https://steamcommunity.com/sharedfiles/filedetails/?id=3435493260" target="_blank" rel="noreferrer">Brachragon’s 100% achievement guide</a>. Names checked against <a class="link" href="https://steamcommunity.com/stats/2246340/achievements/" target="_blank" rel="noreferrer">Steam’s 50-achievement list</a>.</p>
        <p>This is a manual checklist; Steam and in-game progress are not imported automatically.</p>
    </footer>
</div>

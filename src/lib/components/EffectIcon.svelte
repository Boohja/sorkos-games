<script lang="ts">
    import icons from '$lib/data/monster-hunter-wilds/icons.json';
    let { name, condition }: { name: string; condition?: string | null } = $props();
    const icon = $derived((icons.effects as Record<string, { label: string; src: string }>)[name]);
    const label = $derived(icon?.label ?? name.replaceAll('-', ' '));
</script>

<span class="database-effect" title={condition ? `${label} (${condition})` : label}>
    {#if icon}<img src={icon.src} alt={label} width="32" height="32" />{:else}<span>{label}</span>{/if}
    {#if condition}<small>{condition}</small>{/if}
</span>

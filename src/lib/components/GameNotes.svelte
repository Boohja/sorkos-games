<script lang="ts">
    import { onMount } from 'svelte';
    import type { Editor } from '@tiptap/core';
    import { games, type GameSlug } from '$lib/games';
    import { notesSyncPage } from '$lib/sync';

    let { game }: { game: GameSlug } = $props();
    const info = $derived(games.find((entry) => entry.slug === game)!);
    let host: HTMLDivElement;
    let editor: Editor | undefined;
    let ready = $state(false);
    let message = $state('Loading notes…');
    let error = $state('');

    onMount(() => {
        const metadata = notesSyncPage(game);
        let disposed = false;
        function read() {
            const stored = localStorage.getItem(metadata.storageKey);
            if (stored === null) return '';
            const value: unknown = JSON.parse(stored);
            if (typeof value !== 'string') throw new Error('Invalid notes');
            return value;
        }
        function save(current: Editor) {
            try {
                localStorage.setItem(metadata.storageKey, JSON.stringify(current.getMarkdown()));
                message = 'Saved locally';
                error = '';
            } catch {
                error = 'Your latest changes could not be saved on this device. Keep this page open and free some browser storage.';
            }
        }
        function refresh() {
            if (!editor) return;
            try {
                const content = read();
                if (content !== editor.getMarkdown()) editor.commands.setContent(content, { contentType: 'markdown', emitUpdate: false });
                message = 'Saved locally';
                error = '';
            } catch { error = 'Saved notes could not be read. Your current text has been kept in the editor.'; }
        }
        const onStorage = (event: StorageEvent) => { if (event.key === metadata.storageKey || event.key === null) refresh(); };
        const onImport = (event: Event) => { if ((event as CustomEvent<{ key: string }>).detail?.key === metadata.storageKey) refresh(); };
        async function start() {
            let content: string;
            try { content = read(); }
            catch { error = 'Saved notes could not be read. Editing is paused to protect the saved text.'; message = ''; return; }
            try {
                const [{ Editor }, { StarterKit }, { Markdown }] = await Promise.all([
                    import('@tiptap/core'), import('@tiptap/starter-kit'), import('@tiptap/markdown')
                ]);
                if (disposed) return;
                content = read();
                editor = new Editor({
                    element: host,
                    extensions: [StarterKit.configure({ link: { openOnClick: false } }), Markdown],
                    content, contentType: 'markdown',
                    editorProps: {
                        attributes: { role: 'textbox', 'aria-label': `${info.title} notes`, 'aria-multiline': 'true', spellcheck: 'true' },
                        handlePaste: (_view, event) => {
                            const data = event.clipboardData;
                            const markdown = data?.getData('text/markdown');
                            const plain = data?.getData('text/plain') ?? '';
                            const looksLikeMarkdown = /(^|\n)(#{1,6} |[-*+] |\d+\. |> |```)|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\(/.test(plain);
                            if (!editor || (!markdown && (data?.getData('text/html') || !looksLikeMarkdown))) return false;
                            event.preventDefault();
                            return editor.commands.insertContent(markdown || plain, { contentType: 'markdown' });
                        }
                    },
                    onUpdate: ({ editor }) => save(editor),
                    onBlur: ({ editor }) => save(editor)
                });
                ready = true;
                message = content ? 'Saved locally' : 'Ready';
                window.addEventListener('storage', onStorage);
                window.addEventListener('games:sync-imported', onImport);
            } catch { error = 'The notes editor could not be loaded. Reload this page to try again.'; message = ''; }
        }
        void start();
        return () => {
            disposed = true;
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('games:sync-imported', onImport);
            editor?.destroy();
        };
    });
</script>

<svelte:head><title>Notes | {info.title}</title><meta name="description" content={`Your personal Markdown notes for ${info.title}.`} /></svelte:head>
<div class="shell page notes-page">
    <header class="notes-heading"><h1>Notes</h1><p>Write here. Every change is saved on this device; use Sync to transfer your notes.</p></header>
    {#if error}<p class="notes-error" role="alert">{error}</p>{/if}
    <div class="notes-editor" class:notes-editor--ready={ready} aria-busy={!ready && !error} bind:this={host}></div>
    <footer class="notes-footer"><p><code>#</code> heading · <code>-</code> list · <code>**bold**</code> · <code>*italic*</code> · <code>~~strikethrough~~</code></p><span role="status">{message}</span></footer>
</div>

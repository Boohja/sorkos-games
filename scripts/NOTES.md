# Per-game notes

Each game has a statically prerendered `/<game>/notes` route using the shared `GameNotes.svelte` component. Tiptap and Markdown are loaded on mount, keeping the editor out of landing-page bundles and avoiding browser APIs during prerendering.

Storage is one JSON-encoded Markdown string per game at `games.sorkos.net:<game>:notes`. Every editor update saves synchronously to localStorage; blur retries saving. Loading invalid data pauses editing rather than replacing stored text. Storage failures retain the current editor document and display an error. Other-tab storage changes and existing `games:sync-imported` events refresh the editor without an update loop.

Markdown shortcuts support headings, ordinary/nested lists, emphasis, bold, strikethrough, code, block quotes, links and horizontal rules. Recognizable plain Markdown pasted into the editor is parsed. Task-list checkboxes are intentionally omitted. Paragraph margins inside list items are removed for compact rendering.

The existing Sync flow now validates values against page metadata: notes accept Markdown strings, existing trackers still accept only string arrays. Routes and storage keys must match the registry, and the API retains its existing 64 KiB transfer limit. Notes are local until the user explicitly generates a transfer code.

Checks: `npm run check`, `node --experimental-strip-types scripts/test-notes-and-affinities.mjs`, and `npm run build`. Windows may finish compilation/prerendering and then fail at the Vercel adapter's symlink step; all seven notes HTML files should exist in `.svelte-kit/output/prerendered/pages`.

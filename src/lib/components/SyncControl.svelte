<script lang="ts">
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import { findSyncPage, isSyncValue } from '$lib/sync';

	type View = 'choice' | 'import' | 'generated' | 'success';

	let dialog: HTMLDialogElement;
	let codeInput = $state<HTMLInputElement>();
	let view = $state<View>('choice');
	let busy = $state(false);
	let errorMessage = $state('');
	let importCode = $state('');
	let generatedCode = $state('');
	let importedRoute = $state('');
	let copied = $state(false);

	async function openDialog() {
		reset();
		await tick();
		dialog.showModal();
	}

	function closeDialog() {
		dialog.close();
	}

	function reset() {
		view = 'choice';
		busy = false;
		errorMessage = '';
		importCode = '';
		generatedCode = '';
		importedRoute = '';
		copied = false;
	}

	async function showImport() {
		view = 'import';
		errorMessage = '';
		await tick();
		codeInput?.focus();
	}

	function formatCode(value: string) {
		const compact = value.toUpperCase().replace(/[^2-9A-HJ-NP-Z]/g, '').slice(0, 8);
		return compact.length > 4 ? `${compact.slice(0, 4)}-${compact.slice(4)}` : compact;
	}

	async function readJson(response: Response) {
		const body: unknown = await response.json().catch(() => null);
		if (!response.ok) {
			if (response.status === 429) {
				throw new Error('Too many transfer codes have been generated. Try again later.');
			}
			const message =
				body && typeof body === 'object' && 'error' in body && typeof body.error === 'string'
					? body.error
					: 'Something went wrong. Please try again.';
			throw new Error(message);
		}
		return body;
	}

	async function generateCode() {
		errorMessage = '';
		const metadata = page.data.sync;

		if (!metadata?.syncable) {
			errorMessage = "Open one of the game's checklist or walkthrough pages first.";
			return;
		}

		let value: unknown;
		try {
			const stored = localStorage.getItem(metadata.storageKey);
			if (stored === null) {
				errorMessage = 'This page does not have any saved values to transfer yet.';
				return;
			}
			value = JSON.parse(stored);
		} catch {
			errorMessage = 'The saved values on this page are invalid and cannot be transferred.';
			return;
		}

		if (!isSyncValue(value)) {
			errorMessage = 'The saved values on this page are invalid and cannot be transferred.';
			return;
		}

		busy = true;
		try {
			const response = await fetch('/api/sync', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ key: metadata.storageKey, route: metadata.route, value })
			});
			const result = await readJson(response);
			if (!result || typeof result !== 'object' || !('code' in result) || typeof result.code !== 'string') {
				throw new Error('The server returned an invalid transfer code.');
			}
			generatedCode = result.code;
			view = 'generated';
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'The transfer could not be created.';
		} finally {
			busy = false;
		}
	}

	async function importTransfer(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = '';
		const code = formatCode(importCode);
		if (code.length !== 9) {
			errorMessage = 'Enter the complete 8-character transfer code.';
			return;
		}

		busy = true;
		try {
			const response = await fetch(`/api/sync/${encodeURIComponent(code)}`, {
				headers: { accept: 'application/json' }
			});
			const result = await readJson(response);

			if (!result || typeof result !== 'object') throw new Error('This transfer is invalid.');
			const payload = result as Record<string, unknown>;
			if (
				payload.version !== 1 ||
				typeof payload.key !== 'string' ||
				typeof payload.route !== 'string' ||
				!findSyncPage(payload.route, payload.key) ||
				!isSyncValue(payload.value)
			) {
				throw new Error('This transfer is invalid.');
			}

			try {
				localStorage.setItem(payload.key, JSON.stringify(payload.value));
			} catch {
				throw new Error('This browser could not save the imported values. The code is still available.');
			}

			const deleteResponse = await fetch(`/api/sync/${encodeURIComponent(code)}`, {
				method: 'DELETE',
				headers: { accept: 'application/json' }
			});
			await readJson(deleteResponse);

			importedRoute = payload.route;
			view = 'success';
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'The transfer could not be imported.';
		} finally {
			busy = false;
		}
	}

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(generatedCode);
			copied = true;
		} catch {
			errorMessage = 'Select the code and copy it manually.';
		}
	}
</script>

<button class="button button--outline-secondary button--small sync-trigger" type="button" onclick={openDialog}>
	<svg viewBox="0 0 20 20" aria-hidden="true">
		<path d="M5.2 7.1A5.7 5.7 0 0 1 15.4 6M15.4 6V2.8M15.4 6h-3.2M14.8 12.9A5.7 5.7 0 0 1 4.6 14M4.6 14v3.2M4.6 14h3.2" />
	</svg>
	Sync…
</button>

<dialog
	bind:this={dialog}
	class="sync-dialog"
	aria-labelledby="sync-title"
	onclose={reset}
	onclick={(event) => event.target === dialog && closeDialog()}
>
	<div class="sync-dialog__panel">
		<button class="sync-dialog__close" type="button" aria-label="Close sync" onclick={closeDialog}>
			<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" /></svg>
		</button>

		{#if view === 'choice'}
			<div class="sync-dialog__heading">
				<h2 id="sync-title">Transfer saved values</h2>
				<p>Move the saved values for one checklist or walkthrough to another browser. No account needed.</p>
			</div>
			<div class="sync-dialog__actions">
				<button class="button button--primary" type="button" disabled={busy} onclick={generateCode}>
					{busy ? 'Generating…' : 'Generate Code'}
				</button>
				<button class="button button--secondary" type="button" onclick={showImport}>Import Code</button>
			</div>
		{:else if view === 'import'}
			<div class="sync-dialog__heading">
				<button class="button button--text sync-dialog__back" type="button" onclick={() => (view = 'choice')}>Back</button>
				<h2 id="sync-title">Import a transfer</h2>
				<p>Enter the code from the other browser. Importing replaces the saved values for that one page.</p>
			</div>
			<form class="sync-dialog__form" onsubmit={importTransfer}>
				<label class="field">
					<span class="field__label">Transfer code</span>
					<input
						bind:this={codeInput}
						class="input sync-code-input"
						value={importCode}
						oninput={(event) => (importCode = formatCode(event.currentTarget.value))}
						placeholder="XXXX-XXXX"
						maxlength="9"
						autocomplete="off"
						spellcheck="false"
						inputmode="text"
					/>
				</label>
				<button class="button button--primary" type="submit" disabled={busy}>
					{busy ? 'Importing…' : 'Import Code'}
				</button>
			</form>
		{:else if view === 'generated'}
			<div class="sync-dialog__heading">
				<h2 id="sync-title">Transfer ready</h2>
				<p>Enter this code in the other browser via Sync → Import Code. The code can only be imported once.</p>
			</div>
			<div class="sync-code" aria-label={`Transfer code ${generatedCode}`}>{generatedCode}</div>
			<div class="sync-dialog__actions">
				<button class="button button--primary" type="button" onclick={copyCode}>{copied ? 'Copied' : 'Copy Code'}</button>
				<button class="button button--secondary" type="button" onclick={closeDialog}>Done</button>
			</div>
			<p class="sync-dialog__expiry">Expires in 24 hours.</p>
		{:else}
			<div class="sync-success" aria-live="polite">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.2 4.2L19 6.8" /></svg>
				<div>
					<h2 id="sync-title">Saved to this browser</h2>
					<p>The transfer code has been retired and cannot be used again.</p>
				</div>
			</div>
			<a class="button button--secondary" href={importedRoute}>Open page</a>
		{/if}

		{#if errorMessage}
			<p class="sync-dialog__error" role="alert">{errorMessage}</p>
		{/if}
	</div>
</dialog>

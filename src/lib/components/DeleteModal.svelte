<script>
	export let isOpen = false;
	export let onCancel;
	export let onConfirm;
</script>

{#if isOpen}
	<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
		<div class="w-full max-w-xs rounded-lg bg-white p-4 shadow-lg">
			<h2 class="mb-2 text-lg font-semibold">Delete comment</h2>
			<p class="mb-4 text-sm text-gray-600">
				Are you sure you want to delete this comment? This will remove the comment and can't be
				undone.
			</p>
			<div class="mt-4 flex justify-between space-x-4">
				<button
					class="w-1/2 rounded-lg bg-gray-500 py-2 text-white hover:opacity-80"
					on:click={onCancel}
				>
					NO, CANCEL
				</button>
				<button
					class="w-1/2 rounded-lg bg-red-500 py-2 text-white hover:opacity-80"
					on:click={onConfirm}
				>
					YES, DELETE
				</button>
			</div>
		</div>
	</div>
{/if}

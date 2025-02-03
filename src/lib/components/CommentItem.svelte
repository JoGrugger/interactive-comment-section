<script>
	import { timeSince } from '$lib/utils';
	import { currentUser } from '$lib/stores/user';
	import Vote from './Vote.svelte';
	import DeleteModal from './DeleteModal.svelte';

	export let item;
	export let onDelete;
	export let onUpdate;
	export let onReply;
	export let onUpvote;
	export let onDownvote;

	let isEditing = false;
	let isReplying = false;
	let showModal = false;
	let editedContent = item.content;
	let replyContent = '';

	$: timeAgo = timeSince(item.createdAt);

	const handleEdit = () => {
		if (editedContent.trim()) {
			onUpdate(item.id, editedContent);
			isEditing = false;
		}
	};

	const handleReply = () => {
		if (replyContent) {
			onReply(item.id, {
				id: Date.now(),
				content: replyContent,
				createdAt: new Date().toISOString(),
				score: 0,
				replyingTo: item.user.username,
				user: $currentUser
			});
			isReplying = false;
			replyContent = '';
		}
	};

	function formatReplyContent(item) {
		const usernamePattern = /@(\w+)/;

		if (usernamePattern.test(item.content)) {
			const match = item.content.match(usernamePattern);
			const username = match[0];

			const contentWithoutUsername = item.content.replace(usernamePattern, '').trim();

			return `<span class="font-bold text-[#5258BA]">${username}</span> ${contentWithoutUsername}`;
		} else if (item.replyingTo) {
			return `<span class="font-bold text-[#5258BA]">@${item.replyingTo}</span> ${item.content}`;
		} else {
			return item.content;
		}
	}
</script>

<div class="mb-4 rounded-lg bg-white p-6">
	<div class="flex items-start space-x-4">
		<Vote score={item.score} {onUpvote} {onDownvote} />
		<div class="flex-1">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-2">
					<img src={item.user.image.png} alt={item.user.username} class="h-8 w-8 rounded-full" />
					<span class="flex items-center space-x-2 font-bold text-gray-800">
						{item.user.username}
						{#if item.user.username === $currentUser.username}
							<span class="ml-2 rounded-sm bg-[#5258BA] px-2 py-0.5 text-xs text-white">you</span>
						{/if}
					</span>

					<span class="text-gray-500">{timeAgo}</span>
				</div>
				<div class="flex items-center space-x-6">
					{#if item.user.username === $currentUser.username}
						<div class="flex items-center space-x-2 hover:cursor-pointer hover:opacity-60">
							<img src="/images/icon-delete.svg" alt="Delete" />
							<button on:click={() => (showModal = true)} class="font-bold text-red-500"
								>Delete
							</button>
						</div>
						<div class="flex items-center space-x-2 hover:cursor-pointer hover:opacity-60">
							<img src="/images/icon-edit.svg" alt="Edit" />
							<button on:click={() => (isEditing = true)} class="font-bold text-[#5B57AB]"
								>Edit</button
							>
						</div>
					{:else}
						<div class="flex items-center space-x-2 hover:cursor-pointer hover:opacity-60">
							<img src="/images/icon-reply.svg" alt="Reply" />
							<button
								on:click={() => {
									isReplying = !isReplying;
									if (isReplying) {
										replyContent = `@${item.user.username} `;
									}
								}}
								class="font-bold text-[#5B57AB]"
							>
								Reply
							</button>
						</div>
					{/if}
				</div>
			</div>

			{#if isEditing}
				<textarea bind:value={editedContent} class="mt-2 w-full rounded-lg border p-2"></textarea>

				<div class="mt-2 flex justify-end">
					<button
						on:click={handleEdit}
						class="rounded-lg bg-[#5258BA] px-4 py-2 text-white hover:opacity-80"
					>
						Update
					</button>
				</div>
			{:else}
				<p class="mt-2 text-gray-700">
					{@html formatReplyContent(item)}
				</p>
			{/if}

			{#if isReplying}
				<div class="flex items-center space-x-4">
					<img
						src={$currentUser.image.png}
						alt={$currentUser.username}
						class="mb-4 h-10 w-12 rounded-full"
					/>
					<textarea bind:value={replyContent} class="mb-2 w-full rounded-lg border p-2"></textarea>
					<button
						on:click={handleReply}
						class="mb-8 h-10 rounded-lg bg-[#5258BA] px-4 text-white hover:opacity-60">Reply</button
					>
				</div>
			{/if}
		</div>
	</div>

	<DeleteModal
		isOpen={showModal}
		onCancel={() => (showModal = false)}
		onConfirm={() => {
			onDelete(item.id);
			showModal = false;
		}}
	/>
</div>

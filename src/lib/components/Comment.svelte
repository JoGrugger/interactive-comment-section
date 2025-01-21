<script>
	export let comment; // Ein Kommentar
	export let currentUser; // Benutzer
	import ReplyList from './ReplyList.svelte';

	let isEditing = false; // Bearbeitungsmodus
	let editedContent = comment.content;
	let showReplyInput = false; // Reply-Eingabe anzeigen
	let replyContent = '';

	const upvote = () => comment.score++;
	const downvote = () => comment.score--;

	const startEdit = () => {
		isEditing = true;
	};

	const saveEdit = () => {
		comment.content = editedContent;
		isEditing = false;
	};

	const deleteComment = () => {
		// Kommentar aus der Liste löschen (Logik muss angepasst werden)
	};

	const addReply = () => {
		if (replyContent.trim() !== '') {
			comment.replies = [
				...comment.replies,
				{
					id: Date.now(),
					content: replyContent,
					createdAt: 'Just now',
					replyingTo: comment.user.username,
					user: { ...currentUser }
				}
			];
			replyContent = '';
			showReplyInput = false;
		}
	};
</script>

<div class="border-b py-4">
	<div class="flex items-start gap-4">
		<!-- Upvote/Downvote -->
		<div class="flex flex-col items-center">
			<button on:click={upvote} class="text-blue-500">+</button>
			<p>{comment.score}</p>
			<button on:click={downvote} class="text-red-500">-</button>
		</div>

		<!-- Kommentarinhalt -->
		<div class="flex-1">
			<div class="flex justify-between">
				<div>
					<p class="font-bold">{comment.user.username}</p>
					<p class="text-sm text-gray-500">{comment.createdAt}</p>
				</div>

				<!-- Aktionen für eigenen Kommentar -->
				{#if comment.user.username === currentUser.username}
					<div class="flex gap-2">
						<button on:click={deleteComment} class="text-red-500 hover:underline">Delete</button>
						<button on:click={startEdit} class="text-blue-500 hover:underline">Edit</button>
					</div>
				{:else}
					<button
						on:click={() => (showReplyInput = !showReplyInput)}
						class="text-blue-500 hover:underline">Reply</button
					>
				{/if}
			</div>

			<!-- Bearbeitungsmodus -->
			{#if isEditing}
				<textarea bind:value={editedContent} class="mt-2 w-full border"></textarea>
				<button on:click={saveEdit} class="mt-2 rounded bg-blue-500 px-4 py-1 text-white">
					Save
				</button>
			{:else}
				<p class="mt-2">{comment.content}</p>
			{/if}

			<!-- Reply-Eingabe -->
			{#if showReplyInput}
				<div class="mt-2">
					<textarea
						bind:value={replyContent}
						placeholder="Write a reply..."
						class="w-full rounded border p-2"
					></textarea>
					<button on:click={addReply} class="mt-2 rounded bg-blue-500 px-4 py-1 text-white">
						Reply
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- Replies -->
	{#if comment.replies.length > 0}
		<ReplyList {comment} {currentUser} />
	{/if}
</div>

<script>
	import Comment from './Comment.svelte';

	export let comments; // Kommentare aus App.svelte
	export let currentUser; // Benutzer aus App.svelte

	let newCommentContent = ''; // Für neuen Kommentar

	// Kommentar hinzufügen
	const addComment = () => {
		if (newCommentContent.trim() !== '') {
			comments = [
				...comments,
				{
					id: Date.now(),
					content: newCommentContent,
					createdAt: 'Just now',
					score: 0,
					user: { ...currentUser },
					replies: []
				}
			];
			newCommentContent = ''; // Eingabefeld zurücksetzen
		}
	};
</script>

<div>
	<!-- Bestehende Kommentare anzeigen -->
	{#each comments.sort((a, b) => b.score - a.score) as comment (comment.id)}
		<Comment {comment} {currentUser} />
	{/each}

	<!-- Eingabefeld für neuen Kommentar -->
	<div class="mt-4">
		<textarea
			bind:value={newCommentContent}
			placeholder="Add a comment..."
			class="w-full rounded border p-2"
		></textarea>
		<button on:click={addComment} class="mt-2 rounded bg-blue-500 px-4 py-2 text-white">
			SEND
		</button>
	</div>
</div>

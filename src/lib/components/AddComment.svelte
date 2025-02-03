<script>
	import { comments, addComment } from '$lib/stores/comments';
	import { currentUser } from '$lib/stores/user';

	let newComment = '';

	function handleSubmit() {
		if (newComment.trim()) {
			const comment = {
				id: Date.now(),
				content: newComment,
				createdAt: new Date().toISOString(),
				score: 0,
				user: $currentUser,
				replies: []
			};
			addComment(comment);
			newComment = '';
		}
	}
</script>

<div class="flex h-[8rem] space-x-4 rounded-lg bg-white p-6 shadow-md">
	<div class="items-center space-x-2">
		<img src={$currentUser.image.png} alt={$currentUser.username} class="h-10 w-14 rounded-full" />
	</div>
	<textarea
		bind:value={newComment}
		class="w-full rounded-lg border-gray-300 p-2 hover:cursor-pointer hover:border-black"
		placeholder="Add a comment..."
	></textarea>
	<button
		on:click={handleSubmit}
		class="mb-8 rounded-lg bg-[#5258BA] px-8 font-bold text-white hover:opacity-60"
	>
		SEND
	</button>
</div>

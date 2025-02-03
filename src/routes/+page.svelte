<script>
	import { onMount } from 'svelte';
	import { comments } from '$lib/stores/comments';
	import data from '$lib/data.json';
	import Comment from '$lib/components/Comment.svelte';
	import AddComment from '$lib/components/AddComment.svelte';

	onMount(() => {
		const storedComments = JSON.parse(localStorage.getItem('comments'));
		if (storedComments) {
			comments.set(storedComments);
		} else {
			comments.set(data.comments);
		}

		comments.subscribe((value) => {
			localStorage.setItem('comments', JSON.stringify(value));
		});
	});
</script>

<div class="bg-slate-100">
	<div class="container mx-auto max-w-3xl pb-[4rem] pt-[4rem]">
		<div class="space-y-4">
			{#each $comments as comment}
				<Comment {comment} />
			{/each}
		</div>
		<AddComment />
	</div>
</div>

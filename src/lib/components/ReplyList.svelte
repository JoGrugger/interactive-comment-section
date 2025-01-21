<script>
	export let comment;
	export let currentUser;
	import Reply from './Reply.svelte';
</script>

<div class="ml-8">
	{#each comment.replies.sort((a, b) => a.createdAt.localeCompare(b.createdAt)) as reply (reply.id)}
		<Reply {reply} {currentUser} />
	{/each}
</div>

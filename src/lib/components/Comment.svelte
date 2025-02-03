<script>
	import {
		deleteComment,
		updateComment,
		addReply,
		upvoteComment,
		downvoteComment
	} from '$lib/stores/comments';
	import CommentItem from './CommentItem.svelte';
	import Reply from './Reply.svelte';

	export let comment;

	function handleDelete(id) {
		deleteComment(id);
	}

	function handleUpdate(id, content) {
		updateComment(id, content);
	}

	function handleReply(id, reply) {
		addReply(id, reply);
	}

	function handleUpvote(id) {
		upvoteComment(id);
	}

	function handleDownvote(id) {
		downvoteComment(id);
	}
</script>

<CommentItem
	item={comment}
	onDelete={handleDelete}
	onUpdate={handleUpdate}
	onReply={handleReply}
	onUpvote={() => handleUpvote(comment.id)}
	onDownvote={() => handleDownvote(comment.id)}
/>

<div class="ml-8 mt-2 space-y-4 border-l-2 pl-8">
	{#each comment.replies as reply}
		<Reply {reply} />
	{/each}
</div>

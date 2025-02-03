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

	export let reply;

	const isReplyToComment = !reply.replyingTo;
</script>

<div class={isReplyToComment ? 'ml-8' : ''}>
	<CommentItem
		item={reply}
		onDelete={deleteComment}
		onUpdate={updateComment}
		onReply={addReply}
		onUpvote={() => upvoteComment(reply.id)}
		onDownvote={() => downvoteComment(reply.id)}
	/>

	{#if reply.replies && reply.replies.length > 0}
		{#each reply.replies as nestedReply}
			<Reply reply={nestedReply} />
		{/each}
	{/if}
</div>

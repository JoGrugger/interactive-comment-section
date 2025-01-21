<script>
	export let reply;
	export let currentUser;
</script>

<div class="border-l py-2 pl-4">
	<div class="flex items-start gap-4">
		<img src={reply.user.image.png} alt={reply.user.username} class="h-8 w-8 rounded-full" />
		<div class="flex-1">
			<div class="flex justify-between">
				<div>
					<p class="font-bold">{reply.user.username}</p>
					<p class="text-sm text-gray-500">{reply.createdAt}</p>
				</div>
			</div>
			<p class="mt-2">@{reply.replyingTo} {reply.content}</p>
		</div>
	</div>
</div>

<script>
	export let score;
	export let onUpvote;
	export let onDownvote;
</script>

<div class="flex h-[6.5rem] w-12 flex-col items-center justify-between rounded-lg bg-gray-100 p-2">
	<button on:click={onUpvote} class="text-xl font-bold text-gray-400 hover:text-[#5258BA]">+</button
	>
	<span class="text-xl font-bold text-[#5258BA]">{score}</span>
	<button on:click={onDownvote} class="text-xl font-bold text-gray-400 hover:text-[#5258BA]"
		>-</button
	>
</div>

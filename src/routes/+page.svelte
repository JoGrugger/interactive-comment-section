<script>
	import CommentList from '$lib/components/CommentList.svelte';
	import data from '$lib/data.json';

	let comments = data.comments; // Kommentare aus JSON laden
	let currentUser = data.currentUser; // Aktueller Benutzer
</script>

<main class="flex min-h-screen justify-center bg-gray-100 p-6">
	<div class="w-full max-w-3xl rounded bg-white p-4 shadow-md">
		<!-- Übergabe von Kommentaren und Benutzer -->
		<CommentList {comments} {currentUser} />
	</div>
</main>

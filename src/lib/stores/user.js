import { writable } from 'svelte/store';

export const currentUser = writable({
	image: {
		png: '/images/avatars/image-juliusomo.png',
		webp: '/images/avatars/image-juliusomo.webp'
	},
	username: 'juliusomo'
});

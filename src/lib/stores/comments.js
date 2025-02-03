import { writable } from 'svelte/store';

export const comments = writable([]);

function findAndModify(commentsArray, id, modifyFn) {
	return commentsArray.map((comment) => {
		if (comment.id === id) {
			return modifyFn(comment);
		}
		if (comment.replies) {
			comment.replies = findAndModify(comment.replies, id, modifyFn);
		}
		return comment;
	});
}

export function addComment(newComment) {
	comments.update((currentComments) => [...currentComments, { ...newComment, replies: [] }]);
}

export function deleteComment(id) {
	comments.update((currentComments) => {
		const removeComment = (arr) =>
			arr.filter((comment) => {
				if (comment.id === id) return false;
				if (comment.replies) comment.replies = removeComment(comment.replies);
				return true;
			});
		return removeComment(currentComments);
	});
}

export function updateComment(id, content) {
	comments.update((currentComments) =>
		findAndModify(currentComments, id, (comment) => ({ ...comment, content }))
	);
}

export function upvoteComment(id) {
	comments.update((currentComments) =>
		findAndModify(currentComments, id, (comment) => ({
			...comment,
			score: (comment.score || 0) + 1
		}))
	);
}

export function downvoteComment(id) {
	comments.update((currentComments) =>
		findAndModify(currentComments, id, (comment) => ({
			...comment,
			score: (comment.score || 0) - 1
		}))
	);
}

export function addReply(parentId, reply) {
	comments.update((currentComments) =>
		findAndModify(currentComments, parentId, (parent) => {
			
			if (!parent.replies) {
				parent.replies = [];
			}
			return {
				...parent,
				replies: [...parent.replies, { ...reply, replies: [], score: 0 }]
			};
		})
	);
}

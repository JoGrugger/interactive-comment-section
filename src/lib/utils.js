export function timeSince(date) {
	const intervals = [
		{ label: 'year', seconds: 31536000 },
		{ label: 'month', seconds: 2592000 },
		{ label: 'day', seconds: 86400 },
		{ label: 'hour', seconds: 3600 },
		{ label: 'minute', seconds: 60 },
		{ label: 'second', seconds: 1 }
	];

	const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

	for (const interval of intervals) {
		const count = Math.floor(seconds / interval.seconds);
		if (count > 1) return `${count} ${interval.label}s ago`;
		if (count === 1) return `${count} ${interval.label} ago`;
	}
	return 'Just now';
}

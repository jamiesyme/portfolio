/**
 * @param {Function} [cb] - callback that is updated whenever interface changes
 */
export function isDesktop(cb) {
	if (window.matchMedia) {
		const query = window.matchMedia('(any-pointer: fine)');
		if (cb) {
			query.addListener(ev => {
				cb(ev.matches);
			});
			cb(query.matches);
		}
		return query.matches;
	}
	if (cb) {
		cb(true);
	}
	return true;
}

/**
 * @param {Function} [cb] - callback that is updated whenever interface changes
 */
export function isMobile(cb) {
	if (cb) {
		return !isDesktop(m => cb(!m));
	}
	return !isDesktop();
}

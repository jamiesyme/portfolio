import { isFunction } from 'underscore';

/**
 * Inserts padding in between elements of list.
 * @param list - The list to receive padding.
 * @param padding - The content to be inserted. May be a function, which is
 *   invoked with a single index parameter; the padding will be inserted after
 *   the given index.
 */
export function insertListPadding(list, padding) {
	for (let i = 1; i < list.length; i += 2) {
		if (isFunction(padding)) {
			list.splice(i, 0, padding(i - 1));
		} else {
			list.splice(i, 0, padding);
		}
	}
};

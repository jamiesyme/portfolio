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


/**
 * Calls a function on the first item in a list that passes a condition, but
 * defaults to the last item in the list if none of the items passed.
 * @param list
 * @param condition - function accepting the item to test, returns a bool
 * @param trigger - function accepting the item that passed the condition
 */
export function onConditionOrLast(list, condition, trigger) {
	for (let i = 0; i < list.length; ++i) {
		if (i + 1 === list.length || condition(list[i])) {
			trigger(list[i]);
			break;
		}
	}
};

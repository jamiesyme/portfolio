import { isString } from 'underscore';


const BlockType = {
	item: 'item',
	unorderedList: 'unordered list',
	paragraph: 'paragraph'
};

const ElementType = {
	text: 'text',
	link: 'link'
};

/**
 * Parses string as subset of markdown format. This format subset understands
 * the following:
 *   block-level:
 *     paragraphs (separated by a line of whitespace)
 *     bullet lists
 *   inline-level:
 *     links
 * @param str
 * @return
 * [ // List of blocks
 *   {
 *     type: 'paragraph',
 *     elements: [
 *       {
 *         type: 'text',
 *         content: '...'
 *       }, {
 *         type: 'link',
 *         content: '...',
 *         url: '...'
 *       }
 *     ]
 *   },
 *   {
 *     type: 'unordered list',
 *     elements: [
 *       {
 *         type: 'item',
 *         elements: [
 *           {
 *             type: 'text',
 *             content: '...'
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * ]
 */
export function parseMarkdown(str) {
	if (!isString(str)) {
		return [];
	}

	const blocks = [];
	let currentBlock = null;

	function finishBlock() {
		processInlineElements(currentBlock);
		blocks.push(currentBlock);
		currentBlock = null;
	};

	str.split('\n').forEach(line => {

		if (isLineEmpty(line)) {
			if (currentBlock !== null) {
				finishBlock();
			}

		} else if (isLineBulleted(line)) {
			if (currentBlock !== null &&
					currentBlock.type !== BlockType.unorderedList) {
				finishBlock();
			}
			if (currentBlock === null) {
				currentBlock = {
					type: BlockType.unorderedList,
					elements: []
				};
			}
			currentBlock.elements.push({
				type: BlockType.item,
				content: getContentFromBulletedLine(line)
			});

		} else {
			if (currentBlock !== null &&
					currentBlock.type !== BlockType.paragraph) {
				finishBlock();
			}
			if (currentBlock === null) {
				currentBlock = {
					type: BlockType.paragraph,
					content: ''
				};
			}
			currentBlock.content = currentBlock.content.concat(line);
		}
	});
	if (currentBlock !== null) {
		finishBlock();
	}

	return blocks;
};


function isLineEmpty(line) {
	for (let i = 0; i < line.length; ++i) {
		if (line[i] !== ' ' && line[i] !== '\t') {
			return false;
		}
	}
	return true;
};

function isLineBulleted(line) {
	return (line.length !== 0 && '+-*'.indexOf(line[0]) !== -1);
};

function getContentFromBulletedLine(line) {
	return line.substr(1).trim();
};

function processInlineElements(block) {
	if (block.type === BlockType.unorderedList) {
		block.elements.forEach(processInlineElements);
		return;
	}

	block.elements = [];
	const elements = block.elements;
	const str = block.content;
	delete block.content;

	let si = 0;
	while (si < str.length) {

		// This could be the start of a link
		if (str[si] === '[') {
			const i1 = si;                   // Index of '['
			const i2 = str.indexOf(']', i1); // Index of ']'
			const i3 = i2 + 1;               // Index of '('
			const i4 = str.indexOf(')', i3); // Index of ')'

			// Check if this is actually a link
			if (i1 < 0 || i2 < 0 || i3 < 0 || i4 < 0 || str[i3] != '(') {

				// It's not a link; false alarm
				elements.push({
					type: 'text',
					content: str.substring(si, i2 + 1)
				});
				si = i2 + 1;

			} else {

				// We found a link!
				elements.push({
					type: 'link',
					content: str.substring(i1 + 1, i2),
					url: str.substring(i3 + 1, i4)
				});
				si = i4 + 1;
			}

			// This is the start of some text
		} else {

			// It will be text until a link occurs
			const ei = str.indexOf('[', si);

			if (ei < 0) {
				elements.push({
					type: 'text',
					content: str.substring(si)
				});
				break;

			} else {
				elements.push({
					type: 'text',
					content: str.substring(si, ei)
				});
				si = ei;
			}
		}
	}
};
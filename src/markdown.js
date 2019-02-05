export const BlockType = {
	heading1: 'heading1',
	heading2: 'heading2',
	heading3: 'heading3',
	paragraph: 'paragraph',
	unorderedList: 'unordered list',
	listItem: 'list item',
};

export const ElementType = {
	image: 'image',
	link: 'link',
	text: 'text',
};


/**
 * Parses string as subset of markdown format. This format subset understands the
 * following elements:
 *   block-level:
 *     bullet lists
 *     paragraphs
 *   inline-level:
 *     links
 *     images
 *     text
 *
 * @param str
 * @returns
 * [ // List of blocks
 *   {
 *     type: 'heading1',
 *     elements: [
 *       {
 *         type: 'text',
 *         content: '...'
 *       }
 *     ]
 *   },
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
 *       }, {
 *         type: 'image',
 *         content: '...',
 *         url: '...'
 *       }
 *     ]
 *   },
 *   {
 *     type: 'unordered list',
 *     elements: [
 *       {
 *         type: 'list item',
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
	if (!str) {
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
				type: BlockType.listItem,
				content: getContentFromBulletedLine(line)
			});

		} else if (isLineHeading(line)) {
			if (currentBlock !== null) {
				finishBlock();
			}
			const level = line.split(/^(#+)/)[1].length;
			if (level === 1) {
				currentBlock = {
					type: BlockType.heading1,
					elements: [],
				};
			} else if (level === 2) {
				currentBlock = {
					type: BlockType.heading2,
					elements: [],
				};
			} else {
				currentBlock = {
					type: BlockType.heading3,
					elements: [],
				};
			}
			currentBlock.elements.push({
				type: ElementType.text,
				content: getContentFromHeadingLine(line),
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


export default {
	BlockType: BlockType,
	ElementType: ElementType,
	parse: parseMarkdown
};


function isLineEmpty(line) {
	for (let i = 0; i < line.length; ++i) {
		if (line[i] !== ' ' && line[i] !== '\t') {
			return false;
		}
	}
	return true;
}

function isLineHeading(line) {
	return (line.length !== 0 && line[0] === '#');
}

function isLineBulleted(line) {
	return (line.length !== 0 && '+-*'.indexOf(line[0]) !== -1);
}

function getContentFromHeadingLine(line) {
	return line.split(/^#+(.*)$/)[1].trim();
}

function getContentFromBulletedLine(line) {
	return line.substr(1).trim();
}

function isBlock(element) {
	for (const key of Object.keys(BlockType)) {
		if (element.type === BlockType[key]) {
			return true;
		}
	}
	return false;
}

function processInlineElements(block) {
	if (!isBlock(block)) {
		return;
	}
	if (!block.content) {
		if (block.elements) {
			block.elements.forEach(processInlineElements);
		}
		return;
	}

	block.elements = [];
	const elements = block.elements;
	const str = block.content;
	delete block.content;

	let si = 0;
	while (si < str.length) {

		// Check for image
		if (str[si] === '!') {
			const i1 = si + 1;               // Index of '['
			const i2 = str.indexOf(']', i1); // Index of ']'
			const i3 = i2 + 1;               // Index of '('
			const i4 = str.indexOf(')', i3); // Index of ')'

			if (str[i1] === '[' ||
			    str[i2] === ']' ||
			    str[i3] === '(' ||
			    str[i4] === ')') {
				elements.push({
					type: ElementType.image,
					content: str.substring(i1 + 1, i2),
					url: str.substring(i3 + 1, i4),
				});
				si = i4 + 1;
				continue;
			}
		}

		// Check for link
		if (str[si] === '[') {
			const i1 = si;                   // Index of '['
			const i2 = str.indexOf(']', i1); // Index of ']'
			const i3 = i2 + 1;               // Index of '('
			const i4 = str.indexOf(')', i3); // Index of ')'

			if (str[i1] === '[' ||
			    str[i2] === ']' ||
			    str[i3] === '(' ||
			    str[i4] === ')') {
				elements.push({
					type: ElementType.link,
					content: str.substring(i1 + 1, i2),
					url: str.substring(i3 + 1, i4),
				});
				si = i4 + 1;
				continue;
			}
		}

		// It will be text until a link or image occurs
		const ei = (() => {
			const i1 = str.indexOf('[', si);
			const i2 = str.indexOf('!', si);
			return i1 < 0 ? i2 : (i2 < 0 ? i1 : Math.min(i1, i2));
		})();
		if (ei < 0) {
			elements.push({
				type: ElementType.text,
				content: str.substring(si)
			});
			break;
		} else {
			elements.push({
				type: ElementType.text,
				content: str.substring(si, ei)
			});
			si = ei;
		}
	}
}

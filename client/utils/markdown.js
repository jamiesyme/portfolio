function isParagraphEmpty(str) {
	for (let i = 0; i < str.length; ++i) {
		if (str[i] != ' ' && str[i] != '\t') {
			return false;
		}
	}
	return true;
};

/**
 * Parses string as subset of markdown format. This format subset understands
 * paragraphs (separated by a line of whitespace), and inline links within those
 * paragraphs.
 * @param str
 * @return
 * [ // List of paragraph
 *   [ // List of elements within paragraph
 *     {
 *       type: 'text',
 *       content: '...'
 *     }, {
 *       type: 'link',
 *       content: '...',
 *       url: '...'
 *     }
 *   ]
 * ]
 */
export function parseMarkdown(str) {
	if (!str) {
		return [];
	}

	// Split the string into paragraphs
	const paragraphs = [];
	const lines = str.split('\n');
	let currentParagraph = '';
	lines.forEach(line => {
		if (isParagraphEmpty(line)) {
			if (currentParagraph.length > 0) {
				paragraphs.push(currentParagraph);
				currentParagraph = '';
			}
		} else {
			if (currentParagraph.length > 0) {
				currentParagraph = currentParagraph + '\n' + line;
			} else {
				currentParagraph = currentParagraph + line;
			}
		}
	});
	if (currentParagraph.length > 0) {
		paragraphs.push(currentParagraph);
	}

	// Parse the paragraphs for links
	const outputParagraphs = [];
	paragraphs.forEach(str => {
		let outputElements = [];

		let si = 0;
		while (si < str.length) {

			if (str[si] === '[') {
				const i1 = si;                   // Index of '['
				const i2 = str.indexOf(']', i1); // Index of ']'
				const i3 = i2 + 1;               // Index of '('
				const i4 = str.indexOf(')', i3); // Index of ')'

				if (i1 < 0 || i2 < 0 || i3 < 0 || i4 < 0 || str[i3] != '(') {
					outputElements.push({
						type: 'text',
						content: str.substring(si, i2 + 1)
					});
					si = i2 + 1;

				} else {
					outputElements.push({
						type: 'link',
						content: str.substring(i1 + 1, i2),
						url: str.substring(i3 + 1, i4)
					});
					si = i4 + 1;
				}

			} else {
				const ei = str.indexOf('[', si);

				if (ei < 0) {
					outputElements.push({
						type: 'text',
						content: str.substring(si)
					});
					break;

				} else {
					outputElements.push({
						type: 'text',
						content: str.substring(si, ei)
					});
					si = ei;
				}
			}
		}

		outputParagraphs.push(outputElements);
	});

	return outputParagraphs;
};

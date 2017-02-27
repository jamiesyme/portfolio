import React from 'react';

import BulletListOrg from '../organisms/bullet-list';
import LinkAtom from '../atoms/link';
import ParagraphAtom from '../atoms/paragraph';

import { parseMarkdown } from '../utils/markdown';


function markdownElementToReact(element, index) {
	if (element.type === 'text') {
		return element.content;
	} else {
		return (
			<LinkAtom key={index.toString()}
								href={element.url}>
				{element.content}
			</LinkAtom>
		);
	}
};

export function markdownToReact(str) {

	return parseMarkdown(str).map((block, index) => {

		if (block.type === 'paragraph') {

			const paragraphElements = block.elements.map(markdownElementToReact);
			return (
				<ParagraphAtom key={index.toString()}>
					{paragraphElements}
				</ParagraphAtom>
			);

		} else {

			const bulletListItems = block.elements.map(item => (
				item.elements.map(markdownElementToReact)
			));
			return (
				<BulletListOrg key={index.toString()} items={bulletListItems} />
			);
		}
	});
};

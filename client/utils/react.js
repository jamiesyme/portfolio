import React from 'react';

import BulletListOrg from '../organisms/bullet-list';
import ButtonLinkAtom from '../atoms/button-link';
import LinkAtom from '../atoms/link';
import ParagraphAtom from '../atoms/paragraph';
import PictureAtom from '../atoms/picture';

import Markdown from '../utils/markdown';


const baseOptions = {
	// These are the default generator functions, and they can be overridden
	// individually by passing in an options object to the functions below.
	// Each function is called with three parameters:
	//  1) The block or element to be created
	//  2) The index of the element within the block
	//  3) The options object
	// The function will return a react component.
	createParagraph: null,
	createUnorderedList: null,
	createImage: null,
	createLink: null,
	createText: null
};


export function markdownElementToReact(element, index, options) {
	options = Object.assign(
		{},
		baseOptions,
		options
	);

	switch (element.type) {
	case Markdown.ElementType.image:
		return options.createImage(element, index, options);

	case Markdown.ElementType.link:
		return options.createLink(element, index, options);

	case Markdown.ElementType.text:
		return options.createText(element, index, options);

	default:
		return null;
	};
};

export function markdownToReact(str, options) {
	options = Object.assign(
		{},
		baseOptions,
		options
	);

	return Markdown.parse(str).map((block, index) => {
		switch (block.type) {
		case Markdown.BlockType.paragraph:
			return options.createParagraph(block, index, options);

		case Markdown.BlockType.unorderedList:
			return options.createUnorderedList(block, index, options);

		default:
			return null;
		};
	});
};

baseOptions.createParagraph = function(block, index, options) {
	const paragraphElements = block.elements.map((e, i) => (
		markdownElementToReact(e, i, options)
	));
	return (
		<ParagraphAtom key={index.toString()}>
			{paragraphElements}
		</ParagraphAtom>
	);
};

baseOptions.createUnorderedList = function(block, index, options) {
	const bulletListItems = block.elements.map(item => (
		item.elements.map((e, i) => markdownElementToReact(e, i, options))
	));
	return (
		<BulletListOrg key={index.toString()} items={bulletListItems} />
	);
};

baseOptions.createImage = function(element, index, options) {
	return (
		<PictureAtom key={index.toString()}
								 src={element.url}>
			{element.content}
		</PictureAtom>
	);
};

baseOptions.createLink = function(element, index, options) {
	return (
		<LinkAtom key={index.toString()}
							href={element.url}>
			{element.content}
		</LinkAtom>
	);
};

baseOptions.createText = function(element, index, options) {
	return element.content;
};

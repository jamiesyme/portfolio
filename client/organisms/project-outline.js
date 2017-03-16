import React from 'react';

import ColorPaletteAtom from '../atoms/color-palette';
import FontPaletteAtom from '../atoms/font-palette';
import LinkAtom from '../atoms/link';
import ParagraphAtom from '../atoms/paragraph';
import TextAtom from '../atoms/text';

import { insertListPadding } from '../utils/list';


const baseStyles = {
	container: {},
	entry: {
		display: 'flex',
		marginBottom: 20
	},
	entryName: {
		color: ColorPaletteAtom.body,
		flex: '0 0 15%',
		fontFamily: FontPaletteAtom.body,
		fontSize: 14,
		fontWeight: 'bold',
		marginTop: 4,
		marginRight: '4%',
		overflow: 'hidden',
		textAlign: 'right',
		textOverflow: 'ellipsis'
	},
	entryValue: {
		margin: 0,
		textAlign: 'left'
	}
};


export class ProjectOutlineOrg extends React.Component {
	render() {
		const containerStyle = Object.assign(
			{},
			baseStyles.container,
			this.props.style
		);

		const stackText = this.props.stack.join(', ');

		const whereItems = this.props.where.map((item, index) => (
			<LinkAtom key={'l' + index.toString()} url={item.url}>
				{item.text}
			</LinkAtom>
		));
		insertListPadding(whereItems, index => (
			<TextAtom key={'t' + index.toString()}>, </TextAtom>
		));

		// TODO: Replace with PaddedListOrg
		return (
			<div style={containerStyle}>
				<div style={baseStyles.entry}>
					<div style={baseStyles.entryName}>Stack</div>
					<ParagraphAtom style={baseStyles.entryValue}>
						{stackText}
					</ParagraphAtom>
				</div>

				<div style={baseStyles.entry}>
					<div style={baseStyles.entryName}>When</div>
					<ParagraphAtom style={baseStyles.entryValue}>
						{this.props.when}
					</ParagraphAtom>
				</div>

				<div style={baseStyles.entry}>
					<div style={baseStyles.entryName}>Where</div>
					<ParagraphAtom style={baseStyles.entryValue}>
						{whereItems}
					</ParagraphAtom>
				</div>
			</div>
		);
	}
};

export default ProjectOutlineOrg;


ProjectOutlineOrg.propTypes = {
	stack: React.PropTypes.arrayOf(React.PropTypes.string),
	when: React.PropTypes.string,
	where: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			text: React.PropTypes.string,
			url: React.PropTypes.string
		})
	)
};

ProjectOutlineOrg.defaultProps = {
	stack: [],
	where: []
};

import React from 'react';
import ReactDOM from 'react-dom';

import ColorPaletteAtom from '../atoms/color-palette';
import FontPaletteAtom from '../atoms/font-palette';
import LinkAtom from '../atoms/link';
import ParagraphAtom from '../atoms/paragraph';
import TextAtom from '../atoms/text';

import { insertListPadding } from '../utils/list';


const styles = {
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
		const extStyles = Object.assign(
			{},
			styles,
			{
				container: Object.assign(
					{},
					styles.container,
					this.props.style
				)
			}
		);

		const langText = this.props.languages.join(', ');

		const whereItems = this.props.where.map((item, index) => (
			<LinkAtom key={'l' + index.toString()} href={item.url}>
				{item.text}
			</LinkAtom>
		));
		insertListPadding(whereItems, index => (
			<TextAtom key={'t' + index.toString()}>, </TextAtom>
		));

		return (
			<div style={extStyles.container}>
				<div style={styles.entry}>
					<div style={styles.entryName}>Languages</div>
					<ParagraphAtom style={styles.entryValue}>
						{langText}
					</ParagraphAtom>
				</div>

				<div style={styles.entry}>
					<div style={styles.entryName}>When</div>
					<ParagraphAtom style={styles.entryValue}>
						{this.props.when}
					</ParagraphAtom>
				</div>

				<div style={styles.entry}>
					<div style={styles.entryName}>Where</div>
					<ParagraphAtom style={styles.entryValue}>
						{whereItems}
					</ParagraphAtom>
				</div>
			</div>
		);
	}
};

export default ProjectOutlineOrg;


ProjectOutlineOrg.propTypes = {
	languages: React.PropTypes.arrayOf(React.PropTypes.string),
	style: React.PropTypes.object,
	when: React.PropTypes.string,
	where: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			text: React.PropTypes.string,
			url: React.PropTypes.string
		})
	)
};

ProjectOutlineOrg.defaultProps = {
	languages: [],
	where: []
};

import React from 'react';
import ReactDOM from 'react-dom';

import ColorPaletteAtom from '../atoms/color-palette';
import FontPaletteAtom from '../atoms/font-palette';
import LinkAtom from '../atoms/link';
import ParagraphAtom from '../atoms/paragraph';
import TextAtom from '../atoms/text';


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
		textAlign: 'left'
	},
	firstParagraph: {
		marginTop: 0
	},
	paragraph: {
		margin: 0
	}
};


export class ProjectOutlineOrg extends React.Component {
	render() {
		const containerStyle = Object.assign(
			{},
			styles.container,
			this.props.style
		);

		let whereProps = [];
		const whereObjs = Array.isArray(this.props.where)
										? this.props.where
										: [this.props.where];
		whereObjs.forEach((whereObj, index) => {
			let lKey = index.toString();
			let tKey = 't' + lKey;
			if (index > 0) {
				whereProps.push(<TextAtom key={tKey}>', '</TextAtom>);
			}
			whereProps.push(<LinkAtom key={lKey} href={whereObj.url}>{whereObj.text}</LinkAtom>);
		});

		let detailsProps = [];
		this.props.details.split('\n').forEach((text, index) => {
			let key = index.toString();
			if (index > 0) {
				detailsProps.push(<ParagraphAtom key={key} style={styles.paragraph}>{text}</ParagraphAtom>);
			} else {
				detailsProps.push(<ParagraphAtom key={key} style={styles.firstParagraph}>{text}</ParagraphAtom>);
			}
		});

		return (
			<div style={containerStyle}>
				<div style={styles.entry}>
					<div style={styles.entryName}>Summary</div>
					<div style={styles.entryValue}>
						<ParagraphAtom style={styles.paragraph}>{this.props.summary}</ParagraphAtom>
					</div>
				</div>

				<div style={styles.entry}>
					<div style={styles.entryName}>Languages</div>
					<div style={styles.entryValue}>
						<ParagraphAtom style={styles.paragraph}>{this.props.languages.join(', ')}</ParagraphAtom>
					</div>
				</div>

				<div style={styles.entry}>
					<div style={styles.entryName}>When</div>
					<div style={styles.entryValue}>
						<ParagraphAtom style={styles.paragraph}>{this.props.when}</ParagraphAtom>
					</div>
				</div>

				<div style={styles.entry}>
					<div style={styles.entryName}>Where</div>
					<div style={styles.entryValue}>{whereProps}</div>
				</div>

				<div style={styles.entry}>
					<div style={styles.entryName}>Details</div>
					<div style={styles.entryValue}>{detailsProps}</div>
				</div>
			</div>
		);
	}
};

export default ProjectOutlineOrg;


const whereObjPropType = React.PropTypes.shape({
	url: React.PropTypes.string,
	text: React.PropTypes.string
});

ProjectOutlineOrg.propTypes = {
	style: React.PropTypes.object,
	summary: React.PropTypes.string,
	languages: React.PropTypes.arrayOf(React.PropTypes.string),
	when: React.PropTypes.string,
	where: React.PropTypes.oneOfType([
		React.PropTypes.arrayOf(whereObjPropType),
		whereObjPropType
	]),
	details: React.PropTypes.string
};

ProjectOutlineOrg.defaultProps = {
	summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus ultricies elit eu laoreet. Sed id urna faucibus, interdum turpis.',
	languages: ['C', 'Xlib', 'Cairo/Pango', 'Make'],
	when: 'Jan \'17 - Present',
	where: {
		url: 'https://github.com/jamiesyme/minfo',
		text: 'Github'
	},
	details: 'None.'
};

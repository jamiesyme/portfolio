import React from 'react';

import ColorPaletteAtom from '../atoms/color-palette';
import FontPaletteAtom from '../atoms/font-palette';
import PaddedListOrg from '../organisms/padded-list';


const baseStyles = {
	list: {
		listStyleType: 'disc',
		paddingLeft: 50
	},
	item: {
		color: ColorPaletteAtom.body,
		fontFamily: FontPaletteAtom.body,
		fontSize: 18,
		letterSpacing: 0.5,
		lineHeight: 1.6
	}
};


export default class BulletListOrg extends React.Component {
	render() {
		const listStyle = Object.assign(
			{},
			baseStyles.list,
			this.props.styles.list
		);

		const itemStyle = Object.assign(
			{},
			baseStyles.item,
			this.props.styles.item
		);

		const styles = {
			list: listStyle,
			item: itemStyle
		};

		return (
			<PaddedListOrg styles={styles} items={this.props.items} />
		);
	}
};


BulletListOrg.propTypes = {
	items: React.PropTypes.array,
	styles: React.PropTypes.shape({
		list: React.PropTypes.object,
		item: React.PropTypes.object
	})
};

BulletListOrg.defaultProps = {
	items: [],
	styles: {}
};

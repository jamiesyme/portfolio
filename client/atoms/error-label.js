import React from 'react';

import ColorPaletteAtom from '../atoms/color-palette';
import FontPaletteAtom from '../atoms/font-palette';


const baseStyles = {
	label: {
		color: '#FF3B3F',
		display: 'block',
		fontFamily: FontPaletteAtom.body,
		fontSize: 16,
		letterSpacing: 0.5,
		lineHeight: 1.2
	}
};


export class ErrorLabel extends React.Component {
	render() {
		return (
				<label style={baseStyles.label}>{this.props.children}</label>
		);
	}
};

export default ErrorLabel;

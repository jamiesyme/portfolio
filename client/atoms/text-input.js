import Radium from 'radium';
import React from 'react';

import ColorPaletteAtom from '../atoms/color-palette';
import FontPaletteAtom from '../atoms/font-palette';


const baseStyles = {
	input: {
		border: '1px solid ' + ColorPaletteAtom.heavy,
		borderRadius: '3px',
		color: ColorPaletteAtom.body,
		display: 'block',
		fontFamily: FontPaletteAtom.body,
		fontSize: 18,
		letterSpacing: 0.5,
		lineHeight: 1.6,
		padding: 10,
		':focus': {
			border: '1px solid ' + ColorPaletteAtom.accent,
			boxShadow: '0 0 2px ' + ColorPaletteAtom.accent,
			outline: 'none'
		}
	}
};


export class TextInput extends React.Component {
	render() {
		const inputStyle = Object.assign(
			{},
			baseStyles.input,
			this.props.style
		);

		return (
			<input
				style={inputStyle}
				placeholder={this.props.placeholder}
				required={this.props.required}
				type={this.props.type} />
		);
	}
};
TextInput = Radium(TextInput);

export default TextInput;


TextInput.propTypes = {
	placeholder: React.PropTypes.string,
	required: React.PropTypes.bool,
	type: React.PropTypes.string
};

TextInput.defaultProps = {
	placeholder: '',
	required: true,
	type: 'text'
};
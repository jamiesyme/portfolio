import Radium from 'radium';
import React from 'react';

import ColorPaletteAtom from '../atoms/color-palette';
import FontPaletteAtom from '../atoms/font-palette';


const baseStyles = {
	input: {
		border: '1px solid ' + ColorPaletteAtom.heavy,
		borderRadius: '3px',
		boxShadow: 'none',
		color: ColorPaletteAtom.body,
		display: 'block',
		fontFamily: FontPaletteAtom.body,
		fontSize: 18,
		letterSpacing: 0.5,
		lineHeight: 1.6,
		outline: 'none',
		padding: 10,
		':focus': {
			boxShadow: '0 0 2px black',
			outline: 'none'
		}
	}
};


export class TextInputAtom extends React.Component {
	render() {
		const inputStyle = Object.assign(
			{},
			baseStyles.input,
			this.props.style
		);

		return (
			<input
				style={inputStyle}
				id={this.props.id}
				onFocus={this.props.onFocus}
				placeholder={this.props.placeholder}
				required={this.props.required}
				type={this.props.type} />
		);
	}
};
TextInputAtom = Radium(TextInputAtom);

export default TextInputAtom;


TextInputAtom.propTypes = {
	id: React.PropTypes.string,
	//onFocus: React.PropTypes.function,
	placeholder: React.PropTypes.string,
	required: React.PropTypes.bool,
	type: React.PropTypes.string
};

TextInputAtom.defaultProps = {
	required: true,
	type: 'text'
};

import Radium from 'radium';
import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';

import ColorPaletteAtom from '../atoms/color-palette';
import FontPaletteAtom from '../atoms/font-palette';


const baseStyles = {
	inputArea: {
		border: '1px solid ' + ColorPaletteAtom.heavy,
		borderRadius: '3px',
		color: ColorPaletteAtom.body,
		display: 'block',
		fontFamily: FontPaletteAtom.body,
		fontSize: 18,
		letterSpacing: 0.5,
		lineHeight: 1.6,
		padding: 10,
		width: '100%',
		':focus': {
			boxShadow: '0 0 2px black',
			outline: 'none'
		}
	}
};


const RadiumTextareaAutosize = Radium(TextareaAutosize);

export class TextInputArea extends React.Component {
	render() {
		const inputAreaStyle = Object.assign(
			{},
			baseStyles.inputArea,
			this.props.style
		);

		return (
			<RadiumTextareaAutosize
				style={inputAreaStyle}
				id={this.props.id}
				onFocus={this.props.onFocus}
				placeholder={this.props.placeholder}
				required={this.props.required}
				rows={this.props.minRows} />
		);
	}
};
TextInputArea = Radium(TextInputArea);

export default TextInputArea;


TextInputArea.propTypes = {
	id: React.PropTypes.string,
	minRows: React.PropTypes.number,
	//onFocus: React.PropTypes.function,
	placeholder: React.PropTypes.string,
	required: React.PropTypes.bool
};

TextInputArea.defaultProps = {
	minRows: 3,
	required: true
};

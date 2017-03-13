import React from 'react';

import ColorPaletteAtom from '../atoms/color-palette';
import ErrorLabelAtom from '../atoms/error-label';
import FontPaletteAtom from '../atoms/font-palette';
import TextInputAtom from '../atoms/text-input';


const baseStyles = {
	input: {
		onError: {
			border: '1px solid #FF3B3F',
			boxShadow: '0 0 2px #FF3B3F'
		}
	}
};


export class TextInputMole extends React.Component {
	render() {
		const inputStyle = Object.assign(
			{},
			baseStyles.input,
			this.props.style,
			this.props.error && baseStyles.input.onError
		);

		const errorElement = (
			this.props.error
				? <ErrorLabelAtom>{this.props.error}</ErrorLabelAtom>
				: null
		);

		const inputElement = (
			<TextInputAtom style={inputStyle}
										 id={this.props.id}
										 onFocus={this.props.onFocus}
										 placeholder={this.props.placeholder}
										 type={this.props.type} />
		);

		return (
			<div>
				{errorElement}
				{inputElement}
			</div>
		);
	}
};

export default TextInputMole;


TextInputMole.propTypes = {
	error: React.PropTypes.node,
	id: React.PropTypes.string,
	//onFocus: React.PropTypes.function,
	placeholder: React.PropTypes.string,
	required: React.PropTypes.bool,
	type: React.PropTypes.string
};

TextInputMole.defaultProps = {
	required: true,
	type: 'text'
};

import React from 'react';

import ColorPaletteAtom from '../atoms/color-palette';
import ErrorLabelAtom from '../atoms/error-label';
import FontPaletteAtom from '../atoms/font-palette';
import TextInputAreaAtom from '../atoms/text-input-area';


const baseStyles = {
	inputArea: {
		onError: {
			border: '1px solid #FF3B3F',
			boxShadow: '0 0 2px #FF3B3F'
		}
	}
};


export class TextInputAreaMole extends React.Component {
	render() {
		const inputAreaStyle = Object.assign(
			{},
			baseStyles.inputArea,
			this.props.style,
			this.props.error && baseStyles.inputArea.onError
		);

		const errorElement = (
			this.props.error
				? <ErrorLabelAtom>{this.props.error}</ErrorLabelAtom>
				: null
		);

		const inputElement = (
			<TextInputAreaAtom
				style={inputAreaStyle}
				id={this.props.id}
				minRows={this.props.minRows}
				placeholder={this.props.placeholder}
				onFocus={this.props.onFocus} />
		);

		return (
			<div>
				{errorElement}
				{inputElement}
			</div>
		);
	}
};

export default TextInputAreaMole;


TextInputAreaMole.propTypes = {
	error: React.PropTypes.node,
	id: React.PropTypes.string,
	//onFocus: React.PropTypes.function,
	placeholder: React.PropTypes.string,
	minRows: React.PropTypes.number
};

import Radium from 'radium';
import React from 'react';

import ColorPaletteAtom from './color-palette';
import FontPaletteAtom from './font-palette';


const baseStyles = {
	button: {
		backgroundColor: ColorPaletteAtom.bg,
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
			boxShadow: '0 0 2px black',
			outline: 'none'
		}
	}
};


export class SubmitButton extends React.Component {
	render() {
		const buttonStyle = Object.assign(
			{},
			baseStyles.button,
			this.props.style
		);

		return (
				<button style={buttonStyle}
								id={this.props.id}
								onClick={this.props.onClick}
								type="button">
					{this.props.text}
				</button>
		);
	}
};
SubmitButton = Radium(SubmitButton);

export default SubmitButton;


SubmitButton.propTypes = {
	id: React.PropTypes.string,
	//onClick: React.PropTypes.function,
	text: React.PropTypes.string
};

SubmitButton.defaultProps = {
	text: 'Submit'
};

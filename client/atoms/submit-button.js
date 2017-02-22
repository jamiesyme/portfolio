import React from 'react';


const baseStyles = {
	button: {
		display: 'block'
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
				<button style={buttonStyle} type="submit">{this.props.text}</button>
		);
	}
};

export default SubmitButton;


SubmitButton.propTypes = {
	text: React.PropTypes.string
};

SubmitButton.defaultProps = {
	text: 'Submit'
};

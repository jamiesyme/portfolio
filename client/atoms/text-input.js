import React from 'react';


const baseStyles = {
	input: {
		display: 'block'
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
			<input style={inputStyle} type="text" />
		);
	}
};

export default TextInput;

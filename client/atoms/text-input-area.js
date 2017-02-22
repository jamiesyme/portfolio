import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';


const baseStyles = {
	inputArea: {
		display: 'block',
		width: '100%'
	}
};


export class TextInputArea extends React.Component {
	render() {
		const inputAreaStyle = Object.assign(
			{},
			baseStyles.inputArea,
			this.props.style
		);

		return (
				<TextareaAutosize style={inputAreaStyle} rows={this.props.minRows} />
		);
		//return (
				//<textarea style={inputAreaStyle}></textarea>
		//);
	}
};

export default TextInputArea;


TextInputArea.propTypes = {
	minRows: React.PropTypes.number
};

TextInputArea.defaultProps = {
	minRows: 3
};

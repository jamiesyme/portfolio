import React from 'react';


const baseStyles = {
	img: {
		backgroundColor: '#DDD',
		height: 250,
		margin: 20,
		width: 250
	}
};


export class ScreenshotAtom extends React.Component {
	render() {
		const imgStyle = Object.assign(
			{},
			baseStyles.img,
			this.props.style
		);

		return (
			<div style={imgStyle}></div>
		);
	}
};

export default ScreenshotAtom;


ScreenshotAtom.propTypes = {
	style: React.PropTypes.object,
	src: React.PropTypes.string
};

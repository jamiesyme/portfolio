import React from 'react';


const baseStyles = {
	img: {
		backgroundColor: '#DDD',
		boxShadow: '0px 0px 5px black',
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
			<img style={imgStyle} src={this.props.src} />
		);
	}
};

export default ScreenshotAtom;


ScreenshotAtom.propTypes = {
	style: React.PropTypes.object,
	src: React.PropTypes.string
};

import React from 'react';
import ReactDOM from 'react-dom';


const styles = {
	img: {
		backgroundColor: '#DDD',
		height: 250,
		margin: 20,
		width: 250
	}
};


export class ScreenshotAtom extends React.Component {
	render() {
		const extStyles = Object.assign(
			{},
			styles,
			{
				img: Object.assign(
					{},
					styles.img,
					this.props.style
				)
			}
		);
		return (
			<div style={extStyles.img}></div>
		);
	}
};

export default ScreenshotAtom;


ScreenshotAtom.propTypes = {
	style: React.PropTypes.object,
	src: React.PropTypes.string
};

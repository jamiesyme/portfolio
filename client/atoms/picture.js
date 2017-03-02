import React from 'react';


const baseStyles = {
	img: {
		backgroundColor: 'rgb(200, 200, 200)',
		borderRadius: '50%',
		margin: 'auto'
	}
};


export class PictureAtom extends React.Component {
	render() {
		const imgStyle = Object.assign(
			{},
			baseStyles.img,
			{
				width: this.props.size,
				height: this.props.size
			},
			this.props.style
		);

		return (
			<div style={imgStyle}></div>
		);
	}
};

export default PictureAtom;


PictureAtom.propTypes = {
	size: React.PropTypes.number,
	src: React.PropTypes.string
};

PictureAtom.defaultProps = {
	size: 250
};

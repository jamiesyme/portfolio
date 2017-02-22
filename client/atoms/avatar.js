import React from 'react';


const baseStyles = {
	img: {
		backgroundColor: 'rgb(200, 200, 200)',
		borderRadius: '50%',
		height: 250,
		margin: 'auto',
		width: 250
	}
};

export class AvatarAtom extends React.Component {
	render() {
		return (
			<div style={baseStyles.img}></div>
		);
	}
};

export default AvatarAtom;

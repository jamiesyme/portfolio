import React from 'react';
import ReactDOM from 'react-dom';


const style = {
	backgroundColor: 'rgb(200, 200, 200)',
	borderRadius: '50%',
	height: 250,
	margin: 'auto',
	width: 250
};

export class AvatarAtom extends React.Component {
	render() {
		return (
			<div style={style}></div>
		);
	}
};

export default AvatarAtom;

import React from 'react';
import ReactDOM from 'react-dom';


const style = {
	backgroundColor: '#DDD',
	height: 250,
	margin: '20 20 20 40',
	width: 250
};

export class ScreenshotAtom extends React.Component {
	render() {
		return (
			<div style={style}></div>
		);
	}
};

export default ScreenshotAtom;

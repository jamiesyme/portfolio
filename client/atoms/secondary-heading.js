import React from 'react';
import ReactDOM from 'react-dom';


export class SecondaryHeadingAtom extends React.Component {
	render() {
		return (
			<h2>{this.props.children}</h2>
		);
	}
};

export default SecondaryHeadingAtom;

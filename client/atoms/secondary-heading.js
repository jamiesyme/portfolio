import React from 'react';
import ReactDOM from 'react-dom';

export class SecondaryHeading extends React.Component {
	render() {
		return (
			<h2>{this.props.children}</h2>
		);
	}
};

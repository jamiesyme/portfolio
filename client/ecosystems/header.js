import React from 'react';
import ReactDOM from 'react-dom';

import ColorPaletteAtom from '../atoms/color-palette';
import LogoAtom from '../atoms/logo';
import NavigationBarMole from '../molecules/navigation-bar';


const headerStyle = {
	backgroundColor: ColorPaletteAtom.bg,
	position: 'fixed',
	width: '100%'
};

const innerHeaderStyle = {
	height: 64,
	margin: 'auto',
	width: 960
};

const navStyle = {
	float: 'right'
};

export class HeaderEco extends React.Component {
	render() {
		return (
			<header style={headerStyle}>
				<div style={innerHeaderStyle}>
					<LogoAtom />
					<div style={navStyle}>
						<NavigationBarMole />
					</div>
				</div>
			</header>
		);
	}
};

export default HeaderEco;

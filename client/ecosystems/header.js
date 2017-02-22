import React from 'react';

import ColorPaletteAtom from '../atoms/color-palette';
import LogoAtom from '../atoms/logo';
import NavigationBarMole from '../molecules/navigation-bar';


const baseStyles = {
	header: {
		backgroundColor: ColorPaletteAtom.bg,
		position: 'fixed',
		width: '100%'
	},
	innerHeader: {
		height: 64,
		margin: 'auto',
		width: 960
	},
	nav: {
		float: 'right'
	}
}


export class HeaderEco extends React.Component {
	render() {
		return (
			<header style={baseStyles.header}>
				<div style={baseStyles.innerHeader}>
					<LogoAtom />
					<div style={baseStyles.nav}>
						<NavigationBarMole />
					</div>
				</div>
			</header>
		);
	}
};

export default HeaderEco;

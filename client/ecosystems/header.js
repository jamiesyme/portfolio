import React from 'react';

import ColorPaletteAtom from '../atoms/color-palette';
import LogoAtom from '../atoms/logo';
import NavigationBarOrg from '../organisms/navigation-bar';


const baseStyles = {
	header: {
		backgroundColor: ColorPaletteAtom.bg,
		borderBottom: '1px solid ' + ColorPaletteAtom.heavy,
		position: 'fixed',
		top: '0',
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
};


export class HeaderEco extends React.Component {
	render() {
		return (
			<header style={baseStyles.header}>
				<div style={baseStyles.innerHeader}>
					<LogoAtom />
					<div style={baseStyles.nav}>
						<NavigationBarOrg links={this.props.links} />
					</div>
				</div>
			</header>
		);
	}
};

export default HeaderEco;


HeaderEco.propTypes = {
	links: React.PropTypes.arrayOf(React.PropTypes.shape({
		active: React.PropTypes.bool,
		text: React.PropTypes.string,
		url: React.PropTypes.string
	}))
};

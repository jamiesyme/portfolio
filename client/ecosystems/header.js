import $ from 'jquery';
import React from 'react';

import ColorPaletteAtom from '../atoms/color-palette';
import LogoAtom from '../atoms/logo';
import NavigationBarOrg from '../organisms/navigation-bar';

import { onConditionOrLast } from '../utils/list';


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
	constructor(props) {
		super(props);
		this.state = {
			links: this.props.links
		};
		this.state.links.forEach(link => link.active = false);
	}

	componentDidMount() {
		$(document).scroll(() => {
			this.onScroll();
		});

		// Trigger the scroll so one of the links will be marked as active
		$(document).scroll();
	}

	componentWillUnmount() {
		// This will remove all scroll handlers, which works, but we should really
		// only be removing the scroll handler that we added.
		$(document).off('scroll');
	}

	onScroll() {
		const links = this.state.links;
		links.forEach(link => link.active = false);

		// If two thirds of the section is on screen, it should be marked as active
		const scrollTop = $(document).scrollTop() + baseStyles.innerHeader.height;
		onConditionOrLast(
			links,
			link => {
				if (!link.targetId) {
					return false;
				}
				const $section = $('#' + link.targetId);
				const bottom = ($section.position().top +
												$section.outerHeight(true) -
												$(window).outerHeight() / 3);
				return scrollTop < bottom;
			},
			link => link.active = true
		);

		this.setState({ links: links });
	}

	render() {
		return (
			<header style={baseStyles.header}>
				<div style={baseStyles.innerHeader}>
					<LogoAtom />
					<div style={baseStyles.nav}>
						<NavigationBarOrg links={this.state.links} />
					</div>
				</div>
			</header>
		);
	}
};

export default HeaderEco;


HeaderEco.propTypes = {
	links: NavigationBarOrg.propTypes.links
};

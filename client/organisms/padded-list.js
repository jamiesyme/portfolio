import Radium from 'radium';
import React from 'react';


const baseStyles = {
	list: {
		listStyleType: 'none',
		margin: 0,
		padding: 0
	},
	item: {}
};


export class PaddedListOrg extends React.Component {
	render() {
		const listStyle = Object.assign(
			{},
			baseStyles.list,
			this.props.styles.list
		);

		const itemStyle = Object.assign(
			{},
			baseStyles.item,
			this.props.styles.item,
			{ marginTop: this.props.padding }
		);

		const firstItemStyle = Object.assign(
			{},
			itemStyle,
			{ marginTop: 0 }
		);

		const items = this.props.items.map((item, index) => {
			const key = index.toString();
			if (index == 0) {
				return <li key={key} style={firstItemStyle}>{item}</li>;
			} else {
				return <li key={key} style={itemStyle}>{item}</li>;
			}
		});

		return (
			<ul style={listStyle}>
				{items}
			</ul>
		);
	}
};
PaddedListOrg = Radium(PaddedListOrg);

export default PaddedListOrg;


PaddedListOrg.propTypes = {
	items: React.PropTypes.array,
	padding: React.PropTypes.number,
	styles: React.PropTypes.shape({
		list: React.PropTypes.object,
		item: React.PropTypes.object
	})
};

PaddedListOrg.defaultProps = {
	items: [],
	padding: 0,
	styles: {}
};

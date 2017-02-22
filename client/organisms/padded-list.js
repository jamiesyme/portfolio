import React from 'react';


const styles = {
	list: {
		listStyleType: 'none',
		margin: 0,
		padding: 0
	},
	item: {}
};


export class PaddedListOrg extends React.Component {
	render() {
		const extStyles = {
			list: Object.assign(
				{},
				styles.list,
				this.props.styles.list
			),
			item: Object.assign(
				{},
				styles.item,
				this.props.styles.item
			)
		};
		extStyles.item.marginTop = this.props.padding;
		extStyles.firstItem = Object.assign(
			{},
			extStyles.item,
			{ marginTop: 0 }
		);

		const items = this.props.items.map((item, index) => {
			const key = index.toString();
			if (index == 0) {
				return <li key={key} style={extStyles.firstItem}>{item}</li>;
			} else {
				return <li key={key} style={extStyles.item}>{item}</li>;
			}
		});

		return (
			<ul style={extStyles.list}>
				{items}
			</ul>
		);
	}
};

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

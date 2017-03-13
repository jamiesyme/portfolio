import Radium from 'radium';
import React from 'react';


const baseStyles = {
	list: {
		listStyleType: 'none',
		// The margin and padding are done this way to avoid mixing shorthand and
		// longhand forms. This is because of the style property that is passed into
		// the padded list which often modifies a particular side of padding/margin.
		// Doing it this way also avoids filling the console with warnings from
		// Radium (due to the shorthand/longhand issue mentioned above).
		//margin: 0,
		//padding: 0
		marginLeft:    0,
		marginRight:   0,
		marginTop:     0,
		marginBottom:  0,
		paddingLeft:   0,
		paddingRight:  0,
		paddingTop:    0,
		paddingBottom: 0
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

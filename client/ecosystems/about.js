import React from 'react';

import PaddedListOrg from '../organisms/padded-list';
import PictureParagraphMole from '../molecules/picture-paragraph';
import PrimaryHeadingAtom from '../atoms/primary-heading';


const baseStyles = {
	container: {
		boxSizing: 'border-box',
		margin: 'auto',
		minHeight: 'calc(100vh - 64px)',
		paddingTop: '50px',
		paddingBottom: '100px',
		width: '80%'
	},
	list: {
		list: {
			marginLeft: 50,
			marginRight: 50
		},
		padding: 50
	}
};


export class AboutEco extends React.Component {
	render() {
		const bodyItems = this.props.body.map((bodyObj, index) => {
			let align = index % 2 === 0 ? 'left' : 'right';
			return (
				<PictureParagraphMole key={index.toString()}
															pictureAlign={align}
															pictureSrc={bodyObj.pictureSrc}>
					{bodyObj.content}
				</PictureParagraphMole>
			);
		});

		return (
			<div style={baseStyles.container}>
				<PrimaryHeadingAtom>{this.props.title}</PrimaryHeadingAtom>
				<PaddedListOrg styles={baseStyles.list}
											 padding={baseStyles.list.padding}
											 items={bodyItems} />
			</div>
		);
	}
};

export default AboutEco;


AboutEco.propTypes = {
	body: React.PropTypes.arrayOf(React.PropTypes.shape({
		pictureSrc: React.PropTypes.string,
		content: React.PropTypes.string
	})),
	title: React.PropTypes.string
};

AboutEco.defaultProps = {
	body: []
};

import React from 'react';

import PaddedListOrg from '../organisms/padded-list';
import PictureParagraphMole from '../molecules/picture-paragraph';
import PrimaryHeadingAtom from '../atoms/primary-heading';


const baseStyles = {
	list: {
		list: {
			marginLeft: 50,
			marginRight: 50
		},
		padding: 50
	},
	section: {
		boxSizing: 'border-box',
		margin: 'auto',
		minHeight: 'calc(100vh - 64px)',
		paddingTop: '50px',
		paddingBottom: '100px',
		width: '80%'
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
			<section id={this.props.id}
							 style={baseStyles.section}>
				<PrimaryHeadingAtom>{this.props.title}</PrimaryHeadingAtom>
				<PaddedListOrg styles={baseStyles.list}
											 padding={baseStyles.list.padding}
											 items={bodyItems} />
			</section>
		);
	}
};

export default AboutEco;


AboutEco.propTypes = {
	body: React.PropTypes.arrayOf(React.PropTypes.shape({
		pictureSrc: React.PropTypes.string,
		content: React.PropTypes.string
	})),
	id: React.PropTypes.string,
	title: React.PropTypes.string
};

AboutEco.defaultProps = {
	body: []
};

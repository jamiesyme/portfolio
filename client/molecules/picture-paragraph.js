import React from 'react';

import ParagraphAtom from '../atoms/paragraph';
import PictureAtom from '../atoms/picture';


const baseStyles = {
	container: {
		display: 'flex'
	},
	paragraph: {
		flex: 1,
		order: 0
	},
	picture: {
		margin_: 40, // Which side the margin is needed is known at render-time
		size: 200
	}
};


export class PictureParagraphMole extends React.Component {
	render() {
		const pictureStyle = Object.assign({}, baseStyles.picture);

		if (this.props.pictureAlign === 'left') {
			pictureStyle.order = -1;
			pictureStyle.marginRight = pictureStyle.margin_;
		} else {
			pictureStyle.order = 1;
			pictureStyle.marginLeft = pictureStyle.margin_;
		}

		return (
			<div style={baseStyles.container}>
				<PictureAtom style={pictureStyle}
										 size={baseStyles.picture.size}
										 src={this.props.pictureSrc} />
				<ParagraphAtom style={baseStyles.paragraph}>
					{this.props.children}
				</ParagraphAtom>
			</div>
		);
	}
};

export default PictureParagraphMole;


PictureParagraphMole.PropTypes = {
	pictureAlign: React.PropTypes.oneOf(['left', 'right']),
	pictureSrc: React.PropTypes.string
};

PictureParagraphMole.defaultProps = {
	pictureAlign: 'left'
};

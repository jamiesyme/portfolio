import React from 'react';
import ReactDOM from 'react-dom';

import ParagraphAtom from '../atoms/paragraph';
import PrimaryHeadingAtom from '../atoms/primary-heading';


const style = {
	margin: 'auto',
	minHeight: '100vh',
	width: '80%'
};

export class ContactEco extends React.Component {
	render() {
		const lorem1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut erat vitae turpis fringilla ornare non id leo. Phasellus lacinia turpis non velit lobortis dictum. Integer tempor, mauris sit amet consequat maximus, felis justo sollicitudin turpis, a cursus nulla massa in turpis. Maecenas nibh quam, finibus ornare malesuada ut, tincidunt eget dui. Pellentesque lacinia faucibus nibh, quis ornare nunc venenatis id. Maecenas eget nulla vel lorem hendrerit scelerisque sed in nisi. Curabitur pulvinar felis non purus iaculis viverra. Nulla euismod turpis non lacinia tincidunt. Nam eget scelerisque quam. Fusce a sodales lacus. Nam iaculis eget sapien vitae ornare. Donec ullamcorper eros eleifend eleifend ultrices.';
		const lorem2 = 'Quisque fringilla sapien odio, et pretium arcu fermentum sit amet. Phasellus purus arcu, porta ultricies luctus quis, condimentum vitae ipsum. Ut id urna eget nisi varius cursus. Praesent varius finibus vehicula. Nunc vitae augue in ipsum cursus vulputate. Nulla feugiat nulla ut mauris vulputate, eget posuere lectus rhoncus. Praesent imperdiet mauris eu urna consequat scelerisque sed ut tortor. Aliquam suscipit purus ac lectus egestas, at imperdiet ipsum consectetur. Aenean quam ex, vehicula quis risus id, congue accumsan sapien. Sed ante augue, commodo ut faucibus id, consequat nec ex. Vestibulum eu velit malesuada, vulputate velit sed, fermentum lectus. Suspendisse tincidunt justo non leo viverra maximus. Aliquam feugiat lacus vitae est condimentum, vel dignissim dolor dictum.';
		return (
			<div style={style}>
				<PrimaryHeadingAtom>Contact</PrimaryHeadingAtom>
				<ParagraphAtom>{lorem1}</ParagraphAtom>
				<ParagraphAtom>{lorem2}</ParagraphAtom>
			</div>
		);
	}
};

export default ContactEco;

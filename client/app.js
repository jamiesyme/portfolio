import Radium from 'radium';
import React from 'react';
import ReactDOM from 'react-dom';

import NormalEnv from './environments/normal';


ReactDOM.render(
	<Radium.StyleRoot>
		<NormalEnv />
	</Radium.StyleRoot>,
	document.getElementById('root')
);

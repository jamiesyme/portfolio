import Radium from 'radium';
import React from 'react';
import ReactDOM from 'react-dom';

import LoremEnv from './environments/lorem';
import NormalEnv from './environments/normal';


ReactDOM.render(
	<Radium.StyleRoot>
		<NormalEnv />
	</Radium.StyleRoot>,
	document.getElementById('root')
);

import React from 'react';

import Button from '../Button/Button';

import './SiteSplash.css';
import splashIcon from './assets/herb_splash.png';

export default (props) => {
	
	return (
		<div className="site-splash">
			<img className="splash-image" src={splashIcon} alt="Herlore Calculator" />
			<div className="splash-text">Plan out your potions and maximize XP.</div>
			<Button className="splash-action" href="#/herbs" text="Get&nbsp;Started" />
		</div>
	);
	
}

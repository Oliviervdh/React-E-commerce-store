import React from 'react';
import {withRouter} from 'react-router-dom';

import './menu.itemt.styles.scss';


const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => ( // passing "history, linkUrl, match" so it can browse dynamically to the according linkUrl of the corresponding menu-item.
    <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <div className='background-image' // adding style withing the div, not on the div.
             style={{
                 backgroundImage: `url(${imageUrl})` // here you use the imageUrl that you passed into the menu item in "directory component.jsx" as the backgroundImage.
             }}
        />
        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);

export default withRouter(MenuItem); // Use withRouter to return a Powered up component that has access to "match, history, location"
